import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import fs from "fs";
import { pool } from "./src/db/index.ts";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = 3000;

// 1. HTTP Security Headers (Helmet)
// Configure helmet to be compatible with development hot-reloads and inline scripts/styles if needed
app.use(
  helmet({
    contentSecurityPolicy: false, // Turned off for Vite development inside the iframe context
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());

// 2. DDoS & Spam Protection (Rate Limiting)
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  validate: {
    trustProxy: false,
    xForwardedForHeader: false,
  },
  message: {
    error: "Слишком много запросов. Пожалуйста, попробуйте отправить заявку позже.",
  },
});

// Helper for HTML escaping (preventing XSS)
function sanitizeInput(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// 3. Database Table Initialization is handled out-of-band via Drizzle migrations to respect the principle of least privilege.


// 4. API Endpoints
// Create Order (Postgres Parameterized SQL + Nodemailer with extreme debugging)
app.post("/api/orders", orderLimiter, async (req, res) => {
  const { client_name, email, phone, service_type } = req.body;

  // Server-side strict validation
  if (!client_name || typeof client_name !== "string" || client_name.trim().length === 0) {
    return res.status(400).json({ error: "Имя обязательно для заполнения" });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Пожалуйста, введите корректный Email" });
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 5) {
    return res.status(400).json({ error: "Пожалуйста, введите корректный номер телефона" });
  }

  // Sanitization against XSS
  const cleanName = sanitizeInput(client_name.trim());
  const cleanEmail = email.trim(); // Emails shouldn't contain HTML tags anyway
  const cleanPhone = sanitizeInput(phone.trim());
  const cleanServiceType = service_type ? sanitizeInput(service_type.trim()) : "General Inquiry";

  let newOrder: any = null;
  let databaseWarning: string | null = null;

  try {
    // Direct, highly optimized, fully parameterized SQL Query (OWASP SQL Injection prevention)
    const sqlQuery = `
      INSERT INTO orders (client_name, email, phone, service_type)
      VALUES ($1, $2, $3, $4)
      RETURNING id, client_name, email, phone, service_type, created_at;
    `;
    const values = [cleanName, cleanEmail, cleanPhone, cleanServiceType];
    const dbResult = await pool.query(sqlQuery, values);
    newOrder = dbResult.rows[0];
  } catch (dbError: any) {
    console.warn("⚠️ Handled database INSERT fallback (writing to backup JSON):", dbError.message || dbError);
    databaseWarning = "База данных временно недоступна. Заявка сохранена в локальный резервный файл на сервере.";
    
    newOrder = {
      id: Date.now(),
      client_name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service_type: cleanServiceType,
      created_at: new Date().toISOString()
    };

    // Save to backup file
    try {
      const backupPath = path.join(process.cwd(), "orders-backup.json");
      let existingBackup: any[] = [];
      if (fs.existsSync(backupPath)) {
        try {
          existingBackup = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
        } catch (parseErr) {
          console.error("Failed to parse orders-backup.json, resetting:", parseErr);
        }
      }
      existingBackup.push(newOrder);
      fs.writeFileSync(backupPath, JSON.stringify(existingBackup, null, 2), "utf-8");
      console.log("💾 Order backed up successfully to orders-backup.json");
    } catch (fsError) {
      console.warn("⚠️ Failed to write to orders-backup.json:", fsError);
    }
  }

  // Trigger SMTP dispatch with graceful fallback to prevent blocking database entries
  let smtpError: string | null = null;
  try {
    await sendNotificationEmail(newOrder);
  } catch (mailError: any) {
    console.warn("⚠️ SMTP Error caught during order creation:", mailError.message || mailError);
    const mailErrMsg = mailError?.message || "";
    if (mailErrMsg.includes("535") || mailErrMsg.toLowerCase().includes("authentication failed")) {
      smtpError = "Ошибка авторизации SMTP. Проверьте переменные окружения: вы должны использовать специальный 'SMTP Key' из панели Brevo, а не обычный API Key v3!";
    } else {
      smtpError = mailError.message || "Не удалось отправить почтовое уведомление через SMTP";
    }
  }

  return res.status(201).json({
    success: true,
    message: databaseWarning || "Заявка успешно зафиксирована в базе данных PostgreSQL",
    order: newOrder,
    smtp_error: smtpError,
    database_warning: databaseWarning,
    email_sent_to: process.env.SMTP_TO || "farruxzet@gmail.com",
    email_sent_from: process.env.SMTP_FROM || process.env.SMTP_USER || "farruxwebsitedeveloper@gmail.com"
  });
});

// Fetch Orders (Direct optimized query with fallback)
app.get("/api/orders", async (req, res) => {
  try {
    const sqlQuery = "SELECT id, client_name, email, phone, service_type, created_at FROM orders ORDER BY created_at DESC;";
    const dbResult = await pool.query(sqlQuery);
    return res.json(dbResult.rows);
  } catch (err) {
    console.error("Database SELECT orders failed, reading from filesystem backup:", err);
    try {
      const backupPath = path.join(process.cwd(), "orders-backup.json");
      if (fs.existsSync(backupPath)) {
        const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
        const sortedBackup = backupData.sort((a: any, b: any) => {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        return res.json(sortedBackup);
      }
    } catch (fsErr) {
      console.error("Failed to read orders-backup.json fallback:", fsErr);
    }
    return res.status(500).json({ error: "Не удалось получить список заявок из базы данных или локального бекапа" });
  }
});

// 5. Nodemailer Notification Logic
const mailUser = process.env.SMTP_USER || "farruxwebsitedeveloper@gmail.com";
let transporter: nodemailer.Transporter | null = null;

try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // строго false для 587
    auth: {
      user: process.env.SMTP_USER, // твоя почта регистрации в Brevo
      pass: process.env.SMTP_PASSWORD // твой SMTP-ключ
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify SMTP connection immediately upon server initialization for diagnostic transparency
  transporter.verify((error, success) => {
    if (error) {
      const errMsg = error.message || "";
      if (errMsg.includes("535") || errMsg.toLowerCase().includes("authentication failed")) {
        console.warn("======================================================================");
        console.warn("⚠️ [SMTP CONFIG WARNING]: Неверный логин или пароль в файле .env!");
        console.warn("======================================================================");
      } else {
        console.warn("======================================================================");
        console.warn("⚠️ SMTP Nodemailer verification failed upon startup (non-blocking):");
        console.warn(error.message || error);
        console.warn("======================================================================");
      }
    } else {
      console.log("=========================================");
      console.log("✅ SMTP Nodemailer connection successfully VERIFIED!");
      console.log("=========================================");
    }
  });
} catch (initErr: any) {
  console.warn("⚠️ Failed to initialize Nodemailer transporter:", initErr.message || initErr);
}

async function sendNotificationEmail(order: any) {
  const recipientEmail = process.env.SMTP_TO || "farruxzet@gmail.com";
  const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "farruxwebsitedeveloper@gmail.com";

  if (!transporter) {
    console.log("SMTP_PASSWORD is empty or transport unit is offline. Simulated dispatch detail:");
    console.log(`[EMAIL SIMULATION] To: ${recipientEmail}`);
    console.log(`[EMAIL SIMULATION] Subject: 🔥 НОВАЯ ЗАЯВКА НА РАЗРАБОТКУ: [${order.service_type}]`);
    console.log(`[EMAIL SIMULATION] Body: Client=${order.client_name}, Phone=${order.phone}, Email=${order.email}`);
    return;
  }

  const mailOptions = {
    from: senderEmail, // Strictly use the authenticated SMTP user email or verified SMTP_FROM to avoid sender domain validation failure
    to: recipientEmail,
    subject: `🔥 НОВАЯ ЗАЯВКА НА РАЗРАБОТКУ: [${order.service_type}]`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; border: 1px solid #eaeaea; color: #000000;">
        <div style="padding-bottom: 30px; border-bottom: 1px solid #f0f0f0;">
          <h1 style="font-size: 18px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; color: #000000;">FARRUX • WEB ARCHITECT</h1>
          <p style="font-size: 11px; color: #888888; font-family: monospace; margin: 5px 0 0 0;">NEW LEAD RECEIVED // GMT+5</p>
        </div>
        
        <div style="padding: 30px 0;">
          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #333333;">Получена новая заявка на разработку с формы заказа портфолио:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #888888; text-transform: uppercase; width: 35%;">Услуга:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #000000;">${order.service_type}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #888888; text-transform: uppercase;">Имя Клиента:</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #000000;">${order.client_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #888888; text-transform: uppercase;">Email:</td>
              <td style="padding: 10px 0; font-size: 14px; color: #000000;">
                <a href="mailto:${order.email}" style="color: #000000; text-decoration: underline; font-weight: 500;">${order.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #888888; text-transform: uppercase;">Телефон:</td>
              <td style="padding: 10px 0; font-size: 14px; color: #000000;">
                <a href="tel:${order.phone}" style="color: #000000; text-decoration: underline; font-weight: 500;">${order.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #888888; text-transform: uppercase;">Дата Заявки:</td>
              <td style="padding: 10px 0; font-size: 12px; font-family: monospace; color: #666666;">${new Date(order.created_at).toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <div style="padding-top: 30px; border-top: 1px solid #f0f0f0; text-align: center;">
          <p style="font-size: 10px; color: #aaaaaa; margin: 0; font-family: monospace; letter-spacing: 0.05em; text-transform: uppercase;">NDA SECURED • SECURE INCOMING CHANNEL</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Nodemailer successfully dispatched client notification email.");
  } catch (mailErr: any) {
    console.warn("⚠️ Nodemailer failed to send email during live dispatch:", mailErr.message || mailErr);
    throw mailErr;
  }
}

// 6. Serve static files & configure development server middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode on http://0.0.0.0:${PORT}`);
  });
}

startServer();

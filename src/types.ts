/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  priceEstimate: string;
  timeEstimate: string;
  iconName: string;
  colorClass: string;
  // B2B strict card structure
  whatWeDo: string;
  forWhom: string;
  problemSolved: string;
  keyMetric: string;
  keyMetricLabel: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  mockupType: "mesh" | "lines" | "rings" | "cube";
  githubUrl?: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  text: string;
}

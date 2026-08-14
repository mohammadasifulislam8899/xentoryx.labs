import fs from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";
import { projectsData } from "@/data/projectsData";
import { skillsData } from "@/data/skillsData";
import { timelineData } from "@/data/timelineData";
import { labsData } from "@/data/labsData";
import { Project, SkillCategory, Milestone, LabExperiment } from "@/types";

export interface HeroSettings {
  statusPill: string;
  headline: string;
  roles: string[];
  description: string;
  yearsMetric: string;
  techNodesMetric: string;
  uptimeMetric: string;
  telemetryCardText: string;
}

export interface PhilosophyPillar {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export interface ServiceData {
  title: string;
  description: string;
  deliverables: string[];
}

export interface CompanyData {
  headline: string;
  description: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  active: boolean;
}

export interface SiteSettings {
  founderName: string;
  companyName: string;
  tagline: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  uptimeMetric: string;
  aiPrompt: string;
  hero: HeroSettings;
  philosophy: PhilosophyPillar[];
  services: ServiceData[];
  company: CompanyData[];
  socialLinks?: SocialLink[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface CMSData {
  settings: SiteSettings;
  projects: Project[];
  skills: SkillCategory[];
  timeline: Milestone[];
  labs: LabExperiment[];
  inquiries: Inquiry[];
}

const dataFilePath = path.join(process.cwd(), "src", "data", "cms-store.json");

export const initialData: CMSData = {
  settings: {
    founderName: "Asif",
    companyName: "Xentoryx Labs",
    tagline: "Building Scalable Software, IoT Systems and Intelligent Technologies",
    email: "mohammadasifulislam8899@gmail.com",
    githubUrl: "https://github.com/mohammadasifulislam8899",
    linkedinUrl: "https://linkedin.com/in/mohammadasifulislam",
    twitterUrl: "https://x.com/xentoryxlabs",
    socialLinks: [
      { id: "s-1", name: "GitHub", url: "https://github.com/mohammadasifulislam8899", icon: "Github", active: true },
      { id: "s-2", name: "LinkedIn", url: "https://linkedin.com/in/mohammadasifulislam", icon: "Linkedin", active: true },
      { id: "s-3", name: "Twitter / X", url: "https://x.com/xentoryxlabs", icon: "Twitter", active: true },
      { id: "s-4", name: "Email Direct", url: "mailto:mohammadasifulislam8899@gmail.com", icon: "Mail", active: true },
    ],
    uptimeMetric: "99.98%",
    aiPrompt: "You are Gemini AI, powered by Google Gemini AI for Founder Asif and Xentoryx Labs.",
    hero: {
      statusPill: "FOUNDER & PRINCIPAL ENGINEER",
      headline: "ASIF",
      roles: [
        "Android Developer",
        "IoT Systems Engineer",
        "Backend Architect",
        "Modern Web Specialist",
        "Founder of Xentoryx Labs",
      ],
      description:
        "Building scalable software products, intelligent IoT hardware systems, high-throughput backend architectures, and modern web experiences through Xentoryx Labs.",
      yearsMetric: "4+",
      techNodesMetric: "15+",
      uptimeMetric: "99.9%",
      telemetryCardText: "Active // 12ms Ping",
    },
    philosophy: [
      {
        title: "Build Fast",
        subtitle: "Rapid Prototyping to Production",
        description:
          "Moving swiftly from initial architectural concept to clean, production-ready code without cutting engineering corners.",
        points: ["Modular Clean Architecture", "Iterative Sprint Deployment", "Zero Tech Debt Strategy"],
      },
      {
        title: "Think Scalable",
        subtitle: "Enterprise-Grade Performance",
        description:
          "Architecting software microservices and IoT hardware pipelines designed to effortlessly handle exponential user & data growth.",
        points: ["Offline-First Android Data Caching", "High-Throughput MQTT Brokers", "Database Indexing & Micro-caching"],
      },
      {
        title: "Design for Humans",
        subtitle: "Apple & Linear Level Polish",
        description:
          "Crafting intuitive user interfaces, buttery smooth animations, and ergonomic software designs that wow users at first glance.",
        points: ["Declarative Jetpack Compose & React 19", "Micro-interactions & Smooth Scroll", "Accessible & Dark Mode First"],
      },
      {
        title: "Automate Everything",
        subtitle: "Continuous Telemetry & OTA",
        description:
          "Automating build pipelines, hardware Over-The-Air (OTA) updates, cloud container deployments, and background monitoring.",
        points: ["OTA Wireless ESP32 Updating", "Dockerized Container Workflows", "Automated System Diagnostics"],
      },
    ],
    services: [
      {
        title: "Android Development",
        description: "High-performance native Android applications built with Jetpack Compose, Kotlin Coroutines, and offline-first Room DB.",
        deliverables: ["Declarative Jetpack Compose UI", "Offline-First Room Architecture", "WorkManager Background Sync", "App Store Deployment"],
      },
      {
        title: "IoT & Hardware Systems",
        description: "Embedded C++ firmware for ESP32 microcontrollers, low-power BLE provisioning, MQTT real-time streaming, and OTA updates.",
        deliverables: ["Custom ESP32 C++ Drivers", "MQTT & WebSocket Telemetry", "Bluetooth Low Energy (BLE)", "Wireless OTA Firmware Engine"],
      },
      {
        title: "Backend API Engineering",
        description: "Distributed RESTful & GraphQL microservices built with Node.js, Express, PostgreSQL, Prisma, Redis, and JWT security.",
        deliverables: ["Scalable REST & WebSocket APIs", "PostgreSQL Relational Schemas", "Redis Micro-Caching Layer", "JWT & OAuth2 Auth Pipelines"],
      },
      {
        title: "Modern Web Platforms",
        description: "Production-ready, cinematic web applications built with Next.js 15 App Router, TypeScript, GSAP, and Framer Motion.",
        deliverables: ["Apple/Linear Level Visual Polish", "GSAP ScrollTrigger Storytelling", "SEO & OpenGraph Optimization", "Lighthouse 90+ Guaranteed"],
      },
      {
        title: "Cloud & DevOps",
        description: "Containerized deployment pipelines, Docker orchestration, and cloud infrastructure setup for high availability.",
        deliverables: ["Docker Containerization", "Automated CI/CD Workflows", "SSL/TLS TLS Certification", "Cloud Infrastructure Setup"],
      },
      {
        title: "Technical Consulting",
        description: "Architecture audits, tech stack strategy, performance optimization, and IoT hardware feasibility assessments.",
        deliverables: ["Codebase Quality Audit", "System Architecture Blueprint", "IoT Hardware Feasibility", "Performance Tuning"],
      },
    ],
    company: [
      {
        headline: "Engineering Tomorrow's Digital Experiences",
        description: "Xentoryx Labs develops scalable software, IoT products, backend systems, and intelligent digital experiences designed for the future. Founded by Asif.",
        mission: "To bridge the gap between physical hardware microcontrollers and cloud software systems by engineering resilient, low-latency IoT hardware and elegant mobile/web applications.",
        vision: "To become a globally recognized technology lab where hardware engineering meets modern web design and AI intelligence, delivering software that empowers millions.",
        values: [
          { title: "Engineering Excellence", description: "We write clean, typed, modular code built to last for decades." },
          { title: "Pioneering Innovation", description: "Pushing boundaries in Edge AI microcontrollers and hardware telemetry." },
          { title: "Human-Centric UX", description: "Combining raw technical power with Apple-level visual craftsmanship." },
        ],
      },
    ],
  },
  projects: projectsData,
  skills: skillsData,
  timeline: timelineData,
  labs: labsData,
  inquiries: [
    {
      id: "inq-1",
      name: "Client Partner",
      email: "partner@techventure.com",
      projectType: "IoT & Hardware Systems",
      budget: "$5,000 - $10,000",
      message: "Interested in developing custom ESP32 BLE telemetry hardware companion devices.",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ],
};

let inMemoryStore: CMSData | null = null;

export async function fetchMongoCMSData(): Promise<CMSData> {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  try {
    const client = await clientPromise;
    const db = client.db("xentoryx_cms");
    const doc = await db.collection("cms_store").findOne({ _id: "main_data" } as any);

    if (doc && doc.data) {
      inMemoryStore = doc.data as CMSData;
      return inMemoryStore;
    }

    // Seed database if empty
    await db.collection("cms_store").updateOne(
      { _id: "main_data" } as any,
      { $set: { data: initialData, updatedAt: new Date() } },
      { upsert: true }
    );
    inMemoryStore = initialData;
    return initialData;
  } catch (err) {
    console.warn("MongoDB fetch failed, falling back to local file store:", err);
    inMemoryStore = getCMSData();
    return inMemoryStore;
  }
}

export async function saveMongoCMSData(data: CMSData): Promise<boolean> {
  inMemoryStore = data;
  saveCMSData(data);

  try {
    const client = await clientPromise;
    const db = client.db("xentoryx_cms");
    await db.collection("cms_store").updateOne(
      { _id: "main_data" } as any,
      { $set: { data: data, updatedAt: new Date() } },
      { upsert: true }
    );
    return true;
  } catch (err) {
    console.error("MongoDB save error (Network IP may need 0.0.0.0/0 whitelist in Atlas):", err);
    return true;
  }
}

export function getCMSData(): CMSData {
  try {
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading CMS store, falling back to initial data:", err);
  }
  saveCMSData(initialData);
  return initialData;
}

export function saveCMSData(data: CMSData): boolean {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing CMS store:", err);
    return false;
  }
}

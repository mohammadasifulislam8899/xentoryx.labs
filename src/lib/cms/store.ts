import fs from "fs";
import path from "path";
import { projectsData } from "@/data/projectsData";
import { skillsData } from "@/data/skillsData";
import { timelineData } from "@/data/timelineData";
import { labsData } from "@/data/labsData";
import { Project, SkillCategory, Milestone, LabExperiment } from "@/types";

export interface SiteSettings {
  founderName: string;
  companyName: string;
  tagline: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  uptimeMetric: string;
  aiPrompt: string;
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

const initialData: CMSData = {
  settings: {
    founderName: "Asif",
    companyName: "Xentoryx Labs",
    tagline: "Building Scalable Software, IoT Systems and Intelligent Technologies",
    email: "asif@xentoryx.com",
    githubUrl: "https://github.com/Xentoryx",
    linkedinUrl: "https://linkedin.com",
    uptimeMetric: "99.98%",
    aiPrompt: "You are Ask Asif AI, the digital twin of Founder Asif and Xentoryx Labs.",
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

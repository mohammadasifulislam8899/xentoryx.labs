export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: "Android" | "IoT" | "Fullstack" | "AI";
  featured: boolean;
  image: string;
  techStack: string[];
  features: string[];
  architecture: {
    frontend?: string;
    backend?: string;
    hardware?: string;
    protocol?: string;
    database?: string;
  };
  githubUrl?: string;
  liveUrl?: string;
  stats: { label: string; value: string }[];
}

export interface LabExperiment {
  id: string;
  title: string;
  status: "Prototype" | "Research" | "Alpha" | "Live";
  date: string;
  category: "Edge AI" | "Embedded System" | "Distributed Protocol" | "Hardware";
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  interactiveType?: "sensor" | "drone" | "power";
  githubUrl?: string;
}

export interface SkillCategory {
  category: "ANDROID" | "BACKEND" | "WEB" | "IOT";
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    badge?: string;
  }[];
}

export interface Milestone {
  year: string;
  period: string;
  title: string;
  companyRole: string;
  description: string;
  highlights: string[];
  technologies: string[];
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "asif-ai";
  text: string;
  timestamp: string;
}

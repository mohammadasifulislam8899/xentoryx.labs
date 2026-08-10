import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    category: "ANDROID",
    iconName: "Smartphone",
    description: "Production-grade native Android applications with modern architecture and declarative UI.",
    skills: [
      { name: "Kotlin", level: 95, experience: "4+ Years", badge: "Core Language" },
      { name: "Jetpack Compose", level: 92, experience: "3+ Years", badge: "Declarative UI" },
      { name: "Coroutines & Flow", level: 90, experience: "4+ Years", badge: "Asynchronous" },
      { name: "Room Database", level: 90, experience: "3+ Years", badge: "Offline First" },
      { name: "WorkManager", level: 88, experience: "3+ Years", badge: "Background Tasks" },
      { name: "Ktor Client & Hilt", level: 85, experience: "3+ Years", badge: "Networking & DI" },
    ],
  },
  {
    category: "BACKEND",
    iconName: "Server",
    description: "High-throughput APIs, microservices, micro-caching, and secure backend architectures.",
    skills: [
      { name: "Node.js & Express", level: 92, experience: "4+ Years", badge: "Runtime Engine" },
      { name: "PostgreSQL & Prisma", level: 88, experience: "3+ Years", badge: "Relational DB" },
      { name: "MongoDB", level: 86, experience: "3+ Years", badge: "NoSQL" },
      { name: "Redis", level: 84, experience: "2+ Years", badge: "In-Memory Cache" },
      { name: "Docker & Containerization", level: 85, experience: "3+ Years", badge: "DevOps" },
      { name: "JWT & OAuth2 Security", level: 90, experience: "4+ Years", badge: "Authentication" },
    ],
  },
  {
    category: "WEB",
    iconName: "Globe",
    description: "Futuristic, ultra-fast web apps with rich animations, SSR, and modern React 19 / Next.js 15.",
    skills: [
      { name: "Next.js 15 (App Router)", level: 94, experience: "3+ Years", badge: "Fullstack Web" },
      { name: "React 19 & TypeScript", level: 95, experience: "4+ Years", badge: "UI Library" },
      { name: "Tailwind CSS", level: 96, experience: "4+ Years", badge: "Design Tokens" },
      { name: "GSAP & ScrollTrigger", level: 90, experience: "2+ Years", badge: "Cinematic Motion" },
      { name: "Framer Motion", level: 92, experience: "3+ Years", badge: "Micro-Interactions" },
      { name: "Lenis Smooth Scroll", level: 88, experience: "2+ Years", badge: "UX Scroll" },
    ],
  },
  {
    category: "IOT",
    iconName: "Cpu",
    description: "Embedded system firmware, hardware sensor integration, low-power BLE, and MQTT messaging.",
    skills: [
      { name: "ESP32 & C/C++", level: 92, experience: "3+ Years", badge: "Hardware MCU" },
      { name: "MQTT Protocol", level: 90, experience: "3+ Years", badge: "IoT Messaging" },
      { name: "Bluetooth Low Energy (BLE)", level: 88, experience: "3+ Years", badge: "Wireless Comms" },
      { name: "WiFi Provisioning", level: 86, experience: "2+ Years", badge: "Device Onboarding" },
      { name: "OTA Firmware Updates", level: 88, experience: "3+ Years", badge: "Remote Deployment" },
      { name: "Sensors & OLED Drivers", level: 90, experience: "3+ Years", badge: "Hardware I/O" },
    ],
  },
];

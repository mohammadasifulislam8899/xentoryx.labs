import { Milestone } from "@/types";

export const timelineData: Milestone[] = [
  {
    year: "2021",
    period: "Early Engineering",
    title: "Started Android Development",
    companyRole: "Mobile Software Engineer",
    description:
      "Dived deep into native Android development with Java & Kotlin, mastering asynchronous state handling, SQLite, REST architectures, and modern Android UI development.",
    highlights: [
      "Mastered Kotlin & Android SDK fundamentals",
      "Built native mobile utility apps with custom UI components",
      "Established foundational clean architecture principles",
    ],
    technologies: ["Android", "Kotlin", "Java", "SQLite", "REST API"],
    icon: "Smartphone",
  },
  {
    year: "2022",
    period: "Hardware & Microcontrollers",
    title: "Built First Embedded IoT System",
    companyRole: "Embedded Hardware & Systems Engineer",
    description:
      "Expanded engineering scope into hardware microcontrollers. Interfaced ESP32 microcontrollers with physical sensor arrays, BLE wireless protocols, and lightweight MQTT broker communication.",
    highlights: [
      "Designed low-power sensor ingestion circuits on ESP32",
      "Built real-time telemetry pipelines using MQTT & WebSockets",
      "Created BLE mobile onboarding protocols",
    ],
    technologies: ["ESP32", "C++", "MQTT", "BLE", "FreeRTOS", "Sensors"],
    icon: "Cpu",
  },
  {
    year: "2023",
    period: "Product Launch",
    title: "Developed Expensey Platform",
    companyRole: "Fullstack Product Engineer",
    description:
      "Architected and released Expensey — an offline-first personal finance application with Jetpack Compose on Android and a robust Node.js + PostgreSQL backend engine.",
    highlights: [
      "Engineered offline-first Room DB synchronization engine",
      "Built RESTful microservice backend with JWT authentication",
      "Achieved sub-14MB Android package size with 60 FPS UI",
    ],
    technologies: ["Kotlin", "Compose", "Room", "Node.js", "PostgreSQL", "Docker"],
    icon: "CreditCard",
  },
  {
    year: "2024",
    period: "AI Hardware Innovation",
    title: "Created Dipannita AI Device",
    companyRole: "Lead IoT & AI Hardware Architect",
    description:
      "Designed Dipannita, an AI-powered ESP32 companion device integrating real-time telemetry processing, OLED UI drivers, OTA update engine, and mobile sync.",
    highlights: [
      "Architected wireless Over-The-Air (OTA) firmware upgrade pipeline",
      "Built dual-buffered graphics engine for OLED display",
      "Integrated machine learning signal processing",
    ],
    technologies: ["ESP32", "C++", "MQTT", "OTA", "OLED", "TinyML", "Next.js"],
    icon: "Bot",
  },
  {
    year: "2025–Present",
    period: "Enterprise Enterprise",
    title: "Founded Xentoryx Labs",
    companyRole: "Founder & Principal Systems Architect",
    description:
      "Established Xentoryx Labs as an elite technology company focused on building scalable software products, intelligent IoT hardware systems, and high-performance digital experiences.",
    highlights: [
      "Leading multi-disciplinary engineering initiatives in Mobile, Web, Backend & IoT",
      "Architecting enterprise-grade IoT control planes & software platforms",
      "Empowering client organizations with future-proof tech stacks",
    ],
    technologies: ["Next.js 15", "TypeScript", "Android", "Node.js", "ESP32", "Docker", "PostgreSQL"],
    icon: "Rocket",
  },
];

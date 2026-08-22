# ⚡ Xentoryx Labs — Flagship Engineering & R&D Studio

> **Official Portfolio & R&D Platform of Founder Asif (Mohammad Asiful Islam)**  
> *Architected with Next.js 15 App Router, React 19, TypeScript, Three.js, Tailwind CSS, MongoDB Atlas, and Google Gemini AI.*

---

## 🏛️ Project Overview

**Xentoryx Labs** is a premier digital engineering platform and contemporary research studio portfolio. It bridges the frontier between **Native Android Applications**, **Embedded IoT Microcontroller Systems (ESP32 C++)**, **Scalable Backend Microservices**, and **Editorial Cinematic Web Platforms**.

The platform is designed with an **Editorial Visual Poetry / Luxury Creative Studio** aesthetic while delivering 100% real-time, dynamic, CMS-driven functionality.

---

## 🧭 Complete Route & Page Directory

| Route | Page Name | Purpose & Features |
| :--- | :--- | :--- |
| `/` | **Studio Overview** | Complete 8-part narrative: Studio Manifesto Hero, Philosophy Pillars, Selected Works Showcase, Tech Matrix, Practice Offerings, Milestone Timeline, Studio Ethos, and Project Intake Docket. |
| `/founder` | **Founder Monograph** | In-depth engineering profile of Founder Asif, technical background, chronological milestone chronicle, and interactive skills mastery galaxy. |
| `/projects` | **Project Archive Catalog** | Searchable and filterable repository of Android, IoT, Backend, and Web projects with live Blueprint specification drawers, GitHub links, and Demo URLs. |
| `/labs` | **R&D Hardware Laboratory** | Experimental hardware research hub, ESP32 microcontroller telemetry, prototype specs, and interactive real-time telemetry simulation engine. |
| `/labs/console` | **Field Terminal Console** | Interactive archival CLI console with executable commands (`status`, `stack`, `projects`, `contact`, `clear`). |
| `/admin` | **Studio Control Room** | Secure founder control plane with password authentication, MongoDB Atlas cloud sync, 9 CMS management tabs, and Client Inquiries inbox. |

---

## 🛠️ Technology Stack & Architecture

### **Frontend & Visual Computing**
* **Framework:** Next.js 15.5+ (App Router, Server Components, SSR)
* **Library:** React 19, TypeScript
* **Styling:** Tailwind CSS, Custom Editorial CSS Variables, Dual Theme Art Direction (Warm Paper Light / Black Gallery Dark)
* **3D & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
* **Motion & Kinematics:** Framer Motion, Lenis Smooth Scroll

### **Backend, APIs & Cloud Store**
* **Runtime:** Next.js Serverless Route Handlers
* **Database:** MongoDB Atlas with Mongoose/MongoClient + Local JSON fallback (`cms-store.json`)
* **AI Engine:** Google Gemini AI API (`@google/genai`) for XenAI Studio Assistant
* **Firmware Telemetry:** Custom ESP32 Microcontroller OTA (Over-the-Air) & MQTT Telemetry endpoints

---

## 💡 Core Interactive Features

### 1. **Command Index (`⌘K` / `Ctrl+K`)**
* Instant modal index for global navigation (`01 Overview`, `02 Founder`, `03 Archive`, `04 Laboratory`), AI launcher, console access, and resume download.

### 2. **XenAI Studio Companion**
* Google Gemini AI-powered floating intelligence interface trained on Founder Asif's engineering methodology and project catalog.

### 3. **SYSTEM / 001 Engineering Archival Console**
* Dedicated Easter egg (accessible via 5 clicks on masthead logo or `⌘K`) featuring live telemetry metrics (Ping, Heap, CPU Load, TLS 1.3) and interactive CLI.

### 4. **Hardware Telemetry Simulation Engine**
* Real-time interactive simulation on the Labs page measuring sampling frequency, vibration sensor data, signal state, and power draw.

### 5. **Blueprint Archive Drawers**
* Deep architectural inspect view for every project covering Frontend layers, Backend topologies, Hardware MCUs, and direct repository links.

### 6. **Dynamic CMS & Studio Control Room**
* 9 dedicated tabs: Projects Catalog, Hardware Labs, Skills Matrix, Timeline Milestones, Services, Hero & Company, Social Channels, Client Inquiries Inbox, and Gemini AI Persona configuration.

### 7. **Dual Theme Art Direction**
* **Light Mode:** Warm textured editorial paper (`#F9F8F6`), deep charcoal typography, subtle gold/amber accents.
* **Dark Mode:** Deep black gallery environment (`#08090C`), soft off-white typography, hairline dividers, vermilion status pips.

---

## 🔌 API Endpoints Summary

| Endpoint | Method | Functionality |
| :--- | :--- | :--- |
| `/api/admin/auth` | `POST` | Authenticates admin password and issues session token. |
| `/api/admin/data` | `GET` / `POST` | Fetches CMS data, handles full-site updates, and logs client contact inquiries to MongoDB. |
| `/api/chat` | `POST` | Handles XenAI streaming dialogue powered by Google Gemini AI. |
| `/api/devices` | `GET` / `POST` | IoT Hardware device registration and status telemetry. |
| `/api/devices/firmware/latest` | `GET` | Delivers latest Over-The-Air (OTA) binary payloads to ESP32 devices. |

---

## 🔍 SEO & Discoverability

* **Structured Data:** JSON-LD Schema for `Organization` and `WebSite` in `layout.tsx`.
* **Sitemap:** Dynamic Next.js sitemap generated at `https://www.xentoryxlabs.site/sitemap.xml`.
* **Robots:** Configured in `src/app/robots.ts`.
* **Social Cards:** 1200x630 OpenGraph and Twitter summary cards.

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/mohammadasifulislam8899/xentoryx.labs.git
cd xentoryx.labs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
# MongoDB Connection String (Optional - falls back to local JSON store if omitted)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/xentoryx_cms

# Google Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key_here

# Admin Password
ADMIN_PASSWORD=your_secure_admin_password
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 👨‍💻 Founder & Lead Architect

**Mohammad Asiful Islam (Asif)**  
*Founder, Android Developer & IoT Systems Engineer at Xentoryx Labs*

* 🌐 **Website:** [https://www.xentoryxlabs.site](https://www.xentoryxlabs.site)
* 🐙 **GitHub:** [@mohammadasifulislam8899](https://github.com/mohammadasifulislam8899)
* 💼 **LinkedIn:** [Mohammad Asiful Islam](https://linkedin.com/in/mohammadasifulislam)
* ✉️ **Email:** [mohammadasifulislam8899@gmail.com](mailto:mohammadasifulislam8899@gmail.com)

---
*© 2026 Xentoryx Labs. All rights reserved.*

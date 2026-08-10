import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT_ASIF } from "@/data/aiContext";

export async function generateAiResponse(userPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${SYSTEM_PROMPT_ASIF}\n\nUser Question: ${userPrompt}\n\nResponse:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn("Gemini API call failed, falling back to intelligent response engine:", err);
    }
  }

  // Intelligent Fallback Engine matching Asif & Xentoryx Labs context
  const query = userPrompt.toLowerCase();

  if (query.includes("dipannita")) {
    return "**Dipannita** is one of our flagship IoT innovations at Xentoryx Labs. It's an AI-powered ESP32 companion device featuring dual-core MCU hardware, BLE provisioning, MQTT real-time streaming, OLED UI drivers, and Over-The-Air (OTA) wireless updates. Feel free to explore the interactive simulation on our [/labs](file:///labs) page!";
  }

  if (query.includes("expensey")) {
    return "**Expensey** is a native offline-first personal finance platform engineered with Jetpack Compose, Room DB, and Ktor Client on Android, paired with a Node.js + PostgreSQL backend. It guarantees zero transaction lag and seamless encrypted cloud synchronization.";
  }

  if (query.includes("service") || query.includes("hire") || query.includes("offer") || query.includes("project")) {
    return "**Xentoryx Labs** offers specialized engineering services across:\n- 📱 **Android Development** (Native Kotlin, Jetpack Compose, Clean Architecture)\n- ⚡ **IoT Systems & Hardware** (ESP32, Sensor arrays, BLE, MQTT, OTA)\n- 🛡️ **Backend & Cloud Architecture** (Node.js, Express, PostgreSQL, Redis, Docker)\n- 🌐 **Modern Web Applications** (Next.js 15, TypeScript, GSAP, Framer Motion)\n\nYou can reach out directly via our Contact form at the bottom of the page or email `asif@xentoryx.com`!";
  }

  if (query.includes("asif") || query.includes("founder") || query.includes("who")) {
    return "**Asif** is a multi-disciplinary software engineer and the Founder of Xentoryx Labs. With expertise spanning native Android apps, embedded IoT hardware systems, backend APIs, and modern web platforms, Asif focuses on building fast, scalable, and human-centered technologies.";
  }

  if (query.includes("labs") || query.includes("experiment") || query.includes("ai")) {
    return "Our **Xentoryx Labs Innovation Hub** focuses on cutting-edge experimental prototypes like TinyML Edge AI classifiers on ESP32, high-frequency MQTT brokers, and adaptive hardware power governors. Check out our dedicated [/labs](file:///labs) page!";
  }

  return `Thanks for reaching out! At Xentoryx Labs, we specialize in building scalable software, embedded IoT systems, robust backend architectures, and intelligent web applications.\n\nWhether you're interested in our flagship projects like **Dipannita** or **Expensey**, or want to discuss a custom engineering project with Asif, we'd love to connect!`;
}

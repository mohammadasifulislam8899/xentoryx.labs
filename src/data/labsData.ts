import { LabExperiment } from "@/types";

export const labsData: LabExperiment[] = [
  {
    id: "neural-iot-gateway",
    title: "Neural Edge ESP32 Classifier",
    status: "Prototype",
    date: "Q1 2026",
    category: "Edge AI",
    description:
      "TinyML model quantization compiled directly onto the ESP32 microcontroller dual-core chip. Classifies vibration & acoustic signals locally without requiring cloud roundtrips.",
    tags: ["TinyML", "ESP32", "C++", "Edge AI", "TensorFlow Lite"],
    metrics: [
      { label: "Memory Footprint", value: "84 KB RAM" },
      { label: "Inference Time", value: "4.2 ms" },
      { label: "Offline Accuracy", value: "97.3%" },
    ],
    interactiveType: "sensor",
    githubUrl: "https://github.com/Xentoryx/Neural-ESP32-Edge",
  },
  {
    id: "autonomous-telemetry-stream",
    title: "High-Frequency MQTT Mesh Broker",
    status: "Live",
    date: "Q4 2025",
    category: "Distributed Protocol",
    description:
      "Distributed micro-broker pipeline handling 50,000 sensor telemetry messages per second over WebSockets & MQTT with dynamic payload compression.",
    tags: ["MQTT", "Go", "WebSockets", "TimescaleDB", "Protobuf"],
    metrics: [
      { label: "Message Throughput", value: "50k/sec" },
      { label: "P99 Latency", value: "1.8 ms" },
      { label: "Packet Loss", value: "0.00%" },
    ],
    interactiveType: "drone",
    githubUrl: "https://github.com/Xentoryx/HighFreq-MQTT-Mesh",
  },
  {
    id: "smart-energy-matrix",
    title: "Adaptive Hardware Power Governor",
    status: "Research",
    date: "Q2 2026",
    category: "Embedded System",
    description:
      "Dynamic frequency scaling and power gating driver for battery-powered remote IoT sensors, extending field operational lifespan by 300%.",
    tags: ["Low Power", "FreeRTOS", "Deep Sleep", "LiFePO4", "C++"],
    metrics: [
      { label: "Sleep Current", value: "5 µA" },
      { label: "Battery Extension", value: "3.2x" },
      { label: "Duty Cycle", value: "0.1%" },
    ],
    interactiveType: "power",
    githubUrl: "https://github.com/Xentoryx/Power-Governor-MCU",
  },
];

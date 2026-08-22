"use client";

import React from "react";
import FadeIn from "@/components/common/FadeIn";

export default function ServicesSection() {
  const services = [
    {
      num: "01",
      name: "Android Development",
      description:
        "Native Android apps built with Kotlin, Jetpack Compose, and MVVM architecture, from concept to production.",
    },
    {
      num: "02",
      name: "IoT & Embedded Systems",
      description:
        "ESP32 firmware, sensor integration, MQTT connectivity, and real-time device-to-cloud communication.",
    },
    {
      num: "03",
      name: "Backend Architecture",
      description:
        "Scalable microservice backends using Ktor, Express.js, PostgreSQL, Redis, and Docker with CI/CD pipelines.",
    },
    {
      num: "04",
      name: "AI Integration",
      description:
        "Embedding AI capabilities like Gemini into products, from smart assistants to automated content workflows.",
    },
    {
      num: "05",
      name: "Web Development",
      description:
        "Modern, SEO-optimized web platforms built with Next.js, focused on performance and clean user experience.",
    },
  ];

  return (
    <section
      id="services"
      className="w-full bg-[var(--services-bg)] text-[var(--services-text)] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none relative z-0 transition-colors duration-300 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Centered Heading */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            className="font-black uppercase leading-none tracking-tight text-[var(--services-text)]"
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items in Vertical List */}
        <div className="w-full flex flex-col divide-y divide-[var(--services-border)] border-y border-[var(--services-border)]">
          {services.map((svc, idx) => (
            <FadeIn
              key={svc.num}
              delay={idx * 0.1}
              y={20}
              className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              {/* Huge Number */}
              <div
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                className="font-black text-[var(--services-text)] leading-none shrink-0 tracking-tighter"
              >
                {svc.num}
              </div>

              {/* Name + Description Stacked */}
              <div className="flex flex-col space-y-2 md:pl-8 flex-1">
                <h3
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  className="font-medium uppercase tracking-tight text-[var(--services-text)]"
                >
                  {svc.name}
                </h3>
                <p
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  className="font-light leading-relaxed max-w-2xl text-[var(--services-desc)]"
                >
                  {svc.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

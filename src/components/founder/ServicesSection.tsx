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
      className="w-full bg-[var(--services-bg)] text-[var(--services-text)] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 select-none relative z-0 transition-colors duration-300 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Centered Heading */}
        <FadeIn delay={0} y={40} className="text-center mb-12 sm:mb-20 md:mb-28">
          <h2
            style={{ fontSize: "clamp(2.75rem, 11vw, 150px)" }}
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
              delay={idx * 0.08}
              y={20}
              className="py-6 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-2 sm:gap-4 md:gap-6 group text-left"
            >
              {/* Number */}
              <div className="font-black text-[var(--services-text)] leading-none shrink-0 tracking-tighter text-3xl sm:text-5xl md:text-7xl lg:text-8xl">
                {svc.num}
              </div>

              {/* Name + Description Stacked */}
              <div className="flex flex-col space-y-1 sm:space-y-2 md:pl-8 flex-1">
                <h3 className="font-medium uppercase tracking-tight text-[var(--services-text)] text-base sm:text-xl md:text-2xl">
                  {svc.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[var(--services-desc)] text-xs sm:text-sm md:text-base">
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

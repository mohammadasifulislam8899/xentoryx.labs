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
      className="w-full bg-[var(--services-bg)] text-[var(--services-text)] rounded-t-[32px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 py-14 sm:py-20 md:py-28 select-none relative z-0 transition-colors duration-300 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Centered Heading */}
        <FadeIn delay={0} y={30} className="text-center mb-8 sm:mb-16 md:mb-24">
          <h2
            className="font-black uppercase leading-none tracking-tight text-[var(--services-text)] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service Items in Stacked List on mobile, Flex Row on desktop */}
        <div className="w-full flex flex-col divide-y divide-[var(--services-border)] border-y border-[var(--services-border)]">
          {services.map((svc, idx) => (
            <FadeIn
              key={svc.num}
              delay={idx * 0.06}
              y={15}
              className="py-5 sm:py-8 md:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 group"
            >
              {/* Number */}
              <div
                className="font-black text-[var(--services-text)] leading-none shrink-0 tracking-tighter text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-90"
              >
                {svc.num}
              </div>

              {/* Name + Description Stacked */}
              <div className="flex flex-col space-y-1 sm:space-y-1.5 sm:pl-6 md:pl-8 flex-1">
                <h3
                  className="font-medium uppercase tracking-tight text-[var(--services-text)] text-sm xs:text-base sm:text-lg md:text-xl"
                >
                  {svc.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[var(--services-desc)] text-xs sm:text-sm md:text-base"
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

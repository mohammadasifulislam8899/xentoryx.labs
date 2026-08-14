"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGalaxyCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;
    camera.position.y = 8;
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Create 3D Particle Spiral Galaxy Geometry
    const particleCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const colorCore = new THREE.Color("#DB4338"); // Xentoryx Red Energy Core
    const colorArm1 = new THREE.Color("#00F2FE"); // Electric Cyan
    const colorArm2 = new THREE.Color("#FFFFFF"); // White Core
    const colorOuter = new THREE.Color("#FF5E50"); // Crimson Flare

    const arms = 3;
    const radius = 22;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spiral arms mathematics
      const r = Math.pow(Math.random(), 2) * radius;
      const spinAngle = r * 0.4;
      const branchAngle = ((i % arms) * 2 * Math.PI) / arms;

      const randomX = (Math.random() - 0.5) * (r * 0.25);
      const randomY = (Math.random() - 0.5) * (r * 0.25);
      const randomZ = (Math.random() - 0.5) * (r * 0.25);

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation from core to outer edge
      const mixedColor = colorCore.clone();
      const ratio = r / radius;

      if (i % 3 === 0) {
        mixedColor.lerp(colorArm1, ratio);
      } else if (i % 3 === 1) {
        mixedColor.lerp(colorOuter, ratio);
      } else {
        mixedColor.lerp(colorArm2, ratio);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // 4. Particle Material with Depth & Transparency
    const material = new THREE.PointsMaterial({
      size: 0.18,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxyPoints = new THREE.Points(geometry, material);
    scene.add(galaxyPoints);

    // 5. Mouse Parallax Reaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow 3D Galaxy Rotation
      galaxyPoints.rotation.y = elapsedTime * 0.08;
      galaxyPoints.rotation.x = Math.sin(elapsedTime * 0.04) * 0.1;

      // Smooth Mouse Parallax Interp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      scene.rotation.y = mouseX * 0.3;
      scene.rotation.x = -mouseY * 0.3;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70 dark:opacity-85 mix-blend-screen transition-opacity duration-500"
    />
  );
}

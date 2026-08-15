"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeGalaxyCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Create 3D Holographic Quantum Tech Core Rings Group
    const techCoreGroup = new THREE.Group();
    scene.add(techCoreGroup);

    // Ring 1: Primary Xentoryx Red Outer Core Ring
    const geoRing1 = new THREE.TorusGeometry(12, 0.08, 16, 120);
    const matRing1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ring1 = new THREE.Mesh(geoRing1, matRing1);
    ring1.rotation.x = Math.PI / 4;
    techCoreGroup.add(ring1);

    // Ring 2: Secondary Cyan Inner Orbital Ring
    const geoRing2 = new THREE.TorusGeometry(8.5, 0.06, 16, 100);
    const matRing2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00F2FE"),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const ring2 = new THREE.Mesh(geoRing2, matRing2);
    ring2.rotation.y = Math.PI / 3;
    techCoreGroup.add(ring2);

    // Ring 3: Concentric Tech Inner Core
    const geoRing3 = new THREE.RingGeometry(5, 5.15, 64);
    const matRing3 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF5E50"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const ring3 = new THREE.Mesh(geoRing3, matRing3);
    techCoreGroup.add(ring3);

    // Position the Holographic Core in the Far Right Background
    techCoreGroup.position.set(22, -6, -15);

    // 4. Create Floating 3D Quantum Data Cubes Group (Subtle floating tech elements)
    const cubesGroup = new THREE.Group();
    scene.add(cubesGroup);

    const cubeCount = 45;
    const cubeMeshes: THREE.Mesh[] = [];
    const geoCube = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const matCubeRed = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const matCubeCyan = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00F2FE"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    for (let i = 0; i < cubeCount; i++) {
      const mesh = new THREE.Mesh(
        geoCube,
        i % 2 === 0 ? matCubeRed : matCubeCyan
      );
      mesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 45,
        -10 + (Math.random() - 0.5) * 20
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(Math.random() * 0.8 + 0.4);
      cubesGroup.add(mesh);
      cubeMeshes.push(mesh);
    }

    // 5. Ambient Quantum Floating Energy Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cRed = new THREE.Color("#DB4338");
    const cCyan = new THREE.Color("#00F2FE");
    const cWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePos[i3] = (Math.random() - 0.5) * 80;
      particlePos[i3 + 1] = (Math.random() - 0.5) * 55;
      particlePos[i3 + 2] = -10 + (Math.random() - 0.5) * 25;

      const randColor = i % 3 === 0 ? cRed : i % 3 === 1 ? cCyan : cWhite;
      particleColors[i3] = randColor.r;
      particleColors[i3 + 1] = randColor.g;
      particleColors[i3 + 2] = randColor.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

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

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous 3D Hologram Rotation
      ring1.rotation.x = elapsedTime * 0.12;
      ring1.rotation.y = elapsedTime * 0.15;

      ring2.rotation.y = -elapsedTime * 0.18;
      ring2.rotation.z = elapsedTime * 0.1;

      ring3.rotation.z = elapsedTime * 0.08;

      // Animate Quantum Floating Cubes
      cubeMeshes.forEach((cube, idx) => {
        cube.rotation.x += 0.005 * (idx % 2 === 0 ? 1 : -1);
        cube.rotation.y += 0.008 * (idx % 3 === 0 ? 1 : -1);
        cube.position.y += Math.sin(elapsedTime + idx) * 0.008;
      });

      // Slowly Drift Energy Particles Upwards
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArr[i3 + 1] += 0.015; // float upwards
        if (posArr[i3 + 1] > 28) posArr[i3 + 1] = -28; // reset loop
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth Mouse Parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      camera.position.x = mouseX * 2.5;
      camera.position.y = -mouseY * 2.5;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geoRing1.dispose();
      matRing1.dispose();
      geoRing2.dispose();
      matRing2.dispose();
      geoRing3.dispose();
      matRing3.dispose();
      geoCube.dispose();
      matCubeRed.dispose();
      matCubeCyan.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-40 dark:opacity-65 transition-opacity duration-500"
    />
  );
}

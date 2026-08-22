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
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Create 3D Editorial Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Ring 1: Primary Fine Vermilion Archival Torus
    const geoRing1 = new THREE.TorusGeometry(11, 0.04, 16, 120);
    const matRing1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const ring1 = new THREE.Mesh(geoRing1, matRing1);
    ring1.rotation.x = Math.PI / 4;
    sculptureGroup.add(ring1);

    // Ring 2: Secondary Minimal Monochromatic Inner Orbital Ring
    const geoRing2 = new THREE.TorusGeometry(8, 0.03, 16, 100);
    const matRing2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#888888"),
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const ring2 = new THREE.Mesh(geoRing2, matRing2);
    ring2.rotation.y = Math.PI / 3;
    sculptureGroup.add(ring2);

    // Ring 3: Concentric Delicate Ring
    const geoRing3 = new THREE.RingGeometry(4.5, 4.58, 64);
    const matRing3 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#D97706"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.1,
    });
    const ring3 = new THREE.Mesh(geoRing3, matRing3);
    sculptureGroup.add(ring3);

    // Position subtly in background
    sculptureGroup.position.set(18, -4, -12);

    // 4. Subtle Floating Editorial Data Cubes
    const cubesGroup = new THREE.Group();
    scene.add(cubesGroup);

    const cubeCount = 28;
    const cubeMeshes: THREE.Mesh[] = [];
    const geoCube = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const matCubeRed = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const matCubeMuted = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#777777"),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    for (let i = 0; i < cubeCount; i++) {
      const mesh = new THREE.Mesh(
        geoCube,
        i % 2 === 0 ? matCubeRed : matCubeMuted
      );
      mesh.position.set(
        (Math.random() - 0.5) * 65,
        (Math.random() - 0.5) * 40,
        -10 + (Math.random() - 0.5) * 18
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(Math.random() * 0.6 + 0.3);
      cubesGroup.add(mesh);
      cubeMeshes.push(mesh);
    }

    // 5. Ambient Atmospheric Dust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cRed = new THREE.Color("#DB4338");
    const cAmber = new THREE.Color("#D97706");
    const cMuted = new THREE.Color("#AAAAAA");

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePos[i3] = (Math.random() - 0.5) * 75;
      particlePos[i3 + 1] = (Math.random() - 0.5) * 50;
      particlePos[i3 + 2] = -10 + (Math.random() - 0.5) * 20;

      const randColor = i % 3 === 0 ? cRed : i % 3 === 1 ? cAmber : cMuted;
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
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Parallax Motion
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

      // Atmospheric rotation
      ring1.rotation.x = elapsedTime * 0.08;
      ring1.rotation.y = elapsedTime * 0.1;

      ring2.rotation.y = -elapsedTime * 0.12;
      ring2.rotation.z = elapsedTime * 0.06;

      ring3.rotation.z = elapsedTime * 0.05;

      cubeMeshes.forEach((cube, idx) => {
        cube.rotation.x += 0.003 * (idx % 2 === 0 ? 1 : -1);
        cube.rotation.y += 0.005 * (idx % 3 === 0 ? 1 : -1);
        cube.position.y += Math.sin(elapsedTime * 0.8 + idx) * 0.004;
      });

      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArr[i3 + 1] += 0.008;
        if (posArr[i3 + 1] > 25) posArr[i3 + 1] = -25;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Mouse Parallax
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      camera.position.x = mouseX * 1.8;
      camera.position.y = -mouseY * 1.8;
      camera.lookAt(0, 0, -8);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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
      matCubeMuted.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-30 dark:opacity-50 transition-opacity duration-500"
    />
  );
}

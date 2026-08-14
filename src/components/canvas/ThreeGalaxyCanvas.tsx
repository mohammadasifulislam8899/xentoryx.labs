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
    camera.position.z = 24;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color Palette
    const cRed = new THREE.Color("#DB4338");
    const cCyan = new THREE.Color("#00F2FE");

    // 3. Create Floating 3D Geometric Polyhedra (Tech Orbs & Wireframes)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Shape 1: Outer Wireframe Icosahedron
    const geoIco = new THREE.IcosahedronGeometry(7, 1);
    const matIco = new THREE.MeshBasicMaterial({
      color: cRed,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const meshIco = new THREE.Mesh(geoIco, matIco);
    meshIco.position.set(-13, 4, -4);
    shapesGroup.add(meshIco);

    // Shape 2: Inner Core Torus Ring
    const geoTorus = new THREE.TorusGeometry(9, 0.12, 16, 100);
    const matTorus = new THREE.MeshBasicMaterial({
      color: cCyan,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const meshTorus = new THREE.Mesh(geoTorus, matTorus);
    meshTorus.position.set(15, -6, -6);
    meshTorus.rotation.x = Math.PI / 3;
    shapesGroup.add(meshTorus);

    // 4. Create Dense Interactive 3D Neural Constellation Mesh Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    const nodeCount = 95;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const vels: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePos[i * 3] = (Math.random() - 0.5) * 45;
      nodePos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      nodePos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vels.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.55,
      color: cRed,
      transparent: true,
      opacity: 0.95,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    meshGroup.add(nodePoints);

    // Red Laser Neural Lines
    const maxConn = 700;
    const redLinePos = new Float32Array(maxConn * 6);
    const redLineGeo = new THREE.BufferGeometry();
    redLineGeo.setAttribute("position", new THREE.BufferAttribute(redLinePos, 3));
    const redLineMat = new THREE.LineBasicMaterial({
      color: cRed,
      transparent: true,
      opacity: 0.85,
    });
    const redLines = new THREE.LineSegments(redLineGeo, redLineMat);
    meshGroup.add(redLines);

    // Cyan Cyber Neural Lines
    const cyanLinePos = new Float32Array(maxConn * 6);
    const cyanLineGeo = new THREE.BufferGeometry();
    cyanLineGeo.setAttribute("position", new THREE.BufferAttribute(cyanLinePos, 3));
    const cyanLineMat = new THREE.LineBasicMaterial({
      color: cCyan,
      transparent: true,
      opacity: 0.8,
    });
    const cyanLines = new THREE.LineSegments(cyanLineGeo, cyanLineMat);
    meshGroup.add(cyanLines);

    // 5. Mouse Parallax & Interactions
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

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      // Rotate 3D wireframe polyhedra & neural mesh
      meshIco.rotation.x = t * 0.15;
      meshIco.rotation.y = t * 0.2;
      meshTorus.rotation.z = t * 0.1;
      meshTorus.rotation.y = t * 0.15;
      meshGroup.rotation.y = t * 0.03;

      // Update node positions inside 3D volume
      const posArr = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posArr[i3] += vels[i].x;
        posArr[i3 + 1] += vels[i].y;
        posArr[i3 + 2] += vels[i].z;
        if (Math.abs(posArr[i3]) > 24) vels[i].x *= -1;
        if (Math.abs(posArr[i3 + 1]) > 16) vels[i].y *= -1;
        if (Math.abs(posArr[i3 + 2]) > 11) vels[i].z *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Calculate 3D Laser Mesh Lines
      let redIdx = 0;
      let cyanIdx = 0;
      let redConns = 0;
      let cyanConns = 0;
      const connectDist = 18;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = posArr[i3] - posArr[j3];
          const dy = posArr[i3 + 1] - posArr[j3 + 1];
          const dz = posArr[i3 + 2] - posArr[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectDist) {
            if (i % 2 === 0 && redConns < maxConn) {
              redLinePos[redIdx++] = posArr[i3];
              redLinePos[redIdx++] = posArr[i3 + 1];
              redLinePos[redIdx++] = posArr[i3 + 2];
              redLinePos[redIdx++] = posArr[j3];
              redLinePos[redIdx++] = posArr[j3 + 1];
              redLinePos[redIdx++] = posArr[j3 + 2];
              redConns++;
            } else if (cyanConns < maxConn) {
              cyanLinePos[cyanIdx++] = posArr[i3];
              cyanLinePos[cyanIdx++] = posArr[i3 + 1];
              cyanLinePos[cyanIdx++] = posArr[i3 + 2];
              cyanLinePos[cyanIdx++] = posArr[j3];
              cyanLinePos[cyanIdx++] = posArr[j3 + 1];
              cyanLinePos[cyanIdx++] = posArr[j3 + 2];
              cyanConns++;
            }
          }
        }
      }

      redLineGeo.setDrawRange(0, redConns * 2);
      redLineGeo.attributes.position.needsUpdate = true;

      cyanLineGeo.setDrawRange(0, cyanConns * 2);
      cyanLineGeo.attributes.position.needsUpdate = true;

      // Smooth Mouse Parallax Reaction
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 4;
      camera.position.y = -mouseY * 4;
      camera.lookAt(0, 0, 0);

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
      geoIco.dispose();
      matIco.dispose();
      geoTorus.dispose();
      matTorus.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      redLineGeo.dispose();
      redLineMat.dispose();
      cyanLineGeo.dispose();
      cyanLineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-100 transition-opacity duration-500"
    />
  );
}

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
    camera.position.z = 30;

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
    const geoIco = new THREE.IcosahedronGeometry(6, 1);
    const matIco = new THREE.MeshBasicMaterial({
      color: cRed,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const meshIco = new THREE.Mesh(geoIco, matIco);
    meshIco.position.set(-12, 4, -5);
    shapesGroup.add(meshIco);

    // Shape 2: Inner Core Torus Ring
    const geoTorus = new THREE.TorusGeometry(8, 0.08, 16, 100);
    const matTorus = new THREE.MeshBasicMaterial({
      color: cCyan,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const meshTorus = new THREE.Mesh(geoTorus, matTorus);
    meshTorus.position.set(14, -6, -8);
    meshTorus.rotation.x = Math.PI / 3;
    shapesGroup.add(meshTorus);

    // 4. Create Interactive 3D Neural Constellation Nodes & Mesh
    const nodeCount = 100;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const vels: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodePos[i * 3] = (Math.random() - 0.5) * 55;
      nodePos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      nodePos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      vels.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.35,
      color: cRed,
      transparent: true,
      opacity: 0.75,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // Dynamic Connecting Lines
    const maxConn = 200;
    const linePos = new Float32Array(maxConn * 6);
    const lineCols = new Float32Array(maxConn * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCols, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

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

      // Rotate 3D wireframe polyhedra
      meshIco.rotation.x = t * 0.15;
      meshIco.rotation.y = t * 0.2;
      meshTorus.rotation.z = t * 0.1;

      // Update node positions inside 3D volume
      const posArr = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posArr[i3] += vels[i].x;
        posArr[i3 + 1] += vels[i].y;
        posArr[i3 + 2] += vels[i].z;
        if (Math.abs(posArr[i3]) > 28) vels[i].x *= -1;
        if (Math.abs(posArr[i3 + 1]) > 18) vels[i].y *= -1;
        if (Math.abs(posArr[i3 + 2]) > 13) vels[i].z *= -1;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update distance-based laser connections
      let vIdx = 0;
      let cIdx = 0;
      let conns = 0;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (conns >= maxConn) break;
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = posArr[i3] - posArr[j3];
          const dy = posArr[i3 + 1] - posArr[j3 + 1];
          const dz = posArr[i3 + 2] - posArr[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 10) {
            linePos[vIdx++] = posArr[i3];
            linePos[vIdx++] = posArr[i3 + 1];
            linePos[vIdx++] = posArr[i3 + 2];
            linePos[vIdx++] = posArr[j3];
            linePos[vIdx++] = posArr[j3 + 1];
            linePos[vIdx++] = posArr[j3 + 2];

            const a = 1 - dist / 10;
            const col = i % 2 === 0 ? cRed : cCyan;
            lineCols[cIdx++] = col.r * a;
            lineCols[cIdx++] = col.g * a;
            lineCols[cIdx++] = col.b * a;
            lineCols[cIdx++] = col.r * a;
            lineCols[cIdx++] = col.g * a;
            lineCols[cIdx++] = col.b * a;
            conns++;
          }
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

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
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75 dark:opacity-85 transition-opacity duration-500"
    />
  );
}

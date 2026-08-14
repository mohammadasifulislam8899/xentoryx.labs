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

    // 3. Create Floating 3D Geometric Polyhedra (Tech Orbs & Wireframes)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Shape 1: Outer Wireframe Icosahedron
    const geoIco = new THREE.IcosahedronGeometry(6, 1);
    const matIco = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const meshIco = new THREE.Mesh(geoIco, matIco);
    meshIco.position.set(-12, 4, -5);
    shapesGroup.add(meshIco);

    // Shape 2: Inner Core Ring
    const geoTorus = new THREE.TorusGeometry(8, 0.08, 16, 100);
    const matTorus = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00F2FE"),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const meshTorus = new THREE.Mesh(geoTorus, matTorus);
    meshTorus.position.set(14, -6, -8);
    meshTorus.rotation.x = Math.PI / 3;
    shapesGroup.add(meshTorus);

    // 4. Create Interactive 3D Neural Constellation Nodes & Mesh
    const nodeCount = 120;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      nodePositions[i3] = (Math.random() - 0.5) * 60;
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 40;
      nodePositions[i3 + 2] = (Math.random() - 0.5) * 30;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.35,
      color: new THREE.Color("#DB4338"),
      transparent: true,
      opacity: 0.7,
    });

    const nodesPoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodesPoints);

    // Dynamic Connecting Lines LinesGeometry
    const maxConnections = 250;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

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
      const elapsedTime = clock.getElapsedTime();

      // Rotate geometric shapes slowly
      meshIco.rotation.x = elapsedTime * 0.15;
      meshIco.rotation.y = elapsedTime * 0.2;
      meshTorus.rotation.z = elapsedTime * 0.1;
      meshTorus.rotation.y = elapsedTime * 0.15;

      // Update Node positions & bounds checking
      const posArr = nodeGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posArr[i3] += nodeVelocities[i].x;
        posArr[i3 + 1] += nodeVelocities[i].y;
        posArr[i3 + 2] += nodeVelocities[i].z;

        // Bounce back inside 3D volume
        if (Math.abs(posArr[i3]) > 30) nodeVelocities[i].x *= -1;
        if (Math.abs(posArr[i3 + 1]) > 20) nodeVelocities[i].y *= -1;
        if (Math.abs(posArr[i3 + 2]) > 15) nodeVelocities[i].z *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Update Connecting Neural Lines
      let vertexIdx = 0;
      let colorIdx = 0;
      let connections = 0;

      const cRed = new THREE.Color("#DB4338");
      const cCyan = new THREE.Color("#00F2FE");

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (connections >= maxConnections) break;

          const i3 = i * 3;
          const j3 = j * 3;

          const dx = posArr[i3] - posArr[j3];
          const dy = posArr[i3 + 1] - posArr[j3 + 1];
          const dz = posArr[i3 + 2] - posArr[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 10) {
            // Line Segment Position
            linePositions[vertexIdx++] = posArr[i3];
            linePositions[vertexIdx++] = posArr[i3 + 1];
            linePositions[vertexIdx++] = posArr[i3 + 2];

            linePositions[vertexIdx++] = posArr[j3];
            linePositions[vertexIdx++] = posArr[j3 + 1];
            linePositions[vertexIdx++] = posArr[j3 + 2];

            // Distance-based color gradient
            const alpha = 1 - dist / 10;
            const mixColor = i % 2 === 0 ? cRed : cCyan;

            lineColors[colorIdx++] = mixColor.r * alpha;
            lineColors[colorIdx++] = mixColor.g * alpha;
            lineColors[colorIdx++] = mixColor.b * alpha;

            lineColors[colorIdx++] = mixColor.r * alpha;
            lineColors[colorIdx++] = mixColor.g * alpha;
            lineColors[colorIdx++] = mixColor.b * alpha;

            connections++;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // Smooth Mouse Parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 3;
      camera.position.y = -mouseY * 3;
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
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70 dark:opacity-85 transition-opacity duration-500"
    />
  );
}

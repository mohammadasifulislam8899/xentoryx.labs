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
    camera.position.z = 40;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Create Floating 3D Geometric Polyhedra (Pushed far to screen margins)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Shape 1: Outer Wireframe Icosahedron (Far Left Margin)
    const geoIco = new THREE.IcosahedronGeometry(4.5, 1);
    const matIco = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#DB4338"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const meshIco = new THREE.Mesh(geoIco, matIco);
    meshIco.position.set(-25, 8, -15);
    shapesGroup.add(meshIco);

    // Shape 2: Inner Core Ring (Far Right Margin)
    const geoTorus = new THREE.TorusGeometry(5.5, 0.06, 16, 100);
    const matTorus = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00F2FE"),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const meshTorus = new THREE.Mesh(geoTorus, matTorus);
    meshTorus.position.set(25, -10, -15);
    meshTorus.rotation.x = Math.PI / 3;
    shapesGroup.add(meshTorus);

    // 4. Create Subdued Background 3D Neural Constellation Nodes & Mesh
    const nodeCount = 95;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      nodePositions[i3] = (Math.random() - 0.5) * 75;
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 50;
      nodePositions[i3 + 2] = -15 + (Math.random() - 0.5) * 20; // Pushed deep into the background

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.22,
      color: new THREE.Color("#DB4338"),
      transparent: true,
      opacity: 0.5,
    });

    const nodesPoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodesPoints);

    // Dynamic Connecting Lines
    const maxConnections = 160;
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
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 5. Mouse Parallax Reaction
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

      // Rotate geometric shapes slowly in the far margins
      meshIco.rotation.x = elapsedTime * 0.1;
      meshIco.rotation.y = elapsedTime * 0.12;
      meshTorus.rotation.z = elapsedTime * 0.08;
      meshTorus.rotation.y = elapsedTime * 0.1;

      // Update Node positions & bounds checking
      const posArr = nodeGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const i3 = i * 3;
        posArr[i3] += nodeVelocities[i].x;
        posArr[i3 + 1] += nodeVelocities[i].y;
        posArr[i3 + 2] += nodeVelocities[i].z;

        // Bounce back inside 3D volume
        if (Math.abs(posArr[i3]) > 40) nodeVelocities[i].x *= -1;
        if (Math.abs(posArr[i3 + 1]) > 25) nodeVelocities[i].y *= -1;
        if (posArr[i3 + 2] > -5 || posArr[i3 + 2] < -30) nodeVelocities[i].z *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Update Connecting Lines
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

          if (dist < 12) {
            linePositions[vertexIdx++] = posArr[i3];
            linePositions[vertexIdx++] = posArr[i3 + 1];
            linePositions[vertexIdx++] = posArr[i3 + 2];

            linePositions[vertexIdx++] = posArr[j3];
            linePositions[vertexIdx++] = posArr[j3 + 1];
            linePositions[vertexIdx++] = posArr[j3 + 2];

            const alpha = (1 - dist / 12) * 0.7;
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

      // Subtle Mouse Parallax
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      camera.position.x = mouseX * 2;
      camera.position.y = -mouseY * 2;
      camera.lookAt(0, 0, -15);

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
      className="fixed inset-0 pointer-events-none -z-10 opacity-40 dark:opacity-60 transition-opacity duration-500"
    />
  );
}

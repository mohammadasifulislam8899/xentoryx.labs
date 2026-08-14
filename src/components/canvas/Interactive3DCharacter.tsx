"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Interactive3DCharacter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Initial camera close-up on head
    camera.position.set(0, 0.9, 4.8);
    camera.lookAt(0, 0.6, 0);

    // 2. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. LIGHTS & AMBIENT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(3, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Purple Rim Light (Matching Video Screen 1 & 2)
    const purpleRimLight = new THREE.PointLight(0xa855f7, 4.5, 15);
    purpleRimLight.position.set(-3.5, 2.5, -1.5);
    scene.add(purpleRimLight);

    // Red Rim Light (Xentoryx Brand Glow)
    const redRimLight = new THREE.PointLight(0xdb4338, 3.5, 15);
    redRimLight.position.set(3.5, 1.5, -1.5);
    scene.add(redRimLight);

    // Floating Glowing Orb (Video element)
    const orbGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(-1.8, 1.6, 0.5);
    scene.add(orbMesh);

    const orbLight = new THREE.PointLight(0xc084fc, 2, 6);
    orbMesh.add(orbLight);

    // 4. MATERIALS SETUP
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.35,
      metalness: 0.05,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.5,
      metalness: 0.2,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });

    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      roughness: 0.2,
    });

    const eyelidMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      roughness: 0.4,
    });

    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1,
    });

    const metalLegMaterial = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.3,
      metalness: 0.8,
    });

    const monitorBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
    });

    const monitorScreenMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xdb4338,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    // 5. CREATE 3D CHARACTER HIERARCHY
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const characterGroup = new THREE.Group();
    rootGroup.add(characterGroup);

    // Initial Y offset for entrance animation (raising head up)
    characterGroup.position.y = -2.5;

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    characterGroup.add(headGroup);

    // Head Base
    const headGeo = new THREE.SphereGeometry(0.55, 32, 32);
    headGeo.scale(0.9, 1.05, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Hair Top
    const hairGeo = new THREE.SphereGeometry(0.57, 32, 32);
    hairGeo.scale(0.92, 0.65, 0.96);
    const hairMesh = new THREE.Mesh(hairGeo, hairMaterial);
    hairMesh.position.set(0, 0.28, -0.02);
    headGroup.add(hairMesh);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.07, 0.18, 16);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.rotation.x = -Math.PI * 0.45;
    noseMesh.position.set(0, 0.02, 0.52);
    headGroup.add(noseMesh);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.12, 16, 16);
    earGeo.scale(0.5, 1.2, 0.8);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.52, 0.05, -0.05);
    const rightEar = leftEar.clone();
    rightEar.position.x = 0.52;
    headGroup.add(leftEar);
    headGroup.add(rightEar);

    // EYES & PUPILS
    const eyeSocketGeo = new THREE.SphereGeometry(0.12, 24, 24);
    eyeSocketGeo.scale(1.2, 0.65, 0.5);

    // Left Eye Socket
    const leftEyeSocket = new THREE.Mesh(eyeSocketGeo, eyeWhiteMaterial);
    leftEyeSocket.position.set(-0.2, 0.12, 0.44);
    headGroup.add(leftEyeSocket);

    // Right Eye Socket
    const rightEyeSocket = new THREE.Mesh(eyeSocketGeo, eyeWhiteMaterial);
    rightEyeSocket.position.set(0.2, 0.12, 0.44);
    headGroup.add(rightEyeSocket);

    // Pupils
    const pupilGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.2, 0.12, 0.49);
    headGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0.2, 0.12, 0.49);
    headGroup.add(rightPupil);

    // Upper Eyelids (for blinking & initial eye opening animation)
    const eyelidGeo = new THREE.SphereGeometry(0.13, 24, 24);
    eyelidGeo.scale(1.25, 0.7, 0.52);

    const leftEyelid = new THREE.Mesh(eyelidGeo, eyelidMaterial);
    leftEyelid.position.set(-0.2, 0.18, 0.45);
    leftEyelid.scale.y = 0.01; // Closed initially
    headGroup.add(leftEyelid);

    const rightEyelid = new THREE.Mesh(eyelidGeo, eyelidMaterial);
    rightEyelid.position.set(0.2, 0.18, 0.45);
    rightEyelid.scale.y = 0.01; // Closed initially
    headGroup.add(rightEyelid);

    // Eyebrows
    const eyebrowGeo = new THREE.BoxGeometry(0.18, 0.03, 0.04);
    const leftEyebrow = new THREE.Mesh(eyebrowGeo, hairMaterial);
    leftEyebrow.position.set(-0.2, 0.25, 0.48);
    leftEyebrow.rotation.z = 0.08;
    headGroup.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeo, hairMaterial);
    rightEyebrow.position.set(0.2, 0.25, 0.48);
    rightEyebrow.rotation.z = -0.08;
    headGroup.add(rightEyebrow);

    // --- NECK & TORSO ---
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.3, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, 0.65, 0);
    characterGroup.add(neckMesh);

    // Torso / Shirt
    const torsoGeo = new THREE.CylinderGeometry(0.42, 0.5, 1.2, 24);
    torsoGeo.scale(1.1, 1, 0.75);
    const torsoMesh = new THREE.Mesh(torsoGeo, skinMaterial);
    torsoMesh.position.set(0, 0.0, 0);
    torsoMesh.castShadow = true;
    characterGroup.add(torsoMesh);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.8, 16);

    const leftArm = new THREE.Mesh(armGeo, skinMaterial);
    leftArm.position.set(-0.52, -0.05, 0.1);
    leftArm.rotation.z = 0.2;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, skinMaterial);
    rightArm.position.set(0.52, -0.05, 0.1);
    rightArm.rotation.z = -0.2;
    characterGroup.add(rightArm);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.52, -0.48, 0.2);
    characterGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.52, -0.48, 0.2);
    characterGroup.add(rightHand);

    // Legs (For sitting at desk posture)
    const legGeo = new THREE.CylinderGeometry(0.16, 0.14, 1.1, 16);
    const leftLeg = new THREE.Mesh(legGeo, skinMaterial);
    leftLeg.position.set(-0.24, -1.0, 0.3);
    leftLeg.rotation.x = Math.PI * 0.45;
    characterGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, skinMaterial);
    rightLeg.position.set(0.24, -1.0, 0.3);
    rightLeg.rotation.x = Math.PI * 0.45;
    characterGroup.add(rightLeg);

    // --- WORKSTATION DESK SETUP GROUP (Revealed on Scroll) ---
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, -0.4, 0.6);
    deskGroup.scale.set(0, 0, 0); // Initially hidden (scales up on scroll)
    rootGroup.add(deskGroup);

    // Desk Surface Top
    const deskTopGeo = new THREE.BoxGeometry(2.4, 0.08, 1.3);
    const deskTopMesh = new THREE.Mesh(deskTopGeo, deskMaterial);
    deskTopMesh.position.set(0, 0, 0);
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    // Desk Legs
    const legTopGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 16);
    const leg1 = new THREE.Mesh(legTopGeo, metalLegMaterial);
    leg1.position.set(-1.1, -0.6, -0.55);
    const leg2 = leg1.clone();
    leg2.position.set(1.1, -0.6, -0.55);
    const leg3 = leg1.clone();
    leg3.position.set(-1.1, -0.6, 0.55);
    const leg4 = leg1.clone();
    leg4.position.set(1.1, -0.6, 0.55);
    deskGroup.add(leg1, leg2, leg3, leg4);

    // Chair
    const chairGroup = new THREE.Group();
    chairGroup.position.set(0, -0.5, -0.6);
    deskGroup.add(chairGroup);

    const chairSeatGeo = new THREE.BoxGeometry(0.8, 0.08, 0.8);
    const chairSeat = new THREE.Mesh(chairSeatGeo, deskMaterial);
    chairGroup.add(chairSeat);

    const chairBackGeo = new THREE.BoxGeometry(0.8, 0.9, 0.08);
    const chairBack = new THREE.Mesh(chairBackGeo, deskMaterial);
    chairBack.position.set(0, 0.45, -0.38);
    chairGroup.add(chairBack);

    // Computer Monitor
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0.55, -0.2);
    deskGroup.add(monitorGroup);

    // Monitor Stand
    const standGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const standMesh = new THREE.Mesh(standGeo, metalLegMaterial);
    standMesh.position.set(0, -0.2, 0);
    monitorGroup.add(standMesh);

    const baseGeo = new THREE.BoxGeometry(0.4, 0.03, 0.3);
    const baseMesh = new THREE.Mesh(baseGeo, metalLegMaterial);
    baseMesh.position.set(0, -0.38, 0);
    monitorGroup.add(baseMesh);

    // Monitor Bezel & Screen
    const monitorBezelGeo = new THREE.BoxGeometry(1.4, 0.9, 0.06);
    const monitorBezel = new THREE.Mesh(monitorBezelGeo, monitorBodyMat);
    monitorGroup.add(monitorBezel);

    const monitorScreenGeo = new THREE.PlaneGeometry(1.32, 0.82);
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.set(0, 0, 0.035);
    monitorGroup.add(monitorScreen);

    // Keyboard
    const keyboardGeo = new THREE.BoxGeometry(0.7, 0.03, 0.25);
    const keyboardMesh = new THREE.Mesh(keyboardGeo, monitorBodyMat);
    keyboardMesh.position.set(0, 0.05, 0.25);
    deskGroup.add(keyboardMesh);

    // 6. ANIMATION & INTERACTIVE LOGIC
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let eyeOpeningProgress = 0; // 0 -> 1

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      targetMouseX = (relativeX / rect.width - 0.5) * 2;
      targetMouseY = (relativeY / rect.height - 0.5) * 2;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const heroHeight = window.innerHeight * 0.8;
      const progress = Math.min(1, Math.max(0, currentScroll / heroHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 7. RENDER LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Entrance animation: Raise head up & open eyes
      if (characterGroup.position.y < 0) {
        characterGroup.position.y += (0 - characterGroup.position.y) * 0.06;
      }

      if (eyeOpeningProgress < 1) {
        eyeOpeningProgress += 0.02;
        const eyelidScale = Math.min(1, Math.max(0.01, 1 - eyeOpeningProgress));
        leftEyelid.scale.y = eyelidScale;
        rightEyelid.scale.y = eyelidScale;
      }

      // Natural subtle eye blinking every ~4 seconds
      const blinkCycle = Math.sin(elapsedTime * 1.5);
      if (blinkCycle > 0.98 && eyeOpeningProgress >= 1) {
        leftEyelid.scale.y = 0.8;
        rightEyelid.scale.y = 0.8;
      } else if (eyeOpeningProgress >= 1) {
        leftEyelid.scale.y = 0.05;
        rightEyelid.scale.y = 0.05;
      }

      // Floating Orb Rotation
      orbMesh.position.x = -1.8 + Math.cos(elapsedTime * 1.2) * 0.3;
      orbMesh.position.y = 1.6 + Math.sin(elapsedTime * 1.5) * 0.2;

      // Mouse Lerp Smooth Movement
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Scroll Progress Transformation Interpolation
      const currentProgress = (window.scrollY / (window.innerHeight * 0.85));
      const p = Math.min(1, Math.max(0, currentProgress));

      // 1. Camera Transformation (From Close-up Head shot to 3/4 Desk Perspective View)
      camera.position.x = THREE.MathUtils.lerp(0, 3.4, p);
      camera.position.y = THREE.MathUtils.lerp(0.9, 2.2, p);
      camera.position.z = THREE.MathUtils.lerp(4.8, 6.2, p);

      const lookTargetY = THREE.MathUtils.lerp(0.6, 0.8, p);
      const lookTargetZ = THREE.MathUtils.lerp(0, 0.4, p);
      camera.lookAt(0, lookTargetY, lookTargetZ);

      // 2. Desk & Setup Reveal (Scale & Fade In)
      const deskScale = THREE.MathUtils.lerp(0, 1, Math.min(1, p * 1.8));
      deskGroup.scale.set(deskScale, deskScale, deskScale);

      // 3. Head Mouse Tracking (Hero mode) vs Looking at Monitor Screen (Desk Typing Mode)
      if (p < 0.2) {
        // Hero Mode: Head tracks mouse cursor in real-time!
        headGroup.rotation.y = mouseX * 0.5;
        headGroup.rotation.x = mouseY * 0.3;

        // Pupils shift vector inside eye sockets
        leftPupil.position.x = -0.2 + mouseX * 0.04;
        leftPupil.position.y = 0.12 - mouseY * 0.04;
        rightPupil.position.x = 0.2 + mouseX * 0.04;
        rightPupil.position.y = 0.12 - mouseY * 0.04;
      } else {
        // Desk Typing Mode: Character turns head toward computer screen!
        const deskHeadRotY = THREE.MathUtils.lerp(mouseX * 0.5, -0.6, (p - 0.2) * 1.25);
        const deskHeadRotX = THREE.MathUtils.lerp(mouseY * 0.3, 0.15, (p - 0.2) * 1.25);
        headGroup.rotation.y = deskHeadRotY;
        headGroup.rotation.x = deskHeadRotX;

        // Hands typing on keyboard animation
        const typingL = Math.sin(elapsedTime * 12) * 0.03;
        const typingR = Math.cos(elapsedTime * 12) * 0.03;
        leftHand.position.set(-0.25, -0.25 + typingL, 0.85);
        rightHand.position.set(0.15, -0.25 + typingR, 0.85);

        leftArm.rotation.x = THREE.MathUtils.lerp(0, 0.9, p);
        rightArm.rotation.x = THREE.MathUtils.lerp(0, 0.9, p);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. CLEANUP
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[420px] sm:min-h-[500px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}

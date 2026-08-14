"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Interactive3DCharacter() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    camera.position.set(0, 0.85, 4.6);
    camera.lookAt(0, 0.55, 0);

    // 2. RENDERER SETUP WITH HIGH QUALITY SHADOWS
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

    // 3. STUDIO LIGHTING (Warm Key + Soft Purple/Red Rim Lights for Pixar Aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Warm Front Studio Light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Soft Fill Light
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.6);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    // Vibrant Purple Back Rim Light
    const purpleRim = new THREE.PointLight(0xc084fc, 5.0, 12);
    purpleRim.position.set(-3.2, 2.2, -1.8);
    scene.add(purpleRim);

    // Warm Xentoryx Red Rim Light
    const redRim = new THREE.PointLight(0xff5e50, 4.2, 12);
    redRim.position.set(3.2, 1.8, -1.8);
    scene.add(redRim);

    // Cute Floating Glowing Light Orb
    const orbGeo = new THREE.SphereGeometry(0.14, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(-1.6, 1.4, 0.4);
    scene.add(orbMesh);

    const orbLight = new THREE.PointLight(0xf472b6, 3, 5);
    orbMesh.add(orbLight);

    // 4. CUTE PIXAR MATERIALS
    // Cute Warm Skin Material with Soft Cheek Tone
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffede8,
      roughness: 0.28,
      metalness: 0.02,
    });

    const cheekMaterial = new THREE.MeshStandardMaterial({
      color: 0xffa8b6,
      roughness: 0.4,
      transparent: true,
      opacity: 0.65,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.45,
      metalness: 0.15,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.05,
    });

    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x312e81,
      roughness: 0.1,
    });

    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.4,
    });

    const hoodieAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xdb4338,
      roughness: 0.3,
    });

    const deskMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.05,
    });

    const monitorBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
    });

    const monitorScreenMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0xdb4338,
      emissiveIntensity: 0.65,
    });

    // 5. BUILD CUTE 3D CHARACTER SCENE
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const characterGroup = new THREE.Group();
    rootGroup.add(characterGroup);

    // Initial entrance Offset
    characterGroup.position.y = -2.8;

    // --- CUTE HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    characterGroup.add(headGroup);

    // Cute Rounded Head
    const headGeo = new THREE.SphereGeometry(0.58, 36, 36);
    headGeo.scale(1.02, 1.08, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Cute Rosy Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.12, 16, 16);
    cheekGeo.scale(1.2, 0.6, 0.4);
    const leftCheek = new THREE.Mesh(cheekGeo, cheekMaterial);
    leftCheek.position.set(-0.32, -0.08, 0.48);
    leftCheek.rotation.z = -0.15;

    const rightCheek = new THREE.Mesh(cheekGeo, cheekMaterial);
    rightCheek.position.set(0.32, -0.08, 0.48);
    rightCheek.rotation.z = 0.15;

    headGroup.add(leftCheek, rightCheek);

    // Cute Stylized Hair Cap & Tuft
    const hairCapGeo = new THREE.SphereGeometry(0.6, 32, 32);
    hairCapGeo.scale(1.02, 0.72, 1.02);
    const hairCap = new THREE.Mesh(hairCapGeo, hairMaterial);
    hairCap.position.set(0, 0.28, -0.02);
    headGroup.add(hairCap);

    // Cute Front Hair Fringe Locks
    const tuftGeo = new THREE.SphereGeometry(0.18, 16, 16);
    tuftGeo.scale(1.4, 0.7, 0.8);
    const hairTuft1 = new THREE.Mesh(tuftGeo, hairMaterial);
    hairTuft1.position.set(-0.15, 0.52, 0.42);
    hairTuft1.rotation.z = -0.2;

    const hairTuft2 = new THREE.Mesh(tuftGeo, hairMaterial);
    hairTuft2.position.set(0.18, 0.54, 0.4);
    hairTuft2.rotation.z = 0.25;
    headGroup.add(hairTuft1, hairTuft2);

    // Cute Button Nose
    const noseGeo = new THREE.SphereGeometry(0.07, 16, 16);
    noseGeo.scale(1.0, 0.8, 0.9);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, 0.0, 0.55);
    headGroup.add(noseMesh);

    // Cute Soft Smile Mouth
    const mouthGeo = new THREE.TorusGeometry(0.08, 0.02, 16, 32, Math.PI * 0.8);
    const mouthMesh = new THREE.Mesh(mouthGeo, hairMaterial);
    mouthMesh.position.set(0, -0.18, 0.52);
    mouthMesh.rotation.x = Math.PI * 0.08;
    mouthMesh.rotation.z = Math.PI;
    headGroup.add(mouthMesh);

    // Cute Rounded Ears
    const earGeo = new THREE.SphereGeometry(0.14, 16, 16);
    earGeo.scale(0.55, 1.25, 0.85);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.58, 0.02, -0.04);
    const rightEar = leftEar.clone();
    rightEar.position.x = 0.58;
    headGroup.add(leftEar, rightEar);

    // CUTE LARGE EXPRESSIVE EYES
    const eyeSocketGeo = new THREE.SphereGeometry(0.14, 28, 28);
    eyeSocketGeo.scale(1.25, 0.9, 0.5);

    const leftEyeWhite = new THREE.Mesh(eyeSocketGeo, eyeWhiteMaterial);
    leftEyeWhite.position.set(-0.22, 0.12, 0.46);

    const rightEyeWhite = new THREE.Mesh(eyeSocketGeo, eyeWhiteMaterial);
    rightEyeWhite.position.set(0.22, 0.12, 0.46);

    headGroup.add(leftEyeWhite, rightEyeWhite);

    // Large Iris/Pupils
    const pupilGeo = new THREE.SphereGeometry(0.075, 20, 20);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.22, 0.12, 0.51);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0.22, 0.12, 0.51);

    // Glossy Catchlight Reflection Dots (Makes character super cute!)
    const highlightGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const leftHighlight = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    leftHighlight.position.set(-0.2, 0.15, 0.57);

    const rightHighlight = new THREE.Mesh(highlightGeo, eyeHighlightMaterial);
    rightHighlight.position.set(0.24, 0.15, 0.57);

    headGroup.add(leftPupil, rightPupil, leftHighlight, rightHighlight);

    // Cute Eyelids (For entrance opening & smooth blinking)
    const eyelidGeo = new THREE.SphereGeometry(0.15, 24, 24);
    eyelidGeo.scale(1.3, 0.95, 0.52);

    const leftEyelid = new THREE.Mesh(eyelidGeo, skinMaterial);
    leftEyelid.position.set(-0.22, 0.16, 0.47);
    leftEyelid.scale.y = 0.01; // Closed initially

    const rightEyelid = new THREE.Mesh(eyelidGeo, skinMaterial);
    rightEyelid.position.set(0.22, 0.16, 0.47);
    rightEyelid.scale.y = 0.01; // Closed initially

    headGroup.add(leftEyelid, rightEyelid);

    // Cute Friendly Eyebrows
    const eyebrowGeo = new THREE.BoxGeometry(0.18, 0.035, 0.04);
    const leftEyebrow = new THREE.Mesh(eyebrowGeo, hairMaterial);
    leftEyebrow.position.set(-0.22, 0.28, 0.5);
    leftEyebrow.rotation.z = 0.1;

    const rightEyebrow = new THREE.Mesh(eyebrowGeo, hairMaterial);
    rightEyebrow.position.set(0.22, 0.28, 0.5);
    rightEyebrow.rotation.z = -0.1;

    headGroup.add(leftEyebrow, rightEyebrow);

    // --- CUTE HOODIE TORSO & ARMS ---
    const neckGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.25, 16);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, 0.62, 0);
    characterGroup.add(neckMesh);

    // Cute Hoodie Body
    const bodyGeo = new THREE.CylinderGeometry(0.44, 0.52, 1.15, 24);
    bodyGeo.scale(1.1, 1, 0.8);
    const bodyMesh = new THREE.Mesh(bodyGeo, hoodieMaterial);
    bodyMesh.position.set(0, 0.0, 0);
    bodyMesh.castShadow = true;
    characterGroup.add(bodyMesh);

    // Hoodie Collar Accent (Xentoryx Red)
    const collarGeo = new THREE.TorusGeometry(0.22, 0.04, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, hoodieAccentMaterial);
    collarMesh.rotation.x = Math.PI * 0.45;
    collarMesh.position.set(0, 0.52, 0.05);
    characterGroup.add(collarMesh);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.8, 16);

    const leftArm = new THREE.Mesh(armGeo, hoodieMaterial);
    leftArm.position.set(-0.54, -0.05, 0.08);
    leftArm.rotation.z = 0.22;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, hoodieMaterial);
    rightArm.position.set(0.54, -0.05, 0.08);
    rightArm.rotation.z = -0.22;
    characterGroup.add(rightArm);

    // Cute Hands
    const handGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(-0.54, -0.48, 0.18);
    characterGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(0.54, -0.48, 0.18);
    characterGroup.add(rightHand);

    // --- WORKSTATION DESK SETUP (Revealed on Scroll) ---
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, -0.42, 0.65);
    deskGroup.scale.set(0, 0, 0);
    rootGroup.add(deskGroup);

    // Desk Top
    const deskTopGeo = new THREE.BoxGeometry(2.5, 0.08, 1.35);
    const deskTopMesh = new THREE.Mesh(deskTopGeo, deskMaterial);
    deskTopMesh.receiveShadow = true;
    deskGroup.add(deskTopMesh);

    // Computer Monitor
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0.58, -0.22);
    deskGroup.add(monitorGroup);

    const standGeo = new THREE.BoxGeometry(0.08, 0.42, 0.08);
    const standMesh = new THREE.Mesh(standGeo, monitorBodyMat);
    standMesh.position.set(0, -0.2, 0);
    monitorGroup.add(standMesh);

    const monitorBezelGeo = new THREE.BoxGeometry(1.45, 0.92, 0.06);
    const monitorBezel = new THREE.Mesh(monitorBezelGeo, monitorBodyMat);
    monitorGroup.add(monitorBezel);

    const monitorScreenGeo = new THREE.PlaneGeometry(1.36, 0.84);
    const monitorScreen = new THREE.Mesh(monitorScreenGeo, monitorScreenMat);
    monitorScreen.position.set(0, 0, 0.035);
    monitorGroup.add(monitorScreen);

    // Keyboard
    const keyboardGeo = new THREE.BoxGeometry(0.72, 0.035, 0.26);
    const keyboardMesh = new THREE.Mesh(keyboardGeo, monitorBodyMat);
    keyboardMesh.position.set(0, 0.05, 0.25);
    deskGroup.add(keyboardMesh);

    // 6. ANIMATION & INTERACTIVITY LOGIC
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let eyeOpeningProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      targetMouseX = (relativeX / rect.width - 0.5) * 2;
      targetMouseY = (relativeY / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 7. RENDER LOOP WITH CUTE ANIMATIONS
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Entrance animation: Raise head smoothly up & open eyes
      if (characterGroup.position.y < 0) {
        characterGroup.position.y += (0 - characterGroup.position.y) * 0.07;
      }

      if (eyeOpeningProgress < 1) {
        eyeOpeningProgress += 0.025;
        const eyelidScale = Math.min(1, Math.max(0.01, 1 - eyeOpeningProgress));
        leftEyelid.scale.y = eyelidScale;
        rightEyelid.scale.y = eyelidScale;
      }

      // Cute Natural Eye Blinking
      const blinkCycle = Math.sin(elapsedTime * 1.6);
      if (blinkCycle > 0.97 && eyeOpeningProgress >= 1) {
        leftEyelid.scale.y = 0.85;
        rightEyelid.scale.y = 0.85;
      } else if (eyeOpeningProgress >= 1) {
        leftEyelid.scale.y = 0.05;
        rightEyelid.scale.y = 0.05;
      }

      // Cute Floating Orb Motion
      orbMesh.position.x = -1.6 + Math.cos(elapsedTime * 1.4) * 0.25;
      orbMesh.position.y = 1.4 + Math.sin(elapsedTime * 1.6) * 0.18;

      // Cute Head Bobbing Idle Motion
      const idleBob = Math.sin(elapsedTime * 2.0) * 0.02;

      // Mouse Movements Lerp Smoothness
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Scroll Progress Transformation
      const currentScroll = window.scrollY;
      const p = Math.min(1, Math.max(0, currentScroll / (window.innerHeight * 0.85)));

      // Camera Morph (Close-up Head -> 3/4 Desk Perspective View)
      camera.position.x = THREE.MathUtils.lerp(0, 3.2, p);
      camera.position.y = THREE.MathUtils.lerp(0.85, 2.1, p);
      camera.position.z = THREE.MathUtils.lerp(4.6, 6.0, p);

      const lookTargetY = THREE.MathUtils.lerp(0.55, 0.75, p);
      camera.lookAt(0, lookTargetY, 0);

      // Desk Reveal
      const deskScale = THREE.MathUtils.lerp(0, 1, Math.min(1, p * 1.8));
      deskGroup.scale.set(deskScale, deskScale, deskScale);

      // Hero Mode (Head tracks mouse) vs Desk Mode (Turns to computer screen & types)
      if (p < 0.2) {
        headGroup.rotation.y = mouseX * 0.45;
        headGroup.rotation.x = mouseY * 0.25 + idleBob;

        // Pupils & Catchlight tracking
        const pX = mouseX * 0.045;
        const pY = -mouseY * 0.04;
        leftPupil.position.x = -0.22 + pX;
        leftPupil.position.y = 0.12 + pY;
        rightPupil.position.x = 0.22 + pX;
        rightPupil.position.y = 0.12 + pY;

        leftHighlight.position.x = -0.2 + pX;
        leftHighlight.position.y = 0.15 + pY;
        rightHighlight.position.x = 0.24 + pX;
        rightHighlight.position.y = 0.15 + pY;
      } else {
        const deskHeadRotY = THREE.MathUtils.lerp(mouseX * 0.45, -0.58, (p - 0.2) * 1.25);
        const deskHeadRotX = THREE.MathUtils.lerp(mouseY * 0.25, 0.12, (p - 0.2) * 1.25);
        headGroup.rotation.y = deskHeadRotY;
        headGroup.rotation.x = deskHeadRotX;

        // Cute Hands Keyboard Typing Motion
        const typingL = Math.sin(elapsedTime * 14) * 0.025;
        const typingR = Math.cos(elapsedTime * 14) * 0.025;
        leftHand.position.set(-0.24, -0.25 + typingL, 0.85);
        rightHand.position.set(0.16, -0.25 + typingR, 0.85);

        leftArm.rotation.x = THREE.MathUtils.lerp(0, 0.88, p);
        rightArm.rotation.x = THREE.MathUtils.lerp(0, 0.88, p);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. CLEANUP
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="w-full h-full min-h-[440px] sm:min-h-[500px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BuilderDnaHelix3DProps {
  activeMode?: number; // 0: Full-Stack, 1: AI & FinTech, 2: Shipped Code
  className?: string;
}

const vertexShader = `
attribute float aType; // 0.0: Strand A, 1.0: Strand B, 2.0: Rung, 3.0: Ambient
attribute float aSeed;
attribute vec3 aBaseColor;

uniform float uTime;
uniform float uMode;
uniform float uPulse;
uniform vec2 uPointer;
uniform float uHover;
uniform float uDpr;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;

  // Mode influences:
  // Mode 0: Structural, steady speed
  // Mode 1: Energetic neural pulse traveling up/down
  // Mode 2: High velocity stable rotation
  float speedMultiplier = 1.0 + smoothstep(1.5, 2.0, uMode) * 0.8;
  float rotAngle = uTime * 0.85 * speedMultiplier;

  // 3D Rotation along vertical Y axis
  mat2 rotXZ = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle));
  p.xz = rotXZ * p.xz;

  // Harmonic serpentine wave undulation
  float wave = sin(uTime * 2.2 + p.y * 3.0 + aSeed * 3.1415);
  float wave2 = cos(uTime * 1.8 + p.y * 2.4);
  p.x += wave * 0.06;
  p.z += wave2 * 0.06;

  // Traveling electric pulse (representing AI / API transactions)
  float pulseSpeed = mix(2.4, 4.0, clamp(uMode, 0.0, 1.0));
  float pulseY = sin(uTime * pulseSpeed) * 2.1;
  float pulseDist = abs(p.y - pulseY);
  float pulseGlow = exp(-pulseDist * 3.6);

  // Pulse expands the helix slightly
  p.xz *= 1.0 + pulseGlow * (0.12 + 0.18 * clamp(uMode, 0.0, 1.0)) + uPulse * 0.08;

  // Pointer hover deflection
  vec2 diff = p.xy - uPointer;
  float dist = length(diff);
  if (dist < 1.4 && uHover > 0.01) {
    float repulse = sin(dist * 6.5 - uTime * 4.0) * exp(-dist * 1.5) * 0.14 * uHover;
    p.xy += normalize(diff + vec2(0.001)) * repulse;
    p.z += cos(dist * 6.5 - uTime * 4.0) * 0.10 * uHover;
  }

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  // Point sizing scaled by depth with strong baseline
  float d = -mv.z;
  float sizePulse = 1.0 + sin(uTime * 2.8 + aSeed * 15.0) * 0.15;
  float typeSize = 1.0;
  if (aType > 1.5 && aType < 2.5) {
    typeSize = 0.90; // Rung points
  } else if (aType > 2.5) {
    typeSize = 0.75; // Ambient points
  }
  float basePtSize = (18.5 / d) * sizePulse * typeSize * (1.0 + pulseGlow * 0.5 + uPulse * 0.25);
  gl_PointSize = clamp(basePtSize, 2.0, 5.2);

  // Color dynamics: Bright Ivory, Amber, and Radiant Ember Orange
  vec3 ivory = vec3(0.98, 0.96, 0.92);
  vec3 emberAmber = vec3(1.0, 0.52, 0.20);
  vec3 electricOrange = vec3(1.0, 0.32, 0.05);
  vec3 goldenGlow = vec3(1.0, 0.88, 0.48);

  vec3 col = aBaseColor;

  // Highlight pulse waves with golden glow
  col = mix(col, goldenGlow, pulseGlow * 0.85);

  // Mode 1 (AI) amplifies electric orange pulses
  if (uMode > 0.4 && uMode <= 1.5) {
    col = mix(col, electricOrange, pulseGlow * 0.65 * (1.0 - abs(uMode - 1.0)));
  }

  vColor = col;

  // High contrast alpha: 0.95 for main strands, 0.65 for ambient
  float baseAlpha = aType > 2.5 ? 0.65 : 0.95;
  vAlpha = clamp(baseAlpha + 0.25 * pulseGlow, 0.0, 1.0);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  // Crisp circular stipple dot with bright core
  float alpha = (1.0 - smoothstep(0.08, 0.50, d)) * vAlpha;
  if (alpha < 0.02) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;

export default function BuilderDnaHelix3D({
  activeMode = 0,
  className = "",
}: BuilderDnaHelix3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const uniformsRef = useRef<{
    uTime: { value: number };
    uMode: { value: number };
    uPulse: { value: number };
    uPointer: { value: THREE.Vector2 };
    uHover: { value: number };
    uDpr: { value: number };
  }>({
    uTime: { value: 0 },
    uMode: { value: activeMode },
    uPulse: { value: 0 },
    uPointer: { value: new THREE.Vector2(999, 999) },
    uHover: { value: 0 },
    uDpr: { value: 1 },
  });

  const activeModeRef = useRef(activeMode);
  useEffect(() => {
    activeModeRef.current = activeMode;
    uniformsRef.current.uPulse.value = 1.0; // Trigger burst shockwave on mode change
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;
    let isDisposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      uniformsRef.current.uDpr.value = renderer.getPixelRatio();
    } catch {
      console.warn("WebGL not supported for BuilderDnaHelix3D");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);

    let lastW = 0;
    let lastH = 0;

    const updateSize = () => {
      if (!container || !renderer) return;
      const width = Math.floor(container.clientWidth);
      const height = Math.floor(container.clientHeight);
      if (width === 0 || height === 0) return;
      if (Math.abs(width - lastW) < 2 && Math.abs(height - lastH) < 2) return;
      lastW = width;
      lastH = height;

      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;
      camera.position.z = aspect < 0.65 ? 5.2 : aspect < 0.85 ? 4.8 : 4.5;
      camera.updateProjectionMatrix();
    };

    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: uniformsRef.current,
    });

    // 1. Double-Helix Parametric Point Generation (elongated to gracefully fill vertical height)
    const strandPts = 700;
    const rungs = 42;
    const ptsPerRung = 16;
    const ambientPts = 350;
    const totalPts = strandPts * 2 + rungs * ptsPerRung + ambientPts;

    const positions = new Float32Array(totalPts * 3);
    const colors = new Float32Array(totalPts * 3);
    const types = new Float32Array(totalPts);
    const seeds = new Float32Array(totalPts);

    const height = 4.8;
    const radius = 1.15;
    const turns = 3.6;

    let ptr = 0;

    // Helper: Deterministic hash
    const hash = (i: number) => {
      const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    // --- Strand A (Ivory Backbone) ---
    for (let i = 0; i < strandPts; i++) {
      const y = -height / 2 + (i / (strandPts - 1)) * height;
      const theta = y * ((turns * Math.PI * 2) / height);
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = y;
      positions[ptr * 3 + 2] = z;

      // Ivory with subtle titanium tone
      colors[ptr * 3] = 0.95;
      colors[ptr * 3 + 1] = 0.92;
      colors[ptr * 3 + 2] = 0.88;

      types[ptr] = 0.0;
      seeds[ptr] = hash(i * 3);
      ptr++;
    }

    // --- Strand B (Ember Orange Backbone) ---
    for (let i = 0; i < strandPts; i++) {
      const y = -height / 2 + (i / (strandPts - 1)) * height;
      const theta = y * ((turns * Math.PI * 2) / height) + Math.PI;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = y;
      positions[ptr * 3 + 2] = z;

      // Fiery warm amber-orange
      colors[ptr * 3] = 1.0;
      colors[ptr * 3 + 1] = 0.44;
      colors[ptr * 3 + 2] = 0.16;

      types[ptr] = 1.0;
      seeds[ptr] = hash(i * 3 + 1000);
      ptr++;
    }

    // --- Hydrogen Bond Rungs ---
    for (let r = 0; r < rungs; r++) {
      const y = -height / 2 + 0.15 + (r / (rungs - 1)) * (height - 0.3);
      const theta = y * ((turns * Math.PI * 2) / height);
      const pAx = Math.cos(theta) * radius;
      const pAz = Math.sin(theta) * radius;
      const pBx = Math.cos(theta + Math.PI) * radius;
      const pBz = Math.sin(theta + Math.PI) * radius;

      for (let j = 0; j < ptsPerRung; j++) {
        const s = j / (ptsPerRung - 1);
        const x = (1 - s) * pAx + s * pBx;
        const z = (1 - s) * pAz + s * pBz;

        positions[ptr * 3] = x;
        positions[ptr * 3 + 1] = y;
        positions[ptr * 3 + 2] = z;

        // Gradient from ivory to amber with golden center
        const centerDist = Math.abs(s - 0.5) * 2; // 0 at center, 1 at edges
        const cr = 1.0;
        const cg = 0.70 + (1 - centerDist) * 0.22;
        const cb = (1 - s) * 0.85 + s * 0.18;

        colors[ptr * 3] = cr;
        colors[ptr * 3 + 1] = cg;
        colors[ptr * 3 + 2] = cb;

        types[ptr] = 2.0;
        seeds[ptr] = hash(r * 50 + j);
        ptr++;
      }
    }

    // --- Ambient Halo Particles ---
    for (let a = 0; a < ambientPts; a++) {
      const y = (hash(a * 7) - 0.5) * (height * 1.15);
      const theta = hash(a * 13) * Math.PI * 2;
      const rAmb = radius * (1.1 + hash(a * 17) * 0.75);
      const x = Math.cos(theta) * rAmb;
      const z = Math.sin(theta) * rAmb;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = y;
      positions[ptr * 3 + 2] = z;

      colors[ptr * 3] = 1.0;
      colors[ptr * 3 + 1] = 0.55 + hash(a * 23) * 0.35;
      colors[ptr * 3 + 2] = 0.25;

      types[ptr] = 3.0;
      seeds[ptr] = hash(a * 31);
      ptr++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aBaseColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aType", new THREE.BufferAttribute(types, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    // Pointer hover tracking
    const targetPointer = new THREE.Vector2(999, 999);
    let targetHover = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX;
      const py = e.clientY;
      if (
        px >= rect.left &&
        px <= rect.right &&
        py >= rect.top &&
        py <= rect.bottom
      ) {
        const x = ((px - rect.left) / rect.width) * 2 - 1;
        const y = -(((py - rect.top) / rect.height) * 2 - 1);
        targetPointer.set(x * 1.8, y * 2.2);
        targetHover = 1.0;
      } else {
        targetHover = 0.0;
      }
    };

    const handlePointerLeave = () => {
      targetHover = 0.0;
      targetPointer.set(999, 999);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Animation loop
    let lastTime = performance.now();
    const animate = (now: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      uniformsRef.current.uTime.value += delta;
      lastTime = now;

      // Smoothly interpolate mode
      uniformsRef.current.uMode.value = THREE.MathUtils.lerp(
        uniformsRef.current.uMode.value,
        activeModeRef.current,
        0.08
      );

      // Decay pulse
      uniformsRef.current.uPulse.value *= 0.94;

      // Pointer interpolation
      uniformsRef.current.uPointer.value.lerp(targetPointer, 0.08);
      uniformsRef.current.uHover.value = THREE.MathUtils.lerp(
        uniformsRef.current.uHover.value,
        targetHover,
        0.06
      );

      // Subtle tilt
      pointsMesh.rotation.z = Math.sin(uniformsRef.current.uTime.value * 0.5) * 0.05;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      scene.remove(pointsMesh);
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto block"
      />
    </div>
  );
}

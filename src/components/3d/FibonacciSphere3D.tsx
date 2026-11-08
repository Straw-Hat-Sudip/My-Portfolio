"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface FibonacciSphere3DProps {
  activeTab?: number; // 0: STRUCTURE, 1: RIPPLES, 2: CONSTELLATION
  className?: string;
}

const vertexShader = `
attribute vec3 aTeach;
attribute vec3 aConnect;
uniform vec3 uWeights;
uniform float uTime;
uniform float uPulse;
uniform vec2 uPointer;
varying float vGlow;

void main() {
  // Smooth interpolation among the 3 geometries:
  // uWeights.x -> STRUCTURE (planar wave grid)
  // uWeights.y -> RIPPLES (radial spiral rays with center hole)
  // uWeights.z -> CONSTELLATION (Fibonacci golden-ratio sphere)
  vec3 p = position * uWeights.x + aTeach * uWeights.y + aConnect * uWeights.z;

  // Pointer distance & interactive fluid ripple wave
  float d = distance(p.xy, uPointer);
  float wave = sin(length(p.xy) * 9.0 - uTime * 2.5);
  p.z += wave * (0.06 + 0.2 * uWeights.y);
  p.xy += normalize(p.xy + vec2(0.001)) * sin(d * 7.0 - uTime * 4.0) * exp(-d * 1.5) * 0.16;
  p *= 1.0 + uPulse * 0.08;

  vGlow = 0.45 + 0.4 * exp(-d * 2.0) + 0.15 * wave;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(13.0 / -mv.z, 1.0, 4.0);
}
`;

const fragmentShader = `
varying float vGlow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  // Titanium silver-tan blending into warm ember/orange glow
  vec3 col = mix(vec3(0.70, 0.67, 0.61), vec3(1.0, 0.48, 0.22), smoothstep(0.45, 0.90, vGlow));
  gl_FragColor = vec4(col, (1.0 - smoothstep(0.10, 0.50, d)) * 0.88);
}
`;

export default function FibonacciSphere3D({
  activeTab = 0,
  className = "",
}: FibonacciSphere3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const uniformsRef = useRef<{
    uTime: { value: number };
    uWeights: { value: THREE.Vector3 };
    uPointer: { value: THREE.Vector2 };
    uPulse: { value: number };
  }>({
    uTime: { value: 0 },
    uWeights: {
      value: new THREE.Vector3(
        activeTab === 0 ? 1 : 0,
        activeTab === 1 ? 1 : 0,
        activeTab === 2 ? 1 : 0
      ),
    },
    uPointer: { value: new THREE.Vector2(4, 4) },
    uPulse: { value: 0 },
  });

  const activeTabRef = useRef(activeTab);
  useEffect(() => {
    activeTabRef.current = activeTab;
    uniformsRef.current.uPulse.value = 1.0; // Trigger pulse shockwave on tab switch
  }, [activeTab]);

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
    } catch {
      console.warn("WebGL not supported for FibonacciSphere3D");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.z = 5.1;

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
      camera.position.z = aspect < 1.0 ? 5.8 : 5.1;
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

    // 2,400 points matching the 3 geometries
    const count = 2400;
    const x = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const y = new Float32Array(count * 3);

    for (let e = 0; e < count; e++) {
      const t = (e % 60) / 59;
      const r = Math.floor(e / 60) / 39;

      // 1. STRUCTURE: Planar undulating wave grid
      x[3 * e] = (t - 0.5) * 3.0;
      x[3 * e + 1] = (r - 0.5) * 2.8;
      x[3 * e + 2] = 0.12 * Math.sin(18.0 * t);

      // 2. RIPPLES: Radial spiral rays with center circular aperture
      const n = t * Math.PI * 2.0;
      const i = 0.2 + 1.5 * r;
      v[3 * e] = Math.cos(n) * i;
      v[3 * e + 1] = Math.sin(n) * i;
      v[3 * e + 2] = 0.2 * Math.sin(8.0 * i);

      // 3. CONSTELLATION: Fibonacci golden-ratio sphere
      const a = 1.0 - (2.0 * e) / 2399.0;
      const s = 2.399963 * e;
      const o = Math.sqrt(Math.max(0.0, 1.0 - a * a));
      y[3 * e] = Math.cos(s) * o * 1.6;
      y[3 * e + 1] = 1.6 * a;
      y[3 * e + 2] = Math.sin(s) * o * 1.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(x, 3));
    geometry.setAttribute("aTeach", new THREE.BufferAttribute(v, 3));      // RIPPLES
    geometry.setAttribute("aConnect", new THREE.BufferAttribute(y, 3));    // CONSTELLATION

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    // Pointer coordinates & interaction tracking
    const handlePointerMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      uniformsRef.current.uPointer.value.set(
        ((e.clientX - rect.left) / rect.width) * 4 - 2,
        2 - ((e.clientY - rect.top) / rect.height) * 4
      );
    };

    const handlePointerLeave = () => {
      uniformsRef.current.uPointer.value.set(4, 4);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Target weights vector for smooth lerp
    const targetWeights = new THREE.Vector3();

    // Animation loop
    let lastTime = performance.now();
    const animate = (now: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      uniformsRef.current.uTime.value += delta;
      lastTime = now;

      // Smoothly morph weights to active tab:
      // Tab 0 -> (1, 0, 0) STRUCTURE
      // Tab 1 -> (0, 1, 0) RIPPLES
      // Tab 2 -> (0, 0, 1) CONSTELLATION
      const currentTab = activeTabRef.current;
      targetWeights.set(
        currentTab === 0 ? 1 : 0,
        currentTab === 1 ? 1 : 0,
        currentTab === 2 ? 1 : 0
      );
      uniformsRef.current.uWeights.value.lerp(targetWeights, 0.065);

      // Decay pulse shockwave
      uniformsRef.current.uPulse.value *= 0.93;

      // Dynamic Y-axis rotation swing
      // In Structure & Ripples: subtle 3D wave perspective oscillation
      // In Constellation: rotating sphere
      if (currentTab === 2) {
        pointsMesh.rotation.y += delta * 0.32;
      } else {
        pointsMesh.rotation.y = 0.18 * Math.sin(uniformsRef.current.uTime.value * 0.85);
      }

      if (renderer) {
        try {
          renderer.render(scene, camera);
        } catch {
          // WebGL context guard for mobile
        }
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

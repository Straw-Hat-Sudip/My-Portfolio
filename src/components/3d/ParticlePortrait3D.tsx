"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { getPortraitBuffers } from "./portraitData";

interface ParticlePortraitProps {
  motionActive?: boolean;
  scrollProgress?: number;
}

const vertexShader = `
attribute float aSeed;
attribute float aLum;

uniform float uTime;
uniform float uProgress;
uniform float uDpr;
uniform vec2 uPointer;
uniform float uHover;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Normalized scroll progression
  float p = clamp(uProgress, 0.0, 1.0);

  // 1. Idle / Living harmonic breathing when at rest (p == 0)
  float breathZ = sin(uTime * 1.8 + position.y * 3.2 + aSeed * 3.1415) * 0.035;
  float breathX = cos(uTime * 1.4 + position.x * 2.8) * 0.015;
  float breathY = sin(uTime * 1.6 + position.y * 2.4) * 0.015;
  vec3 basePos = position + vec3(breathX, breathY, breathZ);

  // 2. Interactive pointer proximity ripple and deflection
  vec2 diff = basePos.xy - uPointer;
  float dist = length(diff);
  if (dist < 1.3 && uHover > 0.01) {
    float repulse = sin(dist * 6.5 - uTime * 4.0) * exp(-dist * 1.6) * 0.15 * uHover * (1.0 - p);
    basePos.xy += normalize(diff + vec2(0.001)) * repulse;
    basePos.z += cos(dist * 6.5 - uTime * 4.0) * 0.08 * uHover * (1.0 - p);
  }

  // 3. SINE WAVE DISPERSION ON SCROLL:
  // When scrolling down, the face particles transform into an undulating, traveling sine wave
  float waveFreqY = 5.2; // Creates ~2.5 full sinusoidal wave cycles along the height
  float wavePhase = position.y * waveFreqY - p * 15.0 + uTime * 2.8;

  // Primary horizontal sine wave oscillation (classic S-curve wave across the face)
  float sineWaveX = sin(wavePhase);

  // 3D Depth ribbon wave (undulating towards & away from the camera)
  float cosineWaveZ = cos(wavePhase * 0.92 + position.x * 3.4);

  // Vertical wave ripple
  float sineWaveY = sin(position.x * 4.2 + wavePhase * 0.65);

  // Amplitude growth: expands as the user scrolls
  float amp = smoothstep(0.01, 0.50, p);

  // Lateral sine wave displacement
  float dispX = sineWaveX * (0.75 * amp + 0.40 * p * p);

  // Depth wave displacement
  float dispZ = cosineWaveZ * (0.85 * amp + 0.55 * p);

  // Upward buoyant lift and harmonic ripple
  float dispY = (sineWaveY * 0.22 + 1.15) * p * 1.65;

  // Subtle lateral stardust scatter
  float scatter = (aSeed - 0.5) * 0.65 * p * p;

  vec3 sineWavePos = vec3(
    basePos.x + dispX + scatter,
    basePos.y + dispY,
    basePos.z + dispZ
  );

  // Smoothly blend from face portrait into dynamic sine wave
  vec3 finalPos = mix(basePos, sineWavePos, smoothstep(0.0, 0.18, p));

  vec4 mv = modelViewMatrix * vec4(finalPos, 1.0);
  gl_Position = projectionMatrix * mv;

  // 4. Wave-synchronized dissolution (particles disappear in sync with the traveling wave)
  float waveCrest = 0.5 + 0.5 * sineWaveX;
  float dissolveOffset = (waveCrest - 0.5) * 0.25 * p + (aSeed - 0.5) * 0.12;
  float dissolveProg = clamp((p - 0.04) / 0.88 + dissolveOffset, 0.0, 1.0);
  float dissolve = smoothstep(0.96, 0.08, dissolveProg);

  // 5. Density & Facial Feature Preservation:
  // Calculate distance from central face features (eyes, nose, mouth)
  float distFace = length(vec2(position.x / 0.58, (position.y - 0.35) / 0.80));
  // 0 inside center face, 1 on hair / perimeter / shoulders
  float facePerimeter = smoothstep(0.28, 0.95, distFace);

  // At rest (p == 0): Central face uses delicate, ultra-fine micro-dots so the photo remains 100% visible and sharp
  float restSize = mix(mix(0.65, 1.10, aLum), mix(1.35, 2.30, aLum), facePerimeter);
  float restAlpha = mix(mix(0.18, 0.36, aLum), mix(0.70, 0.95, aLum), facePerimeter);

  // On scroll (p > 0): As the photo fades out, all 9,200+ particles light up to full richness for the 3D sine wave
  float waveActive = smoothstep(0.03, 0.28, p);
  float activeSize = mix(restSize, mix(2.20, 3.80, aLum), waveActive);
  float activeAlpha = mix(restAlpha, mix(0.85, 1.0, aLum), waveActive);

  // Dynamic point pulse & wave crest enlargement
  float sizePulse = 1.0 + sin(uTime * 2.2 + aSeed * 14.0) * 0.15;
  float waveSizeMod = 1.0 + waveCrest * 0.55 * p;
  gl_PointSize = clamp(activeSize * sizePulse * waveSizeMod * dissolve * uDpr, 0.9, 6.0);

  // 6. Color palette: Titanium silver-bronze blending to warm amber / ember gold
  vec3 silver = vec3(0.82, 0.79, 0.74);
  vec3 amber = vec3(1.0, 0.48, 0.18);
  vec3 emberHighlight = vec3(1.0, 0.76, 0.45);

  // Right-side warm studio rim light
  float rightRim = smoothstep(-0.2, 0.9, position.x);
  vec3 baseCol = mix(silver, amber, clamp(rightRim * 0.65 + aLum * 0.35, 0.0, 1.0));

  // Dynamic sine wave crest glow
  vColor = mix(baseCol, emberHighlight, clamp(waveCrest * 0.65 * p + aLum * 0.30, 0.0, 1.0));

  // Alpha transparency
  vAlpha = clamp(activeAlpha * dissolve, 0.0, 1.0);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  // Soft, anti-aliased stipple circular dot with luminous core
  float alpha = (1.0 - smoothstep(0.12, 0.50, d)) * vAlpha;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha);
}
`;

// Scale factor matching the user's reference line
const PORTRAIT_SCALE = 1.30;
// Optical pivot point (22% from top: Y = 1.12 in Three.js coordinates)
const PIVOT_Y = 1.12;

export default function ParticlePortrait3D({
  motionActive = true,
  scrollProgress = 0,
}: ParticlePortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const uniformsRef = useRef<{
    uTime: { value: number };
    uProgress: { value: number };
    uDpr: { value: number };
    uPointer: { value: THREE.Vector2 };
    uHover: { value: number };
  }>({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uDpr: { value: 1 },
    uPointer: { value: new THREE.Vector2(999, 999) },
    uHover: { value: 0 },
  });

  const motionActiveRef = useRef(motionActive);
  useEffect(() => {
    motionActiveRef.current = motionActive;
  }, [motionActive]);

  useEffect(() => {
    uniformsRef.current.uProgress.value = scrollProgress;
  }, [scrollProgress]);

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniformsRef.current.uDpr.value = renderer.getPixelRatio();
    } catch {
      console.warn("WebGL not supported, using fallback image.");
      requestAnimationFrame(() => setIsReady(true));
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

    // Exact vertical camera offset to anchor the optical pivot (22% from top)
    const yCam = PIVOT_Y * (1 - 1 / PORTRAIT_SCALE);
    camera.position.set(0, yCam, 4.8284 / PORTRAIT_SCALE);
    camera.lookAt(0, yCam, 0);

    const updateSize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;
      // Precision object-contain math scaled by PORTRAIT_SCALE
      const baseZ = aspect < 0.8 ? 3.8627 / aspect : 4.8284;
      const targetZ = baseZ / PORTRAIT_SCALE;
      camera.position.set(0, yCam, targetZ);
      camera.lookAt(0, yCam, 0);
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
      blending: THREE.NormalBlending,
      uniforms: uniformsRef.current,
    });

    let pointsMesh: THREE.Points | null = null;

    try {
      // Load precomputed buffers sampled directly from Sudip's face silhouette (4,909 points)
      const { positions, seeds, lums } = getPortraitBuffers();

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      geometry.setAttribute("aLum", new THREE.BufferAttribute(lums, 1));

      pointsMesh = new THREE.Points(geometry, material);
      scene.add(pointsMesh);

      // Render the very first frame immediately so canvas has pixels before showing
      if (renderer) {
        try {
          renderer.render(scene, camera);
        } catch {
          // WebGL context guard for mobile browsers
        }
      }
      requestAnimationFrame(() => setIsReady(true));
    } catch (err) {
      console.error("Failed to build particle portrait:", err);
      requestAnimationFrame(() => setIsReady(true));
    }

    // Pointer coordinates & interaction tracking mapped to scaled camera
    const targetPointer = new THREE.Vector2(999, 999);
    let targetHover = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX;
      const py = e.clientY;
      if (
        px >= rect.left - 120 &&
        px <= rect.right + 120 &&
        py >= rect.top - 120 &&
        py <= rect.bottom + 120
      ) {
        const x = ((px - rect.left) / rect.width) * 2 - 1;
        const y = -(((py - rect.top) / rect.height) * 2 - 1);
        targetPointer.set((x * 1.6) / PORTRAIT_SCALE, yCam + (y * 2.0) / PORTRAIT_SCALE);
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

    // Animation loop (living harmonic sine/cosine wave particle animation)
    let lastTime = performance.now();
    const animate = (now: number) => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);

      if (motionActiveRef.current) {
        const delta = Math.min((now - lastTime) * 0.001, 0.1);
        uniformsRef.current.uTime.value += delta;
      }
      lastTime = now;

      // Smooth pointer & hover interpolation
      uniformsRef.current.uPointer.value.lerp(targetPointer, 0.08);
      uniformsRef.current.uHover.value = THREE.MathUtils.lerp(
        uniformsRef.current.uHover.value,
        targetHover,
        0.06
      );

      if (renderer) {
        try {
          renderer.render(scene, camera);
        } catch {
          // WebGL context guard for mobile browsers
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
      if (pointsMesh) {
        scene.remove(pointsMesh);
        pointsMesh.geometry.dispose();
      }
      material.dispose();
      renderer?.dispose();
    };
  }, []);

  // Photo smoothly fades out as scroll progresses, letting the 3D sine wave particles take over
  const photoOpacity = Math.max(0, 1.0 * (1.0 - Math.min(1.0, scrollProgress / 0.36)));

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Underlying Photographic Portrait Anchor: Fades out smoothly on scroll */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-150 ease-out"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 68%, rgba(0,0,0,0) 96%)",
          maskImage: "linear-gradient(to bottom, #000 68%, rgba(0,0,0,0) 96%)",
          opacity: isReady ? photoOpacity : 0,
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `scale(${PORTRAIT_SCALE})`,
            transformOrigin: "center 22%",
          }}
        >
          <Image
            src="/images/sudip-signal.png"
            alt="Sudip Patra Portrait"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 700px"
            className="object-contain select-none pointer-events-none"
            style={{
              filter: "contrast(1.08) brightness(1.02)",
            }}
          />
        </div>
      </div>

      {/* Living Three.js Face Hologram & Sine Wave Scroll Dispersion */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
}

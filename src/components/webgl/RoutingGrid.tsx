import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataFlowGrid() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const gridSize = 40;
  const size = 30;

  const { positions } = useMemo(() => {
    const points = [];
    // Vertical lines
    for (let i = 0; i <= gridSize; i++) {
      const x = (i / gridSize) * size - size / 2;
      points.push(x, 0, -size / 2);
      points.push(x, 0, size / 2);
    }
    // Horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      const z = (i / gridSize) * size - size / 2;
      points.push(-size / 2, 0, z);
      points.push(size / 2, 0, z);
    }
    return { positions: new Float32Array(points) };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (linesRef.current) {
      // Gentle camera sway
      linesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 - 1.5;
    }
  });

  return (
    <lineSegments ref={linesRef} position={[0, -1.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uColorCyan: { value: new THREE.Color("#66fcf1") }, // Cyan
          uColorSilver: { value: new THREE.Color("#d9d9d9") }, // Silver
        }}
        vertexShader={`
          uniform float uTime;
          varying vec3 vPos;
          
          // Pseudo-random noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
              u.y
            );
          }

          void main() {
            vec3 pos = position;
            // Displacement representing 'terrain' or 'traffic density'
            float n = noise(pos.xz * 0.15 + uTime * 0.1);
            pos.y += n * 2.0;
            
            vPos = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColorCyan;
          uniform vec3 uColorSilver;
          varying vec3 vPos;

          void main() {
            // "Data packets" flowing along the axes
            float flowX = sin(vPos.x * 1.5 + uTime * 4.0);
            float flowZ = sin(vPos.z * 1.5 - uTime * 4.0);
            
            // Isolate peaks of the sine waves
            float pulse = max(smoothstep(0.9, 1.0, flowX), smoothstep(0.9, 1.0, flowZ));
            
            // Base grid lines should be faint, pulses should be bright
            float alpha = 0.15 + pulse * 0.85;
            
            // Radial fade so the edges blend into the background
            float dist = length(vPos.xz) / 15.0;
            alpha *= smoothstep(1.0, 0.2, dist);
            
            // Mix colors: default silver, cyan on pulse
            vec3 color = mix(uColorSilver * 0.3, uColorCyan, pulse);
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </lineSegments>
  );
}

function FloatingNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const count = 150;
  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      rnd[i] = Math.random();
    }
    return { positions: pos, randoms: rnd };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#66fcf1") }
        }}
        vertexShader={`
          uniform float uTime;
          attribute float aRandom;
          varying float vAlpha;
          
          void main() {
            vec3 pos = position;
            // Float upwards slowly
            pos.y += mod(uTime * (0.2 + aRandom * 0.3), 10.0) - 5.0;
            
            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPos;
            
            // Pulse size & alpha
            float pulse = sin(uTime * 2.0 + aRandom * 10.0) * 0.5 + 0.5;
            gl_PointSize = (10.0 * pulse + 5.0) * (15.0 / -mvPos.z);
            vAlpha = pulse * smoothstep(20.0, 5.0, -mvPos.z);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          
          void main() {
            float dist = length(gl_PointCoord - 0.5);
            if (dist > 0.5) discard;
            float alpha = (0.5 - dist) * 2.0 * vAlpha;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}

export function RoutingGrid({ className }: { className?: string }) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  if (prefersReducedMotion) {
    return (
      <div 
        className={className} 
        style={{
          background: "radial-gradient(circle at 50% 60%, oklch(0.18 0.06 220) 0%, oklch(0.1 0.012 250) 60%)"
        }}
      />
    );
  }

  return (
    <div 
      className={className} 
      style={{ 
        pointerEvents: "none", 
        background: "radial-gradient(circle at 50% 60%, oklch(0.18 0.06 220) 0%, oklch(0.1 0.012 250) 60%)" 
      }}
    >
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }} 
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <DataFlowGrid />
        <FloatingNodes />
      </Canvas>
    </div>
  );
}

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useMemo, useLayoutEffect, Component, ReactNode } from 'react';
import { Color, Mesh, ShaderMaterial } from 'three';

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Silk WebGL context creation/render failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  if (!hex || typeof hex !== 'string') return [0.9, 0.6, 0.75];
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return [0.9, 0.6, 0.75];
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return [0.9, 0.6, 0.75];
  return [r / 255, g / 255, b / 255];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

interface SilkPlaneProps {
  uniforms: Record<string, { value: unknown }>;
  color: string;
}

function SilkPlane({ uniforms, color }: SilkPlaneProps) {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width * 1.8, viewport.height * 1.8, 1);
    }
  }, [viewport]);

  useLayoutEffect(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as ShaderMaterial;
      if (mat && mat.uniforms && mat.uniforms.uColor) {
        const rgb = hexToNormalizedRGB(color);
        (mat.uniforms.uColor.value as Color).setRGB(rgb[0], rgb[1], rgb[2]);
      }
    }
  }, [color]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as ShaderMaterial;
      if (mat && mat.uniforms && mat.uniforms.uTime) {
        mat.uniforms.uTime.value += 0.1 * delta;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
}

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk = ({ speed = 5, scale = 1, color = '#E8A0BF', noiseIntensity = 1.5, rotation = 0 }: SilkProps) => {
  const initialColor = useRef(color);
  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(initialColor.current)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    }),
    [speed, scale, noiseIntensity, rotation]
  );

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden z-0">
        <Canvas
          dpr={[1, 2]}
          frameloop="always"
          style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
          gl={{ alpha: true, antialias: true }}
        >
          <SilkPlane uniforms={uniforms} color={color} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};

export default Silk;


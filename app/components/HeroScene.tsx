'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  basePos: THREE.Vector3;
  phase: number;
  speed: number;
}

function buildNetwork(count: number, radius: number) {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    // Fibonacci-sphere-ish spread, with some jitter
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = radius * (0.7 + Math.random() * 0.6);
    const pos = new THREE.Vector3(
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(theta) * 0.5,
    );
    nodes.push({
      basePos: pos,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
    });
  }
  return nodes;
}

function buildEdges(nodes: Node[], maxDist: number, maxPerNode: number) {
  const edges: [number, number][] = [];
  const counts = new Array(nodes.length).fill(0);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (counts[i] >= maxPerNode || counts[j] >= maxPerNode) continue;
      const d = nodes[i].basePos.distanceTo(nodes[j].basePos);
      if (d < maxDist) {
        edges.push([i, j]);
        counts[i]++;
        counts[j]++;
      }
    }
  }
  return edges;
}

function Network() {
  const NODE_COUNT = 80;
  const RADIUS = 4.5;

  const nodes = useMemo(() => buildNetwork(NODE_COUNT, RADIUS), []);
  const edges = useMemo(() => buildEdges(nodes, 2.0, 4), [nodes]);

  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const lineGeomRef = useRef<THREE.BufferGeometry>(null);
  const groupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  // Pre-allocate line positions buffer (2 verts per edge × 3 floats)
  const linePositions = useMemo(
    () => new Float32Array(edges.length * 2 * 3),
    [edges.length],
  );
  const lineColors = useMemo(
    () => new Float32Array(edges.length * 2 * 3),
    [edges.length],
  );

  // Per-instance color attribute on the InstancedMesh
  const instanceColors = useMemo(() => {
    const arr = new Float32Array(NODE_COUNT * 3);
    const palette = [
      new THREE.Color('#a78bfa'),
      new THREE.Color('#60a5fa'),
      new THREE.Color('#34d399'),
      new THREE.Color('#f472b6'),
    ];
    for (let i = 0; i < NODE_COUNT; i++) {
      const c = palette[i % palette.length];
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  const { viewport } = useThree();
  const mouseTarget = useRef(new THREE.Vector2());
  const mouseSmoothed = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Mouse-driven parallax (-1..1 range from R3F state.pointer)
    mouseTarget.current.set(state.pointer.x, state.pointer.y);
    mouseSmoothed.current.lerp(mouseTarget.current, Math.min(1, delta * 3));

    if (groupRef.current) {
      groupRef.current.rotation.y =
        t * 0.05 + mouseSmoothed.current.x * 0.35;
      groupRef.current.rotation.x = mouseSmoothed.current.y * -0.25;
    }

    if (!instancedRef.current) return;

    const mesh = instancedRef.current;
    const positions = nodes.map((n, i) => {
      const wobble = Math.sin(t * n.speed + n.phase) * 0.2;
      const pos = n.basePos
        .clone()
        .multiplyScalar(1 + wobble * 0.05)
        .add(
          new THREE.Vector3(
            Math.sin(t * 0.5 + n.phase) * 0.15,
            Math.cos(t * 0.4 + n.phase) * 0.15,
            Math.sin(t * 0.3 + n.phase) * 0.1,
          ),
        );
      const pulse = 1 + Math.sin(t * 2 + n.phase) * 0.25;
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.06 * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      return pos;
    });
    mesh.instanceMatrix.needsUpdate = true;

    // Update edge geometry
    const lineGeom = lineGeomRef.current;
    if (lineGeom) {
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        const pa = positions[a];
        const pb = positions[b];
        const idx = e * 6;
        linePositions[idx] = pa.x;
        linePositions[idx + 1] = pa.y;
        linePositions[idx + 2] = pa.z;
        linePositions[idx + 3] = pb.x;
        linePositions[idx + 4] = pb.y;
        linePositions[idx + 5] = pb.z;

        // Edge color = blend of node colors, fading with distance
        const ca = tmpColor
          .setRGB(
            instanceColors[a * 3],
            instanceColors[a * 3 + 1],
            instanceColors[a * 3 + 2],
          )
          .clone();
        const cb = new THREE.Color(
          instanceColors[b * 3],
          instanceColors[b * 3 + 1],
          instanceColors[b * 3 + 2],
        );
        const dist = pa.distanceTo(pb);
        const fade = THREE.MathUtils.clamp(1 - dist / 2.2, 0, 1) * 0.6;
        lineColors[idx] = ca.r * fade;
        lineColors[idx + 1] = ca.g * fade;
        lineColors[idx + 2] = ca.b * fade;
        lineColors[idx + 3] = cb.r * fade;
        lineColors[idx + 4] = cb.g * fade;
        lineColors[idx + 5] = cb.b * fade;
      }
      const posAttr = lineGeom.getAttribute('position') as THREE.BufferAttribute;
      const colAttr = lineGeom.getAttribute('color') as THREE.BufferAttribute;
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // Subtle camera dolly with viewport scaling fix on small screens
    state.camera.position.z = viewport.width < 6 ? 11 : 9;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[instanceColors, 3]}
          />
        </sphereGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.95} />
      </instancedMesh>

      {/* Glow halos — bigger transparent spheres */}
      <instancedMesh
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
        onUpdate={(m) => {
          for (let i = 0; i < NODE_COUNT; i++) {
            dummy.position.copy(nodes[i].basePos);
            dummy.scale.setScalar(0.18);
            dummy.updateMatrix();
            m.setMatrixAt(i, dummy.matrix);
          }
          m.instanceMatrix.needsUpdate = true;
        }}
      >
        <sphereGeometry args={[1, 8, 8]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[instanceColors, 3]}
          />
        </sphereGeometry>
        <meshBasicMaterial
          vertexColors
          toneMapped={false}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* Edges */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={lineGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 55 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <Network />
    </Canvas>
  );
}

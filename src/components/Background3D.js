import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'

function NetworkParticles() {
  const count = 500
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [[0.49,0.23,0.93],[0.86,0.15,0.47],[0.655,0.545,0.98],[0.96,0.28,0.71]]
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random()-0.5)*50
      positions[i*3+1] = (Math.random()-0.5)*35
      positions[i*3+2] = (Math.random()-0.5)*25
      const c = palette[Math.floor(Math.random()*palette.length)]
      colors[i*3]=c[0]; colors[i*3+1]=c[1]; colors[i*3+2]=c[2]
    }
    return { positions, colors }
  }, [])
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.008
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function ConnectionLines() {
  const ref = useRef()
  const count = 25
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      pos[i*6]=(Math.random()-0.5)*30; pos[i*6+1]=(Math.random()-0.5)*20; pos[i*6+2]=(Math.random()-0.5)*15
      pos[i*6+3]=(Math.random()-0.5)*30; pos[i*6+4]=(Math.random()-0.5)*20; pos[i*6+5]=(Math.random()-0.5)*15
    }
    return pos
  }, [])
  useFrame((state) => { ref.current.rotation.y = state.clock.elapsedTime * 0.01 })
  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count*2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.1} />
    </lineSegments>
  )
}

function FloatBall({ position, color, speed, scale }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 1.2
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.7, 24, 24]} />
      <MeshDistortMaterial color={color} distort={0.4} speed={1.5} roughness={0} metalness={0.9} emissive={color} emissiveIntensity={0.25} transparent opacity={0.8} />
    </mesh>
  )
}

function FloatShape({ position, color, speed, scale, shape }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.6
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 1.0
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === 'box' && <boxGeometry args={[1,1,1]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[1]} />}
      {shape === 'torus' && <torusGeometry args={[0.7,0.25,12,60]} />}
      {shape === 'cone' && <coneGeometry args={[0.5,1.0,24]} />}
      <MeshDistortMaterial color={color} distort={0.3} speed={1.2} roughness={0.1} metalness={0.85} emissive={color} emissiveIntensity={0.2} transparent opacity={0.75} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[15,15,10]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-15,-15,-10]} intensity={1} color="#db2777" />
      <pointLight position={[0,15,-10]} intensity={0.8} color="#a78bfa" />
      <Stars radius={200} depth={80} count={4000} factor={4} saturation={0.3} fade speed={0.3} />
      <NetworkParticles />
      <ConnectionLines />
      <FloatBall position={[-8,3,-5]} color="#7c3aed" speed={0.4} scale={0.5} />
      <FloatBall position={[8,-2,-4]} color="#db2777" speed={0.5} scale={0.4} />
      <FloatBall position={[-5,-4,-3]} color="#a78bfa" speed={0.35} scale={0.35} />
      <FloatBall position={[6,4,-6]} color="#f472b6" speed={0.45} scale={0.45} />
      <FloatBall position={[0,-5,-4]} color="#6d28d9" speed={0.3} scale={0.3} />
      <FloatBall position={[-10,0,-6]} color="#db2777" speed={0.4} scale={0.4} />
      <FloatBall position={[10,2,-5]} color="#7c3aed" speed={0.5} scale={0.35} />
      <FloatShape position={[-6,2,-4]} color="#db2777" speed={0.4} scale={0.35} shape="torus" />
      <FloatShape position={[5,-3,-3]} color="#7c3aed" speed={0.5} scale={0.3} shape="octahedron" />
      <FloatShape position={[-3,-3,-5]} color="#a78bfa" speed={0.35} scale={0.3} shape="box" />
      <FloatShape position={[4,3,-4]} color="#f472b6" speed={0.45} scale={0.3} shape="cone" />
      <FloatShape position={[-8,-2,-5]} color="#6d28d9" speed={0.3} scale={0.25} shape="torus" />
      <FloatShape position={[9,-1,-6]} color="#db2777" speed={0.4} scale={0.28} shape="octahedron" />
    </>
  )
}

export default function Background3D() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
      <Canvas camera={{ position:[0,0,10], fov:75 }} style={{ background:'linear-gradient(135deg,#050210 0%,#0a0514 40%,#0d0520 100%)' }} dpr={[1,1.5]} performance={{ min:0.5 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
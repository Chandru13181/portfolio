import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

// Full page floating balls
function FloatingBalls() {
  const balls = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
      ],
      scale: Math.random() * 0.6 + 0.2,
      color: ['#7c3aed','#db2777','#a78bfa','#f472b6','#6d28d9','#9333ea'][Math.floor(Math.random() * 6)],
      speed: Math.random() * 0.5 + 0.3,
    }))
  }, [])

  return (
    <>
      {balls.map((ball) => (
        <FloatBall key={ball.id} {...ball} />
      ))}
    </>
  )
}

function FloatBall({ position, scale, color, speed }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 1.5
    ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.8
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

// Floating geometric shapes
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
      ],
      scale: Math.random() * 0.5 + 0.15,
      color: ['#7c3aed','#db2777','#a78bfa','#f472b6'][Math.floor(Math.random() * 4)],
      speed: Math.random() * 0.6 + 0.2,
      shape: ['box','octahedron','torus','cone'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  return (
    <>
      {shapes.map((s) => (
        <FloatShape key={s.id} {...s} />
      ))}
    </>
  )
}

function FloatShape({ position, scale, color, speed, shape }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.6
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 1.2
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === 'box' && <boxGeometry args={[1,1,1]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[1]} />}
      {shape === 'torus' && <torusGeometry args={[0.8, 0.3, 16, 100]} />}
      {shape === 'cone' && <coneGeometry args={[0.6, 1.2, 32]} />}
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.85}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Network particles
function NetworkParticles() {
  const count = 600
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      [0.49,0.23,0.93],
      [0.86,0.15,0.47],
      [0.655,0.545,0.98],
      [0.96,0.28,0.71],
    ]
    for (let i = 0; i < count; i++) {
      positions[i*3] = (Math.random()-0.5)*50
      positions[i*3+1] = (Math.random()-0.5)*35
      positions[i*3+2] = (Math.random()-0.5)*25
      const c = palette[Math.floor(Math.random()*palette.length)]
      colors[i*3] = c[0]; colors[i*3+1] = c[1]; colors[i*3+2] = c[2]
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.01
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// Connection lines
function NetworkLines() {
  const ref = useRef()
  const count = 40

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      pos[i*6] = (Math.random()-0.5)*30
      pos[i*6+1] = (Math.random()-0.5)*20
      pos[i*6+2] = (Math.random()-0.5)*15
      pos[i*6+3] = (Math.random()-0.5)*30
      pos[i*6+4] = (Math.random()-0.5)*20
      pos[i*6+5] = (Math.random()-0.5)*15
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
    ref.current.rotation.x = state.clock.elapsedTime * 0.008
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count*2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.12} />
    </lineSegments>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[15,15,10]} intensity={2} color="#7c3aed" />
      <pointLight position={[-15,-15,-10]} intensity={1.5} color="#db2777" />
      <pointLight position={[0,20,-15]} intensity={1} color="#a78bfa" />
      <pointLight position={[-20,0,10]} intensity={0.8} color="#f472b6" />
      <Stars radius={300} depth={100} count={8000} factor={5} saturation={0.3} fade speed={0.5} />
      <NetworkParticles />
      <NetworkLines />
      <FloatingBalls />
      <FloatingShapes />
    </>
  )
}

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #050210 0%, #0a0514 40%, #0d0520 100%)' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
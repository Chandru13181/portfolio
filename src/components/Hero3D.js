import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// ===== FULL SCREEN 3D DOTS =====
function FullScreenDots() {
  const count = 800
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorPalette = [
      [0.49, 0.23, 0.93],
      [0.86, 0.15, 0.47],
      [0.655, 0.545, 0.98],
      [0.96, 0.28, 0.71],
      [0.42, 0.16, 0.85],
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

// ===== CONNECTING LINES =====
function ConnectionLines() {
  const ref = useRef()
  const count = 30

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      pos[i * 6] = (Math.random() - 0.5) * 20
      pos[i * 6 + 1] = (Math.random() - 0.5) * 15
      pos[i * 6 + 2] = (Math.random() - 0.5) * 10
      pos[i * 6 + 3] = (Math.random() - 0.5) * 20
      pos[i * 6 + 4] = (Math.random() - 0.5) * 15
      pos[i * 6 + 5] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count * 2} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.15} />
    </lineSegments>
  )
}

// ===== FLOATING SHAPE =====
function FloatingShape({ position, color, shape, speed = 1, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.4
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
      {shape === 'torus' && <torusGeometry args={[0.45, 0.18, 16, 100]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[0.6]} />}
      {shape === 'box' && <boxGeometry args={[0.7, 0.7, 0.7]} />}
      {shape === 'cone' && <coneGeometry args={[0.4, 0.9, 32]} />}
      {shape === 'torus2' && <torusKnotGeometry args={[0.3, 0.1, 100, 16]} />}
      <MeshDistortMaterial
        color={color}
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// ===== MAIN ORB =====
function MainOrb() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.15
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <MeshDistortMaterial
          color="#5b21b6"
          distort={0.5}
          speed={3}
          roughness={0}
          metalness={0.95}
          emissive="#4c1d95"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

// ===== ORBIT RINGS =====
function OrbitRings() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame((state) => {
    ring1.current.rotation.x = Math.PI / 3
    ring1.current.rotation.y = state.clock.elapsedTime * 0.5
    ring2.current.rotation.x = Math.PI / 6
    ring2.current.rotation.z = state.clock.elapsedTime * 0.3
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.04, 16, 100]} />
        <meshStandardMaterial color="#db2777" emissive="#db2777" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.4, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
    </>
  )
}

// ===== SCENE =====
function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10,10,10]} intensity={2} color="#7c3aed" />
      <pointLight position={[-10,-10,-10]} intensity={1} color="#db2777" />
      <pointLight position={[0,10,-10]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[-10,5,5]} intensity={0.6} color="#f472b6" />
      <spotLight position={[0,15,0]} intensity={0.5} color="#ffffff" angle={0.4} />

      <Stars radius={200} depth={80} count={6000} factor={5} saturation={0.3} fade speed={0.5} />
      <FullScreenDots />
      <ConnectionLines />
      <MainOrb />
      <OrbitRings />

      <FloatingShape position={[-4,2,-2]} color="#db2777" shape="torus" speed={0.8} />
      <FloatingShape position={[4,-1,-1]} color="#7c3aed" shape="octahedron" speed={1.2} />
      <FloatingShape position={[-3,-2,-3]} color="#a78bfa" shape="box" speed={0.6} />
      <FloatingShape position={[3,2.5,-2]} color="#f472b6" shape="cone" speed={1} />
      <FloatingShape position={[0,-3.5,-1]} color="#6d28d9" shape="sphere" speed={0.9} />
      <FloatingShape position={[-5,0,-3]} color="#db2777" shape="torus2" speed={0.7} />
      <FloatingShape position={[5,1,-3]} color="#7c3aed" shape="torus" speed={1.1} />
      <FloatingShape position={[-2,4,-2]} color="#f472b6" shape="octahedron" speed={0.85} />
      <FloatingShape position={[2,-4,-2]} color="#a78bfa" shape="cone" speed={1.3} />
      <FloatingShape position={[-6,-1,-4]} color="#7c3aed" shape="box" speed={0.75} scale={0.7} />
      <FloatingShape position={[6,3,-4]} color="#db2777" shape="sphere" speed={0.95} scale={0.6} />
    </>
  )
}

// ===== TYPEWRITER =====
const words = ['Designer', 'Developer', 'Creator', 'Innovator']

function TypewriterText() {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55)
    } else {
      setDeleting(false)
      setWordIndex((wordIndex + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return (
    <span style={{
      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      borderRight: '3px solid #a78bfa', paddingRight: '4px',
      animation: 'blink 1s step-end infinite',
    }}>{displayed}</span>
  )
}

// ===== MAIN HERO =====
export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleDownloadCV = () => {
    fetch('/resume.pdf')
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Chandru_Resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      })
      .catch(() => {
        window.open('/resume.pdf', '_blank')
      })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring', stiffness: 80 } }
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '0 80px',
      background: 'linear-gradient(135deg, #050210 0%, #0a0514 40%, #0d0520 100%)',
      position: 'relative',
      overflow: 'hidden',
      gap: '40px',
    }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        animation: 'glowPulse 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(219,39,119,0.1), transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        animation: 'glowPulse 5s ease-in-out infinite reverse',
      }} />

      {/* LEFT — Text */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative', zIndex: 2,
          transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          transition: 'transform 0.15s ease',
        }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50px', padding: '10px 22px',
            marginBottom: '28px', backdropFilter: 'blur(10px)',
          }}
        >
          <motion.span
            animate={{ scale: [1,1.6,1], opacity: [1,0.3,1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'block' }}
          />
          <span style={{ color: '#a78bfa', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.3px' }}>
            Available for Freelance ✨
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p variants={itemVariants}
          style={{
            color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem',
            fontWeight: '700', letterSpacing: '5px',
            textTransform: 'uppercase', marginBottom: '14px',
          }}
        >Hello World 👋 I'm a</motion.p>

        {/* Title */}
        <motion.h1 variants={itemVariants}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: 'clamp(2.4rem, 4vw, 4.2rem)',
            fontWeight: '900', lineHeight: '1.08',
            marginBottom: '20px', letterSpacing: '-1.5px',
          }}
        >
          <span style={{ color: 'white' }}>UI/UX </span>
          <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Designer</span>
          <br />
          <span style={{ color: 'white' }}>& Creative </span>
          <TypewriterText />
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants}
          style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '1rem',
            lineHeight: '1.85', maxWidth: '420px', marginBottom: '44px',
          }}
        >
          Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '60px' }}
        >
          {/* Download CV Button */}
          <motion.button
            onClick={handleDownloadCV}
            whileHover={{ scale: 1.06, y: -5, boxShadow: '0 25px 50px rgba(124,58,237,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              color: 'white', padding: '15px 34px',
              borderRadius: '14px', fontWeight: '800',
              fontSize: '0.92rem',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 30px rgba(124,58,237,0.35)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              border: 'none', cursor: 'pointer',
            }}
          >
            <motion.span animate={{ y: [0,-3,0] }} transition={{ duration: 1.5, repeat: Infinity }}>⬇</motion.span>
            Download CV
          </motion.button>

          {/* View Work */}
          <motion.a href="#projects"
            whileHover={{ scale: 1.06, y: -5, borderColor: 'rgba(124,58,237,0.6)', background: 'rgba(124,58,237,0.1)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              color: 'white', padding: '15px 34px',
              borderRadius: '14px', fontWeight: '800',
              fontSize: '0.92rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              transition: 'all 0.3s',
            }}
          >🚀 View Work</motion.a>

          {/* Hire Me */}
          <motion.a href="#contact"
            whileHover={{ scale: 1.06, y: -5, boxShadow: '0 25px 50px rgba(219,39,119,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'rgba(219,39,119,0.12)',
              backdropFilter: 'blur(20px)',
              color: '#f472b6', padding: '15px 34px',
              borderRadius: '14px', fontWeight: '800',
              fontSize: '0.92rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '1.5px solid rgba(219,39,119,0.25)',
              fontFamily: "'Bricolage Grotesque', sans-serif",
              transition: 'box-shadow 0.3s',
            }}
          >💬 Hire Me</motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants}
          style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}
        >
          {[
            { num: '3+', label: 'Years Exp', color: '#a78bfa' },
            { num: '20+', label: 'Projects', color: '#f472b6' },
            { num: '15+', label: 'Clients', color: '#a78bfa' },
            { num: '5⭐', label: 'Rating', color: '#f472b6' },
          ].map(({ num, label, color }, i) => (
            <motion.div key={i}
              whileHover={{ y: -6, scale: 1.05 }}
              style={{ textAlign: 'center', cursor: 'default' }}
            >
              <motion.div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '1.9rem', fontWeight: '900',
                  color: color, lineHeight: 1,
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
              >{num}</motion.div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', fontWeight: '600', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
        style={{
          height: '100vh', position: 'relative', zIndex: 1,
          transform: `translate(${-mousePos.x * 0.01}px, ${-mousePos.y * 0.01}px)`,
          transition: 'transform 0.15s ease',
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }} style={{ background: 'transparent' }}>
          <Scene />
        </Canvas>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '8px', zIndex: 10,
        }}
      >
        <motion.span
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase' }}
        >Scroll</motion.span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '24px', height: '40px',
            border: '2px solid rgba(124,58,237,0.35)',
            borderRadius: '12px', display: 'flex',
            justifyContent: 'center', paddingTop: '6px',
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '4px', height: '8px',
              background: 'linear-gradient(to bottom, #7c3aed, #db2777)',
              borderRadius: '2px',
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%,100% { border-color: #a78bfa; }
          50% { border-color: transparent; }
        }
        @keyframes glowPulse {
          0%,100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; }
          section > div:last-child { height: 50vh !important; }
        }
      `}</style>
    </section>
  )
}
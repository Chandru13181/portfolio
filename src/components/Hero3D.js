import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'

function FullScreenDots() {
  const count = 700
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [[0.49,0.23,0.93],[0.86,0.15,0.47],[0.655,0.545,0.98],[0.96,0.28,0.71],[0.42,0.16,0.85]]
    for (let i = 0; i < count; i++) {
      positions[i*3]=(Math.random()-0.5)*70; positions[i*3+1]=(Math.random()-0.5)*50; positions[i*3+2]=(Math.random()-0.5)*35
      const c=palette[Math.floor(Math.random()*palette.length)]
      colors[i*3]=c[0]; colors[i*3+1]=c[1]; colors[i*3+2]=c[2]
    }
    return { positions, colors }
  }, [])
  useFrame((s) => { ref.current.rotation.y=s.clock.elapsedTime*0.012; ref.current.rotation.x=Math.sin(s.clock.elapsedTime*0.008)*0.08 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/>
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation/>
    </points>
  )
}

function ConnectionLines() {
  const ref = useRef()
  const count = 28
  const positions = useMemo(() => {
    const pos = new Float32Array(count*6)
    for (let i=0;i<count;i++) {
      pos[i*6]=(Math.random()-0.5)*30; pos[i*6+1]=(Math.random()-0.5)*20; pos[i*6+2]=(Math.random()-0.5)*15
      pos[i*6+3]=(Math.random()-0.5)*30; pos[i*6+4]=(Math.random()-0.5)*20; pos[i*6+5]=(Math.random()-0.5)*15
    }
    return pos
  }, [])
  useFrame((s) => { ref.current.rotation.y=s.clock.elapsedTime*0.018 })
  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count*2} array={positions} itemSize={3}/>
      </bufferGeometry>
      <lineBasicMaterial color="#7c3aed" transparent opacity={0.13}/>
    </lineSegments>
  )
}

function FloatingShape({ position, color, shape, speed=1, scale=1 }) {
  const ref = useRef()
  useFrame((s) => {
    ref.current.rotation.x=s.clock.elapsedTime*speed*0.3
    ref.current.rotation.y=s.clock.elapsedTime*speed*0.5
    ref.current.position.y=position[1]+Math.sin(s.clock.elapsedTime*speed)*0.4
  })
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {shape==='sphere'     && <sphereGeometry args={[0.5,24,24]}/>}
      {shape==='torus'      && <torusGeometry args={[0.42,0.16,14,80]}/>}
      {shape==='octahedron' && <octahedronGeometry args={[0.55]}/>}
      {shape==='box'        && <boxGeometry args={[0.65,0.65,0.65]}/>}
      {shape==='cone'       && <coneGeometry args={[0.38,0.85,24]}/>}
      {shape==='torus2'     && <torusKnotGeometry args={[0.28,0.09,80,14]}/>}
      <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.1} metalness={0.9} emissive={color} emissiveIntensity={0.2}/>
    </mesh>
  )
}

function MainOrb() {
  const ref = useRef()
  useFrame((s) => { ref.current.rotation.x=s.clock.elapsedTime*0.14; ref.current.rotation.y=s.clock.elapsedTime*0.22 })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={[3.5,0,0]}>
        <sphereGeometry args={[1.7,56,56]}/>
        <MeshDistortMaterial color="#5b21b6" distort={0.5} speed={3} roughness={0} metalness={0.95} emissive="#4c1d95" emissiveIntensity={0.4}/>
      </mesh>
    </Float>
  )
}

function OrbitRings() {
  const r1=useRef(), r2=useRef()
  useFrame((s) => {
    r1.current.rotation.x=Math.PI/3; r1.current.rotation.y=s.clock.elapsedTime*0.5; r1.current.position.x=3.5
    r2.current.rotation.x=Math.PI/6; r2.current.rotation.z=s.clock.elapsedTime*0.3; r2.current.position.x=3.5
  })
  return (
    <>
      <mesh ref={r1}><torusGeometry args={[2.6,0.035,14,90]}/><meshStandardMaterial color="#db2777" emissive="#db2777" emissiveIntensity={0.6}/></mesh>
      <mesh ref={r2}><torusGeometry args={[3.2,0.018,14,90]}/><meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.4} transparent opacity={0.6}/></mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.12}/>
      <pointLight position={[10,10,10]} intensity={2} color="#7c3aed"/>
      <pointLight position={[-10,-10,-10]} intensity={1} color="#db2777"/>
      <pointLight position={[0,10,-10]} intensity={0.8} color="#a78bfa"/>
      <pointLight position={[-10,5,5]} intensity={0.6} color="#f472b6"/>
      <Stars radius={200} depth={80} count={5000} factor={5} saturation={0.3} fade speed={0.4}/>
      <FullScreenDots/>
      <ConnectionLines/>
      <MainOrb/>
      <OrbitRings/>
      <FloatingShape position={[-9,3,-5]}  color="#a78bfa" shape="sphere"     speed={0.55} scale={0.45}/>
      <FloatingShape position={[-10,-2,-4]} color="#f472b6" shape="box"       speed={0.65} scale={0.38}/>
      <FloatingShape position={[-8,-4,-6]} color="#7c3aed" shape="octahedron" speed={0.48} scale={0.42}/>
      <FloatingShape position={[-11,1,-5]} color="#db2777" shape="cone"       speed={0.72} scale={0.38}/>
      <FloatingShape position={[-4,2,-3]}  color="#db2777" shape="torus"      speed={0.8}/>
      <FloatingShape position={[1,-1,-2]}  color="#7c3aed" shape="octahedron" speed={1.1} scale={0.7}/>
      <FloatingShape position={[-3,-3,-4]} color="#a78bfa" shape="box"        speed={0.6}/>
      <FloatingShape position={[2,3,-3]}   color="#f472b6" shape="cone"       speed={0.9} scale={0.8}/>
      <FloatingShape position={[-1,-4,-2]} color="#6d28d9" shape="sphere"     speed={0.85} scale={0.7}/>
      <FloatingShape position={[-5,0,-3]}  color="#db2777" shape="torus2"     speed={0.65}/>
      <FloatingShape position={[6,4,-5]}   color="#7c3aed" shape="torus"      speed={1.0} scale={0.8}/>
      <FloatingShape position={[-2,5,-3]}  color="#f472b6" shape="octahedron" speed={0.8}/>
      <FloatingShape position={[1,-5,-3]}  color="#a78bfa" shape="cone"       speed={1.2} scale={0.7}/>
      <FloatingShape position={[7,-2,-5]}  color="#db2777" shape="sphere"     speed={0.9} scale={0.55}/>
    </>
  )
}

const words = ['Designer','Developer','Creator','Innovator']
function TypewriterText() {
  const [displayed,setDisplayed]=useState('')
  const [wordIndex,setWordIndex]=useState(0)
  const [deleting,setDeleting]=useState(false)
  useEffect(()=>{
    const word=words[wordIndex]; let t
    if(!deleting&&displayed.length<word.length) t=setTimeout(()=>setDisplayed(word.slice(0,displayed.length+1)),90)
    else if(!deleting&&displayed.length===word.length) t=setTimeout(()=>setDeleting(true),2000)
    else if(deleting&&displayed.length>0) t=setTimeout(()=>setDisplayed(displayed.slice(0,-1)),55)
    else { setDeleting(false); setWordIndex((wordIndex+1)%words.length) }
    return ()=>clearTimeout(t)
  },[displayed,deleting,wordIndex])
  return (
    <span style={{background:'linear-gradient(135deg,#7c3aed,#db2777)',WebkitBackgroundClip:'text',
      WebkitTextFillColor:'transparent',backgroundClip:'text',
      borderRight:'3px solid #a78bfa',paddingRight:4,animation:'blink 1s step-end infinite'}}>
      {displayed}
    </span>
  )
}

export default function Hero3D() {
  const [mouse,setMouse]=useState({x:0,y:0})
  const [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  },[])

  useEffect(()=>{
    if (isMobile) return
    const fn=(e)=>setMouse({x:(e.clientX/window.innerWidth-0.5)*12,y:(e.clientY/window.innerHeight-0.5)*12})
    window.addEventListener('mousemove',fn)
    return ()=>window.removeEventListener('mousemove',fn)
  },[isMobile])

  const handleDownload = () => {
    fetch('/resume.pdf').then(r=>r.blob()).then(blob=>{
      const url=URL.createObjectURL(blob); const a=document.createElement('a')
      a.href=url; a.download='Chandru_Resume.pdf'
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(()=>window.open('/resume.pdf','_blank'))
  }

  const cV={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:0.11,delayChildren:0.25}}}
  const iV={hidden:{opacity:0,y:28},visible:{opacity:1,y:0,transition:{duration:0.65,type:'spring',stiffness:80}}}

  return (
    <section style={{
      minHeight:'100vh', position:'relative', overflow:'hidden',
      background:'linear-gradient(135deg,#050210 0%,#0a0514 40%,#0d0520 100%)',
    }}>

      {/* 3D Canvas — full page background */}
      <div style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none'}}>
        <Canvas
          camera={{position:[0,0,8],fov:70}}
          style={{background:'transparent'}}
          dpr={[1, isMobile ? 1 : 1.5]}
          performance={{min:0.5}}>
          <Scene/>
        </Canvas>
      </div>

      {/* Glow orbs */}
      <div style={{position:'absolute',top:'10%',left:'5%',width:320,height:320,background:'radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:1,animation:'glowPulse 4s ease-in-out infinite'}}/>
      <div style={{position:'absolute',bottom:'10%',right:'5%',width:240,height:240,background:'radial-gradient(circle,rgba(219,39,119,0.08),transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:1,animation:'glowPulse 5s ease-in-out infinite reverse'}}/>

      {/* ── TEXT CONTENT ── */}
      <div style={{
        position:'relative', zIndex:2,
        minHeight:'100vh', display:'flex', alignItems:'center',
        /* desktop: left-aligned | mobile: centered */
        padding: isMobile ? '90px 20px 40px' : '0 80px',
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}>
        <motion.div
          variants={cV} initial="hidden" animate="visible"
          style={{
            maxWidth: isMobile ? '100%' : 560,
            width:'100%',
            textAlign: isMobile ? 'center' : 'left',
            transform: isMobile ? 'none' : `translate(${mouse.x*0.018}px,${mouse.y*0.018}px)`,
            transition:'transform 0.15s ease',
          }}>

          {/* Badge */}
          <motion.div variants={iV} style={{
            display:'inline-flex', alignItems:'center', gap:9,
            background:'rgba(124,58,237,0.12)', border:'1px solid rgba(124,58,237,0.28)',
            borderRadius:50, padding:'8px 18px', marginBottom:20, backdropFilter:'blur(10px)',
          }}>
            <motion.span animate={{scale:[1,1.5,1],opacity:[1,0.3,1]}} transition={{duration:1.5,repeat:Infinity}}
              style={{width:7,height:7,borderRadius:'50%',background:'#10b981',display:'block'}}/>
            <span style={{color:'#a78bfa',fontWeight:700,fontSize:'0.82rem',fontFamily:"'Inter',sans-serif"}}>
              Available for Freelance ✨
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={iV} style={{
            color:'rgba(255,255,255,0.35)', fontSize:'0.72rem', fontWeight:700,
            letterSpacing:'4px', textTransform:'uppercase', marginBottom:12,
            fontFamily:"'Inter',sans-serif",
          }}>
            Hello World 👋 I'm a
          </motion.p>

          {/* H1 */}
          <motion.h1 variants={iV} style={{
            fontFamily:"'Inter',sans-serif",
            fontSize: isMobile ? 'clamp(1.7rem,7vw,2.2rem)' : 'clamp(1.8rem,3vw,3rem)',
            fontWeight:900, lineHeight:1.1, marginBottom:16, letterSpacing:'-1px',
          }}>
            <span style={{color:'white'}}>UI/UX </span>
            <span style={{background:'linear-gradient(135deg,#a78bfa,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Designer</span>
            <br/>
            <span style={{color:'white'}}>& Creative </span>
            <TypewriterText/>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={iV} style={{
            color:'rgba(255,255,255,0.45)', fontSize:'0.88rem', lineHeight:1.8,
            maxWidth: isMobile ? '100%' : 420,
            margin: isMobile ? '0 auto 28px' : '0 0 28px',
            fontFamily:"'Inter',sans-serif",
          }}>
            Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
          </motion.p>

          {/* Buttons */}
          <motion.div variants={iV} style={{
            display:'flex', gap:10, flexWrap:'wrap', marginBottom:32,
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            <motion.button onClick={handleDownload}
              whileHover={{scale:1.04,y:-3,boxShadow:'0 18px 40px rgba(124,58,237,0.45)'}}
              whileTap={{scale:0.97}}
              style={{background:'linear-gradient(135deg,#7c3aed,#db2777)',color:'white',
                padding:'11px 24px',borderRadius:12,fontWeight:700,fontSize:'0.85rem',
                display:'inline-flex',alignItems:'center',gap:7,
                boxShadow:'0 8px 22px rgba(124,58,237,0.3)',
                fontFamily:"'Inter',sans-serif",border:'none',cursor:'pointer'}}>
              <motion.span animate={{y:[0,-3,0]}} transition={{duration:1.5,repeat:Infinity}}>⬇</motion.span>
              Download CV
            </motion.button>

            <motion.a href="#projects"
              whileHover={{scale:1.04,y:-3}}
              whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',
                color:'white',padding:'11px 24px',borderRadius:12,fontWeight:700,
                fontSize:'0.85rem',textDecoration:'none',
                display:'inline-flex',alignItems:'center',gap:7,
                border:'1.5px solid rgba(255,255,255,0.12)',
                fontFamily:"'Inter',sans-serif",transition:'all 0.3s'}}>
              🚀 View Work
            </motion.a>

            <motion.a href="#contact"
              whileHover={{scale:1.04,y:-3,boxShadow:'0 18px 40px rgba(219,39,119,0.38)'}}
              whileTap={{scale:0.97}}
              style={{background:'rgba(219,39,119,0.1)',backdropFilter:'blur(20px)',
                color:'#f472b6',padding:'11px 24px',borderRadius:12,fontWeight:700,
                fontSize:'0.85rem',textDecoration:'none',
                display:'inline-flex',alignItems:'center',gap:7,
                border:'1.5px solid rgba(219,39,119,0.22)',
                fontFamily:"'Inter',sans-serif",transition:'box-shadow 0.3s'}}>
              💬 Hire Me
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={iV} style={{
            display:'flex', gap: isMobile ? 20 : 32,
            flexWrap:'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            {[
              {num:'3+', label:'Years Exp', color:'#a78bfa'},
              {num:'20+',label:'Projects',  color:'#f472b6'},
              {num:'15+',label:'Clients',   color:'#a78bfa'},
              {num:'5⭐',label:'Rating',    color:'#f472b6'},
            ].map(({num,label,color},i)=>(
              <motion.div key={i} whileHover={{y:-4,scale:1.05}} style={{textAlign:'center',cursor:'default'}}>
                <motion.div style={{
                  fontFamily:"'Inter',sans-serif",
                  fontSize: isMobile ? '1.4rem' : '1.7rem',
                  fontWeight:900, color, lineHeight:1,
                }} animate={{opacity:[0.7,1,0.7]}} transition={{duration:2+i*0.5,repeat:Infinity}}>
                  {num}
                </motion.div>
                <div style={{color:'rgba(255,255,255,0.35)',fontSize:'0.62rem',fontWeight:600,
                  marginTop:3,letterSpacing:'1px',textTransform:'uppercase',
                  fontFamily:"'Inter',sans-serif"}}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}
        style={{position:'absolute',bottom:isMobile?16:24,left:'50%',
          transform:'translateX(-50%)',display:'flex',flexDirection:'column',
          alignItems:'center',gap:6,zIndex:10}}>
        <motion.span animate={{opacity:[0.3,0.8,0.3]}} transition={{duration:2,repeat:Infinity}}
          style={{color:'rgba(255,255,255,0.28)',fontSize:'0.6rem',fontWeight:700,
            letterSpacing:'4px',textTransform:'uppercase',fontFamily:"'Inter',sans-serif"}}>
          Scroll
        </motion.span>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:1.5,repeat:Infinity}}
          style={{width:22,height:36,border:'1.5px solid rgba(124,58,237,0.3)',
            borderRadius:11,display:'flex',justifyContent:'center',paddingTop:5}}>
          <motion.div animate={{y:[0,10,0],opacity:[1,0,1]}} transition={{duration:1.5,repeat:Infinity}}
            style={{width:3,height:6,background:'linear-gradient(to bottom,#7c3aed,#db2777)',borderRadius:2}}/>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink{0%,100%{border-color:#a78bfa}50%{border-color:transparent}}
        @keyframes glowPulse{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.15);opacity:1}}
      `}</style>
    </section>
  )
}
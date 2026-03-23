import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'

function FullScreenDots() {
  const count = 400
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [[0.49,0.23,0.93],[0.86,0.15,0.47],[0.655,0.545,0.98],[0.96,0.28,0.71]]
    for (let i = 0; i < count; i++) {
      positions[i*3]=(Math.random()-0.5)*70; positions[i*3+1]=(Math.random()-0.5)*50; positions[i*3+2]=(Math.random()-0.5)*35
      const c=palette[Math.floor(Math.random()*palette.length)]
      colors[i*3]=c[0]; colors[i*3+1]=c[1]; colors[i*3+2]=c[2]
    }
    return { positions, colors }
  }, [])
  useFrame((s) => { ref.current.rotation.y=s.clock.elapsedTime*0.012 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3}/>
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3}/>
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation/>
    </points>
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

function Scene({ isMobile }) {
  return (
    <>
      <ambientLight intensity={0.12}/>
      <pointLight position={[10,10,10]} intensity={2} color="#7c3aed"/>
      <pointLight position={[-10,-10,-10]} intensity={1} color="#db2777"/>
      <Stars radius={200} depth={80} count={isMobile?1500:4000} factor={5} saturation={0.3} fade speed={0.4}/>
      <FullScreenDots/>
      {!isMobile && <FloatingShape position={[-4,2,-3]}  color="#db2777" shape="torus"      speed={0.8}/>}
      {!isMobile && <FloatingShape position={[1,-1,-2]}  color="#7c3aed" shape="octahedron" speed={1.1} scale={0.7}/>}
      {!isMobile && <FloatingShape position={[-3,-3,-4]} color="#a78bfa" shape="box"        speed={0.6}/>}
      {!isMobile && <FloatingShape position={[2,3,-3]}   color="#f472b6" shape="cone"       speed={0.9} scale={0.8}/>}
      {!isMobile && <FloatingShape position={[-1,-4,-2]} color="#6d28d9" shape="sphere"     speed={0.85} scale={0.7}/>}
      {!isMobile && <MainOrb/>}
      {!isMobile && <OrbitRings/>}
      {!isMobile && <FloatingShape position={[-9,3,-5]} color="#a78bfa" shape="sphere" speed={0.55} scale={0.45}/>}
      {!isMobile && <FloatingShape position={[6,4,-5]}  color="#7c3aed" shape="torus"  speed={1.0}  scale={0.8}/>}
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
  const [isMobile,setIsMobile]=useState(false)

  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<=768)
    check()
    window.addEventListener('resize',check)
    return ()=>window.removeEventListener('resize',check)
  },[])

  useEffect(()=>{
    if(isMobile) return
    const fn=(e)=>setMouse({x:(e.clientX/window.innerWidth-0.5)*12,y:(e.clientY/window.innerHeight-0.5)*12})
    window.addEventListener('mousemove',fn)
    return ()=>window.removeEventListener('mousemove',fn)
  },[isMobile])

  const handleDownload=()=>{
    fetch('/resume.pdf').then(r=>r.blob()).then(blob=>{
      const url=URL.createObjectURL(blob); const a=document.createElement('a')
      a.href=url; a.download='Chandru_Resume.pdf'
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(()=>window.open('/resume.pdf','_blank'))
  }

  const cV={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:0.1,delayChildren:0.15}}}
  const iV={hidden:{opacity:0,y:18},visible:{opacity:1,y:0,transition:{duration:0.55,type:'spring',stiffness:85}}}

  if (isMobile) {
    return (
      <section style={{
        position:'relative', overflow:'hidden',
        background:'linear-gradient(135deg,#050210 0%,#0a0514 40%,#0d0520 100%)',
        /* ✅ MOBILE: paddingTop = navbar height */
        paddingTop:'60px', paddingBottom:'20px',
        paddingLeft:'20px', paddingRight:'20px',
        minHeight:'100vh',
        display:'flex', flexDirection:'column', justifyContent:'center',
      }}>
        {/* 3D bg */}
        <div style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none'}}>
          <Canvas camera={{position:[0,0,8],fov:90}} style={{background:'transparent'}} dpr={[1,1]} performance={{min:0.5}}>
            <Scene isMobile={true}/>
          </Canvas>
        </div>

        {/* Content */}
        <motion.div variants={cV} initial="hidden" animate="visible"
          style={{position:'relative',zIndex:2,textAlign:'center',width:'100%'}}>

          <motion.div variants={iV} style={{display:'inline-flex',alignItems:'center',gap:7,
            background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.28)',
            borderRadius:50,padding:'6px 14px',marginBottom:12,backdropFilter:'blur(10px)'}}>
            <motion.span animate={{scale:[1,1.5,1],opacity:[1,0.3,1]}} transition={{duration:1.5,repeat:Infinity}}
              style={{width:6,height:6,borderRadius:'50%',background:'#10b981',display:'block'}}/>
            <span style={{color:'#a78bfa',fontWeight:700,fontSize:'0.78rem',fontFamily:"'Inter',sans-serif"}}>
              Available for Freelance ✨
            </span>
          </motion.div>

          <motion.p variants={iV} style={{color:'rgba(255,255,255,0.35)',fontSize:'0.62rem',
            fontWeight:700,letterSpacing:'3.5px',textTransform:'uppercase',
            marginBottom:8,fontFamily:"'Inter',sans-serif"}}>
          👋 I'm a
          </motion.p>

          <motion.h1 variants={iV} style={{fontFamily:"'Inter',sans-serif",
            fontSize:'clamp(1.5rem,6.5vw,1.9rem)',
            fontWeight:900,lineHeight:1.15,marginBottom:10,letterSpacing:'-0.3px'}}>
            <span style={{color:'white'}}>UI/UX </span>
            <span style={{background:'linear-gradient(135deg,#a78bfa,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Designer</span>
            <br/>
            <span style={{color:'white'}}>& Creative </span>
            <TypewriterText/>
          </motion.h1>

          <motion.p variants={iV} style={{color:'rgba(255,255,255,0.45)',fontSize:'0.82rem',
            lineHeight:1.7,margin:'0 auto 16px',fontFamily:"'Inter',sans-serif",maxWidth:320}}>
            Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
          </motion.p>

          <motion.div variants={iV} style={{display:'flex',gap:8,flexWrap:'wrap',
            justifyContent:'center',marginBottom:18}}>
            <motion.button onClick={handleDownload} whileTap={{scale:0.97}}
              style={{background:'linear-gradient(135deg,#7c3aed,#db2777)',color:'white',
                padding:'9px 18px',borderRadius:10,fontWeight:700,fontSize:'0.8rem',
                display:'inline-flex',alignItems:'center',gap:6,
                fontFamily:"'Inter',sans-serif",border:'none',cursor:'pointer',
                boxShadow:'0 6px 18px rgba(124,58,237,0.3)'}}>
              ⬇ Download CV
            </motion.button>
            <motion.a href="#projects" whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.06)',color:'white',padding:'9px 18px',
                borderRadius:10,fontWeight:700,fontSize:'0.8rem',textDecoration:'none',
                display:'inline-flex',alignItems:'center',gap:6,
                border:'1.5px solid rgba(255,255,255,0.12)',fontFamily:"'Inter',sans-serif"}}>
              🚀 View Work
            </motion.a>
            <motion.a href="#contact" whileTap={{scale:0.97}}
              style={{background:'rgba(219,39,119,0.1)',color:'#f472b6',padding:'9px 18px',
                borderRadius:10,fontWeight:700,fontSize:'0.8rem',textDecoration:'none',
                display:'inline-flex',alignItems:'center',gap:6,
                border:'1.5px solid rgba(219,39,119,0.22)',fontFamily:"'Inter',sans-serif"}}>
              💬 Hire Me
            </motion.a>
          </motion.div>

          <motion.div variants={iV} style={{display:'flex',gap:18,justifyContent:'center',flexWrap:'wrap'}}>
            {[{num:'3+',label:'Years Exp',color:'#a78bfa'},{num:'20+',label:'Projects',color:'#f472b6'},
              {num:'15+',label:'Clients',color:'#a78bfa'},{num:'5⭐',label:'Rating',color:'#f472b6'}].map(({num,label,color},i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:'1.2rem',fontWeight:900,color,lineHeight:1}}>{num}</div>
                <div style={{color:'rgba(255,255,255,0.35)',fontSize:'0.58rem',fontWeight:600,
                  marginTop:2,letterSpacing:'1px',textTransform:'uppercase',fontFamily:"'Inter',sans-serif"}}>{label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
            style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,marginTop:20}}>
            <span style={{color:'rgba(255,255,255,0.22)',fontSize:'0.55rem',fontWeight:700,
              letterSpacing:'3px',textTransform:'uppercase',fontFamily:"'Inter',sans-serif"}}>Scroll</span>
            <motion.div animate={{y:[0,6,0]}} transition={{duration:1.5,repeat:Infinity}}
              style={{width:18,height:28,border:'1.5px solid rgba(124,58,237,0.28)',
                borderRadius:9,display:'flex',justifyContent:'center',paddingTop:4}}>
              <motion.div animate={{y:[0,8,0],opacity:[1,0,1]}} transition={{duration:1.5,repeat:Infinity}}
                style={{width:2,height:4,background:'linear-gradient(to bottom,#7c3aed,#db2777)',borderRadius:2}}/>
            </motion.div>
          </motion.div>
        </motion.div>
        <style>{`@keyframes blink{0%,100%{border-color:#a78bfa}50%{border-color:transparent}}`}</style>
      </section>
    )
  }

  // ── DESKTOP ──
  return (
    <section style={{minHeight:'100vh',position:'relative',overflow:'hidden',
      background:'linear-gradient(135deg,#050210 0%,#0a0514 40%,#0d0520 100%)'}}>
      <div style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none'}}>
        <Canvas camera={{position:[0,0,8],fov:70}} style={{background:'transparent'}} dpr={[1,1.5]} performance={{min:0.5}}>
          <Scene isMobile={false}/>
        </Canvas>
      </div>
      <div style={{position:'absolute',top:'10%',left:'5%',width:320,height:320,background:'radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)',borderRadius:'50%',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'relative',zIndex:2,minHeight:'100vh',display:'flex',alignItems:'center',padding:'0 80px'}}>
        <motion.div variants={cV} initial="hidden" animate="visible"
          style={{maxWidth:560,transform:`translate(${mouse.x*0.018}px,${mouse.y*0.018}px)`,transition:'transform 0.15s ease'}}>
          <motion.div variants={iV} style={{display:'inline-flex',alignItems:'center',gap:9,
            background:'rgba(124,58,237,0.12)',border:'1px solid rgba(124,58,237,0.28)',
            borderRadius:50,padding:'8px 18px',marginBottom:20,backdropFilter:'blur(10px)'}}>
            <motion.span animate={{scale:[1,1.5,1],opacity:[1,0.3,1]}} transition={{duration:1.5,repeat:Infinity}}
              style={{width:7,height:7,borderRadius:'50%',background:'#10b981',display:'block'}}/>
            <span style={{color:'#a78bfa',fontWeight:700,fontSize:'0.82rem',fontFamily:"'Inter',sans-serif"}}>Available for Freelance ✨</span>
          </motion.div>
          <motion.p variants={iV} style={{color:'rgba(255,255,255,0.35)',fontSize:'0.72rem',fontWeight:700,
            letterSpacing:'4px',textTransform:'uppercase',marginBottom:12,fontFamily:"'Inter',sans-serif"}}>
         👋 I'm a
          </motion.p>
          <motion.h1 variants={iV} style={{fontFamily:"'Inter',sans-serif",
            fontSize:'clamp(1.8rem,3vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:16,letterSpacing:'-1px'}}>
            <span style={{color:'white'}}>UI/UX </span>
            <span style={{background:'linear-gradient(135deg,#a78bfa,#f472b6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Designer</span>
            <br/><span style={{color:'white'}}>& Creative </span><TypewriterText/>
          </motion.h1>
          <motion.p variants={iV} style={{color:'rgba(255,255,255,0.45)',fontSize:'0.92rem',lineHeight:1.8,maxWidth:420,marginBottom:28,fontFamily:"'Inter',sans-serif"}}>
            Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
          </motion.p>
          <motion.div variants={iV} style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:32}}>
            <motion.button onClick={handleDownload} whileHover={{scale:1.04,y:-3}} whileTap={{scale:0.97}}
              style={{background:'linear-gradient(135deg,#7c3aed,#db2777)',color:'white',padding:'11px 24px',
                borderRadius:11,fontWeight:700,fontSize:'0.85rem',display:'inline-flex',alignItems:'center',gap:7,
                boxShadow:'0 8px 22px rgba(124,58,237,0.3)',fontFamily:"'Inter',sans-serif",border:'none',cursor:'pointer'}}>
              <motion.span animate={{y:[0,-3,0]}} transition={{duration:1.5,repeat:Infinity}}>⬇</motion.span> Download CV
            </motion.button>
            <motion.a href="#projects" whileHover={{scale:1.04,y:-3}} whileTap={{scale:0.97}}
              style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',color:'white',padding:'11px 24px',
                borderRadius:11,fontWeight:700,fontSize:'0.85rem',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:7,
                border:'1.5px solid rgba(255,255,255,0.12)',fontFamily:"'Inter',sans-serif"}}>
              🚀 View Work
            </motion.a>
            <motion.a href="#contact" whileHover={{scale:1.04,y:-3}} whileTap={{scale:0.97}}
              style={{background:'rgba(219,39,119,0.1)',color:'#f472b6',padding:'11px 24px',
                borderRadius:11,fontWeight:700,fontSize:'0.85rem',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:7,
                border:'1.5px solid rgba(219,39,119,0.22)',fontFamily:"'Inter',sans-serif"}}>
              💬 Hire Me
            </motion.a>
          </motion.div>
          <motion.div variants={iV} style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[{num:'3+',label:'Years Exp',color:'#a78bfa'},{num:'20+',label:'Projects',color:'#f472b6'},
              {num:'15+',label:'Clients',color:'#a78bfa'},{num:'5⭐',label:'Rating',color:'#f472b6'}].map(({num,label,color},i)=>(
              <motion.div key={i} whileHover={{y:-4,scale:1.05}} style={{textAlign:'center',cursor:'default'}}>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:'1.7rem',fontWeight:900,color,lineHeight:1}}>{num}</div>
                <div style={{color:'rgba(255,255,255,0.35)',fontSize:'0.62rem',fontWeight:600,marginTop:3,letterSpacing:'1px',textTransform:'uppercase',fontFamily:"'Inter',sans-serif"}}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}}
        style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:6,zIndex:10}}>
        <span style={{color:'rgba(255,255,255,0.28)',fontSize:'0.6rem',fontWeight:700,letterSpacing:'4px',textTransform:'uppercase',fontFamily:"'Inter',sans-serif"}}>Scroll</span>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:1.5,repeat:Infinity}}
          style={{width:22,height:36,border:'1.5px solid rgba(124,58,237,0.3)',borderRadius:11,display:'flex',justifyContent:'center',paddingTop:5}}>
          <motion.div animate={{y:[0,10,0],opacity:[1,0,1]}} transition={{duration:1.5,repeat:Infinity}}
            style={{width:3,height:6,background:'linear-gradient(to bottom,#7c3aed,#db2777)',borderRadius:2}}/>
        </motion.div>
      </motion.div>
      <style>{`@keyframes blink{0%,100%{border-color:#a78bfa}50%{border-color:transparent}}`}</style>
    </section>
  )
}

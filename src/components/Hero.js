import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const words = ["Designer", "Developer", "Creator", "Problem Solver"]

function TypewriterText() {
  const [index,     setIndex]     = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const word = words[index]
    let t
    if (!deleting && displayed.length < word.length)
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90)
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    else { setDeleting(false); setIndex((index + 1) % words.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, index])

  return (
    <span style={{
      background:"linear-gradient(135deg,#7c3aed,#db2777)",
      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
      borderRight:"3px solid #7c3aed", paddingRight:"2px",
      animation:"cursorBlink 1s step-end infinite",
    }}>{displayed}</span>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y       = useTransform(scrollYProgress, [0,1], [0,-60])
  const opacity = useTransform(scrollYProgress, [0,0.5], [1,0])

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = "/portfolio/resume.pdf"
    a.setAttribute("download","Chandru_Resume.pdf")
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })
  }

  return (
    <section ref={ref} style={{
      minHeight:"100vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      textAlign:"center",
      background:"linear-gradient(145deg,#050210 0%,#0a0520 50%,#05020f 100%)",
      padding:"100px 20px 60px",
      position:"relative", overflow:"hidden",
    }}>

      {/* Glow orbs — hidden on mobile */}
      <div className="hero-orbs">
        {[
          { w:500, h:500, bg:"rgba(124,58,237,0.1)", top:"-10%", right:"-8%", dur:"14s" },
          { w:380, h:380, bg:"rgba(219,39,119,0.08)", bottom:"-8%", left:"-6%", dur:"17s", rev:true },
        ].map((o,i) => (
          <div key={i} style={{
            position:"absolute", width:o.w, height:o.h, borderRadius:"50%", pointerEvents:"none",
            background:`radial-gradient(circle,${o.bg},transparent 70%)`,
            top:o.top, right:o.right, bottom:o.bottom, left:o.left,
            animation:`orbAnim ${o.dur} ease-in-out infinite ${o.rev?"reverse":""}`,
          }}/>
        ))}
      </div>

      {/* Floating dots — fewer on mobile */}
      {Array.from({length:12},(_,i)=>i).map(i => (
        <motion.div key={i}
          style={{
            position:"absolute",
            left:`${5+Math.random()*90}%`, top:`${5+Math.random()*90}%`,
            width:Math.random()*3+2, height:Math.random()*3+2,
            borderRadius:"50%", pointerEvents:"none",
            background: i%2===0?"rgba(124,58,237,0.4)":"rgba(219,39,119,0.3)",
          }}
          animate={{ y:[-10,10,-10], opacity:[0.2,0.6,0.2] }}
          transition={{ duration:3+Math.random()*4, repeat:Infinity, delay:Math.random()*3 }}/>
      ))}

      <motion.div style={{ y, opacity, position:"relative", zIndex:2, width:"100%", maxWidth:680 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, scale:0.6, y:-16 }}
          animate={{ opacity:1, scale:1, y:0 }}
          transition={{ duration:0.7, type:"spring", bounce:0.5 }}
          style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(124,58,237,0.1)", backdropFilter:"blur(16px)",
            border:"1px solid rgba(124,58,237,0.25)", borderRadius:"50px",
            padding:"7px 18px", marginBottom:"22px",
            fontFamily:"'Inter',sans-serif",
            fontSize:"0.8rem", fontWeight:700, color:"#a78bfa",
          }}>
          <motion.span style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"block" }}
            animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ duration:1.5, repeat:Infinity }}/>
          Available for Freelance Work ✨
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.2 }}
          style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:700,
            letterSpacing:"4px", textTransform:"uppercase",
            color:"rgba(255,255,255,0.38)", marginBottom:"14px" }}>
          Hello World 👋 I'm a
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.85, delay:0.35, type:"spring", stiffness:75 }}
          style={{ fontFamily:"'Inter',sans-serif",
            fontSize:"clamp(1.8rem, 5vw, 3.6rem)",
            fontWeight:900, lineHeight:1.1, color:"white",
            letterSpacing:"-1px", marginBottom:"18px" }}>
          UI/UX{" "}
          <span style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Designer
          </span>
          <br/>
          &amp; Creative <TypewriterText/>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.6 }}
          style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,0.5)",
            fontSize:"0.9rem", maxWidth:"420px", lineHeight:"1.8",
            margin:"0 auto 36px", fontWeight:400 }}>
          Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.8 }}
          style={{ display:"flex", gap:"10px", justifyContent:"center",
            flexWrap:"wrap", marginBottom:"36px" }}>

          <motion.button onClick={handleDownload}
            whileHover={{ scale:1.04, y:-3, boxShadow:"0 20px 44px rgba(124,58,237,0.4)" }}
            whileTap={{ scale:0.97 }}
            style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white",
              padding:"11px 26px", borderRadius:"12px", fontWeight:700, fontSize:"0.86rem",
              display:"inline-flex", alignItems:"center", gap:7,
              boxShadow:"0 10px 28px rgba(124,58,237,0.3)",
              fontFamily:"'Inter',sans-serif", border:"none", cursor:"pointer" }}>
            ⬇ Download CV
          </motion.button>

          <motion.button onClick={()=>scrollTo("projects")}
            whileHover={{ scale:1.04, y:-3 }} whileTap={{ scale:0.97 }}
            style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(16px)",
              color:"white", padding:"11px 26px", borderRadius:"12px", fontWeight:700,
              fontSize:"0.86rem", display:"inline-flex", alignItems:"center", gap:7,
              border:"1.5px solid rgba(124,58,237,0.25)",
              fontFamily:"'Inter',sans-serif", cursor:"pointer" }}>
            🚀 View Work
          </motion.button>

          <motion.button onClick={()=>scrollTo("contact")}
            whileHover={{ scale:1.04, y:-3, boxShadow:"0 20px 44px rgba(219,39,119,0.35)" }}
            whileTap={{ scale:0.97 }}
            style={{ background:"linear-gradient(135deg,#db2777,#7c3aed)", color:"white",
              padding:"11px 26px", borderRadius:"12px", fontWeight:700, fontSize:"0.86rem",
              display:"inline-flex", alignItems:"center", gap:7,
              boxShadow:"0 10px 28px rgba(219,39,119,0.25)",
              fontFamily:"'Inter',sans-serif", border:"none", cursor:"pointer" }}>
            💬 Hire Me
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.85, delay:0.95 }}
          style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { num:"3+",  label:"Years Exp", icon:"🏆" },
            { num:"20+", label:"Projects",  icon:"🚀" },
            { num:"15+", label:"Clients",   icon:"🤝" },
            { num:"5⭐", label:"Rating",    icon:"✨" },
          ].map(({ num, label, icon }, i) => (
            <motion.div key={i}
              initial={{ opacity:0, scale:0.7 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:1.05+i*0.08, type:"spring", bounce:0.4 }}
              whileHover={{ scale:1.05, y:-4 }}
              style={{ background:"rgba(124,58,237,0.08)", backdropFilter:"blur(16px)",
                border:"1px solid rgba(124,58,237,0.16)",
                padding:"13px 18px", borderRadius:"14px",
                textAlign:"center", cursor:"default", minWidth:"80px" }}>
              <div style={{ fontSize:"1rem", marginBottom:4 }}>{icon}</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.3rem", fontWeight:900,
                background:"linear-gradient(135deg,#7c3aed,#db2777)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                lineHeight:1, marginBottom:3 }}>{num}</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem", fontWeight:700,
                color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.8px" }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.6 }}
          style={{ marginTop:"36px", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
            color:"rgba(255,255,255,0.28)", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase" }}>
            Scroll
          </span>
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}
            style={{ width:"22px", height:"36px", border:"1.5px solid rgba(124,58,237,0.28)",
              borderRadius:"11px", display:"flex", justifyContent:"center", paddingTop:5 }}>
            <motion.div animate={{ y:[0,10,0], opacity:[1,0,1] }} transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:3, height:6, background:"linear-gradient(to bottom,#7c3aed,#db2777)", borderRadius:2 }}/>
          </motion.div>
        </motion.div>

      </motion.div>

      <style>{`
        @keyframes cursorBlink{0%,100%{border-color:#7c3aed}50%{border-color:transparent}}
        @keyframes orbAnim{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.04)}66%{transform:translate(-15px,15px) scale(0.97)}}

        /* ── TABLET ── */
        @media(max-width:768px){
          .hero-orbs{ display:none }
          section[id=""] h1, section h1{ font-size:clamp(1.6rem,6vw,2.4rem)!important }
        }

        /* ── MOBILE ── */
        @media(max-width:480px){
          section{ padding:90px 16px 40px!important }
          section h1{ font-size:clamp(1.5rem,7vw,2rem)!important; letter-spacing:-0.5px!important }
          section p{ font-size:0.82rem!important }
          /* buttons stack nicely */
          section .hero-btns{ flex-direction:column!important; align-items:center!important }
          section .hero-btns button{ width:100%!important; max-width:280px!important }
          /* stats smaller */
          section .hero-stats>div{ min-width:70px!important; padding:10px 12px!important }
          /* reduce bottom gap */
          section .hero-scroll{ margin-top:24px!important }
        }
      `}</style>
    </section>
  )
}

export default Hero
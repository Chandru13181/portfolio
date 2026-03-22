import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const words = ["Designer", "Developer", "Creator", "Problem Solver"]

/* ── Typewriter ── */
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

/* ── Hero ── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y       = useTransform(scrollYProgress, [0,1], [0,-80])
  const opacity = useTransform(scrollYProgress, [0,0.5], [1,0])

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = "/resume.pdf"; a.setAttribute("download","Chandru_Resume.pdf")
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
      /* dark background — matches rest of site */
      background:"linear-gradient(145deg,#050210 0%,#0a0520 50%,#05020f 100%)",
      padding:"120px 24px 80px",
      position:"relative", overflow:"hidden",
    }}>

      {/* Glow orbs */}
      {[
        { w:600, h:600, bg:"rgba(124,58,237,0.12)", top:"-15%", right:"-10%", dur:"14s" },
        { w:450, h:450, bg:"rgba(219,39,119,0.09)", bottom:"-10%", left:"-8%",  dur:"17s", rev:true },
        { w:300, h:300, bg:"rgba(124,58,237,0.07)", top:"42%",    left:"12%",   dur:"11s" },
      ].map((o,i) => (
        <div key={i} style={{
          position:"absolute", width:o.w, height:o.h, borderRadius:"50%", pointerEvents:"none",
          background:`radial-gradient(circle,${o.bg},transparent 70%)`,
          top:o.top, right:o.right, bottom:o.bottom, left:o.left,
          animation:`orbAnim ${o.dur} ease-in-out infinite ${o.rev?"reverse":""}`,
        }}/>
      ))}

      {/* Floating dots */}
      {Array.from({length:16},(_,i)=>i).map(i => (
        <motion.div key={i}
          style={{
            position:"absolute",
            left:`${5+Math.random()*90}%`, top:`${5+Math.random()*90}%`,
            width:Math.random()*3+2, height:Math.random()*3+2,
            borderRadius:"50%", pointerEvents:"none",
            background: i%2===0?"rgba(124,58,237,0.45)":"rgba(219,39,119,0.35)",
          }}
          animate={{ y:[-12,12,-12], opacity:[0.25,0.7,0.25] }}
          transition={{ duration:3+Math.random()*4, repeat:Infinity, delay:Math.random()*3 }}/>
      ))}

      <motion.div style={{ y, opacity, position:"relative", zIndex:2, width:"100%" }}>

        {/* ── "Available" badge → Inter 0.82rem ── */}
        <motion.div
          initial={{ opacity:0, scale:0.6, y:-18 }}
          animate={{ opacity:1, scale:1,   y:0   }}
          transition={{ duration:0.7, type:"spring", bounce:0.5 }}
          style={{
            display:"inline-flex", alignItems:"center", gap:9,
            background:"rgba(124,58,237,0.1)",
            backdropFilter:"blur(16px)",
            border:"1px solid rgba(124,58,237,0.25)",
            borderRadius:"50px", padding:"8px 20px", marginBottom:"28px",
            fontFamily:"'Inter',sans-serif",
            fontSize:"0.82rem", fontWeight:700, color:"#a78bfa",
            boxShadow:"0 6px 24px rgba(124,58,237,0.15)",
          }}>
          <motion.span
            style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"block" }}
            animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }}
            transition={{ duration:1.5, repeat:Infinity }}/>
          Available for Freelance Work ✨
        </motion.div>

        {/* ── Greeting → Inter 0.75rem ── */}
        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.22 }}
          style={{
            fontFamily:"'Inter',sans-serif",
            fontSize:"0.75rem", fontWeight:700,
            letterSpacing:"4px", textTransform:"uppercase",
            color:"rgba(255,255,255,0.4)", marginBottom:"16px",
          }}>
          Hello World 👋 I'm a
        </motion.p>

        {/* ── Main H1 → Inter clamp(2rem,5vw,3.8rem) ── */}
        <motion.h1
          initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:0.38, type:"spring", stiffness:75 }}
          style={{
            fontFamily:"'Inter',sans-serif",
            fontSize:"clamp(2rem, 5vw, 3.8rem)",
            fontWeight:900,
            lineHeight:1.1,
            color:"white",
            letterSpacing:"-1px",
            marginBottom:"20px",
          }}>
          UI/UX{" "}
          <span style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Designer
          </span>
          <br/>
          &amp; Creative <TypewriterText/>
        </motion.h1>

        {/* ── Subtitle → Inter 0.95rem ── */}
        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.65 }}
          style={{
            fontFamily:"'Inter',sans-serif",
            color:"rgba(255,255,255,0.52)",
            fontSize:"0.95rem",
            maxWidth:"440px", lineHeight:"1.8",
            margin:"0 auto 44px", fontWeight:400,
          }}>
          Crafting immersive 3D digital experiences that blend stunning aesthetics with seamless functionality ✨
        </motion.p>

        {/* ── Buttons → Inter 0.88rem ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.85 }}
          style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"60px" }}>

          {/* Download CV */}
          <motion.button onClick={handleDownload}
            whileHover={{ scale:1.04, y:-4, boxShadow:"0 22px 48px rgba(124,58,237,0.4)" }}
            whileTap={{ scale:0.97 }}
            style={{
              background:"linear-gradient(135deg,#7c3aed,#db2777)",
              color:"white", padding:"13px 30px",
              borderRadius:"12px", fontWeight:700,
              fontSize:"0.88rem",
              display:"inline-flex", alignItems:"center", gap:8,
              boxShadow:"0 12px 32px rgba(124,58,237,0.3)",
              fontFamily:"'Inter',sans-serif",
              border:"none", cursor:"pointer", transition:"box-shadow 0.3s",
            }}>
            ⬇ Download CV
          </motion.button>

          {/* View Work */}
          <motion.button onClick={()=>scrollTo("projects")}
            whileHover={{ scale:1.04, y:-4, boxShadow:"0 16px 36px rgba(124,58,237,0.2)" }}
            whileTap={{ scale:0.97 }}
            style={{
              background:"rgba(255,255,255,0.06)",
              backdropFilter:"blur(16px)",
              color:"white", padding:"13px 30px",
              borderRadius:"12px", fontWeight:700,
              fontSize:"0.88rem",
              display:"inline-flex", alignItems:"center", gap:8,
              border:"1.5px solid rgba(124,58,237,0.25)",
              fontFamily:"'Inter',sans-serif",
              cursor:"pointer", transition:"all 0.3s",
            }}>
            🚀 View Work
          </motion.button>

          {/* Hire Me */}
          <motion.button onClick={()=>scrollTo("contact")}
            whileHover={{ scale:1.04, y:-4, boxShadow:"0 22px 48px rgba(219,39,119,0.35)" }}
            whileTap={{ scale:0.97 }}
            style={{
              background:"linear-gradient(135deg,#db2777,#7c3aed)",
              color:"white", padding:"13px 30px",
              borderRadius:"12px", fontWeight:700,
              fontSize:"0.88rem",
              display:"inline-flex", alignItems:"center", gap:8,
              boxShadow:"0 12px 32px rgba(219,39,119,0.25)",
              fontFamily:"'Inter',sans-serif",
              border:"none", cursor:"pointer", transition:"box-shadow 0.3s",
            }}>
            💬 Hire Me
          </motion.button>
        </motion.div>

        {/* ── Stats → Inter ── */}
        <motion.div
          initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.9, delay:1.05 }}
          style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { num:"3+",  label:"Years Exp", icon:"🏆" },
            { num:"20+", label:"Projects",  icon:"🚀" },
            { num:"15+", label:"Clients",   icon:"🤝" },
            { num:"5⭐", label:"Rating",    icon:"✨" },
          ].map(({ num, label, icon }, i) => (
            <motion.div key={i}
              initial={{ opacity:0, scale:0.7 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:1.15+i*0.09, type:"spring", bounce:0.45 }}
              whileHover={{ scale:1.06, y:-6, boxShadow:"0 18px 40px rgba(124,58,237,0.2)" }}
              style={{
                background:"rgba(124,58,237,0.08)",
                backdropFilter:"blur(16px)",
                border:"1px solid rgba(124,58,237,0.18)",
                padding:"16px 22px", borderRadius:"16px",
                textAlign:"center", cursor:"default",
                minWidth:"95px", transition:"box-shadow 0.3s",
              }}>
              {/* icon */}
              <div style={{ fontSize:"1.1rem", marginBottom:5 }}>{icon}</div>
              {/* stat number → Inter 1.5rem 900 */}
              <div style={{
                fontFamily:"'Inter',sans-serif",
                fontSize:"1.5rem", fontWeight:900,
                background:"linear-gradient(135deg,#7c3aed,#db2777)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                lineHeight:1, marginBottom:3,
              }}>{num}</div>
              {/* stat label → Inter 0.65rem */}
              <div style={{
                fontFamily:"'Inter',sans-serif",
                fontSize:"0.65rem", fontWeight:700,
                color:"rgba(255,255,255,0.42)",
                textTransform:"uppercase", letterSpacing:"1px",
              }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.8 }}
          style={{ marginTop:"52px", display:"flex", flexDirection:"column", alignItems:"center", gap:7 }}>
          <span style={{
            fontFamily:"'Inter',sans-serif",
            fontSize:"0.65rem", color:"rgba(255,255,255,0.3)",
            fontWeight:700, letterSpacing:"3px", textTransform:"uppercase",
          }}>Scroll</span>
          <motion.div
            animate={{ y:[0,10,0] }} transition={{ duration:1.5, repeat:Infinity }}
            style={{ width:"24px", height:"40px", border:"1.5px solid rgba(124,58,237,0.3)", borderRadius:"12px", display:"flex", justifyContent:"center", paddingTop:6 }}>
            <motion.div
              animate={{ y:[0,12,0], opacity:[1,0,1] }} transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:3, height:7, background:"linear-gradient(to bottom,#7c3aed,#db2777)", borderRadius:2 }}/>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Responsive styles */}
      <style>{`
        @keyframes cursorBlink { 0%,100%{border-color:#7c3aed} 50%{border-color:transparent} }
        @keyframes orbAnim { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.96)} }

        /* Tablet */
        @media(max-width:768px){
          #hero-section h1{ font-size:clamp(1.7rem,6vw,2.6rem)!important }
          #hero-section .hero-buttons{ gap:10px!important }
          #hero-section .hero-buttons button{ padding:11px 22px!important; font-size:0.83rem!important }
          #hero-section .hero-stats{ gap:10px!important }
        }
        /* Mobile */
        @media(max-width:480px){
          #hero-section h1{ font-size:clamp(1.5rem,7vw,2.2rem)!important; letter-spacing:-0.5px!important }
          #hero-section .hero-buttons button{ padding:10px 18px!important; font-size:0.8rem!important }
          #hero-section .hero-stats>div{ min-width:80px!important; padding:13px 14px!important }
        }
      `}</style>
    </section>
  )
}

export default Hero
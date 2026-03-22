import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import chandruPhoto from "../assets/photo.jpg"

const navLinks = ["About","Skills","Projects","Experience","Contact"]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [active,      setActive]      = useState("")
  const [hoveredLink, setHoveredLink] = useState(null)
  const [photoPopup,  setPhotoPopup]  = useState(false)
  const [pulse,       setPulse]       = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 800)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!photoPopup) return
    const fn = (e) => {
      if (!e.target.closest("#photo-popup") && !e.target.closest("#nav-photo-btn"))
        setPhotoPopup(false)
    }
    document.addEventListener("mousedown", fn)
    return () => document.removeEventListener("mousedown", fn)
  }, [photoPopup])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.7, type:"spring", bounce:0.25 }}
        style={{
          display:"flex", justifyContent:"space-between",
          alignItems:"center", padding:"0 60px", height:"68px",
          background: scrolled ? "rgba(6,2,16,0.98)" : "rgba(6,2,16,0.75)",
          backdropFilter:"blur(30px)",
          position:"sticky", top:0, zIndex:1000,
          borderBottom:"1px solid rgba(124,58,237,0.15)",
          transition:"background 0.4s",
        }}>

        {/* Animated gradient top border */}
        <motion.div
          style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
            background:"linear-gradient(to right,#7c3aed,#db2777,#a855f7,#7c3aed)",
            backgroundSize:"300%" }}
          animate={{ backgroundPosition:["0%","300%"] }}
          transition={{ duration:4, repeat:Infinity, ease:"linear" }}/>

        {/* ══ LOGO AREA ══ */}
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>

          {/* Photo button */}
          <motion.button
            id="nav-photo-btn"
            onClick={() => setPhotoPopup(v=>!v)}
            whileHover={{ scale:1.1 }}
            whileTap={{ scale:0.93 }}
            animate={pulse ? { scale:[1,1.15,1] } : {}}
            transition={{ duration:0.4 }}
            style={{ width:42, height:42, borderRadius:"50%", padding:0,
              border:"none", cursor:"pointer", position:"relative",
              flexShrink:0, background:"transparent" }}>

            {/* Spinning gradient ring */}
            <motion.div
              animate={{ rotate:360 }}
              transition={{ duration:5, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute", inset:-2.5, borderRadius:"50%",
                background:"conic-gradient(#7c3aed,#db2777,#a855f7,#f472b6,#7c3aed)",
                zIndex:0 }}/>

            {/* Inner dark gap */}
            <div style={{ position:"absolute", inset:1.5, borderRadius:"50%",
              background:"rgba(6,2,16,0.9)", zIndex:1 }}/>

            {/* ✅ Photo — chandruPhoto import */}
            <img
              src={chandruPhoto}
              alt="Chandru"
              style={{ width:38, height:38, borderRadius:"50%",
                objectFit:"cover", objectPosition:"top center",
                position:"absolute", inset:2, zIndex:2, display:"block" }}/>

            {/* Green online dot */}
            <motion.div
              animate={{ scale:[1,1.3,1], opacity:[1,0.6,1] }}
              transition={{ duration:2, repeat:Infinity }}
              style={{ position:"absolute", bottom:1, right:1,
                width:10, height:10, borderRadius:"50%",
                background:"#10b981", zIndex:3,
                border:"2px solid rgba(6,2,16,0.95)" }}/>
          </motion.button>

          {/* CHANDRU name */}
          <motion.a href="#"
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            style={{ textDecoration:"none" }}>
            <motion.span
              animate={{ backgroundPosition:["0%","100%","0%"] }}
              transition={{ duration:4, repeat:Infinity, ease:"linear" }}
              style={{
                fontFamily:"'Inter',sans-serif",
                fontSize:"1.15rem", fontWeight:900,
                background:"linear-gradient(135deg,#a78bfa,#f472b6,#a78bfa)",
                backgroundSize:"200%",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                letterSpacing:"1.5px",
              }}>CHANDRU</motion.span>
          </motion.a>
        </div>

        {/* ══ Desktop links ══ */}
        <ul style={{ display:"flex", gap:2, listStyle:"none", margin:0, padding:0, alignItems:"center" }}>
          {navLinks.map((link,i) => (
            <motion.li key={link}
              initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.09+0.3 }}>
              <motion.a
                href={`#${link.toLowerCase()}`}
                onClick={()=>setActive(link)}
                onHoverStart={()=>setHoveredLink(link)}
                onHoverEnd={()=>setHoveredLink(null)}
                style={{ color:active===link?"white":"rgba(255,255,255,0.52)",
                  textDecoration:"none", fontWeight:600,
                  fontFamily:"'Inter',sans-serif",
                  fontSize:"0.84rem", letterSpacing:"0.3px",
                  padding:"7px 13px", borderRadius:10,
                  display:"inline-block", position:"relative",
                  transition:"color 0.25s" }}
                whileHover={{ color:"#fff" }}>
                <AnimatePresence>
                  {hoveredLink===link && (
                    <motion.span layoutId="navHover"
                      initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.85 }}
                      style={{ position:"absolute", inset:0, background:"rgba(124,58,237,0.14)", borderRadius:10, border:"1px solid rgba(124,58,237,0.28)", zIndex:-1 }}/>
                  )}
                </AnimatePresence>
                {active===link && (
                  <motion.span layoutId="activeNav"
                    style={{ position:"absolute", inset:0, background:"rgba(124,58,237,0.2)", borderRadius:10, border:"1px solid rgba(124,58,237,0.38)", zIndex:-1 }}/>
                )}
                {link}
              </motion.a>
            </motion.li>
          ))}

          {/* Resume button */}
          <motion.li initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.75, type:"spring", bounce:0.45 }} style={{ marginLeft:10 }}>
            <motion.a href="/resume.pdf" download
              whileHover={{ scale:1.05, y:-2, boxShadow:"0 12px 28px rgba(124,58,237,0.45)" }}
              whileTap={{ scale:0.95 }}
              style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white",
                padding:"9px 20px", borderRadius:11, fontWeight:700,
                fontFamily:"'Inter',sans-serif", fontSize:"0.84rem",
                textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6,
                boxShadow:"0 6px 18px rgba(124,58,237,0.3)",
                whiteSpace:"nowrap", position:"relative", overflow:"hidden" }}>
              <motion.span
                animate={{ left:["-80%","180%"] }}
                transition={{ duration:2.5, repeat:Infinity, repeatDelay:1.5 }}
                style={{ position:"absolute", top:0, width:"50%", height:"100%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",
                  transform:"skewX(-18deg)", pointerEvents:"none" }}/>
              <motion.span animate={{ y:[0,-3,0] }} transition={{ duration:1.4, repeat:Infinity }}>⬇</motion.span>
              Resume
            </motion.a>
          </motion.li>
        </ul>

        {/* Mobile hamburger */}
        <motion.button className="hamburger-btn" onClick={()=>setMenuOpen(!menuOpen)}
          whileTap={{ scale:0.9 }}
          style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.2)",
            cursor:"pointer", padding:10, borderRadius:10,
            display:"none", flexDirection:"column", gap:5 }}>
          {[0,1,2].map(i=>(
            <motion.div key={i}
              animate={menuOpen
                ?{ rotate:i===0?45:i===2?-45:0, y:i===0?7:i===2?-7:0, opacity:i===1?0:1 }
                :{ rotate:0, y:0, opacity:1 }}
              style={{ width:22, height:2,
                background:"linear-gradient(to right,#7c3aed,#db2777)", borderRadius:2 }}/>
          ))}
        </motion.button>
      </motion.nav>

      {/* ══ PHOTO POPUP ══ */}
      <AnimatePresence>
        {photoPopup && (
          <motion.div id="photo-popup"
            initial={{ opacity:0, scale:0.82, y:-8 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.82, y:-8 }}
            transition={{ type:"spring", stiffness:320, damping:26 }}
            style={{ position:"fixed", top:76, left:48, zIndex:9999,
              background:"rgba(8,3,18,0.97)", backdropFilter:"blur(32px)",
              border:"1px solid rgba(124,58,237,0.28)", borderRadius:22,
              padding:"22px 20px 18px",
              boxShadow:"0 28px 64px rgba(0,0,0,0.65)",
              display:"flex", flexDirection:"column", alignItems:"center", gap:14,
              minWidth:210 }}>

            {/* Close btn */}
            <motion.button onClick={()=>setPhotoPopup(false)}
              whileHover={{ scale:1.1 }}
              style={{ position:"absolute", top:10, right:10,
                background:"rgba(255,255,255,0.07)", border:"none",
                color:"rgba(255,255,255,0.45)", width:26, height:26,
                borderRadius:"50%", cursor:"pointer", fontSize:"0.72rem",
                display:"flex", alignItems:"center", justifyContent:"center" }}>✕</motion.button>

            {/* Big photo */}
            <div style={{ position:"relative" }}>
              <motion.div
                animate={{ rotate:360 }}
                transition={{ duration:7, repeat:Infinity, ease:"linear" }}
                style={{ position:"absolute", inset:-3, borderRadius:"50%",
                  background:"conic-gradient(#7c3aed,#db2777,#a855f7,#f472b6,#7c3aed)", zIndex:0 }}/>
              <div style={{ position:"absolute", inset:1.5, borderRadius:"50%",
                background:"rgba(8,3,18,0.9)", zIndex:1 }}/>

              {/* ✅ Popup photo — chandruPhoto import */}
              <motion.img
                src={chandruPhoto}
                alt="Chandru"
                initial={{ scale:0.8 }} animate={{ scale:1 }}
                transition={{ type:"spring", stiffness:260, damping:20 }}
                style={{ width:100, height:100, borderRadius:"50%",
                  objectFit:"cover", objectPosition:"top center",
                  position:"relative", zIndex:2, display:"block",
                  margin:"2px" }}/>

              <motion.div
                animate={{ scale:[1,1.4,1], opacity:[1,0.5,1] }}
                transition={{ duration:1.8, repeat:Infinity }}
                style={{ position:"absolute", bottom:4, right:4,
                  width:14, height:14, borderRadius:"50%",
                  background:"#10b981", zIndex:3,
                  border:"2.5px solid rgba(8,3,18,0.95)" }}/>
            </div>

            {/* Info */}
            <div style={{ textAlign:"center" }}>
              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", fontWeight:800, color:"white", marginBottom:3 }}>
                Chandru M
              </motion.div>
              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.16 }}
                style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", marginBottom:10 }}>
                UI/UX Designer &amp; React Dev
              </motion.div>
              <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.22, type:"spring" }}
                style={{ display:"inline-flex", alignItems:"center", gap:6,
                  background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.22)",
                  borderRadius:50, padding:"4px 13px",
                  fontFamily:"'Inter',sans-serif", fontSize:"0.67rem", fontWeight:700, color:"#10b981" }}>
                <motion.div animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ duration:1.5, repeat:Infinity }}
                  style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }}/>
                Available for work
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.28 }}
              style={{ display:"flex", gap:8, width:"100%" }}>
              <motion.a href="mailto:chandruwebdesigner@gmail.com" whileHover={{ scale:1.04, y:-1 }}
                style={{ flex:1, background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.22)",
                  borderRadius:10, padding:"9px 0", textAlign:"center",
                  fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:700, color:"#a78bfa", textDecoration:"none" }}>
                ✉️ Email
              </motion.a>
              <motion.a href="/resume.pdf" download whileHover={{ scale:1.04, y:-1 }}
                style={{ flex:1, background:"linear-gradient(135deg,#7c3aed,#db2777)", border:"none",
                  borderRadius:10, padding:"9px 0", textAlign:"center",
                  fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:700, color:"white", textDecoration:"none" }}>
                ⬇ Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ MOBILE MENU ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-12 }}
            transition={{ duration:0.28 }}
            style={{ position:"fixed", top:68, left:0, right:0,
              background:"rgba(6,2,16,0.98)", backdropFilter:"blur(30px)",
              zIndex:999, borderBottom:"1px solid rgba(124,58,237,0.2)" }}>
            <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:4 }}>

              {/* Mobile profile row */}
              <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                  borderRadius:14, background:"rgba(124,58,237,0.07)",
                  border:"1px solid rgba(124,58,237,0.14)", marginBottom:8 }}>
                <div style={{ position:"relative" }}>
                  <motion.div animate={{ rotate:360 }} transition={{ duration:6, repeat:Infinity, ease:"linear" }}
                    style={{ position:"absolute", inset:-2, borderRadius:"50%",
                      background:"conic-gradient(#7c3aed,#db2777,#a855f7,#7c3aed)", zIndex:0 }}/>
                  {/* ✅ Mobile photo — chandruPhoto import */}
                  <img
                    src={chandruPhoto}
                    alt="Chandru"
                    style={{ width:42, height:42, borderRadius:"50%",
                      objectFit:"cover", objectPosition:"top center",
                      position:"relative", zIndex:1,
                      border:"2px solid rgba(6,2,16,0.9)" }}/>
                  <div style={{ position:"absolute", bottom:1, right:1,
                    width:9, height:9, borderRadius:"50%", background:"#10b981",
                    border:"1.5px solid rgba(6,2,16,0.9)", zIndex:2 }}/>
                </div>
                <div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:800, color:"white" }}>Chandru M</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", color:"rgba(255,255,255,0.42)" }}>UI/UX Designer • React Dev</div>
                </div>
              </motion.div>

              {navLinks.map((link,i) => (
                <motion.a key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={()=>scrollTo(link.toLowerCase())}
                  initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:i*0.06 }}
                  whileHover={{ x:6, color:"white" }}
                  style={{ color:"rgba(255,255,255,0.65)", textDecoration:"none",
                    fontWeight:700, fontFamily:"'Inter',sans-serif",
                    fontSize:"0.92rem", padding:"11px 14px", borderRadius:11,
                    transition:"all 0.22s",
                    borderBottom:"1px solid rgba(124,58,237,0.07)" }}>
                  {link}
                </motion.a>
              ))}

              <motion.a href="/resume.pdf" download
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.38 }}
                whileHover={{ scale:1.02 }}
                style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white",
                  padding:"13px", borderRadius:12, fontWeight:800,
                  fontFamily:"'Inter',sans-serif", fontSize:"0.88rem",
                  textDecoration:"none", textAlign:"center", marginTop:8,
                  boxShadow:"0 8px 20px rgba(124,58,237,0.28)" }}>
                ⬇ Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes cursorBlink{0%,100%{border-color:#7c3aed}50%{border-color:transparent}}

        /* TABLET */
        @media(max-width:900px){
          nav>ul{ display:none!important }
          .hamburger-btn{ display:flex!important }
          nav{ padding:0 24px!important }
        }
        /* MOBILE */
        @media(max-width:768px){
          nav>ul{ display:none!important }
          .hamburger-btn{ display:flex!important }
          nav{ padding:0 20px!important }
          #photo-popup{ left:12px!important; right:12px!important; min-width:unset!important; top:70px!important }
        }
        @media(max-width:480px){
          nav{ padding:0 14px!important; height:58px!important }
          nav span[style*="1.15rem"]{ font-size:1rem!important }
        }
      `}</style>
    </>
  )
}
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "UI/UX", "Mobile", "Web", "Branding"]

const projects = [
  { emoji:"🛒", color:"linear-gradient(135deg,#7c3aed,#db2777)", title:"Ecommerce Platform",   desc:"Complete UI/UX overhaul for a fashion brand. Increased conversions by 35% with streamlined checkout flow.", tag:"UI/UX",   year:"2024", tools:["Figma","React","Framer"] },
  { emoji:"✈️", color:"linear-gradient(135deg,#db2777,#7c3aed)", title:"Travel Booking App",   desc:"Award-winning mobile app with AI-powered recommendations, interactive maps and one-tap booking.",             tag:"Mobile", year:"2024", tools:["Figma","Swift","Lottie"] },
  { emoji:"📊", color:"linear-gradient(135deg,#7c3aed,#4f46e5)", title:"Analytics Dashboard",  desc:"Real-time SaaS dashboard with complex data viz, dark/light mode and role-based access control.",             tag:"Web",    year:"2023", tools:["React","D3.js","Tailwind"] },
  { emoji:"🏥", color:"linear-gradient(135deg,#db2777,#9333ea)", title:"Healthcare Platform",  desc:"Patient-centric healthcare app with telemedicine, appointment booking and AI symptom checker.",               tag:"Mobile", year:"2023", tools:["Figma","React Native","Firebase"] },
  { emoji:"🎵", color:"linear-gradient(135deg,#6d28d9,#db2777)", title:"Music Streaming UI",   desc:"Premium music app redesign with mood-based playlists, 3D visualizer and social listening features.",          tag:"UI/UX",  year:"2023", tools:["Figma","After Effects","Principle"] },
  { emoji:"🏠", color:"linear-gradient(135deg,#7c3aed,#db2777)", title:"Real Estate App",      desc:"Property discovery platform with AR virtual tours, smart filters and mortgage calculator.",                   tag:"Web",    year:"2022", tools:["React","Three.js","Mapbox"] },
]

function Projects() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.tag === active)

  return (
    <section id="projects" className="projects" style={{ position:"relative", overflow:"hidden" }}>

      {/* ── Section Header ── */}
      <motion.div className="section-header"
        initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.7 }} viewport={{ once:true }}>
        {/* tag → 0.72rem via CSS */}
        <span className="section-tag">My Work</span>
        {/* title → clamp(1.4–1.9rem) via CSS */}
        <h2 className="section-title">Featured <span>Projects</span></h2>
        {/* sub-description → 0.88rem */}
        <p style={{
          color:"rgba(255,255,255,0.5)",
          fontFamily:"'Inter',sans-serif",
          fontSize:"0.88rem",
          maxWidth:"420px",
          margin:"12px auto 0",
          lineHeight:"1.7",
        }}>
          Thoughtful designs that solve real problems
        </p>
      </motion.div>

      {/* ── Filter Tabs ── */}
      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.6, delay:0.2 }} viewport={{ once:true }}
        style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap", marginBottom:"48px" }}>
        {categories.map(cat => (
          <motion.button key={cat} onClick={() => setActive(cat)}
            whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.96 }}
            style={{
              /* tab font → 0.82rem */
              padding:"8px 20px", borderRadius:"50px",
              border: active === cat ? "none" : "1.5px solid rgba(124,58,237,0.25)",
              background: active === cat ? "linear-gradient(135deg,#7c3aed,#db2777)" : "rgba(255,255,255,0.04)",
              color: active === cat ? "white" : "rgba(255,255,255,0.6)",
              fontWeight:700, fontSize:"0.82rem",
              cursor:"pointer", transition:"all 0.3s",
              fontFamily:"'Inter',sans-serif",
              boxShadow: active === cat ? "0 8px 24px rgba(124,58,237,0.3)" : "none",
            }}>
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Project Grid ── */}
      <div style={{
        display:"grid",
        /* minmax 300px → compact cards */
        gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
        gap:"22px",
        maxWidth:"1100px",
        margin:"0 auto",
      }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div key={p.title} layout
              initial={{ opacity:0, scale:0.92, y:30 }}
              animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.88 }}
              transition={{ duration:0.45, delay:i*0.07 }}
              whileHover={{ y:-8, boxShadow:"0 28px 56px rgba(124,58,237,0.18)" }}
              style={{
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(124,58,237,0.15)",
                borderRadius:"20px",
                overflow:"hidden",
                backdropFilter:"blur(15px)",
                transition:"box-shadow 0.35s",
                cursor:"pointer",
              }}>

              {/* Card image area — reduced height */}
              <div style={{
                width:"100%", height:"180px",
                background:p.color,
                position:"relative", overflow:"hidden",
              }}>
                {/* Emoji icon */}
                <motion.div
                  style={{ fontSize:"3.8rem", position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:1 }}
                  whileHover={{ scale:1.2, rotate:10 }}
                  transition={{ duration:0.35 }}>
                  {p.emoji}
                </motion.div>

                {/* Year badge → 0.72rem */}
                <div style={{
                  position:"absolute", top:"12px", right:"12px",
                  background:"rgba(255,255,255,0.22)",
                  backdropFilter:"blur(10px)",
                  color:"white", padding:"3px 11px",
                  borderRadius:"50px", fontSize:"0.72rem",
                  fontWeight:700, border:"1px solid rgba(255,255,255,0.3)",
                  fontFamily:"'Inter',sans-serif", zIndex:2,
                }}>{p.year}</div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity:0 }} whileHover={{ opacity:1 }}
                  style={{ position:"absolute", inset:0, background:"rgba(124,58,237,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:3 }}>
                  <div style={{ background:"white", color:"#7c3aed", padding:"9px 22px", borderRadius:"50px", fontWeight:800,
                    /* overlay button → 0.82rem */
                    fontSize:"0.82rem", fontFamily:"'Syne',sans-serif" }}>
                    View Project →
                  </div>
                </motion.div>
              </div>

              {/* Card body */}
              <div style={{ padding:"20px 22px" }}>

                {/* Title + tag row */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px", gap:"8px" }}>
                  {/* Card title → 0.95rem Syne bold */}
                  <h3 style={{
                    fontFamily:"'Inter',sans-serif",
                    fontSize:"0.95rem",
                    fontWeight:800,
                    color:"white",
                    lineHeight:1.3,
                    flex:1,
                  }}>{p.title}</h3>

                  {/* Category badge → 0.7rem */}
                  <span style={{
                    background:"rgba(124,58,237,0.1)",
                    border:"1px solid rgba(124,58,237,0.22)",
                    color:"#a78bfa",
                    padding:"3px 10px",
                    borderRadius:"50px",
                    fontSize:"0.7rem",
                    fontWeight:700,
                    fontFamily:"'Inter',sans-serif",
                    whiteSpace:"nowrap",
                    flexShrink:0,
                  }}>{p.tag}</span>
                </div>

                {/* Description → 0.82rem */}
                <p style={{
                  color:"rgba(255,255,255,0.6)",
                  fontFamily:"'Inter',sans-serif",
                  fontSize:"0.82rem",
                  lineHeight:"1.7",
                  marginBottom:"14px",
                }}>{p.desc}</p>

                {/* Tool tags → 0.7rem */}
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"14px" }}>
                  {p.tools.map((tool,j) => (
                    <span key={j} style={{
                      background:"rgba(255,255,255,0.05)",
                      color:"rgba(255,255,255,0.5)",
                      padding:"3px 10px",
                      borderRadius:"6px",
                      fontSize:"0.7rem",
                      fontWeight:600,
                      fontFamily:"'Inter',sans-serif",
                      border:"1px solid rgba(255,255,255,0.08)",
                    }}>{tool}</span>
                  ))}
                </div>

                {/* View case study → 0.8rem */}
                <motion.div
                  style={{ display:"flex", alignItems:"center", gap:"5px", color:"#a78bfa", fontWeight:700,
                    fontSize:"0.8rem", cursor:"pointer", fontFamily:"'syne',sans-serif" }}
                  whileHover={{ x:5 }}>
                  View Case Study
                  <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── View All Button ── */}
      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        transition={{ delay:0.4 }} viewport={{ once:true }}
        style={{ textAlign:"center", marginTop:"48px" }}>
        <motion.button
          whileHover={{ scale:1.04, y:-3, boxShadow:"0 20px 44px rgba(124,58,237,0.38)" }}
          whileTap={{ scale:0.97 }}
          style={{
            background:"linear-gradient(135deg,#7c3aed,#db2777)",
            color:"white",
            /* button → 0.88rem */
            padding:"13px 36px",
            borderRadius:"14px",
            fontWeight:800,
            fontSize:"0.88rem",
            border:"none",
            cursor:"pointer",
            fontFamily:"'Inter',sans-serif",
            boxShadow:"0 10px 30px rgba(124,58,237,0.3)",
            letterSpacing:"0.3px",
          }}>
          🚀 View All Projects
        </motion.button>
      </motion.div>

    </section>
  )
}

export default Projects
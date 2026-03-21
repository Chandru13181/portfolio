import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "UI/UX", "Mobile", "Web", "Branding"]

const projects = [
  { emoji:"🛒", color:"linear-gradient(135deg,#7c3aed,#db2777)", title:"Ecommerce Platform", desc:"Complete UI/UX overhaul for a fashion brand. Increased conversions by 35% with streamlined checkout flow.", tag:"UI/UX", year:"2024", tools:["Figma","React","Framer"] },
  { emoji:"✈️", color:"linear-gradient(135deg,#db2777,#7c3aed)", title:"Travel Booking App", desc:"Award-winning mobile app with AI-powered recommendations, interactive maps and one-tap booking.", tag:"Mobile", year:"2024", tools:["Figma","Swift","Lottie"] },
  { emoji:"📊", color:"linear-gradient(135deg,#7c3aed,#4f46e5)", title:"Analytics Dashboard", desc:"Real-time SaaS dashboard with complex data viz, dark/light mode and role-based access control.", tag:"Web", year:"2023", tools:["React","D3.js","Tailwind"] },
  { emoji:"🏥", color:"linear-gradient(135deg,#db2777,#9333ea)", title:"Healthcare Platform", desc:"Patient-centric healthcare app with telemedicine, appointment booking and AI symptom checker.", tag:"Mobile", year:"2023", tools:["Figma","React Native","Firebase"] },
  { emoji:"🎵", color:"linear-gradient(135deg,#6d28d9,#db2777)", title:"Music Streaming UI", desc:"Premium music app redesign with mood-based playlists, 3D visualizer and social listening features.", tag:"UI/UX", year:"2023", tools:["Figma","After Effects","Principle"] },
  { emoji:"🏠", color:"linear-gradient(135deg,#7c3aed,#db2777)", title:"Real Estate App", desc:"Property discovery platform with AR virtual tours, smart filters and mortgage calculator.", tag:"Web", year:"2022", tools:["React","Three.js","Mapbox"] },
]

function Projects() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.tag === active)

  return (
    <section id="projects" className="projects" style={{ position: 'relative', overflow: 'hidden' }}>

      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">My Work</span>
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <p style={{ color: '#64748b', marginTop: '14px', fontSize: '0.98rem', maxWidth: '450px', margin: '14px auto 0', lineHeight: '1.7' }}>
          Thoughtful designs that solve real problems
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}
      >
        {categories.map((cat) => (
          <motion.button key={cat}
            onClick={() => setActive(cat)}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '10px 24px', borderRadius: '50px',
              border: active === cat ? 'none' : '2px solid rgba(124,58,237,0.2)',
              background: active === cat ? 'linear-gradient(135deg, #7c3aed, #db2777)' : 'white',
              color: active === cat ? 'white' : '#7c3aed',
              fontWeight: '700', fontSize: '0.88rem',
              cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: active === cat ? '0 10px 30px rgba(124,58,237,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
              fontFamily: "'Onest', sans-serif",
            }}
          >{cat}</motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '28px', maxWidth: '1200px', margin: 'auto',
      }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -12, boxShadow: '0 40px 80px rgba(124,58,237,0.15)' }}
              style={{
                background: 'white', borderRadius: '28px',
                overflow: 'hidden',
                border: '2px solid rgba(124,58,237,0.08)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.4s',
                cursor: 'pointer',
              }}
            >
              {/* Image area */}
              <div style={{
                width: '100%', height: '230px',
                background: p.color, position: 'relative',
                overflow: 'hidden', cursor: 'pointer',
              }}>
                <motion.div
                  style={{
                    fontSize: '5rem', position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                  whileHover={{ scale: 1.25, rotate: 12 }}
                  transition={{ duration: 0.4 }}
                >
                  {p.emoji}
                </motion.div>

                {/* Year badge */}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  color: 'white', padding: '5px 14px',
                  borderRadius: '50px', fontSize: '0.78rem',
                  fontWeight: '700', border: '1px solid rgba(255,255,255,0.3)',
                  zIndex: 2,
                }}>{p.year}</div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(124,58,237,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 3, cursor: 'pointer',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    style={{
                      background: 'white', color: '#7c3aed',
                      padding: '12px 28px', borderRadius: '50px',
                      fontWeight: '800', fontSize: '0.9rem',
                      display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    View Project →
                  </motion.div>
                </motion.div>
              </div>

              {/* Body */}
              <div style={{ padding: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: '1.15rem', fontWeight: '800', color: '#1e1b4b',
                  }}>{p.title}</h3>
                  <span style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1.5px solid rgba(124,58,237,0.18)',
                    color: '#7c3aed', padding: '4px 12px',
                    borderRadius: '50px', fontSize: '0.75rem',
                    fontWeight: '700', whiteSpace: 'nowrap', marginLeft: '8px',
                  }}>{p.tag}</span>
                </div>

                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '16px' }}>
                  {p.desc}
                </p>

                {/* Tools */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                  {p.tools.map((tool, j) => (
                    <span key={j} style={{
                      background: '#f8fafc', color: '#64748b',
                      padding: '4px 12px', borderRadius: '8px',
                      fontSize: '0.75rem', fontWeight: '600',
                      border: '1px solid #e2e8f0',
                    }}>{tool}</span>
                  ))}
                </div>

                {/* View case study */}
                <motion.div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#7c3aed', fontWeight: '800', fontSize: '0.88rem',
                    cursor: 'pointer',
                  }}
                  whileHover={{ x: 6 }}
                >
                  View Case Study
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >→</motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '60px' }}
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -4, boxShadow: '0 25px 50px rgba(124,58,237,0.35)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: 'white', padding: '16px 44px',
            borderRadius: '16px', fontWeight: '800',
            fontSize: '0.95rem', border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(124,58,237,0.3)',
            fontFamily: "'Bricolage Grotesque', sans-serif",
            transition: 'box-shadow 0.3s',
          }}
        >🚀 View All Projects</motion.button>
      </motion.div>
    </section>
  )
}

export default Projects
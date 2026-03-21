import React from "react"
import { motion } from "framer-motion"

const tags = [
  { label: "🎨 UI Design", color: "#7c3aed" },
  { label: "🔍 UX Research", color: "#db2777" },
  { label: "⚛️ React", color: "#7c3aed" },
  { label: "📱 Mobile", color: "#db2777" },
  { label: "🖌️ Figma", color: "#7c3aed" },
  { label: "✨ Motion", color: "#db2777" },
]

function About() {
  return (
    <section id="about" className="about" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About <span>Me</span></h2>
      </motion.div>

      <div className="about-grid">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: 'spring' }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              borderRadius: '36px', height: '420px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '7rem',
              boxShadow: '0 30px 60px rgba(124,58,237,0.25)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            👩‍💻
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)',
            }} />
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', bottom: '-15px', left: '-15px',
              background: 'white', padding: '12px 18px',
              borderRadius: '16px', fontWeight: '700', fontSize: '0.85rem',
              color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 30px rgba(124,58,237,0.15)',
              border: '1.5px solid rgba(124,58,237,0.1)',
            }}
          >🎨 UI/UX Expert</motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            style={{
              position: 'absolute', top: '-15px', right: '-15px',
              background: 'white', padding: '12px 18px',
              borderRadius: '16px', fontWeight: '700', fontSize: '0.85rem',
              color: '#db2777', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 30px rgba(219,39,119,0.15)',
              border: '1.5px solid rgba(219,39,119,0.1)',
            }}
          >⚡ React Dev</motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px', marginTop: '24px',
            }}
          >
            {[
              { num: '3+', label: 'Years Exp', color: '#7c3aed' },
              { num: '20+', label: 'Projects', color: '#db2777' },
              { num: '15+', label: 'Clients', color: '#7c3aed' },
              { num: '5★', label: 'Rating', color: '#db2777' },
            ].map((s, i) => (
              <motion.div key={i}
                whileHover={{ scale: 1.04, y: -3 }}
                style={{
                  background: 'white', borderRadius: '16px',
                  padding: '16px', textAlign: 'center',
                  border: `1.5px solid ${s.color}18`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '1.5rem', fontWeight: '900', color: s.color,
                }}>{s.num}</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600', marginTop: '3px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: 'spring' }}
          viewport={{ once: true }}
          className="about-text"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(124,58,237,0.06)',
              border: '1.5px solid rgba(124,58,237,0.15)',
              borderRadius: '50px', padding: '7px 18px',
              fontSize: '0.8rem', fontWeight: '700', color: '#7c3aed',
              marginBottom: '20px',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'block' }}
            />
            Open to opportunities
          </motion.div>

          <h3 style={{ marginBottom: '16px' }}>Passionate Creative &<br />Problem Solver</h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.85', marginBottom: '14px' }}
          >
            I'm a UI/UX Designer with 3+ years crafting stunning digital experiences. I transform complex problems into elegant interfaces that users love — from wireframes to pixel-perfect React builds.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.85', marginBottom: '24px' }}
          >
            Delivered designs boosting engagement by 40% and conversions by 25% for startups and agencies across India.
          </motion.p>

          {/* Tags */}
          <p style={{ fontSize: '0.78rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Skills & Tools</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {tags.map((tag, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.08, y: -3 }}
                viewport={{ once: true }}
                style={{
                  background: `${tag.color}08`,
                  border: `1.5px solid ${tag.color}25`,
                  color: tag.color, padding: '8px 18px',
                  borderRadius: '50px', fontSize: '0.85rem',
                  fontWeight: '700', cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = tag.color
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${tag.color}08`
                  e.currentTarget.style.color = tag.color
                }}
              >{tag.label}</motion.span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <motion.a href="/cv.pdf" download
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                color: 'white', padding: '13px 28px',
                borderRadius: '14px', fontWeight: '700',
                fontSize: '0.9rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(124,58,237,0.25)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 36px rgba(124,58,237,0.35)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.25)'}
            >⬇ Download CV</motion.a>

            <motion.a href="#contact"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'white', color: '#7c3aed',
                padding: '13px 28px', borderRadius: '14px',
                fontWeight: '700', fontSize: '0.9rem',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: '8px',
                border: '2px solid rgba(124,58,237,0.2)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
                e.currentTarget.style.borderColor = '#7c3aed'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)'
              }}
            >💬 Let's Talk</motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
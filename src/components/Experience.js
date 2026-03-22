import React from "react"
import { motion } from "framer-motion"

const experiences = [
  {
    icon: "🎨",
    title: "Senior UI/UX Designer",
    company: "Creative Agency",
    companyColor: "#a78bfa",
    desc: "Led design strategy for 10+ enterprise clients. Built design systems, conducted user research and delivered award-winning interfaces.",
    year: "2023 – Present",
    color: "linear-gradient(to right, #7c3aed, #db2777)",
    highlights: ["Design Systems", "User Research", "10+ Clients"],
  },
  {
    icon: "💻",
    title: "Frontend Developer",
    company: "Tech Startup",
    companyColor: "#67e8f9",
    desc: "Developed pixel-perfect React applications with Framer Motion animations, achieving 98/100 Lighthouse scores.",
    year: "2022 – 2023",
    color: "linear-gradient(to right, #06b6d4, #7c3aed)",
    highlights: ["React", "Framer Motion", "98/100 Score"],
  },
  {
    icon: "📱",
    title: "Mobile App Designer",
    company: "Freelance",
    companyColor: "#f9a8d4",
    desc: "Designed 8+ iOS & Android apps with 4.8★ average ratings. Specialized in onboarding flows and micro-interactions.",
    year: "2021 – 2022",
    color: "linear-gradient(to right, #db2777, #f59e0b)",
    highlights: ["iOS & Android", "4.8★ Rating", "8+ Apps"],
  },
  {
    icon: "🎓",
    title: "Design Intern",
    company: "Digital Studio",
    companyColor: "#86efac",
    desc: "Learned industry-standard workflows, branding, motion design and UX research under senior creative directors.",
    year: "2020 – 2021",
    color: "linear-gradient(to right, #10b981, #06b6d4)",
    highlights: ["Branding", "Motion Design", "UX Research"],
  },
]

function Experience() {
  return (
    <section id="experience" style={{
      padding: '90px 60px',
      background: 'rgba(5,2,16,0.85)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)', pointerEvents: 'none' }}/>

      {/* Heading — same style as About/Skills/Contact */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 52 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#f59e0b', marginBottom: 12 }}>
          <span style={{ width: 28, height: 1, background: 'linear-gradient(90deg,transparent,#f59e0b)', display: 'block' }}/>
          My Journey
          <span style={{ width: 28, height: 1, background: 'linear-gradient(90deg,#f59e0b,transparent)', display: 'block' }}/>
        </div>
        <h2 style={{
          fontFamily: "'syne', sans-serif",
          fontSize: 'clamp(1rem, 2.6vw, 1.5rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.2,
          marginBottom: 12,
        }}>
          Work{' '}
          <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Experience
          </span>
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: '#c4b5d4', maxWidth: 420, margin: '0 auto', lineHeight: 1.75 }}>
          A journey of crafting meaningful digital experiences across design and development.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '1100px', margin: 'auto' }}>
        {experiences.map((e, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -6 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px 22px',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.35s',
            }}
            onMouseEnter={ev => {
              ev.currentTarget.style.background = 'rgba(124,58,237,0.08)'
              ev.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
              ev.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={ev => {
              ev.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              ev.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              ev.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Top color bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: e.color, borderRadius: '20px 20px 0 0' }}/>

            {/* Glow */}
            <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '90px', height: '90px', background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}/>

            <motion.span whileHover={{ scale: 1.2, rotate: 10 }} style={{ fontSize: '2.2rem', display: 'block', marginBottom: '16px' }}>
              {e.icon}
            </motion.span>

            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'white', fontSize: '1rem', fontWeight: '800', marginBottom: '5px' }}>
              {e.title}
            </h3>

            <p style={{ color: e.companyColor, fontWeight: '700', fontSize: '0.82rem', marginBottom: '12px' }}>
              {e.company}
            </p>

            <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.84rem', lineHeight: '1.72', marginBottom: '16px' }}>
              {e.desc}
            </p>

            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '14px' }}>
              {e.highlights.map((h, j) => (
                <span key={j} style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa', padding: '3px 10px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: '700' }}>
                  {h}
                </span>
              ))}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.76rem', fontWeight: '700' }}>
              📅 {e.year}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          #experience { padding: 60px 20px !important; }
          #experience > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

export default Experience
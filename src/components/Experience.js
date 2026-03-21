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
      padding: '100px 80px',
      background: 'rgba(5,2,16,0.85)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
    }}>
      {/* Particles */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '70px' }}
      >
        <span style={{
          color: '#f59e0b', fontWeight: '700', fontSize: '0.8rem',
          letterSpacing: '4px', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          marginBottom: '16px',
        }}>
          <span style={{ height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, #f59e0b)' }} />
          MY JOURNEY
          <span style={{ height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, #f59e0b)' }} />
        </span>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: '2.8rem', fontWeight: '900', color: 'white',
        }}>
          Work <span style={{
            background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Experience</span>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: 'auto',
      }}>
        {experiences.map((e, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ scale: 1.03, y: -8 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              padding: '36px 28px',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.4s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Top color bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: e.color, borderRadius: '24px 24px 0 0',
            }} />

            {/* Glow */}
            <div style={{
              position: 'absolute', top: '-30px', left: '-30px',
              width: '100px', height: '100px',
              background: `radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)`,
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            {/* Icon */}
            <motion.span
              whileHover={{ scale: 1.2, rotate: 10 }}
              style={{ fontSize: '2.5rem', display: 'block', marginBottom: '18px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            >{e.icon}</motion.span>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: 'white', fontSize: '1.15rem',
              fontWeight: '800', marginBottom: '6px',
            }}>{e.title}</h3>

            {/* Company */}
            <p style={{
              color: e.companyColor, fontWeight: '700',
              fontSize: '0.88rem', marginBottom: '14px',
            }}>{e.company}</p>

            {/* Description */}
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.88rem', lineHeight: '1.75',
              marginBottom: '20px',
            }}>{e.desc}</p>

            {/* Highlights */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
              {e.highlights.map((h, j) => (
                <span key={j} style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: '#a78bfa', padding: '4px 12px',
                  borderRadius: '50px', fontSize: '0.75rem',
                  fontWeight: '700',
                }}>{h}</span>
              ))}
            </div>

            {/* Year */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
              padding: '7px 16px', borderRadius: '50px',
              fontSize: '0.8rem', fontWeight: '700',
            }}>📅 {e.year}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
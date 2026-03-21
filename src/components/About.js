import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tags = [
  { label: "🎨 UI Design", color: "#7c3aed" },
  { label: "🔍 UX Research", color: "#db2777" },
  { label: "⚛️ React", color: "#7c3aed" },
  { label: "📱 Mobile", color: "#db2777" },
  { label: "🖌️ Figma", color: "#7c3aed" },
  { label: "✨ Motion", color: "#db2777" },
]

// AI Chat Widget
function AIChatWidget({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Chandru's AI assistant. Ask me anything about his work, skills, or how to collaborate! 🚀" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(m => [...m, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('https://iridescent-lokum-f6b7ac.netlify.app/.netlify/functions/chat', {
                method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Chandru's AI assistant on his portfolio website. Chandru is a UI/UX Designer & Frontend Developer based in Chennai with 3+ years experience. He specializes in Figma, React, Adobe XD, motion design. He has worked on 20+ projects for 15+ clients with 5-star ratings. He is available for freelance and full-time roles. Contact: chandruwebdesigner@gmail.com, +91 93611 98301. Be friendly, helpful and professional. Keep responses concise.`,
          messages: [{ role: 'user', content: userMsg }]
        })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "I'm here to help! Please contact Chandru directly at chandruwebdesigner@gmail.com"
      setMessages(m => [...m, { role: 'assistant', text: reply }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: "Sorry, I'm having trouble connecting. Please reach out directly at chandruwebdesigner@gmail.com 😊" }])
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{
        position: 'fixed', bottom: 80, right: 24, width: 340, zIndex: 9999,
        background: 'rgba(10,5,20,0.97)', backdropFilter: 'blur(30px)',
        border: '1px solid rgba(124,58,237,0.3)', borderRadius: 20,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg,#7c3aed,#db2777)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🤖</div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.88rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Chandru's AI Assistant</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>Powered by Claude AI</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem', padding: 4 }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 280, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'linear-gradient(135deg,#7c3aed,#db2777)' : 'rgba(255,255,255,0.06)',
              border: m.role === 'assistant' ? '1px solid rgba(124,58,237,0.2)' : 'none',
              color: 'white', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: "'Inter',sans-serif"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 5, padding: '10px 14px' }}>
            {[0,1,2].map(i => (
              <motion.div key={i} animate={{ y: [0,-6,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed' }}/>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(124,58,237,0.2)', display: 'flex', gap: 8 }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask me anything..."
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 10, padding: '9px 13px', color: 'white', fontSize: '0.82rem', outline: 'none', fontFamily: "'Inter',sans-serif" }}
        />
        <button onClick={send} disabled={loading}
          style={{ background: 'linear-gradient(135deg,#7c3aed,#db2777)', border: 'none', borderRadius: 10, padding: '9px 14px', color: 'white', cursor: 'pointer', fontSize: '0.9rem' }}>
          ➤
        </button>
      </div>
    </motion.div>
  )
}

function About() {
  const [showAI, setShowAI] = useState(false)

  const handleDownload = () => {
    fetch('/resume.pdf').then(r => r.blob()).then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'Chandru_Resume.pdf'
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(() => window.open('/resume.pdf', '_blank'))
  }

  return (
    <section id="about" className="about" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About <span>Me</span></h2>
      </motion.div>

      <div className="about-grid">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, type: 'spring' }} viewport={{ once: true }} style={{ position: 'relative' }}>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', borderRadius: '36px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6.5rem', boxShadow: '0 30px 60px rgba(124,58,237,0.25)', position: 'relative', overflow: 'hidden' }}>
            👩‍💻
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)' }}/>
          </motion.div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
            style={{ position: 'absolute', bottom: '-10px', left: '-10px', background: 'rgba(20,10,40,0.95)', border: '1px solid rgba(124,58,237,0.3)', padding: '10px 16px', borderRadius: '14px', fontWeight: '700', fontSize: '0.82rem', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(124,58,237,0.2)' }}>
            🎨 UI/UX Expert
          </motion.div>

          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'rgba(20,10,40,0.95)', border: '1px solid rgba(219,39,119,0.3)', padding: '10px 16px', borderRadius: '14px', fontWeight: '700', fontSize: '0.82rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(219,39,119,0.2)' }}>
            ⚡ React Dev
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
            {[{num:'3+',label:'Years Exp',color:'#7c3aed'},{num:'20+',label:'Projects',color:'#db2777'},{num:'15+',label:'Clients',color:'#7c3aed'},{num:'5★',label:'Rating',color:'#db2777'}].map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04, y: -3 }}
                style={{ background: 'rgba(124,58,237,0.08)', border: `1px solid ${s.color}30`, borderRadius: '14px', padding: '14px', textAlign: 'center', transition: 'all 0.3s' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.4rem', fontWeight: '900', color: s.color }}>{s.num}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600', marginTop: '2px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, type: 'spring' }} viewport={{ once: true }} className="about-text">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '50px', padding: '6px 16px', fontSize: '0.78rem', fontWeight: '700', color: '#a78bfa', marginBottom: '18px' }}>
            <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'block' }}/>
            Open to opportunities
          </motion.div>

          <h3 style={{ marginBottom: '14px' }}>Passionate Creative &<br />Problem Solver</h3>

          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: '1.85', marginBottom: '12px' }}>
            I'm a UI/UX Designer with 3+ years crafting stunning digital experiences. I transform complex problems into elegant interfaces that users love — from wireframes to pixel-perfect React builds.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: '1.85', marginBottom: '22px' }}>
            Delivered designs boosting engagement by 40% and conversions by 25% for startups and agencies across India.
          </motion.p>

          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Skills & Tools</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
            {tags.map((tag, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.08, y: -2 }} viewport={{ once: true }}
                style={{ background: `${tag.color}15`, border: `1px solid ${tag.color}30`, color: tag.color, padding: '7px 16px', borderRadius: '50px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background=tag.color; e.currentTarget.style.color='white' }}
                onMouseLeave={e => { e.currentTarget.style.background=`${tag.color}15`; e.currentTarget.style.color=tag.color }}>
                {tag.label}
              </motion.span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Download CV — fixed */}
            <motion.button onClick={handleDownload}
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', padding: '12px 26px', borderRadius: '12px', fontWeight: '700', fontSize: '0.88rem', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px', boxShadow: '0 8px 24px rgba(124,58,237,0.3)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              ⬇ Download CV
            </motion.button>

            {/* AI Chat button */}
            <motion.button onClick={() => setShowAI(true)}
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', padding: '12px 26px', borderRadius: '12px', fontWeight: '700', fontSize: '0.88rem', border: '1.5px solid rgba(124,58,237,0.3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(124,58,237,0.2)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(124,58,237,0.1)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.3)' }}>
              🤖 Chat with AI
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* AI Chat Widget */}
      <AnimatePresence>
        {showAI && <AIChatWidget onClose={() => setShowAI(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default About
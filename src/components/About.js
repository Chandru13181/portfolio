import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const tags = [
  { label: "🎨 UI Design",   color: "#7c3aed" },
  { label: "🔍 UX Research", color: "#db2777" },
  { label: "⚛️ React",       color: "#7c3aed" },
  { label: "📱 Mobile",      color: "#db2777" },
  { label: "🖌️ Figma",      color: "#7c3aed" },
  { label: "✨ Motion",      color: "#db2777" },
]

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "Tell me about your experience",
  "How can we work together?",
  "What tools do you use?",
  "Are you available for freelance?",
]

/* ─────────────────────────────────────
   AI CHAT WIDGET
───────────────────────────────────── */
function AIChatWidget({ onClose }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    text: "Hi! 👋 I'm Chandru's AI assistant. Ask me anything about his work, skills, or how to collaborate! 🚀",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }])
  const [input,   setInput]   = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const send = async (text) => {
    const userMsg = (text || input).trim()
    if (!userMsg || loading) return
    setInput("")
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setMessages(m => [...m, { role: "user", text: userMsg, time }])
    setLoading(true)
    try {
      const apiMessages = messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .map(m => ({ role: m.role, content: m.text }))
      apiMessages.push({ role: "user", content: userMsg })
      const res  = await fetch("https://iridescent-lokum-f6b7ac.netlify.app/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages(m => [...m, { role: "assistant", text: data.reply || "Sorry, try again!", time: replyTime }])
    } catch {
      const errTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages(m => [...m, { role: "assistant", text: "Connection error! Please try again.", time: errTime }])
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{    opacity: 0, scale: 0.85, y: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        position: "fixed", bottom: 24, right: 24,
        width: 360, zIndex: 99999,
        background: "rgba(8,3,18,0.98)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(124,58,237,0.35)",
        borderRadius: 24,
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", maxHeight: 560,
      }}
    >
      {/* Header */}
      <div style={{ padding: "14px 18px", background: "linear-gradient(135deg,#7c3aed,#db2777)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🤖</div>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: "0.85rem", fontFamily: "'Syne',sans-serif" }}>Chandru's AI Assistant</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }}/>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", fontFamily: "'Inter',sans-serif" }}>Online • Powered by AI</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", cursor: "pointer", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", maxHeight: 320 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              {m.role === "assistant" && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>🤖</div>
              )}
              <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#7c3aed,#db2777)" : "rgba(255,255,255,0.07)", border: m.role === "assistant" ? "1px solid rgba(124,58,237,0.2)" : "none", color: "white", fontSize: "0.82rem", lineHeight: 1.65, fontFamily: "'Inter',sans-serif", whiteSpace: "pre-wrap" }}>
                {m.text}
              </div>
            </div>
            {m.time && <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Inter',sans-serif", marginLeft: m.role === "assistant" ? 36 : 0 }}>{m.time}</span>}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#db2777)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>🤖</div>
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "18px 18px 18px 4px", display: "flex", gap: 5 }}>
              {[0,1,2].map(i => (
                <motion.div key={i} animate={{ y: [0,-6,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }}
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#db2777)" }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 16px 12px", display: "flex", gap: 7, flexWrap: "wrap" }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => send(q)}
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#a78bfa", padding: "5px 11px", borderRadius: 20, fontSize: "0.72rem", fontFamily: "'Inter',sans-serif", cursor: "pointer", fontWeight: 600 }}
              onMouseEnter={e => { e.target.style.background="rgba(124,58,237,0.25)"; e.target.style.color="white" }}
              onMouseLeave={e => { e.target.style.background="rgba(124,58,237,0.1)";  e.target.style.color="#a78bfa" }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(124,58,237,0.15)", display: "flex", gap: 10, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask anything about Chandru..."
          style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 12, padding: "10px 14px", color: "white", fontSize: "0.82rem", outline: "none", fontFamily: "'Inter',sans-serif" }}
          onFocus={e => e.target.style.borderColor="#7c3aed"} onBlur={e => e.target.style.borderColor="rgba(124,58,237,0.22)"}/>
        <motion.button onClick={() => send()} disabled={loading || !input.trim()} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          style={{ background: input.trim() && !loading ? "linear-gradient(135deg,#7c3aed,#db2777)" : "rgba(124,58,237,0.2)", border: "none", borderRadius: 12, padding: "10px 14px", color: "white", cursor: input.trim() && !loading ? "pointer" : "default", fontSize: "1rem", flexShrink: 0 }}>
          ➤
        </motion.button>
      </div>

      {/* Chat Footer */}
      <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(124,58,237,0.1)", textAlign: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Inter',sans-serif" }}>
          Powered by Groq AI • chandruwebdesigner@gmail.com
        </span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────
   ABOUT SECTION
   Font scale:
   • Section tag    → 0.72rem  (uppercase label)
   • Section title  → CSS var  (About Me heading)
   • Sub-heading h3 → 1.25rem  (Passionate Creative…)
   • Badge label    → 0.75rem  (Open to opportunities)
   • Body paragraph → 0.9rem   (description text)
   • Tools label    → 0.68rem  (SKILLS & TOOLS)
   • Skill tags     → 0.78rem
   • Stat number    → 1.1rem
   • Stat label     → 0.65rem
   • Buttons        → 0.84rem
   • Floating badge → 0.75rem
───────────────────────────────────── */
function About() {
  const [showAI, setShowAI] = useState(false)

  const handleDownload = () => {
    fetch("/resume.pdf").then(r => r.blob()).then(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url; a.download = "Chandru_Resume.pdf"
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(() => window.open("/resume.pdf", "_blank"))
  }

  const STATS = [
    { num: "3+",  label: "Years Exp", color: "#7c3aed" },
    { num: "20+", label: "Projects",  color: "#db2777" },
    { num: "15+", label: "Clients",   color: "#7c3aed" },
    { num: "5★",  label: "Rating",    color: "#db2777" },
  ]

  return (
    <section id="about" className="about" style={{ position: "relative", overflow: "visible" }}>

      {/* Glow orb */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }}/>

      {/* ── Section Header ── */}
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }} viewport={{ once: true }}>
        {/* section-tag → 0.72rem via CSS */}
        <span className="section-tag">Who I Am</span>
        {/* section-title → clamp(1.4rem,2.5vw,1.9rem) via CSS */}
        <h2 className="section-title">About <span>Me</span></h2>
      </motion.div>

      <div className="about-grid">

        {/* ════ LEFT COLUMN ════ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring" }} viewport={{ once: true }}
          style={{ position: "relative" }}>

          {/* Profile card */}
          <motion.div
            animate={{ y: [0,-12,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", borderRadius: "32px", height: "340px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5.5rem", boxShadow: "0 30px 60px rgba(124,58,237,0.25)", position: "relative", overflow: "hidden" }}>
            👩‍💻
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.1) 0%,transparent 60%)" }}/>
          </motion.div>

          {/* Floating badge — UI/UX */}
          <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity }}
            style={{ position:"absolute", bottom:"-8px", left:"-8px", background:"rgba(15,5,30,0.95)", border:"1px solid rgba(124,58,237,0.3)", padding:"7px 13px", borderRadius:"12px", fontWeight:700,
              /* badge font = 0.75rem */
              fontSize:"0.75rem", color:"#a78bfa", display:"flex", alignItems:"center", gap:"6px" }}>
            🎨 UI/UX Expert
          </motion.div>

          {/* Floating badge — React */}
          <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity, delay:1.5 }}
            style={{ position:"absolute", top:"-8px", right:"-8px", background:"rgba(15,5,30,0.95)", border:"1px solid rgba(219,39,119,0.3)", padding:"7px 13px", borderRadius:"12px", fontWeight:700,
              fontSize:"0.75rem", color:"#f472b6", display:"flex", alignItems:"center", gap:"6px" }}>
            ⚡ React Dev
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.4 }} viewport={{ once:true }}
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginTop:"18px" }}>
            {STATS.map((s,i) => (
              <motion.div key={i} whileHover={{ scale:1.04, y:-2 }}
                style={{ background:"rgba(124,58,237,0.08)", border:`1px solid ${s.color}28`, borderRadius:"12px", padding:"11px 8px", textAlign:"center", transition:"all 0.3s" }}>
                {/* Stat number → 1.1rem */}
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:900, color:s.color }}>{s.num}</div>
                {/* Stat label  → 0.65rem */}
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem", color:"rgba(255,255,255,0.45)", fontWeight:600, marginTop:"3px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ════ RIGHT COLUMN ════ */}
        <motion.div
          initial={{ opacity:0, x:60 }} whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.9, type:"spring" }} viewport={{ once:true }}
          className="about-text">

          {/* "Open to opportunities" badge */}
          <motion.div
            initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.2 }} viewport={{ once:true }}
            style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:"50px", padding:"5px 14px",
              /* badge text → 0.75rem */
              fontSize:"0.75rem", fontWeight:700, color:"#a78bfa", marginBottom:"14px" }}>
            <motion.span animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"block" }}/>
            Open to opportunities
          </motion.div>

          {/* ── Sub-heading h3 → 1.25rem (Syne, bold) ── */}
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize:   "1.25rem",
            fontWeight: 800,
            color:      "white",
            lineHeight: 1.3,
            marginBottom: "14px",
          }}>
            Passionate Creative &amp; Problem Solver
          </h3>

          {/* ── Body paragraphs → 0.9rem ── */}
          <motion.p
            initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.3 }} viewport={{ once:true }}
            style={{ color:"rgba(255,255,255,0.72)", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", lineHeight:"1.85", marginBottom:"12px" }}>
            I'm a UI/UX Designer with 3+ years crafting stunning digital experiences. I transform complex problems into elegant interfaces that users love — from wireframes to pixel-perfect React builds.
          </motion.p>

          <motion.p
            initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.4 }} viewport={{ once:true }}
            style={{ color:"rgba(255,255,255,0.72)", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", lineHeight:"1.85", marginBottom:"22px" }}>
            Delivered designs boosting engagement by 40% and conversions by 25% for startups and agencies across India.
          </motion.p>

          {/* ── Tools label → 0.68rem ── */}
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"2.5px", marginBottom:"10px" }}>
            Skills &amp; Tools
          </p>

          {/* ── Skill tags → 0.78rem ── */}
          <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom:"26px" }}>
            {tags.map((tag,i) => (
              <motion.span key={i}
                initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
                transition={{ delay:i*0.07 }} whileHover={{ scale:1.06, y:-2 }} viewport={{ once:true }}
                style={{ background:`${tag.color}12`, border:`1px solid ${tag.color}30`, color:tag.color, padding:"5px 13px", borderRadius:"50px", fontSize:"0.78rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", fontFamily:"'Inter',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background=tag.color; e.currentTarget.style.color="white" }}
                onMouseLeave={e => { e.currentTarget.style.background=`${tag.color}12`; e.currentTarget.style.color=tag.color }}>
                {tag.label}
              </motion.span>
            ))}
          </div>

          {/* ── Buttons → 0.84rem ── */}
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <motion.button onClick={handleDownload}
              whileHover={{ scale:1.04, y:-3 }} whileTap={{ scale:0.97 }}
              style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white", padding:"11px 22px", borderRadius:"12px", fontWeight:700, fontSize:"0.84rem", border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"7px", boxShadow:"0 8px 22px rgba(124,58,237,0.3)", fontFamily:"'Syne',sans-serif" }}>
              ⬇ Download CV
            </motion.button>

            <motion.button onClick={() => setShowAI(true)}
              whileHover={{ scale:1.04, y:-3 }} whileTap={{ scale:0.97 }}
              style={{ background:"rgba(124,58,237,0.1)", color:"#a78bfa", padding:"11px 22px", borderRadius:"12px", fontWeight:700, fontSize:"0.84rem", border:"1.5px solid rgba(124,58,237,0.3)", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"7px", fontFamily:"'Syne',sans-serif", transition:"all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(124,58,237,0.2)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.55)" }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(124,58,237,0.1)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.3)" }}>
              🤖 Chat with AI
            </motion.button>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {showAI && <AIChatWidget onClose={() => setShowAI(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default About
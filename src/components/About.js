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

const STATS = [
  { num: "3+",  label: "Years Exp", color: "#7c3aed" },
  { num: "20+", label: "Projects",  color: "#db2777" },
  { num: "15+", label: "Clients",   color: "#7c3aed" },
  { num: "5★",  label: "Rating",    color: "#db2777" },
]

/* ─── AI Chat Widget ─── */
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
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      const rt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages(m => [...m, { role: "assistant", text: data.reply || "Sorry, try again!", time: rt }])
    } catch {
      const et = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages(m => [...m, { role: "assistant", text: "Connection error! Please try again.", time: et }])
    }
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity:0, scale:0.88, y:24 }}
      animate={{ opacity:1, scale:1, y:0 }}
      exit={{    opacity:0, scale:0.88, y:24 }}
      transition={{ type:"spring", stiffness:280, damping:26 }}
      style={{ position:"fixed", bottom:24, right:24, width:350, zIndex:99999,
        background:"rgba(8,3,18,0.98)", backdropFilter:"blur(40px)",
        border:"1px solid rgba(124,58,237,0.35)", borderRadius:22,
        boxShadow:"0 32px 72px rgba(0,0,0,0.55)",
        display:"flex", flexDirection:"column", overflow:"hidden", maxHeight:540 }}>

      {/* Header */}
      <div style={{ padding:"13px 16px", background:"linear-gradient(135deg,#7c3aed,#db2777)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:35, height:35, borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"2px solid rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>🤖</div>
          <div>
            <div style={{ color:"white", fontWeight:700, fontSize:"0.83rem", fontFamily:"'Inter',sans-serif" }}>Chandru's AI Assistant</div>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }}/>
              <span style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.68rem", fontFamily:"'Inter',sans-serif" }}>Online • Powered by AI</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"white", cursor:"pointer", width:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, padding:"14px", display:"flex", flexDirection:"column", gap:10, overflowY:"auto", maxHeight:300 }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:m.role==="user"?"flex-end":"flex-start", gap:2 }}>
            <div style={{ display:"flex", alignItems:"flex-end", gap:7, flexDirection:m.role==="user"?"row-reverse":"row" }}>
              {m.role==="assistant" && <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#db2777)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", flexShrink:0 }}>🤖</div>}
              <div style={{ maxWidth:"82%", padding:"9px 13px", borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:m.role==="user"?"linear-gradient(135deg,#7c3aed,#db2777)":"rgba(255,255,255,0.07)", border:m.role==="assistant"?"1px solid rgba(124,58,237,0.2)":"none", color:"white", fontSize:"0.8rem", lineHeight:1.6, fontFamily:"'Inter',sans-serif", whiteSpace:"pre-wrap" }}>{m.text}</div>
            </div>
            {m.time && <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.3)", fontFamily:"'Inter',sans-serif", marginLeft:m.role==="assistant"?33:0 }}>{m.time}</span>}
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:7 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#db2777)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem" }}>🤖</div>
            <div style={{ padding:"10px 14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:"16px 16px 16px 4px", display:"flex", gap:4 }}>
              {[0,1,2].map(i=>(
                <motion.div key={i} animate={{ y:[0,-5,0] }} transition={{ duration:0.55, repeat:Infinity, delay:i*0.14 }}
                  style={{ width:6, height:6, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#db2777)" }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div style={{ padding:"0 14px 10px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {QUICK_QUESTIONS.map((q,i)=>(
            <button key={i} onClick={()=>send(q)}
              style={{ background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.25)", color:"#a78bfa", padding:"4px 10px", borderRadius:16, fontSize:"0.7rem", fontFamily:"'Inter',sans-serif", cursor:"pointer", fontWeight:600 }}
              onMouseEnter={e=>{ e.target.style.background="rgba(124,58,237,0.25)"; e.target.style.color="white" }}
              onMouseLeave={e=>{ e.target.style.background="rgba(124,58,237,0.1)"; e.target.style.color="#a78bfa" }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding:"10px 14px", borderTop:"1px solid rgba(124,58,237,0.15)", display:"flex", gap:8, flexShrink:0 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          placeholder="Ask anything about Chandru..."
          style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(124,58,237,0.22)", borderRadius:10, padding:"9px 13px", color:"white", fontSize:"0.8rem", outline:"none", fontFamily:"'Inter',sans-serif" }}
          onFocus={e=>e.target.style.borderColor="#7c3aed"} onBlur={e=>e.target.style.borderColor="rgba(124,58,237,0.22)"}/>
        <motion.button onClick={()=>send()} disabled={loading||!input.trim()}
          whileHover={{ scale:1.06 }} whileTap={{ scale:0.95 }}
          style={{ background:input.trim()&&!loading?"linear-gradient(135deg,#7c3aed,#db2777)":"rgba(124,58,237,0.2)", border:"none", borderRadius:10, padding:"9px 13px", color:"white", cursor:input.trim()&&!loading?"pointer":"default", fontSize:"0.95rem", flexShrink:0 }}>
          ➤
        </motion.button>
      </div>

      {/* Chat footer */}
      <div style={{ padding:"6px 14px", borderTop:"1px solid rgba(124,58,237,0.1)", textAlign:"center", flexShrink:0 }}>
        <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.22)", fontFamily:"'Inter',sans-serif" }}>
          Powered by Groq AI • chandruwebdesigner@gmail.com
        </span>
      </div>
    </motion.div>
  )
}

/* ─── About Section ─── */
function About() {
  const [showAI, setShowAI] = useState(false)

  const handleDownload = () => {
    fetch("/resume.pdf").then(r=>r.blob()).then(blob=>{
      const url=URL.createObjectURL(blob)
      const a=document.createElement("a")
      a.href=url; a.download="Chandru_Resume.pdf"
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(()=>window.open("/resume.pdf","_blank"))
  }

  return (
    <section id="about" className="about" style={{ position:"relative", overflow:"visible" }}>

      {/* Glow */}
      <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"360px", height:"360px", background:"radial-gradient(circle,rgba(124,58,237,0.06),transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>

      {/* ── Header ── */}
      <motion.div className="section-header"
        initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.65 }} viewport={{ once:true }}>
        <span className="section-tag">Who I Am</span>
        <h2 className="section-title">About <span>Me</span></h2>
      </motion.div>

      <div className="about-grid">

        {/* ══ LEFT ══ */}
        <motion.div
          initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.7, type:"spring", stiffness:80 }}
          viewport={{ once:true }}
          style={{ position:"relative" }}>

          {/* Profile card — medium float animation */}
          <motion.div
            animate={{ y:[0,-8,0] }}
            transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
            style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", borderRadius:"28px", height:"300px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5rem", boxShadow:"0 24px 50px rgba(124,58,237,0.22)", position:"relative", overflow:"hidden" }}>
            👩‍💻
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 60%)" }}/>
          </motion.div>

          {/* Floating badge — UI/UX — medium animation */}
          <motion.div
            animate={{ y:[0,-5,0] }}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", bottom:"-10px", left:"-10px", background:"rgba(12,4,26,0.96)", border:"1px solid rgba(124,58,237,0.28)", padding:"7px 13px", borderRadius:"12px", display:"flex", alignItems:"center", gap:"6px",
              /* badge font → Inter 0.75rem */
              fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:700, color:"#a78bfa" }}>
            🎨 UI/UX Expert
          </motion.div>

          {/* Floating badge — React — medium animation */}
          <motion.div
            animate={{ y:[0,-5,0] }}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut", delay:1.5 }}
            style={{ position:"absolute", top:"-10px", right:"-10px", background:"rgba(12,4,26,0.96)", border:"1px solid rgba(219,39,119,0.28)", padding:"7px 13px", borderRadius:"12px", display:"flex", alignItems:"center", gap:"6px",
              fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:700, color:"#f472b6" }}>
            ⚡ React Dev
          </motion.div>

          {/* ── Stats grid — medium size cards ── */}
          <motion.div
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.35 }} viewport={{ once:true }}
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px", marginTop:"18px" }}>
            {STATS.map((s,i)=>(
              <motion.div key={i}
                whileHover={{ scale:1.03, y:-2 }}
                transition={{ duration:0.25 }}
                style={{ background:"rgba(124,58,237,0.07)", border:`1px solid ${s.color}22`, borderRadius:"11px",
                  /* medium card padding */
                  padding:"10px 8px", textAlign:"center" }}>
                {/* Stat number → Inter 1rem bold */}
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"1rem", fontWeight:800, color:s.color }}>{s.num}</div>
                {/* Stat label → Inter 0.63rem */}
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.63rem", color:"rgba(255,255,255,0.42)", fontWeight:600, marginTop:"2px", textTransform:"uppercase", letterSpacing:"0.4px" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ RIGHT ══ */}
        <motion.div
          initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
          transition={{ duration:0.7, type:"spring", stiffness:80 }}
          viewport={{ once:true }}
          className="about-text">

          {/* "Open to opportunities" pill */}
          <motion.div
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.18 }} viewport={{ once:true }}
            style={{ display:"inline-flex", alignItems:"center", gap:"7px", background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.18)", borderRadius:"50px", padding:"5px 13px",
              fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:700, color:"#a78bfa", marginBottom:"14px" }}>
            <motion.span
              animate={{ scale:[1,1.4,1], opacity:[1,0.4,1] }}
              transition={{ duration:2, repeat:Infinity }}
              style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"block" }}/>
            Open to opportunities
          </motion.div>

          {/* ── Sub-heading → Inter 1.2rem 800 ── */}
          <h3 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   "1.2rem",
            fontWeight: 800,
            color:      "white",
            lineHeight: 1.35,
            marginBottom: "14px",
            letterSpacing: "-0.2px",
          }}>
            Passionate Creative &amp; Problem Solver
          </h3>

          {/* ── Body → Inter 0.88rem ── */}
          <motion.p
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.28 }} viewport={{ once:true }}
            style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,0.68)", fontSize:"0.88rem", lineHeight:"1.82", marginBottom:"11px" }}>
            I'm a UI/UX Designer with 3+ years crafting stunning digital experiences. I transform complex problems into elegant interfaces that users love — from wireframes to pixel-perfect React builds.
          </motion.p>

          <motion.p
            initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            transition={{ delay:0.36 }} viewport={{ once:true }}
            style={{ fontFamily:"'Inter',sans-serif", color:"rgba(255,255,255,0.68)", fontSize:"0.88rem", lineHeight:"1.82", marginBottom:"20px" }}>
            Delivered designs boosting engagement by 40% and conversions by 25% for startups and agencies across India.
          </motion.p>

          {/* ── Skills label → Inter 0.67rem ── */}
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.67rem", fontWeight:700, color:"rgba(255,255,255,0.32)", textTransform:"uppercase", letterSpacing:"2.5px", marginBottom:"10px" }}>
            Skills &amp; Tools
          </p>

          {/* ── Skill tags → Inter 0.76rem ── */}
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"24px" }}>
            {tags.map((tag,i)=>(
              <motion.span key={i}
                initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }}
                transition={{ delay:i*0.06 }} whileHover={{ scale:1.05, y:-2 }}
                viewport={{ once:true }}
                style={{ background:`${tag.color}10`, border:`1px solid ${tag.color}28`, color:tag.color, padding:"5px 12px", borderRadius:"50px", fontSize:"0.76rem", fontWeight:700, cursor:"pointer", transition:"all 0.25s", fontFamily:"'Inter',sans-serif" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=tag.color; e.currentTarget.style.color="white" }}
                onMouseLeave={e=>{ e.currentTarget.style.background=`${tag.color}10`; e.currentTarget.style.color=tag.color }}>
                {tag.label}
              </motion.span>
            ))}
          </div>

          {/* ── Buttons → Inter 0.83rem ── */}
          <div style={{ display:"flex", gap:"11px", flexWrap:"wrap" }}>
            <motion.button onClick={handleDownload}
              whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97 }}
              style={{ background:"linear-gradient(135deg,#7c3aed,#db2777)", color:"white", padding:"10px 22px", borderRadius:"11px", fontWeight:700, fontSize:"0.83rem", border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"6px", boxShadow:"0 8px 20px rgba(124,58,237,0.28)", fontFamily:"'Inter',sans-serif" }}>
              ⬇ Download CV
            </motion.button>

            <motion.button onClick={()=>setShowAI(true)}
              whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.97 }}
              style={{ background:"rgba(124,58,237,0.09)", color:"#a78bfa", padding:"10px 22px", borderRadius:"11px", fontWeight:700, fontSize:"0.83rem", border:"1.5px solid rgba(124,58,237,0.28)", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"6px", fontFamily:"'Inter',sans-serif", transition:"all 0.25s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(124,58,237,0.18)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.5)" }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(124,58,237,0.09)"; e.currentTarget.style.borderColor="rgba(124,58,237,0.28)" }}>
              🤖 Chat with AI
            </motion.button>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {showAI && <AIChatWidget onClose={()=>setShowAI(false)} />}
      </AnimatePresence>
    </section>
  )
}

export default About
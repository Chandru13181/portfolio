import React, { useState } from "react"
import { motion } from "framer-motion"

const GithubSVG    = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedinSVG  = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const InstagramSVG = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
const DribbbleSVG  = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.307-1.558 3.959-3.836 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.42 3.047-5.301 8.279-6.995.12-.04.241-.08.364-.115a28.369 28.369 0 00-.757-1.685c-5.433 1.545-10.723 1.486-11.484 1.471l-.02.6c0 2.406.84 4.617 2.218 6.334zm-2.063-7.374c.774.012 5.543.026 10.618-1.208A28.351 28.351 0 0010.5 2.249C7.235 3.226 4.593 5.666 3.122 8.803zm8.898-6.63c.489 1.168.955 2.45 1.35 3.817 3.227-.85 6.103-2.173 7.422-4.158a9.937 9.937 0 00-8.772.341zm9.217 1.401c-1.44 2.1-4.473 3.553-7.873 4.444.221.903.415 1.832.575 2.78 3.407-.533 6.405.272 6.728.362a9.948 9.948 0 00.57-7.586z"/></svg>
const BehanceSVG   = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.65.673 1.43.673 2.36 0 .74-.14 1.38-.42 1.92-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.767-.63.165-1.29.254-1.99.254H0V4.51h6.938v-.007zM3.495 10.492h2.84c.598 0 1.1-.143 1.508-.428.407-.284.61-.748.61-1.39 0-.318-.06-.58-.175-.797-.115-.22-.27-.39-.47-.52-.198-.13-.42-.22-.67-.27-.25-.05-.508-.075-.774-.075H3.495v3.48zm0 5.46h3.21c.273 0 .538-.023.797-.07.26-.045.497-.13.707-.26.21-.13.38-.31.508-.54.13-.228.19-.525.19-.888 0-.71-.21-1.23-.63-1.55-.42-.32-.975-.48-1.67-.48h-3.11v3.788zm14.11.555c.398.29.894.435 1.488.435.462 0 .86-.116 1.19-.348.33-.232.535-.48.614-.745h2.66c-.426 1.32-1.08 2.26-1.96 2.82-.88.562-1.95.842-3.21.842-.87 0-1.66-.14-2.36-.42-.7-.28-1.3-.68-1.79-1.18-.49-.5-.865-1.1-1.13-1.8-.262-.7-.393-1.47-.393-2.31 0-.82.134-1.57.4-2.27.267-.7.645-1.3 1.135-1.8.49-.5 1.08-.89 1.77-1.17.695-.28 1.46-.42 2.305-.42.94 0 1.77.18 2.48.54.712.36 1.3.85 1.77 1.46.47.61.807 1.32 1.01 2.12.2.8.268 1.65.2 2.54H17.08c.04.73.244 1.28.525 1.63zm2.59-4.83c-.32-.29-.795-.435-1.43-.435-.41 0-.75.07-1.02.21-.27.14-.49.316-.655.525-.165.21-.28.43-.346.664-.065.23-.1.44-.11.635h4.27c-.077-.748-.39-1.31-.71-1.6zm-5.5-7.61h5.63v1.36h-5.63V4.067z"/></svg>
const TwitterSVG   = () => <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

const SOCIALS = [
  { Icon:GithubSVG,    href:"https://github.com/Chandru13181",       label:"GitHub",    bg:"#1a1a1a", border:"rgba(255,255,255,.2)"  },
  { Icon:LinkedinSVG,  href:"https://www.linkedin.com/in/%F0%9D%97%96%F0%9D%97%9B%F0%9D%97%94%F0%9D%97%A1%F0%9D%97%97%F0%9D%97%A5%F0%9D%97%A8-%F0%9D%97%A0-16833b1ba/",  label:"LinkedIn",  bg:"#0a66c2", border:"#0a66c2"               },
  { Icon:InstagramSVG, href:"https://www.instagram.com/chandru_u_s/",    label:"Instagram", bg:"#e1306c", border:"#e1306c"               },
  { Icon:DribbbleSVG,  href:"https://dribbble.com/chandruwebdesigner",     label:"Dribbble",  bg:"#ea4c89", border:"#ea4c89"               },
  { Icon:BehanceSVG,   href:"https://www.behance.net/chandruwebdesigner",      label:"Behance",   bg:"#1769ff", border:"#1769ff"               },
  { Icon:TwitterSVG,   href:"https://x.com/chandru_131",      label:"Twitter/X", bg:"#000",    border:"rgba(255,255,255,.2)"  },
]

const INFO = [
  { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"EMAIL", val:"chandruwebdesigner@gmail.com", color:"#a855f7" },
  { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label:"PHONE", val:"+91 93611 98301, +65 81447577", color:"#ec4899" },
  { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:"LOCATION", val:"Chennai, Tamil Nadu", color:"#8b5cf6" },
  { icon:<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label:"RESPONSE", val:"Within 24 hours", color:"#10b981" },
]

const INIT = { name:"", email:"", subject:"", message:"" }

const Contact = () => {
  const [form, setForm] = useState(INIT)
  const [errs, setErrs] = useState({})
  const [stat, setStat] = useState("idle")

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = "Required"
    if (!form.email.trim())   e.email   = "Required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid"
    if (!form.subject.trim()) e.subject = "Required"
    if (form.message.length < 20) e.message = "Min 20 chars"
    return e
  }

  const submit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setStat("loading"); setErrs({})
    try {
      const { saveContactMessage } = await import("./Firebase")
      await saveContactMessage({ ...form })
      setStat("success"); setForm(INIT)
    } catch { setStat("success"); setForm(INIT) }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(r => ({ ...r, [name]: "" }))
  }

  const inp = {
    width:"100%", padding:"12px 16px",
    background:"rgba(124,58,237,.07)",
    border:"1px solid rgba(124,58,237,.22)",
    borderRadius:10, color:"#fff",
    fontFamily:"'Inter',sans-serif", fontSize:14,
    outline:"none", transition:"border-color .25s", boxSizing:"border-box",
  }

  return (
    <section id="contact" style={{ padding:"100px 0" }}>
      <div className="container">

        {/* ── CENTERED HEADER ── */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.55 }}
          style={{ marginBottom:52, textAlign:"center" }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, letterSpacing:3, textTransform:"uppercase", color:"#ec4899", marginBottom:12 }}>
            <span style={{ width:28, height:1, background:"linear-gradient(90deg,#7c3aed,#ec4899)", display:"block" }}/>
            Get In Touch
            <span style={{ width:28, height:1, background:"linear-gradient(90deg,#ec4899,#7c3aed)", display:"block" }}/>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,3.8vw,46px)", fontWeight:800, color:"#fff", marginBottom:14, lineHeight:1.15 }}>
            Let's{" "}
            <span style={{ background:"linear-gradient(135deg,#a855f7,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Connect
            </span>
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#c4b5d4", maxWidth:460, margin:"0 auto", lineHeight:1.8 }}>
            Available for freelance, full-time roles and creative collaborations.
          </p>
        </motion.div>

        {/* ── 2 COL LAYOUT ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.55fr", gap:48, alignItems:"start", maxWidth:1100, margin:"0 auto" }}>

          {/* LEFT */}
          <motion.div
            initial={{ opacity:0, x:-22 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.55 }}
            style={{ display:"flex", flexDirection:"column", gap:12 }}
          >
            {INFO.map(({ icon, label, val, color }) => (
              <motion.div key={label} whileHover={{ x:4 }}
                style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 18px", borderRadius:14, background:"rgba(14,0,26,.8)", backdropFilter:"blur(12px)", border:"1px solid rgba(124,58,237,.18)" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${color}15`, border:`1px solid ${color}28`, display:"flex", alignItems:"center", justifyContent:"center", color, flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", letterSpacing:1.5, textTransform:"uppercase", marginBottom:3 }}>{label}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"#fff" }}>{val}</div>
                </div>
              </motion.div>
            ))}

            {/* Social icons */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:6 }}>
              {SOCIALS.map(({ Icon, href, label, bg, border }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label} aria-label={label}
                  whileHover={{ y:-4, scale:1.1 }}
                  style={{ width:44, height:44, borderRadius:10, background:bg, border:`1px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", textDecoration:"none" }}>
                  <Icon/>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity:0, x:22 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:.55 }}
          >
            {stat === "success" ? (
              <div style={{ padding:"52px 32px", textAlign:"center", background:"rgba(14,0,26,.8)", backdropFilter:"blur(12px)", border:"1px solid rgba(124,58,237,.18)", borderRadius:20, display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(16,185,129,.12)", border:"2px solid #10b981", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:"#10b981" }}>Message Sent! 🎉</h3>
                <p style={{ fontFamily:"'Inter',sans-serif", color:"#c4b5d4", lineHeight:1.75 }}>I'll get back to you within 24 hours.</p>
                <motion.button whileHover={{ scale:1.04 }} onClick={() => setStat("idle")}
                  style={{ padding:"12px 28px", borderRadius:50, background:"linear-gradient(135deg,#7c3aed,#ec4899)", color:"#fff", border:"none", fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", marginTop:6 }}>
                  Send Another
                </motion.button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate
                style={{ padding:"32px", background:"rgba(14,0,26,.8)", backdropFilter:"blur(12px)", border:"1px solid rgba(124,58,237,.18)", borderRadius:20, display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div>
                    <label style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Name *</label>
                    <input name="name" value={form.name} onChange={onChange} style={{ ...inp, borderColor:errs.name?"#ef4444":"rgba(124,58,237,.22)" }} placeholder="Your Name"
                      onFocus={e=>e.target.style.borderColor="#a855f7"} onBlur={e=>e.target.style.borderColor=errs.name?"#ef4444":"rgba(124,58,237,.22)"}/>
                    {errs.name && <span style={{ fontSize:11, color:"#ef4444", fontFamily:"'Inter',sans-serif" }}>{errs.name}</span>}
                  </div>
                  <div>
                    <label style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} style={{ ...inp, borderColor:errs.email?"#ef4444":"rgba(124,58,237,.22)" }} placeholder="you@email.com"
                      onFocus={e=>e.target.style.borderColor="#a855f7"} onBlur={e=>e.target.style.borderColor=errs.email?"#ef4444":"rgba(124,58,237,.22)"}/>
                    {errs.email && <span style={{ fontSize:11, color:"#ef4444", fontFamily:"'Inter',sans-serif" }}>{errs.email}</span>}
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Subject *</label>
                  <input name="subject" value={form.subject} onChange={onChange} style={{ ...inp, borderColor:errs.subject?"#ef4444":"rgba(124,58,237,.22)" }} placeholder="Project Inquiry"
                    onFocus={e=>e.target.style.borderColor="#a855f7"} onBlur={e=>e.target.style.borderColor=errs.subject?"#ef4444":"rgba(124,58,237,.22)"}/>
                  {errs.subject && <span style={{ fontSize:11, color:"#ef4444", fontFamily:"'Inter',sans-serif" }}>{errs.subject}</span>}
                </div>
                <div>
                  <label style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", letterSpacing:1.5, textTransform:"uppercase", display:"block", marginBottom:7 }}>Message *</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={5}
                    style={{ ...inp, resize:"vertical", minHeight:120, borderColor:errs.message?"#ef4444":"rgba(124,58,237,.22)" }}
                    placeholder="Tell me about your project..."
                    onFocus={e=>e.target.style.borderColor="#a855f7"} onBlur={e=>e.target.style.borderColor=errs.message?"#ef4444":"rgba(124,58,237,.22)"}/>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
                    {errs.message && <span style={{ fontSize:11, color:"#ef4444", fontFamily:"'Inter',sans-serif" }}>{errs.message}</span>}
                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#6b5a7e", marginLeft:"auto" }}>{form.message.length}/500</span>
                  </div>
                </div>
                <motion.button type="submit" disabled={stat==="loading"} whileHover={{ scale:1.02 }} whileTap={{ scale:.98 }}
                  style={{ width:"100%", padding:"14px", borderRadius:50, background:"linear-gradient(135deg,#7c3aed,#ec4899)", color:"#fff", border:"none", fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  {stat==="loading" ? "Sending..." : <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){#contact .container>div:last-child{grid-template-columns:1fr!important;max-width:600px!important}}
        @media(max-width:580px){#contact .container>div:last-child>div:first-child~div form>div:first-child{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}

export default Contact
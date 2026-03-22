import React, { useState } from "react"
import { motion } from "framer-motion"

const GithubSVG    = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
const LinkedinSVG  = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const InstagramSVG = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
const DribbbleSVG  = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.307-1.558 3.959-3.836 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.017-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.006-.816zm-11.62-2.073c.232-.42 3.047-5.301 8.279-6.995.12-.04.241-.08.364-.115a28.369 28.369 0 00-.757-1.685c-5.433 1.545-10.723 1.486-11.484 1.471l-.02.6c0 2.406.84 4.617 2.218 6.334zm-2.063-7.374c.774.012 5.543.026 10.618-1.208A28.351 28.351 0 0010.5 2.249C7.235 3.226 4.593 5.666 3.122 8.803zm8.898-6.63c.489 1.168.955 2.45 1.35 3.817 3.227-.85 6.103-2.173 7.422-4.158a9.937 9.937 0 00-8.772.341zm9.217 1.401c-1.44 2.1-4.473 3.553-7.873 4.444.221.903.415 1.832.575 2.78 3.407-.533 6.405.272 6.728.362a9.948 9.948 0 00.57-7.586z"/></svg>
const BehanceSVG   = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.65.673 1.43.673 2.36 0 .74-.14 1.38-.42 1.92-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.767-.63.165-1.29.254-1.99.254H0V4.51h6.938v-.007zM3.495 10.492h2.84c.598 0 1.1-.143 1.508-.428.407-.284.61-.748.61-1.39 0-.318-.06-.58-.175-.797-.115-.22-.27-.39-.47-.52-.198-.13-.42-.22-.67-.27-.25-.05-.508-.075-.774-.075H3.495v3.48zm0 5.46h3.21c.273 0 .538-.023.797-.07.26-.045.497-.13.707-.26.21-.13.38-.31.508-.54.13-.228.19-.525.19-.888 0-.71-.21-1.23-.63-1.55-.42-.32-.975-.48-1.67-.48h-3.11v3.788zm14.11.555c.398.29.894.435 1.488.435.462 0 .86-.116 1.19-.348.33-.232.535-.48.614-.745h2.66c-.426 1.32-1.08 2.26-1.96 2.82-.88.562-1.95.842-3.21.842-.87 0-1.66-.14-2.36-.42-.7-.28-1.3-.68-1.79-1.18-.49-.5-.865-1.1-1.13-1.8-.262-.7-.393-1.47-.393-2.31 0-.82.134-1.57.4-2.27.267-.7.645-1.3 1.135-1.8.49-.5 1.08-.89 1.77-1.17.695-.28 1.46-.42 2.305-.42.94 0 1.77.18 2.48.54.712.36 1.3.85 1.77 1.46.47.61.807 1.32 1.01 2.12.2.8.268 1.65.2 2.54H17.08c.04.73.244 1.28.525 1.63zm2.59-4.83c-.32-.29-.795-.435-1.43-.435-.41 0-.75.07-1.02.21-.27.14-.49.316-.655.525-.165.21-.28.43-.346.664-.065.23-.1.44-.11.635h4.27c-.077-.748-.39-1.31-.71-1.6zm-5.5-7.61h5.63v1.36h-5.63V4.067z"/></svg>
const TwitterSVG   = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>

const SOCIALS = [
  { Icon: GithubSVG,    href: "https://github.com/Chandru13181", label: "GitHub", bg: "#1a1a1a", bd: "rgba(255,255,255,.15)" },
  { Icon: LinkedinSVG,  href: "https://www.linkedin.com/in/%F0%9D%97%96%F0%9D%97%9B%F0%9D%97%94%F0%9D%97%A1%F0%9D%97%97%F0%9D%97%A5%F0%9D%97%A8-%F0%9D%97%A0-16833b1ba/", label: "LinkedIn", bg: "#0a66c2", bd: "#0a66c2" },
  { Icon: InstagramSVG, href: "https://www.instagram.com/chandru_u_s/", label: "Instagram", bg: "#e1306c", bd: "#e1306c" },
  { Icon: DribbbleSVG,  href: "https://dribbble.com/chandruwebdesigner", label: "Dribbble", bg: "#ea4c89", bd: "#ea4c89" },
  { Icon: BehanceSVG,   href: "https://www.behance.net/chandruwebdesigner", label: "Behance", bg: "#1769ff", bd: "#1769ff" },
  { Icon: TwitterSVG,   href: "https://x.com/chandru_131", label: "Twitter/X", bg: "#000", bd: "rgba(255,255,255,.15)" },
]

const NAV      = ["About", "Skills", "Projects", "Experience", "Contact"]
const SERVICES = ["UI/UX Design", "Web Design", "Mobile Design", "Branding", "Prototyping"]
const go = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }) }

function DownloadCVButton() {
  const [hovered, setHovered] = useState(false)
  const handleDownload = () => {
    fetch('/resume.pdf').then(r=>r.blob()).then(blob=>{
      const url=URL.createObjectURL(blob)
      const a=document.createElement('a')
      a.href=url; a.download='Chandru_Resume.pdf'
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
    }).catch(()=>window.open('/resume.pdf','_blank'))
  }
  return (
    <motion.button onClick={handleDownload}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      whileHover={{scale:1.06,y:-4}} whileTap={{scale:0.97}}
      style={{
        padding:"11px 28px", borderRadius:50, cursor:"pointer",
        background: hovered ? 'linear-gradient(135deg,#7c3aed,#db2777)' : "rgba(255,255,255,.06)",
        border: hovered ? '1px solid transparent' : "1px solid rgba(255,255,255,.2)",
        color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:600,
        display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.3s",
        boxShadow: hovered ? '0 15px 35px rgba(124,58,237,0.4)' : 'none',
      }}>
      <motion.span animate={{y:hovered?[0,-4,0]:0}} transition={{duration:0.6,repeat:hovered?Infinity:0}}>↓</motion.span>
      Download CV
    </motion.button>
  )
}

const ColHead = ({children}) => (
  <h4 style={{fontFamily:"'Syne',sans-serif",fontSize:14,color:"#ec4899",letterSpacing:2,textTransform:"uppercase",marginBottom:18,fontWeight:700}}>{children}</h4>
)

const Footer = () => (
  <footer style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(124,58,237,.15)",background:"rgba(8,0,16,.97)"}}>

    <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"60%",height:1,background:"linear-gradient(90deg,transparent,#7c3aed,#ec4899,transparent)",boxShadow:"0 0 14px rgba(236,72,153,.4)"}}/>

    {/* CTA */}
    <div style={{borderBottom:"1px solid rgba(124,58,237,.1)"}}>
      <div style={{padding:"40px 48px",textAlign:"center"}}>
        <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:"#a855f7",letterSpacing:3,textTransform:"uppercase",marginBottom:10,fontWeight:600}}>✦ AVAILABLE FOR WORK</div>
        <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,2.5vw,25px)",fontWeight:800,color:"#fff",lineHeight:1.3,marginBottom:20}}>
          Got a project idea?{" "}
          <span style={{background:"linear-gradient(135deg,#a855f7,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>I'd love to hear it.</span>
        </h3>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <motion.a href="#contact" onClick={e=>go(e,"contact")} whileHover={{scale:1.04,y:-3}}
            style={{padding:"11px 26px",borderRadius:50,background:"linear-gradient(135deg,#7c3aed,#ec4899)",color:"#fff",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>
            💬 Start a Project
          </motion.a>
          <DownloadCVButton/>
        </div>
      </div>
    </div>

    {/* MAIN GRID */}
    <div style={{padding:"44px 48px 0"}}>
      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr",gap:36}}>

        {/* Brand */}
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,letterSpacing:2,color:"#fff",marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:7,background:"linear-gradient(135deg,#7c3aed,#ec4899)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            CHANDRU M
          </div>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:"#c4b5d4",lineHeight:1.8,marginBottom:18}}>
            Crafting world-class digital experiences. Chennai based, worldwide available.
          </p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {SOCIALS.map(({Icon,href,label,bg,bd})=>(
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}
                whileHover={{y:-3,scale:1.1}}
                style={{width:36,height:36,borderRadius:8,background:bg,border:`1px solid ${bd}`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",textDecoration:"none"}}>
                <Icon/>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <ColHead>Navigate</ColHead>
          <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:13}}>
            {NAV.map(l=>(
              <li key={l}>
                <motion.a href={`#${l.toLowerCase()}`} onClick={e=>go(e,l.toLowerCase())}
                  whileHover={{x:4}}
                  style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:"#c4b5d4",textDecoration:"none",display:"flex",alignItems:"center",gap:9,transition:"color .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#ec4899"}
                  onMouseLeave={e=>e.currentTarget.style.color="#c4b5d4"}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  {l}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <ColHead>Services</ColHead>
          <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:13}}>
            {SERVICES.map(s=>(
              <li key={s} style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:"#c4b5d4",display:"flex",alignItems:"center",gap:9}}>
                <svg width="6" height="6" viewBox="0 0 24 24" fill="#a855f7"><circle cx="12" cy="12" r="8"/></svg>{s}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <ColHead>Contact</ColHead>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            {[
              {icon:"📧",val:"chandruwebdesigner@gmail.com"},
              {icon:"📱",val:"+91 93611 98301"},
              {icon:"📍",val:"Chennai, Tamil Nadu"},
              {icon:"🌍",val:"Available Worldwide"},
            ].map(({icon,val})=>(
              <div key={val} style={{display:"flex",alignItems:"flex-start",gap:9,fontFamily:"'Inter',sans-serif",fontSize:14,color:"#c4b5d4",lineHeight:1.6}}>
                <span style={{fontSize:15,flexShrink:0,marginTop:1}}>{icon}</span>{val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM */}
    <div style={{padding:"18px 48px",borderTop:"1px solid rgba(124,58,237,.1)",marginTop:44,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:"#6b5a7e",display:"flex",alignItems:"center",gap:5}}>
        © {new Date().getFullYear()} Chandru M — Made with <svg width="11" height="11" viewBox="0 0 24 24" fill="#ec4899"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> in Chennai
      </p>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:"#6b5a7e"}}>Chandru M — UI UX Designer & Web Developer</p>
      <motion.button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
        whileHover={{scale:1.05,y:-2}}
        style={{display:"flex",alignItems:"center",gap:5,padding:"6px 16px",border:"1px solid rgba(124,58,237,.25)",color:"#c4b5d4",fontFamily:"'Inter',sans-serif",fontSize:13,cursor:"pointer",borderRadius:50,background:"transparent",transition:"all .2s"}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        Top
      </motion.button>
    </div>

    <style>{`
      @media(max-width:900px){ footer > div:nth-child(3) > div { grid-template-columns:1fr 1fr!important } }
      @media(max-width:560px){
        footer > div:nth-child(3) > div { grid-template-columns:1fr!important }
        footer > div:nth-child(2) > div { padding:28px 20px!important }
        footer > div:nth-child(3) { padding:28px 20px 0!important }
        footer > div:last-child { padding:14px 20px!important; flex-direction:column; text-align:center }
      }
    `}</style>
  </footer>
)

export default Footer
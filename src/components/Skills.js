import React from "react"
import { motion } from "framer-motion"

const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
    <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
  </svg>
)
const AdobeXDLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="18" fill="#FF26BE"/>
    <text x="50" y="67" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="36" fill="white">Xd</text>
  </svg>
)
const PhotoshopLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="18" fill="#001E36"/>
    <text x="50" y="67" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="36" fill="#31A8FF">Ps</text>
  </svg>
)
const ReactLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="10" fill="#61DAFB"/>
    <g fill="none" stroke="#61DAFB" strokeWidth="4">
      <ellipse cx="50" cy="50" rx="42" ry="16"/>
      <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(120 50 50)"/>
    </g>
  </svg>
)
const HTMLLogo = () => (
  <svg viewBox="0 0 452 520" width="36" height="42" xmlns="http://www.w3.org/2000/svg">
    <path d="M41 460L0 0h451l-41 460-185 52L41 460z" fill="#E34F26"/>
    <path d="M226 472l149-41 35-394H226V472z" fill="#EF652A"/>
    <path d="M226 208h-75l-5-58h80V94H84l15 171h127v-57zm3 147l-64-17-4-45h-56l7 79 117 32 1-49z" fill="white"/>
    <path d="M226 208v57h70l-7 73-63 17v51l116-32 9-98 9-68H226zm0-114v56h137l-5-56H226z" fill="#EBEBEB"/>
  </svg>
)
const JSLogo = () => (
  <svg viewBox="0 0 630 630" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="630" height="630" fill="#F7DF1E"/>
    <path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 37.93 30.45 19.3 0 31.45-7.59 31.45-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" fill="#323330"/>
  </svg>
)
const AeLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="18" fill="#00005B"/>
    <text x="50" y="67" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="36" fill="#9999FF">Ae</text>
  </svg>
)
const AiLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="18" fill="#330000"/>
    <text x="50" y="67" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="36" fill="#FF9A00">Ai</text>
  </svg>
)
const MobileLogo = () => (
  <svg viewBox="0 0 60 100" width="28" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="56" height="96" rx="12" fill="none" stroke="#a855f7" strokeWidth="4"/>
    <rect x="18" y="10" width="24" height="4" rx="2" fill="#a855f7" opacity=".5"/>
    <circle cx="30" cy="90" r="5" fill="#a855f7" opacity=".7"/>
    <rect x="8" y="20" width="44" height="58" rx="4" fill="#a855f7" opacity=".08"/>
    <rect x="12" y="26" width="36" height="5" rx="2.5" fill="#a855f7" opacity=".65"/>
    <rect x="12" y="36" width="24" height="4" rx="2" fill="#a855f7" opacity=".4"/>
    <rect x="12" y="46" width="36" height="4" rx="2" fill="#a855f7" opacity=".3"/>
    <rect x="12" y="58" width="36" height="14" rx="7" fill="#a855f7" opacity=".75"/>
  </svg>
)
const MotionLogo = () => (
  <svg viewBox="0 0 100 100" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="none" stroke="#ec4899" strokeWidth="5"/>
    <circle cx="50" cy="50" r="28" fill="none" stroke="#ec4899" strokeWidth="3" opacity=".5"/>
    <path d="M50 6 A44 44 0 0 1 94 50" stroke="#ec4899" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <polygon points="94,50 82,42 82,58" fill="#ec4899"/>
    <circle cx="50" cy="50" r="7" fill="#ec4899"/>
  </svg>
)

const skills = [
  { logo:<FigmaLogo/>,     name:"Figma",         level:98, color:"#A259FF" },
  { logo:<AdobeXDLogo/>,   name:"Adobe XD",      level:90, color:"#FF26BE" },
  { logo:<PhotoshopLogo/>, name:"Photoshop",      level:88, color:"#31A8FF" },
  { logo:<ReactLogo/>,     name:"React",          level:85, color:"#61DAFB" },
  { logo:<HTMLLogo/>,      name:"HTML/CSS",       level:92, color:"#E44D26" },
  { logo:<JSLogo/>,        name:"JavaScript",     level:82, color:"#F7DF1E" },
  { logo:<AeLogo/>,        name:"After Effects",  level:78, color:"#9999FF" },
  { logo:<AiLogo/>,        name:"Illustrator",    level:85, color:"#FF9A00" },
  { logo:<MobileLogo/>,    name:"Mobile Design",  level:90, color:"#a855f7" },
  { logo:<MotionLogo/>,    name:"Motion Design",  level:75, color:"#ec4899" },
]

const Card = ({ logo, name, level, color, index }) => (
  <motion.div
    initial={{ opacity:0, y:20 }}
    whileInView={{ opacity:1, y:0 }}
    viewport={{ once:true }}
    transition={{ duration:0.4, delay:index*0.06 }}
    whileHover={{ y:-5, borderColor:color, boxShadow:`0 12px 30px ${color}22` }}
    style={{
      background:"rgba(14,0,26,.82)",
      backdropFilter:"blur(12px)",
      border:"1px solid rgba(124,58,237,.18)",
      borderRadius:13,
      /* medium card padding */
      padding:"22px 14px 16px",
      textAlign:"center",
      display:"flex", flexDirection:"column", alignItems:"center",
      transition:"border-color .28s, box-shadow .28s",
    }}>

    {/* Logo — medium size hover spin */}
    <motion.div
      whileHover={{ rotate:360, scale:1.08 }}
      transition={{ duration:0.5, ease:"easeInOut" }}
      style={{ marginBottom:11, display:"flex", alignItems:"center", justifyContent:"center", height:46 }}>
      {logo}
    </motion.div>

    {/* Skill name → Inter 0.8rem */}
    <div style={{
      fontFamily:"'Inter',sans-serif",
      fontSize:"0.8rem",
      fontWeight:700,
      color:"#fff",
      marginBottom:11,
      lineHeight:1.2,
    }}>
      {name}
    </div>

    {/* Progress bar */}
    <div style={{ width:"100%", height:3, background:"rgba(255,255,255,.07)", borderRadius:2, overflow:"hidden", marginBottom:5 }}>
      <motion.div
        initial={{ width:0 }}
        whileInView={{ width:`${level}%` }}
        viewport={{ once:true }}
        transition={{ duration:1.0, delay:index*0.06+0.22, ease:[.4,0,.2,1] }}
        style={{ height:"100%", borderRadius:2, background:`linear-gradient(90deg,${color},${color}66)`, boxShadow:`0 0 6px ${color}33` }}/>
    </div>

    {/* Percentage → Inter 0.72rem */}
    <div style={{
      fontFamily:"'Inter',sans-serif",
      fontSize:"0.72rem",
      fontWeight:700,
      color,
    }}>{level}%</div>

  </motion.div>
)

const Skills = () => (
  <section id="skills" style={{ padding:"80px 0" }}>
    <div className="container">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.55 }}
        style={{ marginBottom:44, textAlign:"center" }}>

        {/* "WHAT I DO" label → Inter 0.68rem */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:10,
          fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", fontWeight:600,
          letterSpacing:"3px", textTransform:"uppercase", color:"#ec4899", marginBottom:10 }}>
          <span style={{ width:24, height:1, background:"linear-gradient(90deg,#7c3aed,#ec4899)", display:"block" }}/>
          What I Do
          <span style={{ width:24, height:1, background:"linear-gradient(90deg,#ec4899,#7c3aed)", display:"block" }}/>
        </div>

        {/* ── "My Skills" heading → Inter clamp(1.4–1.9rem) ── */}
        <h2 style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:"clamp(1.4rem, 2.8vw, 1.9rem)",
          fontWeight:800,
          color:"#fff",
          marginBottom:12,
          lineHeight:1.2,
          letterSpacing:"-0.2px",
        }}>
          My{" "}
          <span style={{ background:"linear-gradient(135deg,#a855f7,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Skills
          </span>
        </h2>

        {/* Sub text → Inter 0.88rem */}
        <p style={{
          fontFamily:"'Inter',sans-serif",
          fontSize:"0.88rem",
          color:"rgba(255,255,255,0.52)",
          maxWidth:420, margin:"0 auto", lineHeight:1.75,
        }}>
          Tools &amp; technologies I use to craft world-class digital experiences.
        </p>
      </motion.div>

      {/* ── Skills Grid — 5 col desktop, medium cards ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, maxWidth:940, margin:"0 auto" }}>
        {skills.map((s,i) => <Card key={s.name} {...s} index={i}/>)}
      </div>

    </div>

    <style>{`
      @media(max-width:920px){
        #skills .container>div:last-child{ grid-template-columns:repeat(3,1fr)!important; max-width:580px!important }
      }
      @media(max-width:560px){
        #skills .container>div:last-child{ grid-template-columns:repeat(2,1fr)!important; max-width:360px!important }
      }
    `}</style>
  </section>
)

export default Skills
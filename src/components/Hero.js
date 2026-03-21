import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const words = ["Designer", "Developer", "Creator", "Problem Solver"]

function TypewriterText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)        
    } else {
      setDeleting(false)
      setIndex((index + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span style={{
      background: 'linear-gradient(135deg, #7c3aed, #db2777)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      borderRight: '3px solid #7c3aed', paddingRight: '2px',
      animation: 'cursorBlink 1s step-end infinite',
    }}>{displayed}</span>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '120px 24px 80px',
      background: 'linear-gradient(145deg, #fefcff 0%, #faf5ff 40%, #fdf2ff 70%, #fff0fb 100%)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Animated mesh orbs */}
      {[
        { w:700, h:700, bg:'rgba(124,58,237,0.1)', top:'-20%', right:'-15%', dur:'12s' },
        { w:500, h:500, bg:'rgba(219,39,119,0.08)', bottom:'-10%', left:'-10%', dur:'15s', rev:true },
        { w:350, h:350, bg:'rgba(124,58,237,0.06)', top:'40%', left:'15%', dur:'10s' },
      ].map((orb, i) => (
        <div key={i} style={{
          position:'absolute', width:orb.w, height:orb.h,
          background:`radial-gradient(circle, ${orb.bg}, transparent 70%)`,       
          top:orb.top, right:orb.right, bottom:orb.bottom, left:orb.left,
          borderRadius:'50%', pointerEvents:'none',
          animation:`orbAnim ${orb.dur} ease-in-out infinite ${orb.rev?'reverse':''}`,
        }} />
      ))}

      {/* Floating dots */}
      {Array.from({length:20},(_,i)=>i).map(i => (
        <motion.div key={i}
          style={{
            position:'absolute',
            left:`${5+Math.random()*90}%`,
            top:`${5+Math.random()*90}%`,
            width: Math.random()*4+2,
            height: Math.random()*4+2,
            borderRadius:'50%',
            background: i%2===0 ? 'rgba(124,58,237,0.5)' : 'rgba(219,39,119,0.4)',
            pointerEvents:'none',
          }}
          animate={{ y:[-15,15,-15], opacity:[0.3,0.8,0.3] }}
          transition={{ duration:3+Math.random()*4, repeat:Infinity, delay:Math.random()*3 }}
        />
      ))}

      <motion.div style={{ y, opacity, position:'relative', zIndex:2, width:'100%' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, scale:0.5, y:-20 }}
          animate={{ opacity:1, scale:1, y:0 }}
          transition={{ duration:0.8, type:'spring', bounce:0.6 }}
          style={{
            display:'inline-flex', alignItems:'center', gap:'10px',
            background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)',     
            border:'1.5px solid rgba(124,58,237,0.2)', borderRadius:'50px',       
            padding:'10px 24px', marginBottom:'36px',
            fontSize:'0.88rem', fontWeight:'700', color:'#7c3aed',
            boxShadow:'0 8px 32px rgba(124,58,237,0.12)',
          }}
        >
          <motion.span
            style={{width:8,height:8,borderRadius:'50%',background:'#10b981',display:'block'}}
            animate={{scale:[1,1.6,1],opacity:[1,0.4,1]}}
            transition={{duration:1.5,repeat:Infinity}}
          />
          Available for Freelance Work âœ¨
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.25}}
          style={{
            fontSize:'0.82rem', fontWeight:'700', letterSpacing:'5px',
            textTransform:'uppercase', color:'#94a3b8', marginBottom:'18px',      
          }}
        > I'm a CAHNDRU</motion.p>

        {/* Main title */}
        <motion.h1
          initial={{opacity:0, y:50}}
          animate={{opacity:1, y:0}}
          transition={{duration:1, delay:0.4, type:'spring', stiffness:80}}       
          style={{
            fontFamily:"'Bricolage Grotesque', sans-serif",
            fontSize:'clamp(2.6rem, 5.5vw, 5rem)',
            fontWeight:'900', lineHeight:'1.08',
            color:'#1e1b4b', letterSpacing:'-1.5px',
            marginBottom:'24px',
          }}
        >
          UI/UX{' '}
          <span style={{
            background:'linear-gradient(135deg, #7c3aed, #db2777)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>Designer</span>
          <br/>& Creative <TypewriterText />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.8, delay:0.7}}
          style={{
            color:'#64748b', fontSize:'1.05rem', maxWidth:'480px',
            lineHeight:'1.8', margin:'0 auto 52px', fontWeight:'500',
          }}
        >
          Crafting premium digital experiences through thoughtful design and clean code âœ¨
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{opacity:0, y:30}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.8, delay:0.9}}
          style={{
            display:'flex', gap:'16px', justifyContent:'center',
            flexWrap:'wrap', marginBottom:'80px',
          }}
        >
          
          {/* Primary btn */}
  {/* Primary btn */}
<motion.a
  href="https://raw.githubusercontent.com/Chandru13181/portfolio/main/public/resume.pdf"
  download="Chandru_Resume.pdf"
            whileHover={{
              scale:1.06, y:-6,
              boxShadow:'0 30px 60px rgba(124,58,237,0.45)',
            }}
            whileTap={{scale:0.97}}
            style={{
              background:'linear-gradient(135deg, #7c3aed, #db2777)',
              color:'white', padding:'17px 40px',
              borderRadius:'14px', fontWeight:'800',
              fontSize:'0.95rem', textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:'10px',
              boxShadow:'0 15px 40px rgba(124,58,237,0.35)',
              fontFamily:"'Bricolage Grotesque', sans-serif",
              letterSpacing:'0.2px', transition:'box-shadow 0.3s',
            }}
          >
          <span>⬇️</span>
           Download CV
          </>
          

          {/* Secondary btn */}
          <motion.a href="#projects"
            whileHover={{
              scale:1.06, y:-6,
              borderColor:'#7c3aed',
              background:'rgba(124,58,237,0.04)',
              boxShadow:'0 20px 40px rgba(124,58,237,0.15)',
            }}
            whileTap={{scale:0.97}}
            style={{
              background:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)',    
              color:'#7c3aed', padding:'17px 40px',
              borderRadius:'14px', fontWeight:'800',
              fontSize:'0.95rem', textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:'10px',
              border:'2px solid rgba(124,58,237,0.2)',
              boxShadow:'0 8px 24px rgba(0,0,0,0.06)',
              fontFamily:"'Bricolage Grotesque', sans-serif",
              letterSpacing:'0.2px', transition:'all 0.3s',
            }}
          >
            ðŸš€ View Work
          </motion.a>

          {/* Hire btn */}
          <motion.a href="#contact"
            whileHover={{
              scale:1.06, y:-6,
              boxShadow:'0 30px 60px rgba(219,39,119,0.4)',
            }}
            whileTap={{scale:0.97}}
            style={{
              background:'linear-gradient(135deg, #db2777, #7c3aed)',
              color:'white', padding:'17px 40px',
              borderRadius:'14px', fontWeight:'800',
              fontSize:'0.95rem', textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:'10px',
              boxShadow:'0 15px 40px rgba(219,39,119,0.3)',
              fontFamily:"'Bricolage Grotesque', sans-serif",
              letterSpacing:'0.2px', transition:'box-shadow 0.3s',
            }}
          >
            ðŸ’¬ Hire Me
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{opacity:0, y:40}}
          animate={{opacity:1, y:0}}
          transition={{duration:1, delay:1.1}}
          style={{
            display:'flex', gap:'14px',
            justifyContent:'center', flexWrap:'wrap',
          }}
        >
          {[
            {num:'3+', label:'Years Exp', icon:'ðŸ†'},
            {num:'20+', label:'Projects', icon:'ðŸš€'},
            {num:'15+', label:'Clients', icon:'ðŸ¤'},
            {num:'5â', label:'Rating', icon:'âœ¨'},
          ].map(({num,label,icon},i) => (
            <motion.div key={i}
              initial={{opacity:0, scale:0.6}}
              animate={{opacity:1, scale:1}}
              transition={{delay:1.2+i*0.1, type:'spring', bounce:0.5}}
              whileHover={{scale:1.1, y:-10, boxShadow:'0 25px 50px rgba(124,58,237,0.18)'}}
              style={{
                background:'rgba(255,255,255,0.9)',
                backdropFilter:'blur(20px)',
                padding:'20px 26px', borderRadius:'20px',
                textAlign:'center', cursor:'default',
                border:'1.5px solid rgba(124,58,237,0.1)',
                boxShadow:'0 8px 30px rgba(124,58,237,0.08)',
                minWidth:'105px', transition:'box-shadow 0.3s',
              }}
            >
              <div style={{fontSize:'1.2rem',marginBottom:'6px'}}>{icon}</div>    
              <div style={{
                fontFamily:"'Bricolage Grotesque', sans-serif",
                fontSize:'1.75rem', fontWeight:'900',
                background:'linear-gradient(135deg, #7c3aed, #db2777)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                lineHeight:1, marginBottom:'4px',
              }}>{num}</div>
              <div style={{
                fontSize:'0.72rem', fontWeight:'700',
                color:'#94a3b8', textTransform:'uppercase', letterSpacing:'1px',  
              }}>{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:2}}
          style={{
            marginTop:'60px',
            display:'flex', flexDirection:'column',
            alignItems:'center', gap:'8px',
          }}
        >
          <span style={{
            fontSize:'0.7rem', color:'#94a3b8',
            fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase',     
          }}>Scroll Down</span>
          <motion.div
            animate={{y:[0,12,0]}}
            transition={{duration:1.5, repeat:Infinity}}
            style={{
              width:'26px', height:'44px',
              border:'2px solid rgba(124,58,237,0.25)',
              borderRadius:'13px', display:'flex',
              justifyContent:'center', paddingTop:'7px',
            }}
          >
            <motion.div
              animate={{y:[0,14,0], opacity:[1,0,1]}}
              transition={{duration:1.5, repeat:Infinity}}
              style={{
                width:'4px', height:'8px',
                background:'linear-gradient(to bottom, #7c3aed, #db2777)',        
                borderRadius:'2px',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
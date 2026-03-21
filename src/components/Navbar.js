import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '0 60px', height: '68px',
          background: scrolled
            ? 'rgba(10,5,20,0.97)'
            : 'rgba(10,5,20,0.7)',
          backdropFilter: 'blur(30px)',
          position: 'sticky', top: 0, zIndex: 1000,
          borderBottom: '1px solid rgba(124,58,237,0.15)',
          transition: 'all 0.4s',
        }}
      >
        {/* Animated top border */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(to right, #7c3aed, #db2777, #7c3aed)',
            backgroundSize: '200%',
          }}
          animate={{ backgroundPosition: ['0%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Logo */}
        <motion.a href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem', fontWeight: '900',
              color: 'white',
              boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
            }}
          >✦</motion.div>
          <motion.span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: '1.4rem', fontWeight: '900',
              background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >CHANDRU</motion.span>
        </motion.a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: '4px',
          listStyle: 'none', margin: 0, padding: 0,
          alignItems: 'center',
        }}>
          {navLinks.map((link, i) => (
            <motion.li key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <motion.a
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link)}
                onHoverStart={() => setHoveredLink(link)}
                onHoverEnd={() => setHoveredLink(null)}
                style={{
                  color: active === link ? 'white' : 'rgba(255,255,255,0.55)',
                  textDecoration: 'none', fontWeight: '600',
                  fontSize: '0.88rem', letterSpacing: '0.3px',
                  padding: '8px 16px', borderRadius: '10px',
                  display: 'inline-block', position: 'relative',
                  transition: 'color 0.3s',
                }}
                whileHover={{ color: '#ffffff' }}
              >
                {/* Hover background */}
                <AnimatePresence>
                  {hoveredLink === link && (
                    <motion.span
                      layoutId="navHover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(124,58,237,0.15)',
                        borderRadius: '10px',
                        border: '1px solid rgba(124,58,237,0.3)',
                        zIndex: -1,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {active === link && (
                  <motion.span
                    layoutId="activeNav"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(124,58,237,0.2)',
                      borderRadius: '10px',
                      border: '1px solid rgba(124,58,237,0.4)',
                      zIndex: -1,
                    }}
                  />
                )}
                {link}
              </motion.a>
            </motion.li>
          ))}

          {/* Resume CTA */}
          <motion.li
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
            style={{ marginLeft: '12px' }}
          >
            <motion.a href="/resume.pdf" download
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                color: 'white', padding: '10px 22px',
                borderRadius: '12px', fontWeight: '800',
                fontSize: '0.88rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                whiteSpace: 'nowrap', position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shine effect */}
              <motion.span
                style={{
                  position: 'absolute', top: 0, left: '-100%',
                  width: '60%', height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transform: 'skewX(-20deg)',
                }}
                animate={{ left: ['−100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >⬇</motion.span>
              Resume
            </motion.a>
          </motion.li>
        </ul>

        {/* Mobile hamburger */}
        <motion.button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            cursor: 'pointer', padding: '10px',
            borderRadius: '10px', display: 'none',
            flexDirection: 'column', gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              animate={menuOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 7 : i === 2 ? -7 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
              style={{
                width: '22px', height: '2px',
                background: 'linear-gradient(to right, #7c3aed, #db2777)',
                borderRadius: '2px',
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed', top: '68px', left: 0, right: 0,
              background: 'rgba(10,5,20,0.98)',
              backdropFilter: 'blur(30px)',
              zIndex: 999, overflow: 'hidden',
              borderBottom: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map((link, i) => (
                <motion.a key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none', fontWeight: '700',
                    fontSize: '1rem', padding: '12px 16px',
                    borderRadius: '12px', transition: 'all 0.3s',
                    borderBottom: '1px solid rgba(124,58,237,0.08)',
                  }}
                >{link}</motion.a>
              ))}
              <motion.a href="/resume.pdf" download
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  color: 'white', padding: '14px',
                  borderRadius: '12px', fontWeight: '800',
                  textDecoration: 'none', textAlign: 'center',
                  marginTop: '8px',
                }}
              >⬇ Download Resume</motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav > ul { display: none !important; }
          .hamburger-btn { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
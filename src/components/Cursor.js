import React, { useEffect, useState } from "react"

function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const click = () => { setClicked(true); setTimeout(() => setClicked(false), 300) }
    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', click)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setTrail(pos), 80)
    return () => clearTimeout(timeout)
  }, [pos])

  return (
    <>
      <div style={{
        position: 'fixed', top: pos.y - 6, left: pos.x - 6,
        width: clicked ? 20 : 12, height: clicked ? 20 : 12,
        background: 'linear-gradient(135deg,#7c3aed,#db2777)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 99999,
        transition: 'width 0.2s, height 0.2s',
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'multiply'
      }} />
      <div style={{
        position: 'fixed', top: trail.y, left: trail.x,
        width: 36, height: 36,
        border: '2px solid rgba(124,58,237,0.4)',
        borderRadius: '50%', pointerEvents: 'none', zIndex: 99998,
        transition: 'top 0.08s, left 0.08s',
        transform: 'translate(-50%,-50%)',
      }} />
    </>
  )
}

export default Cursor
import React from "react"
import { motion } from "framer-motion"

const testimonials = [
  { color:"linear-gradient(135deg,#7c3aed,#db2777)", text:"Working with this designer transformed our product. The UI redesign led to a 40% increase in conversions and our users absolutely love the new experience.", name:"Rahul Sharma", role:"CEO, TechStart India", avatar:"👨‍💼", avatarBg:"linear-gradient(135deg,#7c3aed,#db2777)" },
  { color:"linear-gradient(135deg,#db2777,#f59e0b)", text:"Exceptional creativity and technical skill. Delivered our mobile app design 2 weeks early with details we never imagined. Will definitely hire again!", name:"Priya Patel", role:"Product Manager, AppCo", avatar:"👩‍💼", avatarBg:"linear-gradient(135deg,#db2777,#f59e0b)" },
  { color:"linear-gradient(135deg,#06b6d4,#10b981)", text:"Our app downloads tripled after the redesign. The attention to micro-interactions and user flows is absolutely world-class. Highly recommended!", name:"Arun Kumar", role:"Founder, MobileFirst", avatar:"🧑‍💻", avatarBg:"linear-gradient(135deg,#06b6d4,#10b981)" },
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header">
        <span className="section-tag">Client Love</span>
        <h2 className="section-title">What They <span>Say</span></h2>
      </div>
      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <motion.div key={i} className="testi-card"
            style={{ "--testi-color": t.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            <div className="testi-card-accent" style={{ background: t.color }} />
            <div className="testi-quote">"</div>
            <div className="testi-stars">{"⭐⭐⭐⭐⭐".split("").map((s,j) => <span key={j} className="star">{s}</span>)}</div>
            <p className="testi-text">{t.text}</p>
            <div className="testi-author">
              <div className="testi-avatar" style={{ background: t.avatarBg }}>{t.avatar}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
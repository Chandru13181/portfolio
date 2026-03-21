import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Background3D from "./components/Background3D";
import "./App.css";

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Background3D />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Cursor />
        <Navbar />
        <div id="hero"><Hero3D /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="experience"><Experience /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import TechStack from "@/components/TechStack"; // hidden for now — reuse later
import Projects from "@/components/Projects";
import TechStackWheel from "@/components/TechStackWheel";
// import BookingFocus from "@/components/BookingFocus"; // hidden for now — reuse later
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* <TechStack /> */}
        <Projects />
        <About />
        <TechStackWheel />
        {/* <BookingFocus /> */}
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

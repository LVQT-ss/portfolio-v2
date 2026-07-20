import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import TechStackWheel from "@/components/TechStackWheel";
import BookingFocus from "@/components/BookingFocus";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <TechStackWheel />
        <BookingFocus />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

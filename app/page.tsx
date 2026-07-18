import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";
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
        <Approach />
        <TechStack />
        <CaseStudies />
        <BookingFocus />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

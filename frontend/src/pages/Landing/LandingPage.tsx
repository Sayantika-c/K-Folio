import "../../components/Landing/landing.css";
import LandingBackground from "../../components/Landing/LandingBackground";
import WhyKfolio from "../../components/Landing/whyKfolio";
import Hero from "../../components/Landing/Hero";
import Frames from "../../components/Landing/Frames";
import Features from "../../components/Landing/Features";
import Testimonials from "../../components/Landing/Testimonials";
import Footer from "../../components/Landing/Footer";

export default function LandingPage() {
  return (
    <>
      <LandingBackground activeSection="hero">
      <Hero />
      <Frames/>
      <Features />
      <Testimonials />
      <WhyKfolio/>
      <Footer />
      </LandingBackground>
    </>
  );
}




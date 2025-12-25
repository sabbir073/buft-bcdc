import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Committee from "@/components/Committee";
import WhyChooseUs from "@/components/WhyChooseUs";
import Resources from "@/components/Resources";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Membership from "@/components/Membership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <WhyChooseUs />
      <Committee />
      <Resources />
      <Testimonials />
      <Blog />
      <Membership />
      <Contact />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import ExecutivePreview from "@/components/ExecutivePreviewWrapper";
import CareerResources from "@/components/CareerResources";
import JoinUs from "@/components/JoinUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Activities />
      <ExecutivePreview />
      <CareerResources />
      <JoinUs />
      <Testimonials />
      <Footer />
    </main>
  );
}

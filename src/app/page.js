import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
// Import AdaptiveResistance once built!
import Discover from "../components/Discover/Discover";
import AppFeatures from "../components/AppFeatures/AppFeatures";
import FeaturesScroll from "../components/FeaturesScroll/FeaturesScroll";
import Environments from "../components/Environments/Environments";
import SocialProof from "../components/SocialProof/SocialProof";
import Prebook from "../components/Prebook/Prebook";

import About from "../components/About/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* 2. Adaptive Resistance Cards (White - to be built!) */}
      <Discover />
      <AppFeatures />
      <FeaturesScroll />
      <Environments />
      <SocialProof />
      <Prebook />
      <About />
    </main>
  );
}

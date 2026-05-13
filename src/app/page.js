import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import StackingCards from "../components/StackingCards/StackingCards";
import Discover from "../components/Discover/Discover";
import AppFeatures from "../components/AppFeatures/AppFeatures";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StackingCards />
      <Discover />
      <AppFeatures />
    </main>
  );
}

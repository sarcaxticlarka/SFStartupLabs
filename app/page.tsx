import Smooth from "@/components/Smooth";
import { Announce, Dock } from "@/components/Chrome";
import Hero from "@/components/Hero";
import { Statement } from "@/components/White";
import { Wipe, Stats, Weeks } from "@/components/Scenes";
import { Preloader, Cursor } from "@/components/Cinema";
import { Pipeline, Included, People, Panels } from "@/components/Dark";
import Stepper from "@/components/Stepper";
import { Photos, Fit, Faq, Cta, Footer } from "@/components/Rest";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Cursor />
      <Announce />
      <Dock />
      <Hero />
      <Statement />
      <Wipe />
      <Stats />
      <Pipeline />
      <Included />
      <Weeks />
      <People />
      <Panels />
      <Stepper />
      <Photos />
      <Fit />
      <Faq />
      <Cta />
      <Footer />
      <Smooth />
    </main>
  );
}

import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import { Approach } from "@/components/approach/approach";
import { Services } from "@/components/services/services";
import { Method } from "@/components/method/method";
import { Questions } from "@/components/questions/questions";
import { Closing } from "@/components/closing/closing";
import { Footer } from "@/components/footer/footer";

export default function HomePage() {
  return (
    <div className="page">
      <Header />
      <main id="main">
        <Hero />
        <Approach />
        <Services />
        <Method />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";
import { Sources } from "@/components/sources/sources";
import { Services } from "@/components/services/services";
import { Platform } from "@/components/platform/platform";
import { Incident } from "@/components/incident/incident";
import { Report } from "@/components/report/report";
import { Questions } from "@/components/questions/questions";
import { Closing } from "@/components/closing/closing";
import { Footer } from "@/components/footer/footer";

export default function HomePage() {
  return (
    <div className="page">
      <Header />
      <main id="main">
        <Hero />
        <Sources />
        <Services />
        <Platform />
        <Incident />
        <Report />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

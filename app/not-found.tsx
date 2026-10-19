import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Arrow } from "@/components/brand/arrow";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="page">
      <Header />
      <main id="main" className="missing">
        <div className="container missing__inner">
          <p className="missing__code numeric">404 · Not found</p>
          <h1 className="missing__title">We looked. Nothing is running at this address.</h1>
          <p className="missing__lede">
            This page is not part of the site yet, or the link is out of date. The homepage has everything we have
            published so far.
          </p>
          <div className="missing__actions">
            <a className="button button--primary" href="/">
              Back to the homepage
            </a>
            <a className="button button--quiet" href="/#walkthrough">
              Book a walkthrough
              <Arrow />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

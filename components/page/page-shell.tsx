import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import "./page.css";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="page">
      <Header />
      <main id="main" className="subpage">
        {children}
      </main>
      <Footer />
    </div>
  );
}

'use client'
import Navigation from "./(public)/Navigation";
import Hero from "./(public)/Hero";
import About from "./(public)/About";
import Portfolio from "./(public)/Portfolio";
import Testimonials from "./(public)/Testimonials";
import Contact from "./(public)/Contact";
import Footer from "./(public)/Footer";
import Artists from "./(public)/Artists";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  const checkSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
    console.log(currentSession.data);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
        <Navigation />
      </div>

      {/* Main Content */}
      <main className="pt-20">
        <section id="home" className="min-h-screen w-full flex items-center">
          <div className="w-full">
            <Hero />
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/20">
          <About />
        </section>
        <section id="artists" className="py-20">
          <Artists />
        </section>

        <section id="portfolio" className="py-20">
          <Portfolio />
        </section>

        <section id="testimonials" className="py-20 bg-muted/20">
          <Testimonials />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer className="border-t border-border/40" />
    </div>
  );
}

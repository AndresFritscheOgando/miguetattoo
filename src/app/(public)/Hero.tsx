import { Button } from "@/components/ui/button";
import Image from "next/image";
import LightRays from "@/components/LightRays";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-background">


      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#fff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.2}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        <Image
          src="/hero-bg.jpg"
          alt="MiguetattoRD Studio"
          className="w-full h-full object-cover"
          fill
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="block mb-4">MIGUETATTORD</span>
            <span className="text-xl md:text-2xl font-normal text-gray-200">TATTOO STUDIO</span>
          </h1>

          <div className="w-24 h-1 bg-primary mx-auto my-8"></div>

          <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 justify-center mt-12">
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-medium rounded-none border-2 border-primary hover:border-primary/90 transition-all duration-300"
            >
              BOOK NOW
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById("portfolio");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-none transition-all duration-300"
            >
              VIEW PORTFOLIO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

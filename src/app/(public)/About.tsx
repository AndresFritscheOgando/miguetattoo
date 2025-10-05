import { Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4 animate-fade-in">
            <span className="text-gradient">About the Artist</span>
          </h2>
          
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
            Master craftsman with over a decade of experience
          </p>

          <div className="prose prose-invert prose-lg max-w-none mb-16 text-center animate-fade-in">
            <p className="text-foreground/90 leading-relaxed">
              At MiguetattoRD, we believe that every tattoo tells a story. With over 10 years of experience 
              in the art of tattooing, we've dedicated ourselves to perfecting our craft and creating 
              meaningful pieces that our clients wear with pride. Our studio combines traditional techniques 
              with modern artistry to deliver exceptional results in a clean, professional, and welcoming environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">10+ Years</h3>
              <p className="text-muted-foreground">Professional Experience</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1000+</h3>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom</h3>
              <p className="text-muted-foreground">Artistic Designs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

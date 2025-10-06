import { Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-4 animate-fade-in">
            <span className="text-gradient">Sobre el Artista</span>
          </h2>
          
          <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
            Maestro artesano con más de una década de experiencia
          </p>

          <div className="prose prose-invert prose-lg max-w-none mb-16 text-center animate-fade-in">
            <p className="text-foreground/90 leading-relaxed">
              En MiguetattoRD, creemos que cada tatuaje cuenta una historia. Con más de 10 años de experiencia 
              en el arte del tatuaje, nos hemos dedicado a perfeccionar nuestro oficio y crear 
              piezas significativas que nuestros clientes lucen con orgullo. Nuestro estudio combina técnicas tradicionales 
              con arte moderno para ofrecer resultados excepcionales en un ambiente limpio, profesional y acogedor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">10+ Años</h3>
              <p className="text-muted-foreground">Experiencia Profesional</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1000+</h3>
              <p className="text-muted-foreground">Clientes Satisfechos</p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg hover-glow transition-all animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diseños</h3>
              <p className="text-muted-foreground">Personalizados y Artísticos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

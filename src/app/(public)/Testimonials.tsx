import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      text: "¡Un trabajo absolutamente increíble! Miguel dio vida perfectamente a mi visión. La atención al detalle es increíble y el estudio está impecable. ¡Muy recomendado!",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Santos",
      text: "La mejor experiencia de tatuaje que he tenido. Profesional, limpio y el resultado final superó mis expectativas. ¡Valió cada centavo!",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martínez",
      text: "Miguel es un verdadero artista. Su trabajo de realismo es impresionante y me hizo sentir cómoda durante todo el proceso. ¡Definitivamente volveré!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Lo que dicen nuestros clientes</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          Lo que nuestros clientes dicen sobre nosotros
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card p-6 rounded-lg hover-glow transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/90 mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <p className="font-semibold text-primary">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Rodriguez",
      text: "Absolutely amazing work! Miguel brought my vision to life perfectly. The attention to detail is incredible and the studio is spotless. Highly recommend!",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Santos",
      text: "Best tattoo experience I've ever had. Professional, clean, and the final result exceeded my expectations. Worth every penny!",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martinez",
      text: "Miguel is a true artist. His realism work is stunning and he made me feel comfortable throughout the entire process. Will definitely be back!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Client Love</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          What our clients say about us
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

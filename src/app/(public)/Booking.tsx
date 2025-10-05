import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MessageCircle } from "lucide-react";

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/18095551234", "_blank");
  };

  return (
    <section id="booking" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Book Your Session</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          Ready to bring your vision to life?
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-2xl animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border"
                  placeholder="+1 (809) 555-1234"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Tell us about your tattoo idea *
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border min-h-32"
                  placeholder="Describe your tattoo design, placement, size, and any references you have..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Request Appointment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;

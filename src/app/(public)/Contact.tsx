import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Visit Us</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          Find us in the heart of the Dominican Republic
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <p className="text-muted-foreground">
                  Calle Principal #123<br />
                  Santo Domingo, Dominican Republic
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 10:00 AM - 8:00 PM<br />
                  Saturday: 11:00 AM - 6:00 PM<br />
                  Sunday: By Appointment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <p className="text-muted-foreground">+1 (809) 555-1234</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-muted-foreground">info@miguetattoRD.com</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="animate-fade-in">
            <div className="bg-card rounded-lg overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241318.45244366288!2d-70.0102!3d18.4861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89bf5e6bd88b%3A0x8c2e8f87bc1e5fc4!2sSanto%20Domingo%2C%20Dominican%20Republic!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MiguetattoRD Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

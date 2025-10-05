import { useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const portfolioItems = [
    { id: 1, category: "realism", image: "/portfolio-1.jpg", title: "Portrait Realism" },
    { id: 2, category: "black-grey", image: "/portfolio-2.jpg", title: "Black & Grey" },
    { id: 3, category: "color", image: "/portfolio-3.jpg", title: "Color Work" },
    { id: 4, category: "lettering", image: "/portfolio-4.jpg", title: "Script Lettering" },
  ];

  const filters = [
    { id: "all", label: "All Work" },
    { id: "realism", label: "Realism" },
    { id: "black-grey", label: "Black & Grey" },
    { id: "color", label: "Color" },
    { id: "lettering", label: "Lettering" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Our Work</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          A showcase of our finest tattoo artistry
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                fill
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

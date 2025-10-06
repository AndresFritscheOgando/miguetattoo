import Masonry from "@/components/Masonry";


const Portfolio = () => {


  const items = [
    {
      id: 1,
      img: "/tattoo2.PNG",
      url: "https://example.com/one",
      height: 900,
    },
    {
      id: 2,
      img: "/sdsddsdddds.PNG",
      url: "https://example.com/two",
      height: 700,
    },
    {
      id: 3,
      img: "/tattoo3.PNG",
      url: "https://example.com/three",
      height: 900,
    },
    {
      id: 4,
      img: "/tattoo4.PNG",
      url: "https://example.com/one",
      height: 800,  
    },
    {
      id: 5,
      img: "/tattoo5.PNG",
      url: "https://example.com/one",
      height: 800,  
    },
    {
      id: 6,
      img: "/tattoo6.PNG",
      url: "https://example.com/one",
      height:1000, 
    },
    {
      id: 7,
      img: "/tattoo7.PNG",
      url: "https://example.com/one",
      height: 1000, 
    },
    {
      id: 8,
      img: "/tattoo8.PNG",
      url: "https://example.com/one",
      height: 1000, 
    },
    {
      id: 9,
      img: "/tattoo9.PNG",
      url: "https://example.com/one",
      height: 800, 
    },
    {
      id: 10,
      img: "/tattoo10.PNG",
      url: "https://example.com/one",
      height: 400, 
    },
  ];


  return (
    <section id="portfolio" className=" py-24 bg-background h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4 animate-fade-in">
          <span className="text-gradient">Portafolio</span>
        </h2>
        
        <p className="text-center text-muted-foreground text-lg mb-12 animate-fade-in">
          Nuestro trabajo
        </p>
      </div>
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />

    </section>
  );
};

export default Portfolio;

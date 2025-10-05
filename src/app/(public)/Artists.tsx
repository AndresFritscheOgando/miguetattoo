import React from 'react'
import TiltedCard from '@/components/TiltedCard'

type Artist = {
  id: number;
  name: string;
  role: string;
  image: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Alejandra Dias",
    role: "Tattoo Artist",
    image: "/pexels-marcelodias-2089530.jpg"
  },
  {
    id: 2,
    name: "Carlos Mendez",
    role: "Tattoo Artist",
    image: "/pexels-ralph-rabago-3214772.jpg"
  },
  {
    id: 3,
    name: "Sofia Ramirez",
    role: "Tattoo Artist",
    image: "/portfolio-2.jpg"
  },
  {
    id: 4,
    name: "Miguel Torres",
    role: "Tattoo Artist",
    image: "/portfolio-3.jpg"
  }
];

const Artists = () => {
  return (
    <section className="flex flex-wrap justify-center gap-8">
      {artists.map((artist) => (
        <TiltedCard
          key={artist.id}
          imageSrc={artist.image}
          altText={artist.name}
          captionText={artist.name}
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="500px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold">{artist.name}</h3>
              <p className="text-sm">{artist.role}</p>
            </div>
          }
        />
      ))}
    </section>
  )
}

export default Artists
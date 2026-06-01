import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
  title: string;
  img: string;
  link: string;
  cta?: string;
}

interface PortfolioCarouselProps {
  items: CarouselItem[];
}

export default function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const panels = containerRef.current.querySelectorAll<HTMLElement>('.carousel-panel');
      const totalWidth = panels.length * (panels[0]?.offsetWidth ?? 0);
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          snap: 1 / (panels.length - 1),
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="carousel-panel"
            style={{
              minWidth: '100vw',
              height: '60vh',
              position: 'relative',
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <a
              href={item.link}
              style={{
                position: 'absolute',
                inset: 0,
                color: '#fff',
                textDecoration: 'none',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '2rem',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {item.title}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

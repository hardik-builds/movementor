import React from 'react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    title: 'Eleiko Competition Bay — Bandra West'
  },
  {
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
    title: 'Olympic Weightlifting Platforms'
  },
  {
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1000',
    title: 'High-Velocity Sled Sprint Turf'
  },
  {
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    title: 'Functional Joint Mobility Bay'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000',
    title: 'Finnish Infrared Cedar Sauna'
  },
  {
    url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000',
    title: 'Worli Seaface Panoramic Floor'
  },
  {
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000',
    title: 'Sports Physician Spinal Screen'
  },
  {
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
    title: 'Architectural Performance Studio'
  }
];

export const GalleryMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-3 select-none group">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f7f8f6] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f7f8f6] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row */}
      <div className="flex space-x-4 animate-marquee hover:[animation-play-state:paused]">
        {[...galleryImages, ...galleryImages].map((img, idx) => (
          <div
            key={idx}
            className="w-72 sm:w-80 h-48 shrink-0 rounded-[3px] overflow-hidden relative border border-neutral-200 group/card cursor-pointer shadow-sm bg-neutral-900"
          >
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover/card:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover/card:opacity-90 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[9px] font-mono uppercase text-[#ddca24] tracking-widest block">
                MOVEMENTOR SANCTUARY
              </span>
              <span className="text-xs font-montserrat font-medium uppercase tracking-wide truncate block">
                {img.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

const galleryImages = [
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/6838241fc210fef6b381d295_Gellary%20Image%201-p-500.webp',
    title: 'Olympic Lifting Zone - Bandra'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/683824208c58ef1beb88a904_Gellary%20Image%202-p-500.webp',
    title: 'Conditioning Turf - Worli'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/68382422e0de6397d38a6e71_Gellary%20Image%203-p-500.webp',
    title: 'Sports Physician Assessment'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/68382421a47bb1a166fda69d_Gellary%20Image%204-p-500.webp',
    title: 'Power Racks & Free Weights'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/68382420a0c2de0000e65bbc_Gellary%20Image%205-p-500.webp',
    title: 'Functional Movement Bay'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/683824222b2b69cc6b3e3e45_Gellary%20Image%206-p-500.webp',
    title: 'High Performance Coaching'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/683d1f187dd136d4d3ac606c_Gellary%20Image%207-p-500.webp',
    title: 'Turnstile Fast-Track Access'
  },
  {
    url: 'https://cdn.prod.website-files.com/682c50a8fd5c0f71c753acb4/683d1f198ef25be721d1973a_Gellary%20Image%208-p-500.webp',
    title: 'Recovery & Mobility Lounge'
  }
];

export const GalleryMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f7f8f6] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f7f8f6] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row */}
      <div className="flex space-x-4 animate-marquee hover:[animation-play-state:paused]">
        {[...galleryImages, ...galleryImages].map((img, idx) => (
          <div
            key={idx}
            className="w-64 sm:w-72 h-44 shrink-0 rounded-[4px] overflow-hidden relative border border-[#e4e7eb] group/card cursor-pointer shadow-sm bg-neutral-900"
          >
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] filter grayscale group-hover/card:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity" />
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <span className="text-[9px] font-mono uppercase text-[#ddca24] tracking-wider block">Mumbai Facility</span>
              <span className="text-xs font-heading font-black uppercase tracking-wide truncate block">
                {img.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

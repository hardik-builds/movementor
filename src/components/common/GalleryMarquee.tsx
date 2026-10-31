import React from 'react';

const authenticGalleryImages = [
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/tyvwy5-ccXfOJf5ElM9oKrS.png',
    title: 'Functional Movement Turf Bay'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/fbtknj-EH2X8FWWwceNjjsw.png',
    title: 'Coached Barbell Mechanics Platform'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/gm7ezo-5pqdenr60ajLh5hx.png',
    title: 'Dynamic Joint Mobility & Flexibility'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1692,fit=crop/3ynRmEZudyGvnpaM/whatsapp-image-2026-10-03-at-12.47.12-am-zTLtrjoBnmEMbDGs.jpeg',
    title: 'Balance Space & Spinal Stability'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1524,fit=crop/3ynRmEZudyGvnpaM/whatsapp-image-2026-10-03-at-12.47.11-am-y0J6Hyj8SkM0WWwe.jpeg',
    title: 'High Intensity Conditioning Track'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1042,fit=crop/3ynRmEZudyGvnpaM/img-20260604-wa0018-g7VPJYzvhxh0svo5.jpg',
    title: 'Bandra West Athletic Facility'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=982,fit=crop/3ynRmEZudyGvnpaM/img-20260604-wa0014-XvjojPron4ZimOa3.jpg',
    title: 'Worli Seaface Strength Sanctuaries'
  },
  {
    url: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1016,fit=crop/3ynRmEZudyGvnpaM/img-20260604-wa0017-iv9lD9KbLcSUnaSa.jpg',
    title: 'Postural Alignment & Decompression'
  }
];

export const GalleryMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 select-none group">
      {/* Edge gradient masks for liquid glass seamless bleed */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#f7f8f6] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#f7f8f6] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling row */}
      <div className="flex space-x-6 animate-marquee hover:[animation-play-state:paused]">
        {[...authenticGalleryImages, ...authenticGalleryImages].map((img, idx) => (
          <div
            key={idx}
            className="w-80 sm:w-96 h-56 shrink-0 rounded-2xl overflow-hidden relative liquid-glass p-2 group/card cursor-pointer shadow-md transition-transform duration-500 hover:scale-102"
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative bg-neutral-900">
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              <div className="absolute bottom-3.5 left-3.5 right-3.5 liquid-glass-dark p-2.5 rounded-xl border border-white/10 text-white">
                <span className="text-[9px] font-mono uppercase text-[#ddca24] tracking-widest block">
                  MOVEMENTOR // MUMBAI
                </span>
                <span className="text-xs font-montserrat font-medium uppercase tracking-wide truncate block">
                  {img.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Play, Sparkles } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  category: string;
  isVideo?: boolean;
}

// Authentic photos from official Movementor Studio (@official_movementor)
const authenticMovementorPosts: InstagramPost[] = [
  {
    id: 'post-1',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1919,fit=crop/3ynRmEZudyGvnpaM/czetli-TXrkDQMOStPrkmZw.png',
    likes: 642,
    comments: 48,
    category: 'HEAD COACH',
    caption: 'Kinetic intent in every repetition. Progressive overload with calibrated form leads to lifelong joint resilience. @official_movementor #Movementor #MumbaiAthletics',
    isVideo: false,
  },
  {
    id: 'post-2',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/tyvwy5-ccXfOJf5ElM9oKrS.png',
    likes: 589,
    comments: 41,
    category: 'FUNCTIONAL BAY',
    caption: 'Ground reaction force & multi-planar mobility training at our Mumbai functional space. Where conditioning meets orthopedic rehabilitation. #MovementorStudio',
    isVideo: true,
  },
  {
    id: 'post-3',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/gm7ezo-5pqdenr60ajLh5hx.png',
    likes: 512,
    comments: 37,
    category: 'MOBILITY DRILLS',
    caption: 'Hip capsule decompression and thoracic rotation prior to heavy barbell loading. Injury prevention is the cornerstone of human performance. #Mobility',
    isVideo: false,
  },
  {
    id: 'post-4',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1080,fit=crop/3ynRmEZudyGvnpaM/fbtknj-EH2X8FWWwceNjjsw.png',
    likes: 720,
    comments: 63,
    category: 'BARBELL MECHANICS',
    caption: 'Direct 1-on-1 coaching: spinal alignment and lat engagement at the setup. No compromised reps, ever. #Powerlifting #StrengthTraining',
    isVideo: true,
  },
  {
    id: 'post-5',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1524,fit=crop/3ynRmEZudyGvnpaM/whatsapp-image-2026-10-03-at-12.47.11-am-y0J6Hyj8SkM0WWwe.jpeg',
    likes: 485,
    comments: 29,
    category: 'TURF & SPEED',
    caption: 'High-intensity conditioning intervals and heavy sled work. Building relentless work capacity for Mumbai’s elite athletes. #Conditioning',
    isVideo: false,
  },
  {
    id: 'post-6',
    image: 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=1692,fit=crop/3ynRmEZudyGvnpaM/whatsapp-image-2026-10-03-at-12.47.12-am-zTLtrjoBnmEMbDGs.jpeg',
    likes: 638,
    comments: 54,
    category: 'REHAB & BALANCE',
    caption: 'Balance Space: Postural correction, scapular retraction, and spinal decompression led by our clinical physiotherapists. #BalanceSpace #Rehab',
    isVideo: false,
  },
];

export const InstagramLookbook: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <div className="space-y-10 select-none">
      
      {/* Header with Liquid Glass Capsule */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/5">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 liquid-glass-pill-dark text-[#ddca24] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase rounded-full">
            <Instagram className="w-3.5 h-3.5" />
            <span>@OFFICIAL_MOVEMENTOR // LIVE FEED</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#131313]">
            Movement In Action
          </h2>
          
          <p className="text-xs sm:text-sm text-neutral-600 font-montserrat font-light max-w-xl leading-relaxed">
            Authentic training snapshots directly from Movementor’s Mumbai floor. Coached compound movements, sports science screens, and daily discipline.
          </p>
        </div>

        {/* Liquid Glass CTA Button */}
        <a
          href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2.5 px-6 py-3.5 liquid-glass-dark text-white hover:text-[#ddca24] transition-all duration-300 text-xs font-montserrat font-semibold tracking-wider uppercase rounded-full shadow-lg group self-start sm:self-auto"
        >
          <Instagram className="w-4 h-4 text-[#ddca24]" />
          <span>Follow @official_movementor</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Massive Photo-First Grid (Bigger photos as per Anovi, with liquid glass cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {authenticMovementorPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative liquid-glass rounded-3xl p-3 sm:p-4 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden liquid-shimmer"
          >
            {/* Massive Photograph Container (h-[440px] to h-[520px]) */}
            <div className="relative h-[380px] xs:h-[440px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
              />

              {/* Liquid Glass Pill Badge on Top Left */}
              <div className="absolute top-3.5 left-3.5 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#131313] z-10">
                {post.category}
              </div>

              {/* Video Play Pill */}
              {post.isVideo && (
                <div className="absolute top-3.5 right-3.5 liquid-glass-pill-dark w-8 h-8 rounded-full flex items-center justify-center text-white z-10 shadow-lg">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
              )}

              {/* Ambient Liquid Bottom Vignette */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Bottom Liquid Glass Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 liquid-glass-dark p-3.5 rounded-xl border border-white/10 text-white z-20 space-y-2 group-hover:border-[#ddca24]/40 transition-colors">
                <p className="text-[11px] sm:text-xs font-montserrat font-light leading-relaxed line-clamp-2 text-neutral-200">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#ddca24] pt-1 border-t border-white/10">
                  <span className="flex items-center space-x-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#ddca24]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 text-neutral-300">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 group-hover:text-white uppercase tracking-wider flex items-center space-x-1">
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal with Frosted Liquid Glass Backdrop */}
      {selectedPost && (
        <div 
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-2xl"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl liquid-glass rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 border border-white/40"
          >
            {/* Image Side (Massive view) */}
            <div className="md:col-span-7 relative h-[360px] md:h-[540px] bg-neutral-900">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 liquid-glass-pill px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase text-[#131313]">
                {selectedPost.category}
              </div>
            </div>

            {/* Content Side with Liquid Glass Finish */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white/80 backdrop-blur-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-[#131313] text-[#ddca24] flex items-center justify-center font-heading font-black text-xs shadow-md">
                      MV
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-xs text-[#131313]">
                        official_movementor
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        Mumbai • Chembur • Bandra
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-7 h-7 rounded-full liquid-glass-pill flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#ddca24] bg-[#131313] px-2.5 py-0.5 rounded-[2px] inline-block uppercase">
                    // INSTAGRAM DISPATCH //
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-montserrat font-light">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="flex items-center space-x-6 text-xs font-mono text-neutral-600 pt-3 border-t border-black/5">
                  <span className="flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-[#ddca24] fill-[#ddca24]" />
                    <strong className="text-neutral-900">{selectedPost.likes} likes</strong>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 text-neutral-400" />
                    <strong className="text-neutral-900">{selectedPost.comments} comments</strong>
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5">
                <a
                  href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 liquid-glass-dark text-white hover:text-[#ddca24] text-xs font-montserrat font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <Instagram className="w-4 h-4 text-[#ddca24]" />
                  <span>View Post on Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

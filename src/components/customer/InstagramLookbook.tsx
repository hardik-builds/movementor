import React, { useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle, Play } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  category: string;
  isVideo?: boolean;
}

const instagramPosts: InstagramPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200',
    likes: 428,
    comments: 34,
    category: 'STRENGTH',
    caption: 'Kinetic transfer from the floor to lockout. Heavy Romanian deadlifts targeting posterior chain tension under Dr. Mehta’s form guidance. #Movementor #MumbaiStrength',
    isVideo: false,
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    likes: 582,
    comments: 49,
    category: 'OLYMPIC',
    caption: 'Calibrated Eleiko Swedish steel in action at our Bandra West weightlifting bay. Zero bounce, maximum kinetic feedback. #Eleiko #OlympicLifting',
    isVideo: true,
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    likes: 367,
    comments: 28,
    category: 'MOBILITY',
    caption: 'Hip capsule decompression & thoracic rotation before loaded squats. Injury prevention is not optional; it is fundamental. #FunctionalMovement',
    isVideo: false,
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=1200',
    likes: 619,
    comments: 52,
    category: 'TURF SPRINT',
    caption: '30-meter high-density turf intervals with the Rogue dog sled. High velocity deceleration and ground reaction force in Chembur & Worli. #AthleticSpeed',
    isVideo: true,
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    likes: 491,
    comments: 31,
    category: 'RECOVERY',
    caption: 'Post-session autonomic reset: Finnish cedar infrared sauna and contrast plunge therapy. Optimize parasympathetic nervous recovery. #Biohacking',
    isVideo: false,
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
    likes: 544,
    comments: 43,
    category: 'ASSESSMENT',
    caption: 'Physician assessment in progress: range of motion screening, pelvic alignment, and power profiling before prescribing loaded cycles. #SportsScience',
    isVideo: false,
  },
];

export const InstagramLookbook: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <div className="space-y-8 select-none">
      {/* Header with Instagram Follow CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e4e7eb] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-bold tracking-widest uppercase text-[#ddca24] bg-[#131313] px-3 py-1 rounded-[2px]">
            <Instagram className="w-3.5 h-3.5" />
            <span>@OFFICIAL_MOVEMENTOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#131313]">
            Curated Visual Journal
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] font-montserrat font-light max-w-xl">
            Live training snapshots, athletic biomechanics, and daily discipline from our Mumbai academies.
          </p>
        </div>

        <a
          href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#131313] text-white hover:bg-[#ddca24] hover:text-[#131313] transition-all duration-300 text-xs font-montserrat font-semibold tracking-wider uppercase rounded-[2px] shadow-sm self-start sm:self-auto group"
        >
          <Instagram className="w-4 h-4 text-[#ddca24] group-hover:text-[#131313] transition-colors" />
          <span>Follow On Instagram</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>

      {/* Modern High-End Editorial Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {instagramPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-[3/4] overflow-hidden rounded-[3px] bg-neutral-900 border border-[#e4e7eb] cursor-pointer shadow-sm"
          >
            {/* High-Resolution Image */}
            <img
              src={post.image}
              alt={post.caption}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
            />

            {/* Video Badge */}
            {post.isVideo && (
              <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white z-10">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
            )}

            {/* Category Tag */}
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#131313]/80 backdrop-blur-sm text-[#ddca24] text-[9px] font-mono uppercase tracking-wider rounded-[2px] z-10">
              {post.category}
            </div>

            {/* Hover Dark Overlay with Stats & Caption */}
            <div className="absolute inset-0 bg-[#131313]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3.5 flex flex-col justify-between text-white z-20">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#ddca24] uppercase block">
                  @official_movementor
                </span>
                <p className="text-[11px] leading-relaxed line-clamp-3 text-neutral-200 font-montserrat">
                  {post.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono text-[#ddca24]">
                <span className="flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 fill-[#ddca24]" />
                  <span>{post.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{post.comments}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal when Post is Clicked */}
      {selectedPost && (
        <div 
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-[4px] overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-2"
          >
            {/* Image Side */}
            <div className="relative aspect-square sm:aspect-auto bg-neutral-900">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#131313] text-[#ddca24] text-[10px] font-mono px-2.5 py-1 rounded-[2px] uppercase">
                {selectedPost.category}
              </div>
            </div>

            {/* Caption & Actions Side */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#131313] text-[#ddca24] flex items-center justify-center font-heading font-black text-xs">
                      MV
                    </div>
                    <div>
                      <div className="font-heading font-black text-xs text-[#131313] uppercase">
                        official_movementor
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        Mumbai • Chembur • Bandra
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-neutral-400 hover:text-black text-sm p-1"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed font-montserrat">
                  {selectedPost.caption}
                </p>

                <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500 pt-2">
                  <span className="flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-[#ddca24] fill-[#ddca24]" />
                    <strong className="text-neutral-800">{selectedPost.likes} likes</strong>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <MessageCircle className="w-4 h-4 text-neutral-400" />
                    <strong className="text-neutral-800">{selectedPost.comments} comments</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <a
                  href="https://www.instagram.com/official_movementor?rpxt=MzByeG9heGIxZGhw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#131313] hover:bg-[#ddca24] hover:text-[#131313] text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-[2px] flex items-center justify-center space-x-2 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View Post On Instagram</span>
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

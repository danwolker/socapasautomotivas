import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { fetchVideos } from '../services/api';

interface VideoCardProps {
    tip: {
        id: number;
        title: string;
        description: string;
        video_path: string;
    };
    index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ tip, index }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const play = () => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => console.warn("Playback failed:", err));
            setIsPlaying(true);
        }
    };

    const pause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0.5;
            setIsPlaying(false);
        }
    };

    const handleClick = () => {
        if (isPlaying) {
            setIsMuted(prev => !prev);
        } else {
            play();
        }
    };

    // Show a frame when video metadata is ready (instead of black screen)
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0.5;
        }
    };

    // Construct the correct URL
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Ensure the URL is correctly formed and encoded (cache buster added to fix poisoned browser cache)
    const videoUrl = `${baseUrl}movies/${tip.video_path}?v=1`.replace(/\/+/g, '/').replace('http:/', 'http://').replace('https:/', 'https://');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative aspect-[9/16] rounded-[32px] overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-premium"
            onMouseEnter={play}
            onMouseLeave={pause}
            onClick={handleClick}
        >
            {/* Video Element */}
            <video 
                ref={videoRef}
                key={videoUrl}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={handleLoadedMetadata}
            >
                <source src={videoUrl} type="video/mp4" />
                Seu navegador não suporta vídeos.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            
            {/* Mute/Unmute Indicator */}
            <div className="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </div>
            </div>

            {/* Play Button Icon (visible when not playing) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-gold text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
                <h4 className="text-white font-black text-xl uppercase tracking-tight mb-2">{tip.title}</h4>
                <p className="text-text-main/60 text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {tip.description}
                </p>
            </div>

            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
    );
};

const Videos: React.FC = () => {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos().then(data => {
        setTips(data);
        setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (tips.length === 0) return null;

  return (
    <section className="py-24 bg-black/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between align-items-end gap-6 mb-12">
          <div>
            <span className="text-gold font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">Educação e Dicas</span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Dicas do Pelé!</h2>
            <p className="text-text-main/50 mt-2 max-w-2xl font-medium">
                Confira dicas essenciais de como utilizar e cuidar das suas capas. Toque no vídeo para ativar/desativar o som.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, i) => (
            <VideoCard key={tip.id} tip={tip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import RacingScene from "../3d/RacingScene";

export default function CinematicIntro({ onEnter }) {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-[#050914]">

      {/* 3D Racing Environment */}
      <RacingScene />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050914]/80 via-transparent to-[#050914]" />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050914]/70 via-transparent to-transparent" />

      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full z-20 px-6 md:px-14 py-7 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-black italic">
            R
          </div>

          <span className="text-xl font-black tracking-[0.2em]">
            RIDEMIE<span className="text-blue-500">.</span>
          </span>
        </div>

        <button
          onClick={() => setMuted(!muted)}
          className="p-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
          aria-label="Toggle sound"
        >
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </button>
      </motion.header>

      {/* Main content */}
      <div className="absolute z-10 inset-0 flex items-center px-6 md:px-16 lg:px-24">

        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-2xl mt-16"
            >

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="w-10 h-[2px] bg-blue-500" />

                <span className="uppercase text-blue-400 text-xs md:text-sm font-bold tracking-[0.35em]">
                  Premium Mobility Experience
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-[0.9]"
              >
                DRIVE
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-300">
                  BEYOND.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-300 text-sm md:text-lg mt-7 max-w-lg leading-relaxed"
              >
                Every destination deserves an extraordinary journey.
                Discover premium rides, luxury vehicles and freedom on your terms.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap items-center gap-5 mt-10"
              >
                <button
                  onClick={onEnter}
                  className="group flex items-center gap-4 bg-blue-600 hover:bg-blue-500 px-8 py-5 rounded-full text-white font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 shadow-[0_0_35px_rgba(37,99,235,0.4)]"
                >
                  Enter Experience

                  <span className="group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={20} />
                  </span>
                </button>

                <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
                  Your journey. Your rules.
                </span>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-7 left-6 md:left-14 right-6 md:right-14 z-20 flex justify-between items-center text-[10px] md:text-xs text-white/40 tracking-[0.25em] uppercase">
        <span>RIDEMIE EXPERIENCE / 001</span>
        <span>ENGINEERED FOR THE JOURNEY</span>
      </div>

    </section>
  );
}

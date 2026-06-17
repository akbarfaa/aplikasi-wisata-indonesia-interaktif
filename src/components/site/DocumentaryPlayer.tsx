import { useState } from "react";
import { motion } from "framer-motion";
import { HiPlay } from "react-icons/hi";
import type { Destination } from "@/lib/data";

export function DocumentaryPlayer({ d }: { d: Destination }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-midnight shadow-cinema">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${d.youtubeId}?autoplay=1&rel=0`}
          title={d.name}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group block h-full w-full text-left">
          <img src={d.image} alt={d.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-tropical text-midnight shadow-cinema">
              <HiPlay className="ml-1 text-3xl" />
            </div>
          </motion.div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs uppercase tracking-[0.3em] text-tropical">Documentary</div>
            <div className="text-2xl font-bold text-pearl">{d.name}</div>
          </div>
        </button>
      )}
    </div>
  );
}
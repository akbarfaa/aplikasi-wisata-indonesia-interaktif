import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useLang } from "@/lib/contexts";

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 3 + Math.random() * 7);
        if (next >= 100) {
          clearInterval(i);
          setTimeout(() => onDone?.(), 400);
        }
        return next;
      });
    }, 90);
    return () => clearInterval(i);
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-cinema text-pearl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_20%,oklch(0.55_0.13_230/0.6),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(0.78_0.18_60/0.4),transparent_50%)]" />
      <div className="relative z-10 max-w-md px-6 text-center">
        <motion.div
          className="mx-auto mb-6 h-24 w-24 rounded-full bg-tropical/30 ring-1 ring-tropical/40 grid place-items-center"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="size-10 text-tropical" />
        </motion.div>
        <p className="font-serif text-xl italic text-pearl/90">"{t.loading.quote}"</p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-pearl/60">{t.loading.preparing}</p>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-pearl/10">
          <motion.div
            className="h-full bg-tropical"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
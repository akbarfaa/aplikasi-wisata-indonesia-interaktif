import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Howl } from "howler";
import { translations, type Lang } from "./i18n";

// ---------- Language ----------
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
}
const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("wi:lang")) as Lang | null;
    if (stored === "en" || stored === "id") setLangState(stored);
  }, []);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("wi:lang", l);
  }, []);
  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// ---------- Progress ----------
interface ProgressCtx {
  visited: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  reset: () => void;
}
const ProgressContext = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState<string[]>([]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("wi:visited");
      if (raw) setVisited(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("wi:visited", JSON.stringify(visited));
  }, [visited]);
  const toggle = useCallback((id: string) => {
    setVisited((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);
  const has = useCallback((id: string) => visited.includes(id), [visited]);
  const reset = useCallback(() => setVisited([]), []);
  return (
    <ProgressContext.Provider value={{ visited, toggle, has, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

// ---------- Audio ----------
type Ambience = "beach" | "mountain" | "village" | "forest" | "culture" | null;

const AMBIENCE_SOURCES: Record<Exclude<Ambience, null>, string> = {
  beach: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d0c6ff1bab.mp3?filename=ocean-waves-112906.mp3",
  mountain: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4caa9c89d3.mp3?filename=wind-ambient-30sec-19403.mp3",
  village: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc5b3e4.mp3?filename=morning-in-the-village-127520.mp3",
  forest: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_ab0eaf6f81.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3",
  culture: "https://cdn.pixabay.com/download/audio/2022/05/13/audio_1808f96f1d.mp3?filename=gamelan-bali-110057.mp3",
};

interface AudioCtx {
  enabled: boolean;
  current: Ambience;
  setEnabled: (e: boolean) => void;
  play: (a: Ambience) => void;
  stop: () => void;
}
const AudioContext = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [current, setCurrent] = useState<Ambience>(null);
  const howlRef = useRef<Howl | null>(null);

  const stop = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.fade(howlRef.current.volume(), 0, 600);
      const h = howlRef.current;
      setTimeout(() => h.stop(), 650);
      howlRef.current = null;
    }
    setCurrent(null);
  }, []);

  const play = useCallback(
    (a: Ambience) => {
      if (!enabled || !a) return;
      if (current === a && howlRef.current) return;
      stop();
      const h = new Howl({ src: [AMBIENCE_SOURCES[a]], loop: true, volume: 0, html5: true });
      h.play();
      h.fade(0, 0.35, 1200);
      howlRef.current = h;
      setCurrent(a);
    },
    [enabled, current, stop],
  );

  const setEnabled = useCallback(
    (e: boolean) => {
      setEnabledState(e);
      if (!e) stop();
      if (typeof window !== "undefined") localStorage.setItem("wi:audio", e ? "1" : "0");
    },
    [stop],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("wi:audio");
    if (stored === "1") setEnabledState(true);
    return () => stop();
  }, [stop]);

  return (
    <AudioContext.Provider value={{ enabled, current, setEnabled, play, stop }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
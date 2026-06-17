import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useAudio } from "@/lib/contexts";
import { cn } from "@/lib/utils";

export function AudioController({ compact }: { compact?: boolean }) {
  const { enabled, setEnabled, current } = useAudio();
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium backdrop-blur transition-all hover:bg-card",
        enabled && "border-tropical/60 text-tropical",
      )}
      aria-label={enabled ? "Disable ambience" : "Enable ambience"}
    >
      {enabled ? <HiVolumeUp /> : <HiVolumeOff />}
      {!compact && <span>{enabled ? current ?? "Ambience" : "Ambience off"}</span>}
    </button>
  );
}
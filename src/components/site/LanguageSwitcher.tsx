import { useLang } from "@/lib/contexts";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card/60 p-1 text-xs font-semibold backdrop-blur",
        className,
      )}
    >
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-3 py-1 uppercase tracking-wider transition-all",
            lang === l
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
import { useLang } from "@/lib/contexts";
import { Globe } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-24 border-t border-border bg-midnight/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="text-lg font-bold">Wisata Indonesia</div>
          <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Globe className="size-4 text-tropical shrink-0" />
          <span>17,508 islands · 38 provinces · 300+ ethnic groups</span>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} · {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
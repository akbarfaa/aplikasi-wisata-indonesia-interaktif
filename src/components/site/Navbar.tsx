import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Ticket, Calendar, Gamepad2, Trophy, Code2, Info } from "lucide-react";
import { useLang } from "@/lib/contexts";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AudioController } from "./AudioController";

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [dropdownOpen]);

  const primaryItems = [
    { to: "/", label: t.nav.home },
    { to: "/explore", label: t.nav.explore },
    { to: "/villages", label: t.nav.villages },
    { to: "/documentary", label: t.nav.documentary },
  ] as const;

  const secondaryItems = [
    { to: "/passport", label: t.nav.passport, icon: Ticket },
    { to: "/planner", label: t.nav.planner, icon: Calendar },
    { to: "/quiz", label: t.nav.quiz, icon: Gamepad2 },
    { to: "/achievements", label: t.nav.achievements, icon: Trophy },
    { to: "/developer", label: t.nav.developer, icon: Code2 },
    { to: "/about", label: t.nav.about, icon: Info },
  ] as const;

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/90 via-midnight/60 to-transparent backdrop-blur-md" />
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-tropical text-pearl shadow-cinema transition-transform group-hover:scale-105">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-sm overflow-hidden shadow-sm"
            >
              <rect width="20" height="7" fill="#E21F26" />
              <rect y="7" width="20" height="7" fill="#FFFFFF" />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide">Wisata Indonesia</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-pearl/70">
              {t.tagline}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center gap-1 rounded-full border border-pearl/10 bg-card/30 px-2 py-1.5 backdrop-blur-md">
            {primaryItems.map((i) => (
              <li key={i.to}>
                <Link
                  to={i.to}
                  className="rounded-full px-4 py-2 text-sm font-medium text-pearl/70 transition-all hover:bg-card/80 hover:text-pearl"
                  activeProps={{ className: "text-tropical bg-card/80 font-bold shadow-cinema" }}
                  activeOptions={{ exact: i.to === "/" }}
                >
                  {i.label}
                </Link>
              </li>
            ))}
            
            {/* Interactive Dropdown for Secondary Items */}
            <li className="relative" onMouseLeave={() => setDropdownOpen(false)}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-pearl/70 transition-all hover:bg-card/80 hover:text-pearl"
              >
                Fitur Lainnya <span className="text-[10px]">▼</span>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full pt-2 w-64 z-50"
                  >
                    <div className="rounded-2xl border border-pearl/10 bg-midnight/95 p-3 shadow-cinema backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-2">
                        {secondaryItems.map((i) => {
                          const IconComponent = i.icon;
                          return (
                            <Link
                              key={i.to}
                              to={i.to}
                              onClick={() => setDropdownOpen(false)}
                              className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-card/80"
                              activeProps={{ className: "bg-card/80 shadow-cinema" }}
                            >
                              <IconComponent className="size-5 text-tropical" />
                              <span className="text-xs font-medium text-pearl/80">{i.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Controls & Mobile Toggle */}
        <div className="flex items-center gap-2 relative z-10">
          <AudioController compact />
          <LanguageSwitcher />
          <button
            className="grid h-9 w-9 place-items-center rounded-full bg-card/70 text-pearl lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-midnight/95 backdrop-blur-xl lg:hidden"
          >
            <div className="px-4 pb-6 pt-2">
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-tropical">Menu Utama</div>
              <ul className="grid gap-2">
                {primaryItems.map((i) => (
                  <li key={i.to}>
                    <Link
                      onClick={() => setOpen(false)}
                      to={i.to}
                      className="block rounded-xl bg-card/40 px-4 py-3 text-sm font-medium text-pearl/80 transition-colors hover:bg-card/80 hover:text-pearl"
                      activeProps={{ className: "text-tropical bg-card/80 border border-tropical/20" }}
                      activeOptions={{ exact: i.to === "/" }}
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mb-4 mt-6 text-xs font-bold uppercase tracking-widest text-tropical">Fitur & Lainnya</div>
              <ul className="grid grid-cols-2 gap-2">
                {secondaryItems.map((i) => {
                  const IconComponent = i.icon;
                  return (
                    <li key={i.to}>
                      <Link
                        onClick={() => setOpen(false)}
                        to={i.to}
                        className="flex items-center gap-2 rounded-xl bg-card/40 px-4 py-3 text-sm font-medium text-pearl/80 transition-colors hover:bg-card/80 hover:text-pearl"
                        activeProps={{ className: "text-tropical bg-card/80 border border-tropical/20" }}
                      >
                        <IconComponent className="size-4 text-tropical" /> {i.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
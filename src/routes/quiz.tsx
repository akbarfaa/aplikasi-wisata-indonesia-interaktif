import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quiz, t as tr } from "@/lib/data";
import { useLang } from "@/lib/contexts";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Tourism Quiz — Wisata Indonesia" },
      { name: "description", content: "Bilingual quiz on Indonesian tourism." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { lang, t } = useLang();
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = quiz[i];

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (i + 1 >= quiz.length) {
      setDone(true);
    } else {
      setI((x) => x + 1);
      setPicked(null);
    }
  }
  function restart() {
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">Knowledge</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.quiz.title}</h1>
      <p className="mt-2 text-muted-foreground">{t.quiz.subtitle}</p>

      <div className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-cinema">
        {!done ? (
          <>
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
              <span>
                {t.quiz.question} {i + 1} {t.quiz.of} {quiz.length}
              </span>
              <span>
                {t.quiz.score}: {score}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="mt-4 font-serif text-2xl">{tr(q.q, lang)}</h2>
                <div className="mt-6 grid gap-3">
                  {q.options.map((o, idx) => {
                    const correct = picked !== null && idx === q.answer;
                    const wrong = picked === idx && idx !== q.answer;
                    return (
                      <button
                        key={idx}
                        onClick={() => choose(idx)}
                        className={`rounded-2xl border px-5 py-4 text-left transition-all ${
                          correct
                            ? "border-tropical bg-tropical/20"
                            : wrong
                              ? "border-destructive bg-destructive/20"
                              : "border-border bg-background/30 hover:border-tropical/60"
                        }`}
                      >
                        {tr(o, lang)}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      {picked === q.answer ? `✓ ${t.quiz.correct}` : `✗ ${t.quiz.wrong}`}
                    </div>
                    <button
                      onClick={next}
                      className="rounded-full bg-tropical px-5 py-2 text-sm font-bold text-midnight"
                    >
                      {t.actions.next} →
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4 text-tropical animate-bounce">
              <Trophy className="size-16" />
            </div>
            <h2 className="mt-3 font-serif text-3xl">{t.quiz.finished}</h2>
            <div className="mt-2 text-muted-foreground">
              {t.quiz.score}: {score} / {quiz.length}
            </div>
            <button
              onClick={restart}
              className="mt-6 rounded-full bg-tropical px-6 py-3 text-sm font-bold text-midnight"
            >
              {t.quiz.restart}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
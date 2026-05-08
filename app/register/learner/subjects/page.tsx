"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";
import { Suspense } from "react";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const SUBJECTS = {
  academic: [
    { label: "Maths",       icon: "calculate" },
    { label: "Physics",     icon: "science" },
    { label: "Chemistry",   icon: "biotech" },
    { label: "Biology",     icon: "eco" },
    { label: "English",     icon: "menu_book" },
    { label: "History",     icon: "history_edu" },
    { label: "Geography",   icon: "public" },
    { label: "Languages",   icon: "translate" },
    { label: "Economics",   icon: "trending_up" },
    { label: "Computer Sc.", icon: "computer" },
  ],
  "non-academic": [
    { label: "Music",        icon: "music_note" },
    { label: "Art & Craft",  icon: "brush" },
    { label: "Coding",       icon: "code" },
    { label: "Dance",        icon: "directions_run" },
    { label: "Sports",       icon: "sports_soccer" },
    { label: "Yoga",         icon: "self_improvement" },
    { label: "Photography",  icon: "photo_camera" },
    { label: "Chess",        icon: "casino" },
    { label: "Public Speaking", icon: "record_voice_over" },
    { label: "Cooking",      icon: "restaurant" },
  ],
} as const;

const LEFT_PANEL = {
  academic: {
    line1: "Pick your",
    line2: "subjects.",
    sub: "Choose everything you want to learn — no limits.",
  },
  "non-academic": {
    line1: "Pick your",
    line2: "passions.",
    sub: "Choose everything you want to explore — no limits.",
  },
};

type Category = keyof typeof SUBJECTS;

function SubjectsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const category = (params.get("category") ?? "academic") as Category;
  const subjects = SUBJECTS[category];
  const panel = LEFT_PANEL[category];

  const [selected, setSelected] = useState<Set<string>>(new Set());

  // reset on category change
  useEffect(() => { setSelected(new Set()); }, [category]);

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function handleContinue() {
    if (!selected.size) return;
    const list = Array.from(selected).join(",");
    router.push(`/register/learner/level?category=${category}&subjects=${encodeURIComponent(list)}`);
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />

        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <div className="rounded-[28px] p-5" style={{ backgroundColor: `${PRIMARY}18` }}>
            <Image src="/owl.png" alt="Owl mascot" width={260} height={260} />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">
              {panel.line1}
            </p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>
              {panel.line2}
            </p>
          </div>

          <p className="text-sm leading-6 max-w-[200px]" style={{ color: "#001258" }}>
            {panel.sub}
          </p>

          {/* selected count pill */}
          {selected.size > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: `${PRIMARY}15` }}
            >
              <CheckCircle size={16} weight="fill" color={PRIMARY} />
              <span className="text-[13px] font-semibold" style={{ color: PRIMARY }}>
                {selected.size} selected
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              {category === "academic" ? "Subjects" : "Skills"}
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Which ones do<br />you want to learn?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Select all that apply.</p>
          </div>

          {/* Subject grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {subjects.map(({ label, icon }) => {
              const isOn = selected.has(label);
              return (
                <button
                  key={label}
                  onClick={() => toggle(label)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-[16px] border text-left transition-all duration-200"
                  style={{
                    border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                    backgroundColor: isOn ? PRIMARY_LIGHT : "#ffffff",
                  }}
                >
                  <span
                    className="material-symbols-rounded text-[20px] shrink-0"
                    style={{ color: isOn ? PRIMARY : "#8888aa" }}
                  >
                    {icon}
                  </span>
                  <span
                    className="text-[13px] font-medium leading-tight flex-1 transition-colors duration-200"
                    style={{ color: isOn ? PRIMARY : "#1a1c1e" }}
                  >
                    {label}
                  </span>
                  {isOn && <CheckCircle size={16} weight="fill" color={PRIMARY} className="shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={handleContinue}
            disabled={!selected.size}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              backgroundColor: selected.size ? PRIMARY : `${PRIMARY}40`,
              color: "#fff",
              cursor: selected.size ? "pointer" : "not-allowed",
            }}
          >
            Continue
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default function LearnerSubjectsPage() {
  return (
    <Suspense>
      <SubjectsContent />
    </Suspense>
  );
}

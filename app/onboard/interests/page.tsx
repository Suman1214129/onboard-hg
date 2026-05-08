"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";
import LeftPanel from "@/app/components/LeftPanel";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const OPTIONS = {
  academic: {
    icon: "menu_book",
    label: "Academic",
    tagline: "School subjects, exams & competitive prep",
    tags: ["Maths", "Science", "English", "History", "Physics", "Chemistry", "Biology", "Languages"],
  },
  "non-academic": {
    icon: "palette",
    label: "Non-Academic",
    tagline: "Creative skills, hobbies & personal growth",
    tags: ["Music", "Art & Craft", "Coding", "Sports", "Dance", "Yoga", "Photography", "Chess"],
  },
} as const;

type Option = keyof typeof OPTIONS;

export default function InterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div className="flex min-h-screen">

      <LeftPanel bg={PRIMARY_LIGHT} primary={PRIMARY} onPrimaryContainer="#001258"
        line1="Tell us what" line2="excites you."
        sub="We'll personalise your experience around your interests." />

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Personalise</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              What are you<br />interested in?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Pick one — we&apos;ll match you with the right tutors.</p>
          </div>

          <div className="flex flex-col gap-3">
            {(["academic", "non-academic"] as Option[]).map((key) => {
              const opt = OPTIONS[key];
              const isSelected = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className="w-full text-left rounded-[20px] overflow-hidden transition-all duration-200"
                  style={{
                    border: `1.5px solid ${isSelected ? PRIMARY : "#e1e2ec"}`,
                    backgroundColor: isSelected ? PRIMARY_LIGHT : "#ffffff",
                  }}
                >
                  <div className="px-5 pt-5 pb-4 flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{ backgroundColor: isSelected ? PRIMARY : "#ebebf0" }}
                    >
                      <span className="material-symbols-rounded text-[22px]" style={{ color: isSelected ? "#ffffff" : "#5c5f6a" }}>
                        {opt.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[15px] leading-tight transition-colors duration-200" style={{ color: isSelected ? PRIMARY : "#1a1c1e" }}>
                        {opt.label}
                      </p>
                      <p className="text-[12px] text-[#6b6f7a] mt-0.5 leading-relaxed">{opt.tagline}</p>
                    </div>
                    {isSelected
                      ? <CheckCircle size={22} weight="fill" color={PRIMARY} className="shrink-0" />
                      : <div className="w-[22px] h-[22px] rounded-full border-2 shrink-0" style={{ borderColor: "#c4c6d0" }} />
                    }
                  </div>
                  <div
                    className="px-5 pb-4 pt-3 flex flex-wrap gap-2"
                    style={{ borderTop: `1px solid ${isSelected ? `${PRIMARY}20` : "#f0f0f5"}` }}
                  >
                    {opt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11.5px] font-medium px-3 py-1 rounded-full border transition-all duration-200"
                        style={{
                          backgroundColor: isSelected ? `${PRIMARY}10` : "#f4f4f8",
                          color: isSelected ? PRIMARY : "#5c5f6a",
                          borderColor: isSelected ? `${PRIMARY}25` : "transparent",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selected && router.push(`/onboard/source?category=${selected}`)}
            disabled={!selected}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              backgroundColor: selected ? PRIMARY : `${PRIMARY}40`,
              color: "#fff",
              cursor: selected ? "pointer" : "not-allowed",
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

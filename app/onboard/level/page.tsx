"use client";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const LEVELS = [
  { key: "beginner",     icon: "emoji_nature",       label: "Just starting out",    desc: "I have little to no experience with this." },
  { key: "some",         icon: "local_library",       label: "Know the basics",      desc: "I've covered the fundamentals but need more depth." },
  { key: "intermediate", icon: "trending_up",         label: "Getting comfortable",  desc: "I can handle most topics but have gaps to fill." },
  { key: "advanced",     icon: "workspace_premium",   label: "Pretty advanced",      desc: "I want to sharpen, specialise or go competitive." },
] as const;

type Level = typeof LEVELS[number]["key"];

function LevelContent() {
  const router = useRouter();
  const params = useSearchParams();
  const subjectsParam = params.get("subjects") ?? "";
  const subjects = subjectsParam ? decodeURIComponent(subjectsParam).split(",") : [];
  const firstSubject = subjects[0] ?? "this subject";

  const [selected, setSelected] = useState<Level | null>(null);

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <Image src="/owl.png" alt="Owl mascot" width={300} height={300} />
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">Every expert</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>
              was once a beginner.
            </p>
          </div>
          <p className="text-sm leading-6 max-w-[220px]" style={{ color: "#001258" }}>
            There&apos;s no wrong answer — be honest so we can find the perfect tutor for you.
          </p>
          {subjects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {subjects.map((s) => (
                <span
                  key={s}
                  className="text-xs font-medium px-4 py-1.5 rounded-full border"
                  style={{ backgroundColor: "#dde1ff", color: PRIMARY, borderColor: `${PRIMARY}30` }}
                >
                  {s}
                </span>
              ))}
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
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Your level</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              How well do you<br />know <span style={{ color: PRIMARY }}>{firstSubject}</span>?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Be honest — it helps us find the right fit.</p>
          </div>

          <div className="flex flex-col gap-2.5">
            {LEVELS.map(({ key, icon, label, desc }) => {
              const isOn = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className="w-full text-left flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all duration-200"
                  style={{
                    border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                    backgroundColor: isOn ? PRIMARY_LIGHT : "#ffffff",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: isOn ? PRIMARY : "#ebebf0" }}
                  >
                    <span className="material-symbols-rounded text-[20px]" style={{ color: isOn ? "#ffffff" : "#5c5f6a" }}>
                      {icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] leading-tight transition-colors duration-200" style={{ color: isOn ? PRIMARY : "#1a1c1e" }}>
                      {label}
                    </p>
                    <p className="text-[12px] text-[#6b6f7a] mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                  {isOn
                    ? <CheckCircle size={20} weight="fill" color={PRIMARY} className="shrink-0" />
                    : <div className="w-5 h-5 rounded-full border-2 shrink-0" style={{ borderColor: "#c4c6d0" }} />
                  }
                </button>
              );
            })}
          </div>

          <button
            onClick={() => selected && router.push("/onboard/about")}
            disabled={!selected}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              backgroundColor: selected ? PRIMARY : `${PRIMARY}40`,
              color: "#fff",
              cursor: selected ? "pointer" : "not-allowed",
            }}
          >
            Find my tutors
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default function LevelPage() {
  return <Suspense><LevelContent /></Suspense>;
}

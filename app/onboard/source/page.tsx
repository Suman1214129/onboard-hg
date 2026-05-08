"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";
import LeftPanel from "@/app/components/LeftPanel";

const PRIMARY       = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

const SOURCES = [
  { key: "friend",    icon: "group",        label: "Friend or family",  desc: "Someone I know recommended it" },
  { key: "instagram", icon: "photo_camera", label: "Instagram",         desc: "Saw an ad or post" },
  { key: "youtube",   icon: "play_circle",  label: "YouTube",           desc: "Saw an ad or video" },
  { key: "google",    icon: "search",       label: "Google",            desc: "Searched and found it" },
  { key: "school",    icon: "school",       label: "School or teacher", desc: "My school or teacher told me" },
  { key: "whatsapp",  icon: "chat",         label: "WhatsApp",          desc: "Shared in a group or chat" },
  { key: "other",     icon: "more_horiz",   label: "Somewhere else",    desc: "Another place or way" },
];

type Source = typeof SOURCES[number]["key"];

function SourceContent() {
  const router  = useRouter();
  const params  = useSearchParams();
  const category = params.get("category") ?? "academic";
  const [selected, setSelected] = useState<Source | null>(null);

  function go(skip = false) {
    if (!skip && !selected) return;
    router.push(`/onboard/subjects?category=${category}`);
  }

  return (
    <div className="flex min-h-screen">

      <LeftPanel bg={PRIMARY_LIGHT} primary={PRIMARY} onPrimaryContainer="#001258"
        line1="Spread by" line2="word of mouth."
        sub="Most learners find us through someone they trust." />

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] overflow-y-auto flex justify-center">
        <div className="w-full max-w-md px-10 py-12 flex flex-col gap-5">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>
            Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Quick question</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Where did you<br />hear about us?
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Helps us reach more learners like you.</p>
          </div>

          <div className="flex flex-col gap-2">
            {SOURCES.map(({ key, icon, label, desc }) => {
              const isOn = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className="w-full text-left flex items-center gap-4 px-5 py-3.5 rounded-[16px] transition-all duration-200"
                  style={{
                    border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                    backgroundColor: isOn ? PRIMARY_LIGHT : "#ffffff",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: isOn ? PRIMARY : "#ebebf0" }}
                  >
                    <span className="material-symbols-rounded text-[18px]" style={{ color: isOn ? "#ffffff" : "#5c5f6a" }}>
                      {icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13.5px] leading-tight transition-colors duration-200" style={{ color: isOn ? PRIMARY : "#1a1c1e" }}>
                      {label}
                    </p>
                    <p className="text-[11.5px] text-[#6b6f7a] mt-0.5">{desc}</p>
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
            onClick={() => go()}
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

          <button onClick={() => go(true)} className="text-center text-[13px] font-medium" style={{ color: "#9a9aa8" }}>
            Skip for now
          </button>

        </div>
      </div>
    </div>
  );
}

export default function SourcePage() {
  return <Suspense><SourceContent /></Suspense>;
}

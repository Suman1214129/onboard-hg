"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "@phosphor-icons/react";

const PRIMARY       = "#e07b2a";
const PRIMARY_LIGHT = "#fde8d8";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["Morning", "Afternoon", "Evening"];
export default function TutorProfilePage() {
  const router = useRouter();
  const [rate,      setRate]      = useState("");
  const [days,      setDays]      = useState<Set<string>>(new Set());
  const [slots,     setSlots]     = useState<Set<string>>(new Set());

  function toggleSet(set: Set<string>, setFn: (s: Set<string>) => void, val: string) {
    const n = new Set(set); n.has(val) ? n.delete(val) : n.add(val); setFn(n);
  }

  const canSubmit = rate && days.size > 0 && slots.size > 0;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10 h-screen overflow-hidden" style={{ backgroundColor: PRIMARY_LIGHT }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />
        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <div className="rounded-[28px] p-5" style={{ backgroundColor: `${PRIMARY}18` }}>
            <Image src="/owl.png" alt="Owl mascot" width={260} height={260} />
          </div>
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">Set your</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug" style={{ color: PRIMARY }}>preferences.</p>
          </div>
          <p className="text-sm leading-6 max-w-[200px]" style={{ color: "#2d1600" }}>
            You can always update your rate and availability later.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] h-screen overflow-y-auto flex justify-center">
        <div className="w-full max-w-md px-10 py-12 flex flex-col gap-6">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>Back
          </button>

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Preferences</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">How do you<br />like to teach?</h1>
            <p className="text-sm text-[#44474f] mt-1.5">Set your rate, mode and availability.</p>
          </div>

          {/* Rate */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9a9aa8]">Hourly rate</p>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f]">Rate per hour</label>
              <div className="flex items-center gap-3 rounded-[14px] px-4 py-3 bg-white" style={{ border: "1.5px solid #e1e2ec" }}>
                <span className="text-[14px] font-semibold text-[#8888aa]">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  className="flex-1 bg-transparent text-[13.5px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <span className="text-[12px] text-[#9a9aa8]">/ hr</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#9a9aa8]">Availability</p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f]">Days</label>
              <div className="flex gap-2 flex-wrap">
                {DAYS.map(d => {
                  const isOn = days.has(d);
                  return (
                    <button key={d} onClick={() => toggleSet(days, setDays, d)}
                      className="w-11 h-11 rounded-full text-[12px] font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: isOn ? PRIMARY : "#ffffff",
                        color: isOn ? "#fff" : "#44474f",
                        border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                      }}>
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f]">Time slots</label>
              <div className="flex gap-2">
                {SLOTS.map(s => {
                  const isOn = slots.has(s);
                  return (
                    <button key={s} onClick={() => toggleSet(slots, setSlots, s)}
                      className="flex-1 py-2.5 rounded-full text-[12.5px] font-medium transition-all duration-200"
                      style={{
                        backgroundColor: isOn ? PRIMARY : "#ffffff",
                        color: isOn ? "#fff" : "#44474f",
                        border: `1.5px solid ${isOn ? PRIMARY : "#e1e2ec"}`,
                      }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => canSubmit && router.push("/onboard/tutor/complete")}
            disabled={!canSubmit}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: canSubmit ? PRIMARY : `${PRIMARY}40`, color: "#fff", cursor: canSubmit ? "pointer" : "not-allowed" }}
          >
            All done
            <span className="material-symbols-rounded text-[18px]">check</span>
          </button>

        </div>
      </div>
    </div>
  );
}

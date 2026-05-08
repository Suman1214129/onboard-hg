"use client";
import Image from "next/image";
import { useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const THEME = {
  learner: {
    primary: "#2251cc",
    onPrimary: "#ffffff",
    primaryContainer: "#dce6fb",
    onPrimaryContainer: "#001258",
    secondaryContainer: "#dde1ff",
  },
  tutor: {
    primary: "#e07b2a",
    onPrimary: "#ffffff",
    primaryContainer: "#fde8d8",
    onPrimaryContainer: "#2d1600",
    secondaryContainer: "#ffdcc2",
  },
};

export default function OnboardingPage() {
  const [selected, setSelected] = useState<"learner" | "tutor">("learner");
  const t = THEME[selected];
  const router = useRouter();

  return (
    <div className="flex min-h-screen">

      {/* Left Panel */}
      <div
        className="w-1/2 flex flex-col px-12 py-10 transition-colors duration-500"
        style={{ backgroundColor: t.primaryContainer }}
      >
        <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />

        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">

          <Image src="/owl.png" alt="Owl mascot" width={300} height={300} />

          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">
              Every lesson,
            </p>
            <p
              className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug transition-colors duration-500"
              style={{ color: t.primary }}
            >
              a leap forward.
            </p>
          </div>

          <p className="text-sm leading-6 max-w-[200px]" style={{ color: t.onPrimaryContainer }}>
            1-on-1 tutoring for every subject, every level, every goal.
          </p>

          {/* M3 Assist chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {["10k+ Learners", "500+ Tutors", "4.9 ★ Rating"].map((chip) => (
              <span
                key={chip}
                className="text-xs font-medium px-4 py-1.5 rounded-full border transition-colors duration-500"
                style={{
                  backgroundColor: t.secondaryContainer,
                  color: t.primary,
                  borderColor: `${t.primary}30`,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <div className="mb-2">
            <p
              className="text-xs font-medium tracking-[0.15em] uppercase mb-3 transition-colors duration-500"
              style={{ color: t.primary }}
            >
              Welcome
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Join as a Learner<br />or Tutor
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Choose your role to get started.</p>
          </div>

          {/* Learner Card */}
          <button
            onClick={() => setSelected("learner")}
            className="w-full text-left rounded-[16px] border p-4 transition-all duration-200"
            style={{
              borderColor: selected === "learner" ? "#2251cc" : "#c4c6d0",
              backgroundColor: selected === "learner" ? "#dce6fb" : "#ffffff",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0"
                style={{ backgroundColor: selected === "learner" ? "#2251cc" : "#e1e2ec" }}
              >
                {/* Material Symbol */}
                <span
                  className="material-symbols-rounded text-[22px]"
                  style={{ color: selected === "learner" ? "#ffffff" : "#44474f" }}
                >
                  school
                </span>
              </div>
              <div className="flex-1">
                <p
                  className="font-semibold text-sm transition-colors duration-200"
                  style={{ color: selected === "learner" ? "#2251cc" : "#1a1c1e" }}
                >
                  I&apos;m a Learner
                </p>
                <p className="text-xs text-[#44474f] mt-0.5 leading-relaxed">
                  Discover courses & track your progress.
                </p>
              </div>
              {selected === "learner" ? (
                <CheckCircle size={22} weight="fill" color="#2251cc" className="shrink-0" />
              ) : (
                <Circle size={22} color="#c4c6d0" className="shrink-0" />
              )}
            </div>
          </button>

          {/* Tutor Card */}
          <button
            onClick={() => setSelected("tutor")}
            className="w-full text-left rounded-[16px] border p-4 transition-all duration-200"
            style={{
              borderColor: selected === "tutor" ? "#e07b2a" : "#c4c6d0",
              backgroundColor: selected === "tutor" ? "#fde8d8" : "#ffffff",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 shrink-0"
                style={{ backgroundColor: selected === "tutor" ? "#e07b2a" : "#e1e2ec" }}
              >
                {/* Material Symbol */}
                <span
                  className="material-symbols-rounded text-[22px]"
                  style={{ color: selected === "tutor" ? "#ffffff" : "#44474f" }}
                >
                  cast_for_education
                </span>
              </div>
              <div className="flex-1">
                <p
                  className="font-semibold text-sm transition-colors duration-200"
                  style={{ color: selected === "tutor" ? "#e07b2a" : "#1a1c1e" }}
                >
                  I&apos;m a Tutor
                </p>
                <p className="text-xs text-[#44474f] mt-0.5 leading-relaxed">
                  Create courses & share your expertise.
                </p>
              </div>
              {selected === "tutor" ? (
                <CheckCircle size={22} weight="fill" color="#e07b2a" className="shrink-0" />
              ) : (
                <Circle size={22} color="#c4c6d0" className="shrink-0" />
              )}
            </div>
          </button>

          {/* M3 Filled button */}
          <button
            onClick={() => router.push(`/register/${selected}`)}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] mt-1 flex items-center justify-center gap-2"
            style={{ backgroundColor: t.primary, color: t.onPrimary }}
          >
            Continue
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e1e2ec]" />
            <span className="text-xs text-[#44474f]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ec]" />
          </div>

          {/* M3 Text button */}
          <p className="text-center text-sm text-[#44474f]">
            New here?{" "}
            <span
              onClick={() => router.push(`/register/${selected}`)}
              className="font-medium cursor-pointer hover:underline transition-colors duration-300"
              style={{ color: t.primary }}
            >
              Create a free account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useState } from "react";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";
const SECONDARY_CONTAINER = "#dde1ff";

type Step = "email" | "phone" | "otp" | "password" | "referral";

const STEPS: Step[] = ["email", "phone", "otp", "password", "referral"];

const OWL_MOODS: Record<Step, { img: string; caption: string }> = {
  email:    { img: "/owl.png",         caption: "Let's get you started 👋" },
  phone:    { img: "/owl.png",         caption: "We'll keep you in the loop 📱" },
  otp:      { img: "/authenticate.png",caption: "Check your WhatsApp ✅" },
  password: { img: "/owl.png",         caption: "Keep it safe & secret 🔒" },
  referral: { img: "/about.png",       caption: "Got a friend's code? 🎁" },
};

const STEP_TITLES: Record<Step, { title: string; sub: string }> = {
  email:    { title: "What's your\nemail address?",     sub: "We'll use this to sign you in." },
  phone:    { title: "Your phone\nnumber?",             sub: "For OTP & WhatsApp updates." },
  otp:      { title: "Enter the\nOTP sent to you",      sub: "We sent a 6-digit code via WhatsApp." },
  password: { title: "Create a\npassword",              sub: "At least 8 characters." },
  referral: { title: "Got a referral\ncode?",           sub: "Optional — skip if you don't have one." },
};

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referral, setReferral] = useState("");

  const stepIndex = STEPS.indexOf(step);
  const mood = OWL_MOODS[step];
  const { title, sub } = STEP_TITLES[step];

  function next() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function back() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  function handleOtp(val: string, i: number) {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[i] = val;
    setOtp(updated);
    if (val && i < 5) {
      const next = document.getElementById(`otp-${i + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  }

  function handleOtpKey(e: React.KeyboardEvent, i: number) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const prev = document.getElementById(`otp-${i - 1}`);
      (prev as HTMLInputElement)?.focus();
    }
  }

  return (
    <div className="flex min-h-screen bg-[#fffbff]">

      {/* ── Left Panel ── */}
      <div
        className="w-[44%] flex flex-col justify-between px-12 py-10 relative overflow-hidden"
        style={{ backgroundColor: PRIMARY_LIGHT }}
      >
        <Image src="/logo.png" alt="HomeGuru" width={110} height={36} priority />

        {/* owl mood */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div
            className="rounded-[28px] p-5 transition-all duration-500"
            style={{ backgroundColor: `${PRIMARY}12` }}
          >
            <Image
              src={mood.img}
              alt="Owl"
              width={220}
              height={220}
              className="transition-all duration-500"
            />
          </div>
          <p
            className="text-[13.5px] font-medium text-center px-4 py-2 rounded-full"
            style={{ backgroundColor: SECONDARY_CONTAINER, color: PRIMARY }}
          >
            {mood.caption}
          </p>
        </div>

        {/* step progress */}
        <div>
          <div className="flex gap-1.5 mb-4">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{ backgroundColor: i <= stepIndex ? PRIMARY : `${PRIMARY}25` }}
              />
            ))}
          </div>
          <p className="text-[12px] text-[#5c5f6a]">
            Step {stepIndex + 1} of {STEPS.length} — Creating your Learner account
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[380px] flex flex-col gap-7">

          {/* back */}
          {stepIndex > 0 && (
            <button
              onClick={back}
              className="flex items-center gap-1.5 text-[13px] font-medium w-fit -mb-2 transition-colors duration-200"
              style={{ color: PRIMARY }}
            >
              <span className="material-symbols-rounded text-[18px]">arrow_back</span>
              Back
            </button>
          )}

          {/* title */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#9a9aa8] mb-3">
              Create account
            </p>
            <h1
              className="text-[1.9rem] font-bold tracking-[-0.03em] text-[#1a1c1e] leading-[1.2]"
              style={{ whiteSpace: "pre-line" }}
            >
              {title}
            </h1>
            <p className="text-[13px] text-[#6b6f7a] mt-2">{sub}</p>
          </div>

          {/* ── Fields per step ── */}

          {/* Email */}
          {step === "email" && (
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-medium text-[#44474f]">Email address</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: email ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              >
                <span className="material-symbols-rounded text-[20px] text-[#8888aa]">mail</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
              </div>
            </div>
          )}

          {/* Phone */}
          {step === "phone" && (
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-medium text-[#44474f]">Phone number</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: phone ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              >
                <span className="material-symbols-rounded text-[20px] text-[#8888aa]">phone</span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
              </div>
              {/* WhatsApp toggle */}
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3 mt-1"
                style={{ backgroundColor: SECONDARY_CONTAINER }}
              >
                <span className="material-symbols-rounded text-[18px]" style={{ color: PRIMARY }}>
                  chat
                </span>
                <p className="text-[12.5px] flex-1" style={{ color: PRIMARY }}>
                  OTP will be sent via <strong>WhatsApp</strong>
                </p>
                <span className="material-symbols-rounded text-[18px]" style={{ color: PRIMARY }}>
                  check_circle
                </span>
              </div>
            </div>
          )}

          {/* OTP */}
          {step === "otp" && (
            <div className="flex flex-col gap-4">
              <label className="text-[12px] font-medium text-[#44474f]">6-digit OTP</label>
              <div className="flex gap-2 justify-between">
                {otp.map((val, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtp(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKey(e, i)}
                    className="w-12 h-14 text-center text-[1.2rem] font-bold rounded-[14px] outline-none transition-all duration-200"
                    style={{
                      backgroundColor: val ? PRIMARY_LIGHT : "#f4f4f8",
                      color: PRIMARY,
                      border: val ? `2px solid ${PRIMARY}` : "2px solid transparent",
                    }}
                  />
                ))}
              </div>
              <button
                className="text-[12.5px] font-medium text-left transition-colors duration-200"
                style={{ color: PRIMARY }}
              >
                Resend OTP via WhatsApp
              </button>
            </div>
          )}

          {/* Password */}
          {step === "password" && (
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-medium text-[#44474f]">Password</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: password ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              >
                <span className="material-symbols-rounded text-[20px] text-[#8888aa]">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <button onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-rounded text-[20px] text-[#8888aa]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {/* strength bar */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          password.length >= lvl * 3
                            ? lvl <= 2 ? "#e07b2a" : PRIMARY
                            : "#e4e4ec",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Referral */}
          {step === "referral" && (
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-medium text-[#44474f]">Referral code</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: referral ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              >
                <span className="material-symbols-rounded text-[20px] text-[#8888aa]">redeem</span>
                <input
                  type="text"
                  placeholder="e.g. GURU2024"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value.toUpperCase())}
                  className="flex-1 bg-transparent text-[14px] font-mono tracking-widest text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] placeholder:font-sans placeholder:tracking-normal"
                />
              </div>
              <p className="text-[12px] text-[#9a9aa8]">
                Both you and your friend get <span style={{ color: PRIMARY }} className="font-semibold">1 free session</span> 🎉
              </p>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={step === "referral" ? undefined : next}
            className="w-full py-4 rounded-full text-[14px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: PRIMARY, color: "#fff" }}
          >
            {step === "referral" ? "Create my account" : "Continue"}
            <span className="material-symbols-rounded text-[17px]">
              {step === "referral" ? "check" : "arrow_forward"}
            </span>
          </button>

          {step === "referral" && (
            <button
              className="text-center text-[12.5px] font-medium transition-colors duration-200"
              style={{ color: "#9a9aa8" }}
            >
              Skip for now
            </button>
          )}

          {step === "email" && (
            <p className="text-center text-[12.5px] text-[#9a9aa8]">
              Already have an account?{" "}
              <span className="font-semibold cursor-pointer hover:underline" style={{ color: PRIMARY }}>
                Sign in
              </span>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

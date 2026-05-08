"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, Lock, Eye, EyeSlash, WarningCircle, CheckCircle } from "@phosphor-icons/react";

const THEME = {
  learner: { primary: "#2251cc", primaryLight: "#dce6fb", onPrimaryContainer: "#001258", label: "Learner" },
  tutor:   { primary: "#e07b2a", primaryLight: "#fde8d8", onPrimaryContainer: "#2d1600", label: "Tutor"   },
};

type Role = keyof typeof THEME;

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

export default function LoginPage() {
  const router = useRouter();
  const [role,       setRole]       = useState<Role>("learner");
  const [email,      setEmail]      = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [touched,    setTouched]    = useState({ email: false });

  const t           = THEME[role];
  const emailValid  = isValidEmail(email);
  const canSubmit   = emailValid && password.length >= 6;
  const emailError  = touched.email && email && !emailValid;

  function getOutline(val: string, valid: boolean, isTouched: boolean) {
    if (!val) return "2px solid transparent";
    if (isTouched && !valid) return "2px solid #c0392b";
    if (valid) return `2px solid ${t.primary}`;
    return "2px solid transparent";
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 flex flex-col px-12 py-10 transition-colors duration-300" style={{ backgroundColor: t.primaryLight }}>
        <Image src="/logo.png" alt="HomeGuru" width={130} height={40} priority />

        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-center">
          <div className="rounded-[28px] p-5 transition-colors duration-300" style={{ backgroundColor: `${t.primary}18` }}>
            <Image src="/owl.png" alt="Owl mascot" width={260} height={260} />
          </div>
          <div>
            <p className="text-[2rem] font-medium tracking-[-0.02em] text-[#1a1c1e] leading-snug">Welcome</p>
            <p className="text-[2rem] font-semibold tracking-[-0.02em] italic leading-snug transition-colors duration-300" style={{ color: t.primary }}>
              back.
            </p>
          </div>
          <p className="text-sm leading-6 max-w-[200px] transition-colors duration-300" style={{ color: t.onPrimaryContainer }}>
            Great to see you again. Pick up right where you left off.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          {/* heading */}
          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3 transition-colors duration-300" style={{ color: t.primary }}>
              Sign in
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Good to have<br />you back
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Sign in to your HomeGuru account.</p>
          </div>

          {/* Role toggle */}
          <div className="flex gap-2 p-1 rounded-full bg-[#f0f0f5]">
            {(["learner", "tutor"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-full text-[13px] font-medium transition-all duration-200"
                style={{
                  backgroundColor: role === r ? THEME[r].primary : "transparent",
                  color: role === r ? "#ffffff" : "#5c5f6a",
                }}
              >
                {THEME[r].label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Email address</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: getOutline(email, emailValid, touched.email) }}
              >
                <EnvelopeSimple size={20} color={email && emailValid ? t.primary : "#8888aa"} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                {email && (emailValid
                  ? <CheckCircle size={18} color={t.primary} weight="fill" />
                  : touched.email && <WarningCircle size={18} color="#c0392b" weight="fill" />
                )}
              </div>
              {emailError && <p className="text-[11.5px] text-[#c0392b] flex items-center gap-1"><WarningCircle size={13} weight="fill" />Enter a valid email address</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-[#44474f]">Password</label>
                <button onClick={() => router.push("/forgot-password")} className="text-[12px] font-medium transition-colors duration-200" style={{ color: t.primary }}>
                  Forgot password?
                </button>
              </div>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: password ? `2px solid ${t.primary}` : "2px solid transparent" }}
              >
                <Lock size={20} color="#8888aa" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <button onClick={() => setShowPw(!showPw)} type="button">
                  {showPw ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => canSubmit && router.push("/")}
            disabled={!canSubmit}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
            style={{
              backgroundColor: canSubmit ? t.primary : `${t.primary}40`,
              color: "#fff",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            Sign in
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e1e2ec]" />
            <span className="text-xs text-[#44474f]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ec]" />
          </div>

          <p className="text-center text-sm text-[#44474f]">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push(`/register/${role}`)}
              className="font-medium cursor-pointer hover:underline transition-colors duration-300"
              style={{ color: t.primary }}
            >
              Create one free
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

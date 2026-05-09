"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, Lock, Eye, EyeSlash, WarningCircle, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import TeacherSprite from "../../assets/teacher.png";
import StudentSprite from "../../assets/student.png";

const THEME = {
  learner: { primary: "#2251cc" },
  tutor:   { primary: "#e07b2a" },
};

type Role = keyof typeof THEME;

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({ email: false });

  const t = THEME[role];
  const emailValid = isValidEmail(email);
  const canSubmit = emailValid && password.length >= 6;
  const emailError = touched.email && email && !emailValid;

  function getOutline(val: string, valid: boolean, isTouched: boolean) {
    if (!val) return "2px solid transparent";
    if (isTouched && !valid) return "2px solid #ba1a1a";
    if (valid) return `2px solid ${t.primary}`;
    return "2px solid transparent";
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec] transition-all duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] opacity-[0.08] blur-[140px] rounded-full pointer-events-none transition-colors duration-500" style={{ backgroundColor: t.primary }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] opacity-[0.08] blur-[160px] rounded-full pointer-events-none transition-colors duration-500" style={{ backgroundColor: role === "learner" ? THEME.tutor.primary : THEME.learner.primary }} />

        <div className="relative z-10 w-full">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 text-center mt-8">
          <style>{`
            @keyframes play-role-sprite {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .role-sprite-anim-learner {
              animation: play-role-sprite 2.5s steps(5) infinite;
            }
            .role-sprite-anim-tutor {
              animation: play-role-sprite 2.5s steps(4) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={role === "learner" ? StudentSprite.src : TeacherSprite.src} 
              alt="Mascot" 
              className={`h-[140px] max-w-none block ${role === "learner" ? "role-sprite-anim-learner" : "role-sprite-anim-tutor"}`}
              style={{ width: `calc(140px * ${role === "learner" ? 5 : 4})` }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Welcome
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug pb-1 transition-colors duration-300" style={{ color: t.primary }}>
              back.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
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
                className="flex-1 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300"
                style={{
                  backgroundColor: role === r ? THEME[r].primary : "transparent",
                  color: role === r ? "#ffffff" : "#5c5f6a",
                }}
              >
                {r === "learner" ? "Learner" : "Tutor"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-2">

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
                  : touched.email && <WarningCircle size={18} color="#ba1a1a" weight="fill" />
                )}
              </div>
              {emailError && <p className="text-[11.5px] text-[#ba1a1a] flex items-center gap-1"><WarningCircle size={13} weight="fill" />Enter a valid email address</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[12px] font-medium text-[#44474f]">Password</label>
                <button onClick={() => router.push("/forgot-password")} className="text-[12px] font-bold transition-colors duration-200" style={{ color: t.primary }}>
                  Forgot password?
                </button>
              </div>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: password ? `2px solid ${t.primary}` : "2px solid transparent" }}
              >
                <Lock size={20} color={password ? t.primary : "#8888aa"} />
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
            className={`group w-full h-[44px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 mt-4 ${
              canSubmit ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: t.primary, color: "#ffffff" }}
          >
            Sign in
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${canSubmit ? "group-hover:translate-x-1" : ""}`} />
          </button>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 h-px bg-[#e1e2ec]" />
            <span className="text-xs text-[#44474f]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ec]" />
          </div>

          <p className="text-center text-sm text-[#44474f] mt-2">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push(`/register/${role}`)}
              className="font-bold cursor-pointer hover:underline transition-colors duration-300"
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

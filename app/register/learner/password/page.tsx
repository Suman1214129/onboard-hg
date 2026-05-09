"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeSlash, ArrowRight, Ticket } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

function getStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#e07b2a", "#e0b82a", "#2251cc", "#1a9e5c"];

export default function LearnerPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const strength = getStrength(password);
  const valid = password.length >= 8 && password === confirm;

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#2251cc] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-[#e07b2a] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          <Image src="/logo.png" alt="HomeGuru Logo" width={130} height={40} priority />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 text-center mt-8">
          <style>{`
            @keyframes play-role-sprite {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
            }
            .role-sprite-anim {
              animation: play-role-sprite 2.5s steps(5) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden drop-shadow-sm">
            <img 
              src={StudentSprite.src} 
              alt="Learner Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 5)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Keep it safe,
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              keep it secret.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Choose a strong password to protect your account.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[13px] font-medium w-fit"
            style={{ color: PRIMARY }}
          >
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>
            Back
          </button>

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Account setup
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Create your<br />password
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">
              At least 8 characters with a mix of letters and numbers.
            </p>
          </div>

          <div className="flex flex-col gap-4">

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Password</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: password ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              >
                <Lock size={20} color="#8888aa" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <button onClick={() => setShowPw(!showPw)} type="button">
                  {showPw ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: strength >= lvl ? STRENGTH_COLORS[strength] : "#e4e4ec" }}
                      />
                    ))}
                  </div>
                  <p className="text-[11.5px] font-medium" style={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LABELS[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Confirm password</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{
                  backgroundColor: "#f4f4f8",
                  outline: confirm
                    ? `2px solid ${confirm === password ? "#1a9e5c" : "#e07b2a"}`
                    : "2px solid transparent",
                }}
              >
                <Lock size={20} color="#8888aa" />
                <input
                  type={showCf ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <button onClick={() => setShowCf(!showCf)} type="button">
                  {showCf ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>
              {confirm && confirm !== password && (
                <p className="text-[11.5px] text-[#e07b2a]">Passwords don&apos;t match</p>
              )}
            </div>
          </div>

          {/* Referral Code */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[12px] font-medium text-[#44474f]">Referral code <span className="text-[#9a9aa8 font-normal]">(Optional)</span></label>
            <div
              className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
              style={{ backgroundColor: "#f4f4f8", outline: "2px solid transparent" }}
            >
              <Ticket size={20} color="#8888aa" />
              <input
                type="text"
                placeholder="Enter referral code"
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] uppercase"
              />
            </div>
          </div>

          <button
            onClick={() => router.push("/register/learner/verify")}
            disabled={!valid}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 mt-4 flex items-center justify-center gap-2 ${
              valid ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Set Password
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${valid ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
      </div>
    </div>
  );
}

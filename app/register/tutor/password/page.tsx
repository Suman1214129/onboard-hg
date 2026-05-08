"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeSlash } from "@phosphor-icons/react";
import LeftPanel from "@/app/components/LeftPanel";

const PRIMARY       = "#e07b2a";
const PRIMARY_LIGHT = "#fde8d8";

function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["", "#c0392b", "#e0b82a", "#e07b2a", "#1a9e5c"];

export default function TutorPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [showCf,   setShowCf]   = useState(false);

  const strength = getStrength(password);
  const valid    = password.length >= 8 && password === confirm;

  return (
    <div className="flex min-h-screen">

      <LeftPanel bg={PRIMARY_LIGHT} primary={PRIMARY} onPrimaryContainer="#2d1600"
        line1="Keep it safe," line2="keep it secret."
        sub="Choose a strong password to protect your account." />

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>Back
          </button>

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Account setup</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Create your<br />password</h1>
            <p className="text-sm text-[#44474f] mt-1.5">At least 8 characters with a mix of letters and numbers.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Password</label>
              <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: password ? `2px solid ${PRIMARY}` : "2px solid transparent" }}>
                <Lock size={20} color="#8888aa" />
                <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]" />
                <button onClick={() => setShowPw(!showPw)} type="button">
                  {showPw ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(lvl => (
                      <div key={lvl} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: strength >= lvl ? COLORS[strength] : "#e4e4ec" }} />
                    ))}
                  </div>
                  <p className="text-[11.5px] font-medium" style={{ color: COLORS[strength] }}>{LABELS[strength]}</p>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Confirm password</label>
              <div className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: confirm ? `2px solid ${confirm === password ? "#1a9e5c" : "#c0392b"}` : "2px solid transparent" }}>
                <Lock size={20} color="#8888aa" />
                <input type={showCf ? "text" : "password"} placeholder="Re-enter password" value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]" />
                <button onClick={() => setShowCf(!showCf)} type="button">
                  {showCf ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>
              {confirm && confirm !== password && <p className="text-[11.5px] text-[#c0392b]">Passwords don&apos;t match</p>}
            </div>
          </div>

          <button
            onClick={() => router.push("/register/tutor/verify")}
            disabled={!valid}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ backgroundColor: valid ? PRIMARY : `${PRIMARY}40`, color: "#fff", cursor: valid ? "pointer" : "not-allowed" }}
          >
            Set Password
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

        </div>
      </div>
    </div>
  );
}

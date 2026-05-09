"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKey, Eye, EyeSlash, CheckCircle, WarningCircle, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import TeacherSprite from "../../../../assets/teacher.png";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";

function measureStrength(pw: string) {
  let score = 0;
  if (pw.length > 7) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function TeacherPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState(false);

  const strength = measureStrength(password);
  const isStrong = strength >= 3;

  function getOutline() {
    if (!password) return "2px solid transparent";
    if (touched && !isStrong) return "2px solid #e07b2a";
    if (isStrong) return `2px solid ${PRIMARY}`;
    return "2px solid transparent";
  }

  function getBarColor(idx: number) {
    if (!password) return "#e1e2ec";
    if (strength <= 1) return idx === 0 ? "#e07b2a" : "#e1e2ec"; // weak
    if (strength === 2) return idx < 2 ? "#e07b2a" : "#e1e2ec"; // fair
    if (strength === 3) return idx < 3 ? PRIMARY : "#e1e2ec"; // good
    return PRIMARY; // strong
  }

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
              animation: play-role-sprite 2.5s steps(4) infinite;
            }
          `}</style>
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={TeacherSprite.src} 
              alt="Teacher Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 4)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              Secure your
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              account.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Create a strong password to keep your tutoring profile safe.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <ArrowLeft size={18} weight="bold" />Back
          </button>

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Security
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Create a<br />password
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Make it strong and memorable.</p>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
              style={{ backgroundColor: "#f4f4f8", outline: getOutline() }}
            >
              <LockKey size={20} color={isStrong ? PRIMARY : "#8888aa"} />
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched(true)}
                className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
              />
              <button type="button" onClick={() => setShow(!show)} className="text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
                {show ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* strength meter */}
            <div className="flex items-center gap-1.5 mt-1">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="h-1.5 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: getBarColor(i) }} />
              ))}
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <p className="text-[12px] text-[#6b6f7a] flex items-center gap-1.5">
                {password.length > 7 ? <CheckCircle size={14} color={PRIMARY} weight="fill" /> : <WarningCircle size={14} />}
                At least 8 characters
              </p>
              <p className="text-[12px] text-[#6b6f7a] flex items-center gap-1.5">
                {/[A-Z]/.test(password) && /[0-9]/.test(password) ? <CheckCircle size={14} color={PRIMARY} weight="fill" /> : <WarningCircle size={14} />}
                Contains uppercase letter and number
              </p>
            </div>
          </div>

          <button
            onClick={() => isStrong && router.push("/register/tutor/verify")}
            disabled={!isStrong}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 mt-4 flex items-center justify-center gap-2 ${
              isStrong ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Continue
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${isStrong ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
      </div>
    </div>
  );
}


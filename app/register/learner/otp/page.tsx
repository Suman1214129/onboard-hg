"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WhatsappLogo, ArrowRight } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";
const WA_GREEN = "#128C7E";

export default function LearnerOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown === 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleResend() {
    setCountdown(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    document.getElementById("otp-0")?.focus();
  }

  function handleOtp(val: string, i: number) {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[i] = val;
    setOtp(updated);
    if (val && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  }

  function handleOtpKey(e: React.KeyboardEvent, i: number) {
    if (e.key === "Backspace" && !otp[i] && i > 0) (document.getElementById(`otp-${i - 1}`) as HTMLInputElement)?.focus();
  }

  const filled = otp.every((d) => d !== "");

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
              Almost there,
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              verify yourself.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Enter the 6-digit code sent to your WhatsApp.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium w-fit" style={{ color: PRIMARY }}>
            <span className="material-symbols-rounded text-[18px]">arrow_back</span>Back
          </button>

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Verification
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Enter the code<br />we sent you
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">6-digit OTP sent to your WhatsApp number.</p>
          </div>

          {/* OTP boxes */}
          <div className="flex gap-2.5 justify-between">
            {otp.map((val, i) => (
              <input
                key={i} id={`otp-${i}`}
                type="text" inputMode="numeric" maxLength={1} value={val}
                onChange={(e) => handleOtp(e.target.value, i)}
                onKeyDown={(e) => handleOtpKey(e, i)}
                className="w-12 h-14 text-center text-[1.3rem] font-bold rounded-[14px] outline-none transition-all duration-200"
                style={{
                  backgroundColor: val ? PRIMARY_LIGHT : "#f4f4f8",
                  color: PRIMARY,
                  border: val ? `2px solid ${PRIMARY}` : "2px solid transparent",
                }}
              />
            ))}
          </div>

          {/* resend row */}
          <div className="flex items-center justify-between">
            {canResend ? (
              <button onClick={handleResend} className="flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: WA_GREEN }}>
                <WhatsappLogo size={15} weight="fill" />
                Resend via WhatsApp
              </button>
            ) : (
              <p className="text-[12px] text-[#9a9aa8]">
                Resend in <span className="font-semibold tabular-nums" style={{ color: PRIMARY }}>{countdown}s</span>
              </p>
            )}
            <p className="text-[12px] text-[#9a9aa8]">Didn&apos;t receive it?</p>
          </div>

          <button
            onClick={() => router.push("/register/learner/password")}
            disabled={!filled}
            className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 mt-2 flex items-center justify-center gap-2 ${
              filled ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
          >
            Verify OTP
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${filled ? "group-hover:translate-x-1" : ""}`} />
          </button>

        </div>
      </div>
    </div>
  );
}

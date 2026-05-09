"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, ArrowRight, ArrowsClockwise } from "@phosphor-icons/react";
import StudentSprite from "../../../../assets/student.png";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";

export default function LearnerVerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    setEmail(sessionStorage.getItem('hg_email') || "you@example.com");
  }, []);

  useEffect(() => {
    if (countdown === 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleResend() {
    setCountdown(30);
    setCanResend(false);
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <div className="w-1/2 relative overflow-hidden flex flex-col px-12 py-10 bg-gradient-to-br from-[#e6edfc] via-[#fcfcfd] to-[#fce4d2] border-r border-[#e1e2ec]">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#2251cc] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] bg-[#e07b2a] opacity-[0.08] blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          {/* Using text for HomeGuru instead of missing Image to be safe or use Image if imported, Image is not imported in verify! Wait, verify page doesn't import Image. Let me add Image. Actually I'll use next/image */}
          <img src="/logo.png" alt="HomeGuru Logo" className="w-[130px] h-[40px] object-contain" />
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
          <div className="w-[140px] h-[140px] overflow-hidden">
            <img 
              src={StudentSprite.src} 
              alt="Learner Mascot" 
              className="h-[140px] max-w-none role-sprite-anim block"
              style={{ width: "calc(140px * 5)" }}
            />
          </div>

          <div>
            <p className="text-[2rem] font-medium tracking-tight text-[#1a1c1e] leading-snug">
              One last step,
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              verify your email.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Click the link in your inbox to activate your account.
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-5">

          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Almost done
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Check your email
            </h1>
            <p className="text-[14px] text-[#44474f] mt-1.5 leading-relaxed">
              We sent a verification link to <br/>
              <span className="font-semibold" style={{ color: PRIMARY }}>{email}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-[16px] bg-[#ffffff] border border-[#e1e2ec] my-1">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: PRIMARY_LIGHT }}>
              <EnvelopeSimple size={24} color={PRIMARY} weight="duotone" />
            </div>
            <p className="text-[13px] text-[#44474f] leading-relaxed">
              Click the link in the email to verify your account, then tap <strong className="font-semibold text-[#1a1c1e]">Continue</strong> below.
            </p>
          </div>

          {/* resend with countdown */}
          <div className="flex items-center">
            {canResend ? (
              <button onClick={handleResend} className="text-[13px] font-medium flex items-center gap-1.5 transition-opacity hover:opacity-80" style={{ color: PRIMARY }}>
                <ArrowsClockwise size={16} weight="bold" />
                Resend verification email
              </button>
            ) : (
              <p className="text-[13px] text-[#6b6f7a]">
                Didn't receive it? Resend in <span className="font-semibold tabular-nums" style={{ color: PRIMARY }}>00:{countdown.toString().padStart(2, "0")}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => router.push("/register/learner/source")}
              className={`group w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90 cursor-pointer`}
              style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
            >
              Continue
              <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 group-hover:translate-x-1`} />
            </button>

            <button
              onClick={() => router.back()}
              className="w-full h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#f4f4f8]"
              style={{ border: "1.5px solid #e4e4ec", color: "#6b6f7a" }}
            >
              Change email address
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

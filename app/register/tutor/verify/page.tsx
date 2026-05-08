"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple } from "@phosphor-icons/react";
import LeftPanel from "@/app/components/LeftPanel";

const PRIMARY       = "#e07b2a";
const PRIMARY_LIGHT = "#fde8d8";

export default function TutorVerifyPage() {
  const router = useRouter();
  const email  = "you@example.com";
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown === 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  function handleResend() { setCountdown(30); setCanResend(false); }

  return (
    <div className="flex min-h-screen">

      <LeftPanel bg={PRIMARY_LIGHT} primary={PRIMARY} onPrimaryContainer="#2d1600"
        img="/about.png" line1="One last step," line2="verify your email."
        sub="Click the link in your inbox to activate your tutor account." />

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>Almost done</p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">Check your<br />email</h1>
            <p className="text-sm text-[#44474f] mt-1.5">We sent a verification link to</p>
            <p className="text-[13.5px] font-semibold mt-0.5" style={{ color: PRIMARY }}>{email}</p>
          </div>

          <div className="flex flex-col gap-3">
            <EnvelopeSimple size={36} color={PRIMARY} weight="duotone" />
            <p className="text-[12.5px] text-[#9a9aa8] leading-relaxed">
              Click the link in the email to verify your account, then tap Continue below.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canResend
              ? <button onClick={handleResend} className="text-[13px] font-medium flex items-center gap-1.5" style={{ color: PRIMARY }}>
                  <span className="material-symbols-rounded text-[15px]">refresh</span>Resend verification email
                </button>
              : <p className="text-[12.5px] text-[#9a9aa8]">Resend in <span className="font-semibold tabular-nums" style={{ color: PRIMARY }}>{countdown}s</span></p>
            }
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/onboard/tutor/about")}
              className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: PRIMARY, color: "#fff" }}
            >
              Continue
              <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ border: "1.5px solid #e4e4ec", color: "#6b6f7a" }}
            >
              <EnvelopeSimple size={16} />Change the email
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

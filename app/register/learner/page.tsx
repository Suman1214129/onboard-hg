"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, Phone, WarningCircle, CheckCircle } from "@phosphor-icons/react";
import LeftPanel from "@/app/components/LeftPanel";

const PRIMARY = "#2251cc";
const PRIMARY_LIGHT = "#dce6fb";
const WA_GREEN = "#128C7E";
const WA_BG = "#dcf5f0";

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v: string) { return /^\+?[\d\s\-]{8,15}$/.test(v); }

export default function LearnerRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({ email: false, phone: false });

  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(phone);
  const canSubmit = emailValid && phoneValid;

  const emailError = touched.email && email && !emailValid;
  const phoneError = touched.phone && phone && !phoneValid;

  function getOutline(val: string, valid: boolean, touchedField: boolean) {
    if (!val) return "2px solid transparent";
    if (touchedField && !valid) return "2px solid #e07b2a";
    if (valid) return `2px solid ${PRIMARY}`;
    return "2px solid transparent";
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left Panel ── */}
      <LeftPanel bg={PRIMARY_LIGHT} primary={PRIMARY} onPrimaryContainer="#001258"
        line1="Your journey starts" line2="right here."
        sub="Create your learner account in just a few steps." />

      {/* ── Right Panel ── */}
      <div className="w-1/2 bg-[#fafafa] flex items-center justify-center">
        <div className="w-full max-w-md px-10 flex flex-col gap-4">

          <div className="mb-2">
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color: PRIMARY }}>
              Create account
            </p>
            <h1 className="text-[1.75rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
              Let&apos;s get you<br />set up
            </h1>
            <p className="text-sm text-[#44474f] mt-1.5">Enter your email and phone to continue.</p>
          </div>

          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Email address</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: getOutline(email, emailValid, touched.email) }}
              >
                <EnvelopeSimple size={20} color={email && emailValid ? PRIMARY : "#8888aa"} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                {email && (emailValid
                  ? <CheckCircle size={18} color={PRIMARY} weight="fill" />
                  : touched.email && <WarningCircle size={18} color="#e07b2a" weight="fill" />
                )}
              </div>
              {emailError && <p className="text-[11.5px] text-[#e07b2a] flex items-center gap-1"><WarningCircle size={13} weight="fill" /> Enter a valid email address</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#44474f]">Phone number</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3.5 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: getOutline(phone, phoneValid, touched.phone) }}
              >
                <Phone size={20} color={phone && phoneValid ? PRIMARY : "#8888aa"} />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                {phone && (phoneValid
                  ? <CheckCircle size={18} color={PRIMARY} weight="fill" />
                  : touched.phone && <WarningCircle size={18} color="#e07b2a" weight="fill" />
                )}
              </div>
              {phoneError && <p className="text-[11.5px] text-[#e07b2a] flex items-center gap-1"><WarningCircle size={13} weight="fill" /> Enter a valid phone number</p>}

              <div className="flex items-center gap-2.5 px-4 py-3 rounded-[14px] mt-1" style={{ backgroundColor: WA_BG }}>
                <span className="material-symbols-rounded text-[17px]" style={{ color: WA_GREEN }}>chat</span>
                <p className="text-[12px] flex-1" style={{ color: WA_GREEN }}>OTP will be sent via <span className="font-semibold">WhatsApp</span></p>
                <span className="material-symbols-rounded text-[17px]" style={{ color: WA_GREEN }}>check_circle</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => canSubmit && router.push("/register/learner/otp")}
            className="w-full py-2.5 rounded-full text-[14px] font-medium tracking-[0.00625em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
            style={{ backgroundColor: canSubmit ? PRIMARY : `${PRIMARY}40`, color: "#fff", cursor: canSubmit ? "pointer" : "not-allowed" }}
          >
            Send OTP
            <span className="material-symbols-rounded text-[18px]">arrow_forward</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e1e2ec]" />
            <span className="text-xs text-[#44474f]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ec]" />
          </div>

          <p className="text-center text-sm text-[#44474f]">
            Already have an account?{" "}
            <span onClick={() => router.push("/login")} className="font-medium cursor-pointer hover:underline" style={{ color: PRIMARY }}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

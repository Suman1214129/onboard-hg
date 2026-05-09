"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeSimple, Phone, WarningCircle, CheckCircle, WhatsappLogo, ArrowRight, Lock, Eye, EyeSlash, Ticket, ChatCircleText, User } from "@phosphor-icons/react";
import TeacherSprite from "../../../assets/teacher.png";

const PRIMARY = "#e07b2a";
const PRIMARY_LIGHT = "#fce4d2";
const WA_GREEN = "#128C7E";
const WA_BG = "#dcf5f0";

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidPhone(v: string) { return /^\+?[\d\s\-]{8,15}$/.test(v); }

export default function TeacherRegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [showPw, setShowPw] = useState(false);
  
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !otpVerified) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, otpVerified]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setCountdown(30);
  };

  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(phone);
  
  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0 && emailValid && phoneValid && otpVerified && password.length >= 6;

  const emailError = touched.email && email && !emailValid;
  const phoneError = touched.phone && phone && !phoneValid;

  function getOutline(val: string, valid: boolean, touchedField: boolean) {
    if (!val) return "2px solid transparent";
    if (touchedField && !valid) return "2px solid #e07b2a"; // error color
    if (valid) return `2px solid ${PRIMARY}`;
    return "2px solid transparent";
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
              Inspire the
            </p>
            <p className="text-[2.2rem] font-bold tracking-tight italic leading-snug text-[#e07b2a] pb-1">
              next generation.
            </p>
          </div>

          <p className="text-[14px] leading-relaxed max-w-[240px] text-[#44474f] font-medium">
            Create your tutor account in just a few steps.
          </p>
        </div>
      </div>

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
            <p className="text-sm text-[#44474f] mt-1.5">Fill in the details below to create your account.</p>
          </div>

          <div className="flex flex-col gap-3">

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#44474f]">First name</label>
                <div className="flex items-center gap-2 rounded-[16px] px-4 py-3 bg-[#f4f4f8] transition-all duration-200" style={{ outline: firstName.trim() ? `2px solid ${PRIMARY}` : "2px solid transparent" }}>
                  <User size={18} color={firstName.trim() ? PRIMARY : "#8888aa"} />
                  <input
                    type="text"
                    placeholder="Rahul"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] min-w-0"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-[#44474f]">Last name</label>
                <div className="flex items-center gap-2 rounded-[16px] px-4 py-3 bg-[#f4f4f8] transition-all duration-200" style={{ outline: lastName.trim() ? `2px solid ${PRIMARY}` : "2px solid transparent" }}>
                  <input
                    type="text"
                    placeholder="Verma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f]">Email address</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3 transition-all duration-200"
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
                  : touched.email && <WarningCircle size={18} color="#ba1a1a" weight="fill" />
                )}
              </div>
              {emailError && <p className="text-[11.5px] text-[#ba1a1a] flex items-center gap-1"><WarningCircle size={13} weight="fill" /> Enter a valid email address</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-[#44474f]">Phone number</label>
                {otpVerified && <span className="text-[11px] font-bold text-white bg-[#128C7E] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle weight="bold" size={12}/> Verified</span>}
              </div>
              <div
                className="relative flex items-center gap-3 rounded-[16px] pl-4 pr-2 py-2 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: getOutline(phone, phoneValid, touched.phone) }}
              >
                <Phone size={20} color={phone && phoneValid ? PRIMARY : "#8888aa"} />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                     setPhone(e.target.value);
                     if (otpSent && !otpVerified) { setOtpSent(false); setOtp(""); setCountdown(0); }
                  }}
                  onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                  disabled={otpVerified}
                  className="flex-1 bg-transparent py-1.5 text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8] disabled:opacity-50"
                />
                
                {phoneValid && !otpVerified && !otpSent && (
                  <button 
                    onClick={handleSendOtp} 
                    className="absolute right-2 px-4 py-2 rounded-full text-[12px] font-bold text-white transition-all active:scale-95 hover:opacity-90" 
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Send OTP
                  </button>
                )}
                {otpSent && !otpVerified && (
                  <button 
                    onClick={() => countdown === 0 && handleSendOtp()} 
                    disabled={countdown > 0}
                    className={`absolute right-4 text-[11px] font-bold transition-all ${countdown > 0 ? "text-[#8888aa] cursor-default" : "hover:underline cursor-pointer"}`} 
                    style={countdown === 0 ? { color: PRIMARY } : {}}
                  >
                    {countdown > 0 ? `Resend in 00:${countdown.toString().padStart(2, '0')}` : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>

            {/* OTP Field (Conditionally Rendered) */}
            {otpSent && !otpVerified && (
              <div className="flex flex-col gap-2 mt-1 mb-1 animate-in fade-in slide-in-from-top-2 duration-400">
                <div className="flex items-center justify-between">
                   <label className="text-[12px] font-medium text-[#44474f]">Enter 6-digit code</label>
                   <button className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] transition-all hover:bg-[#d1f4ec] border border-transparent hover:border-[#128C7E]/20" style={{ backgroundColor: WA_BG }}>
                     <WhatsappLogo size={14} weight="fill" color={WA_GREEN} />
                     <span className="text-[10.5px] font-bold tracking-[0.02em]" style={{ color: WA_GREEN }}>Get via WhatsApp</span>
                   </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 rounded-[16px] px-4 py-3 transition-colors duration-200 bg-white border border-[#e1e2ec] focus-within:border-[#e07b2a] focus-within:ring-2 focus-within:ring-[#e07b2a]/10">
                    <ChatCircleText size={20} color={PRIMARY} weight="duotone" />
                    <input
                      type="text"
                      placeholder="• • • • • •"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 w-full bg-transparent text-[16px] font-bold tracking-[0.3em] text-[#1a1c1e] outline-none placeholder:text-[#c4c6d0] placeholder:tracking-[0.2em] placeholder:font-medium"
                    />
                  </div>
                  <button 
                    onClick={() => { if(otp.length === 6) setOtpVerified(true); }}
                    className={`h-[48px] px-6 rounded-[16px] text-[13px] font-bold transition-all ${otp.length === 6 ? "opacity-100 text-white cursor-pointer active:scale-95" : "opacity-50 text-[#8888aa] bg-[#f4f4f8] cursor-not-allowed border border-[#e1e2ec]"}`}
                    style={otp.length === 6 ? { backgroundColor: PRIMARY } : {}}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f]">Create Password</label>
              <div
                className="flex items-center gap-3 rounded-[16px] px-4 py-3 transition-all duration-200"
                style={{ backgroundColor: "#f4f4f8", outline: password.length >= 6 ? `2px solid ${PRIMARY}` : "2px solid transparent" }}
              >
                <Lock size={20} color={password.length >= 6 ? PRIMARY : "#8888aa"} />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] outline-none placeholder:text-[#9a9aa8]"
                />
                <button onClick={() => setShowPw(!showPw)} type="button">
                  {showPw ? <EyeSlash size={20} color="#8888aa" /> : <Eye size={20} color="#8888aa" />}
                </button>
              </div>
            </div>

            {/* Referral Code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-[#44474f] flex justify-between">
                Referral Code <span className="text-[10px] bg-[#f4f4f8] px-2 py-0.5 rounded-full text-[#8888aa]">Optional</span>
              </label>
              <div className="flex items-center gap-3 rounded-[16px] px-4 py-3 bg-[#f4f4f8] transition-all duration-200 focus-within:outline focus-within:outline-2 focus-within:outline-[#e07b2a]">
                <Ticket size={20} color="#8888aa" />
                <input
                  type="text"
                  placeholder="e.g. HOMEGURU50"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-[#1a1c1e] uppercase outline-none placeholder:text-[#9a9aa8] placeholder:capitalize"
                />
              </div>
            </div>

          </div>

          <button
            onClick={() => {
              if (canSubmit) {
                sessionStorage.setItem('hg_firstName', firstName.trim());
                sessionStorage.setItem('hg_lastName', lastName.trim());
                sessionStorage.setItem('hg_email', email.trim());
                router.push("/register/tutor/verify");
              }
            }}
            className={`group w-full h-[44px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 mt-2 flex items-center justify-center gap-2 ${
              canSubmit ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: PRIMARY, color: "#ffffff" }}
            disabled={!canSubmit}
          >
            Create Account
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${canSubmit ? "group-hover:translate-x-1" : ""}`} />
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


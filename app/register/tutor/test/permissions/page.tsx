"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Desktop, Camera, CheckCircle } from "@phosphor-icons/react";

const PRIMARY = "#e07b2a";

export default function TutorPermissionsPage() {
  const router = useRouter();
  
  const [cameraGranted, setCameraGranted] = useState(false);
  const [screenGranted, setScreenGranted] = useState(false);
  
  const [cameraError, setCameraError] = useState(false);
  const [screenError, setScreenError] = useState(false);

  const requestCamera = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // Stop the stream immediately, we only need to verify permission is granted
      stream.getTracks().forEach(track => track.stop());
      setCameraGranted(true);
    } catch (err) {
      console.error("Camera permission denied", err);
      setCameraError(true);
    }
  };

  const requestScreen = async () => {
    try {
      setScreenError(false);
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setScreenGranted(true);
    } catch (err) {
      console.error("Screen permission denied", err);
      setScreenError(true);
    }
  };

  const allGranted = cameraGranted && screenGranted;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center relative overflow-hidden">
      {/* Background Subtle Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e07b2a] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2251cc] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full max-w-[600px] px-8 py-6 flex items-center justify-between z-10">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <Image src="/logo.png" alt="HomeGuru Logo" width={110} height={34} priority />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[600px] px-8 py-10 flex flex-col z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[2.25rem] font-bold tracking-tight text-[#1a1c1e] leading-snug">
            Grant Permissions
          </h1>
          <p className="text-[15px] text-[#44474f] mt-2 leading-relaxed">
            We need screen recording and camera access for proctoring.
          </p>
        </div>

        {/* Permission Cards */}
        <div className="flex flex-col gap-4">
          
          {/* Screen Recording */}
          <div className="flex flex-col gap-1">
            <div className={`flex items-center justify-between p-5 rounded-[16px] border bg-[#ffffff] transition-all duration-300 ${screenGranted ? "border-[#e07b2a] " : "border-[#e1e2ec]"}`}>
              <div className="flex items-center gap-4">
                <Desktop size={24} weight={screenGranted ? "duotone" : "regular"} color={screenGranted ? PRIMARY : "#8888aa"} className="shrink-0" />
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-[#1a1c1e] leading-tight">Screen Recording</h3>
                  <p className="text-[13px] text-[#8888aa] mt-0.5">Required for verification</p>
                </div>
              </div>
              
              {screenGranted ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fce4d2]">
                  <CheckCircle size={16} weight="fill" color={PRIMARY} />
                  <span className="text-[12px] font-bold" style={{ color: PRIMARY }}>Granted</span>
                </div>
              ) : (
                <button
                  onClick={requestScreen}
                  className="h-[32px] px-5 rounded-full text-[13px] font-bold tracking-[0.1px] transition-all duration-300 active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: "#1a1c1e", color: "#ffffff" }}
                >
                  Allow
                </button>
              )}
            </div>
            {screenError && <p className="text-[12px] text-red-500 font-medium px-2">Screen access was denied. Please allow it in your browser settings.</p>}
          </div>

          {/* Camera & Mic */}
          <div className="flex flex-col gap-1">
            <div className={`flex items-center justify-between p-5 rounded-[16px] border bg-[#ffffff] transition-all duration-300 ${cameraGranted ? "border-[#e07b2a] " : "border-[#e1e2ec]"}`}>
              <div className="flex items-center gap-4">
                <Camera size={24} weight={cameraGranted ? "duotone" : "regular"} color={cameraGranted ? PRIMARY : "#8888aa"} className="shrink-0" />
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-[#1a1c1e] leading-tight">Camera & Microphone</h3>
                  <p className="text-[13px] text-[#8888aa] mt-0.5">Required for identity verification</p>
                </div>
              </div>
              
              {cameraGranted ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fce4d2]">
                  <CheckCircle size={16} weight="fill" color={PRIMARY} />
                  <span className="text-[12px] font-bold" style={{ color: PRIMARY }}>Granted</span>
                </div>
              ) : (
                <button
                  onClick={requestCamera}
                  className="h-[32px] px-5 rounded-full text-[13px] font-bold tracking-[0.1px] transition-all duration-300 active:scale-[0.98] hover:opacity-90"
                  style={{ backgroundColor: "#1a1c1e", color: "#ffffff" }}
                >
                  Allow
                </button>
              )}
            </div>
            {cameraError && <p className="text-[12px] text-red-500 font-medium px-2">Camera access was denied. Please allow it in your browser settings.</p>}
          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-10">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[14px] font-medium text-[#8888aa] hover:text-[#1a1c1e] transition-colors">
            <ArrowLeft size={18} weight="bold" />
            Back
          </button>

          <button
            onClick={() => allGranted && router.push("/register/tutor/test/ready")} // Assuming test interface is next
            disabled={!allGranted}
            className={`group px-8 h-[40px] rounded-full text-[14px] font-medium tracking-[0.1px] transition-all duration-500 flex items-center justify-center gap-2 ${
              allGranted ? "active:scale-[0.98] hover:opacity-90 cursor-pointer" : "opacity-50 cursor-not-allowed bg-[#e1e2ec] text-[#8888aa]"
            }`}
            style={allGranted ? { backgroundColor: PRIMARY, color: "#ffffff" } : {}}
          >
            Next
            <ArrowRight size={18} weight="bold" className={`transition-transform duration-300 ${allGranted ? "group-hover:translate-x-1" : ""}`} />
          </button>
        </div>

      </div>
    </div>
  );
}


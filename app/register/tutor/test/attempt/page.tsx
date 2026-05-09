"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { WarningCircle, CheckCircle, ArrowRight, ArrowLeft, Clock, Flag, Code, PencilSimpleLine, ListChecks } from "@phosphor-icons/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const PRIMARY = "#e07b2a";

const PASSAGE = "Rohan is a Class 11 student preparing for JEE Advanced. He has been your student for 5 months. In the first 3 months, his Physics scores improved from 28% to 61% in mock tests. However, over the last 2 months, despite attending all sessions and completing every assignment, his scores have stagnated between 58–62%. You analyse his last 4 mock papers carefully. You notice: (1) He solves straightforward application problems correctly 85% of the time. (2) He consistently fails multi-concept problems that require combining two or more chapters. (3) His time per question has increased by 40% compared to 3 months ago, suggesting he is second-guessing himself. (4) He scores full marks in chapter-end tests you conduct but drops sharply in full-length mocks. His JEE Advanced attempt is in 6 months.";

type Question = { id: number; tag: string; type: "mcq" | "written" | "code"; passage?: string; q: string; options?: string[]; starterCode?: string; language?: string };

const MOCK_QUESTIONS: Question[] = [
  { id: 1, tag: "ANALYTICAL REASONING", type: "mcq", passage: PASSAGE, q: "Which of the following most accurately identifies the root cause of the plateau AND prescribes the most targeted intervention?", options: [
    "Increase session frequency from 3 to 5 days per week and assign 30% more problems.",
    "Introduce weekly \"bridge problems\" that explicitly require combining 2–3 chapters, as he has learned concepts in isolation.",
    "Drill on speed through timed 10-question sprints until his pace returns to the earlier level.",
    "Refer to a counsellor and give easier mocks to rebuild confidence before returning to JEE-level difficulty."
  ]},
  { id: 2, tag: "PEDAGOGY", type: "mcq", q: "A student consistently makes sign errors in algebra. The best remediation is:", options: [
    "Make them redo the same worksheet until they get it right",
    "Identify the specific misconception causing sign errors and address it with targeted exercises",
    "Move on to the next topic and revisit algebra later",
    "Assign extra homework across all algebra topics"
  ]},
  { id: 3, tag: "COMMUNICATION", type: "written", q: "A parent emails you concerned that their child is not improving despite attending all your sessions for 2 months. Draft a professional, empathetic response that addresses their concern and outlines your plan." },
  { id: 4, tag: "SUBJECT KNOWLEDGE", type: "mcq", q: "In a constructivist classroom, the teacher's primary role is:", options: [
    "Deliver information through direct instruction",
    "Facilitate discovery and guide students to construct their own understanding",
    "Strictly follow the textbook curriculum without deviation",
    "Assign maximum practice problems for rote learning"
  ]},
  { id: 5, tag: "CODING PROFICIENCY", type: "code", q: "Write a function that takes an array of student scores and returns an object with the average, highest, and lowest scores.", starterCode: "function analyzeScores(scores) {\n  // Your code here\n  \n}", language: "javascript" },
  { id: 6, tag: "CLASSROOM MANAGEMENT", type: "mcq", q: "During an online session, a student is visibly distracted and not responding to questions. The best approach is:", options: [
    "Ignore the behavior and continue teaching",
    "Call out the student publicly to regain attention",
    "Pause, gently check in privately, and re-engage with an interactive question",
    "End the session early as a consequence"
  ]},
  { id: 7, tag: "CRITICAL THINKING", type: "written", q: "Describe a situation where you had to adapt your teaching method mid-lesson because the student was not grasping the concept. What was the concept, what did you change, and what was the outcome?" },
  { id: 8, tag: "CODING PROFICIENCY", type: "code", q: "Write a function that groups students by their grade (A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60) given an array of {name, score} objects.", starterCode: "function groupByGrade(students) {\n  // Your code here\n  \n}", language: "javascript" },
  { id: 9, tag: "ASSESSMENT DESIGN", type: "mcq", q: "Bloom's Taxonomy arranges cognitive skills in order. Which represents the highest-order thinking?", options: ["Remembering", "Applying", "Analyzing", "Creating"] },
  { id: 10, tag: "ETHICS", type: "written", q: "A student asks you to help them complete a graded school assignment during your tutoring session. How do you handle this ethically while maintaining the student's trust?" }
];

export default function TutorTestAttemptPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [warnings, setWarnings] = useState(0);
  const [alertModal, setAlertModal] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });
  const [submitModal, setSubmitModal] = useState(false);
  const [dateStr, setDateStr] = useState("");
  const [camError, setCamError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const question = MOCK_QUESTIONS[currentIdx];
  const isLast = currentIdx === MOCK_QUESTIONS.length - 1;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => { setDateStr(new Date().toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" })); }, []);

  // Fullscreen
  useEffect(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) { el.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {}); }
    const onFsChange = () => { setIsFullscreen(!!document.fullscreenElement); };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Camera
  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240, facingMode: "user" }, audio: false });
        if (cancelled) { s.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch { setCamError(true); }
    }
    start();
    return () => { cancelled = true; streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  const submitTest = useCallback((forced = false) => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (document.fullscreenElement) document.exitFullscreen?.();
    sessionStorage.setItem("test_status", forced ? "forced" : "completed");
    router.push("/register/tutor/test/submitted");
  }, [router]);

  const handleViolation = useCallback((reason: string) => {
    setWarnings(prev => {
      const next = prev + 1;
      if (next >= 3) { submitTest(true); }
      else { setAlertModal({ msg: `Warning ${next}/3 — ${reason}. Repeated violations will auto-submit your test.`, visible: true }); }
      return next;
    });
  }, [submitTest]);

  // Security
  useEffect(() => {
    const onVis = () => { if (document.hidden) handleViolation("Tab switching detected"); };
    const onBlur = () => handleViolation("Window lost focus");
    const onCtx = (e: Event) => e.preventDefault();
    const onCopy = (e: Event) => { e.preventDefault(); handleViolation("Copying is not allowed"); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") { e.preventDefault(); handleViolation("Screenshots are prohibited"); }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["s","S","i","I"].includes(e.key)) { e.preventDefault(); handleViolation("Prohibited shortcut detected"); }
      if ((e.ctrlKey || e.metaKey) && ["c","C","p","P"].includes(e.key) && question.type !== "code") { e.preventDefault(); handleViolation("Prohibited shortcut detected"); }
      if (e.key === "F12") { e.preventDefault(); handleViolation("Developer tools are not allowed"); }
      if (e.key === "Escape" && isFullscreen) { handleViolation("Exiting fullscreen is not allowed"); }
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", onBlur);
    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("copy", onCopy);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("visibilitychange", onVis); window.removeEventListener("blur", onBlur); document.removeEventListener("contextmenu", onCtx); document.removeEventListener("copy", onCopy); window.removeEventListener("keydown", onKey); };
  }, [handleViolation, isFullscreen, question.type]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) { submitTest(false); return; }
    const t = setInterval(() => setTimeLeft(l => l - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, submitTest]);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
  const toggleFlag = () => setFlagged(prev => { const n = new Set(prev); n.has(question.id) ? n.delete(question.id) : n.add(question.id); return n; });
  const typeIcon = (t: string) => t === "code" ? <Code size={14} weight="bold" /> : t === "written" ? <PencilSimpleLine size={14} weight="bold" /> : <ListChecks size={14} weight="bold" />;

  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden text-[#1a1c1e] select-none">
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none z-[9998] overflow-hidden opacity-[0.03]">
        <div className="absolute inset-[-50%] flex flex-wrap items-center justify-center gap-[120px] -rotate-12">
          {Array.from({ length: 200 }).map((_, i) => <span key={i} className="text-[24px] font-bold text-[#1a1c1e] whitespace-nowrap">HomeGuru — {dateStr}</span>)}
        </div>
      </div>

      {/* Alert Modal */}
      {alertModal.visible && (
        <div className="fixed inset-0 z-[99999] bg-[#1a1c1e]/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-[24px] p-8 flex flex-col items-center text-center">
            <WarningCircle size={48} weight="duotone" color="#ba1a1a" className="mb-4" />
            <h2 className="text-[20px] font-bold text-[#1a1c1e] mb-2">Proctoring Alert</h2>
            <p className="text-[15px] text-[#44474f] leading-relaxed mb-8">{alertModal.msg}</p>
            <button onClick={() => setAlertModal({ msg: "", visible: false })} className="w-full h-[40px] rounded-full text-[14px] font-medium flex items-center justify-center bg-[#1a1c1e] text-white hover:bg-[#44474f] transition-colors">Acknowledge & Continue</button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {submitModal && (
        <div className="fixed inset-0 z-[99999] bg-[#1a1c1e]/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-[24px] p-8 flex flex-col items-center text-center">
            <CheckCircle size={48} weight="duotone" color={PRIMARY} className="mb-4" />
            <h2 className="text-[20px] font-bold text-[#1a1c1e] mb-2">Submit Assessment?</h2>
            <p className="text-[15px] text-[#44474f] leading-relaxed mb-2">You have answered <strong>{answeredCount}</strong> of <strong>{MOCK_QUESTIONS.length}</strong> questions.</p>
            {flagged.size > 0 && <p className="text-[13px] text-[#e07b2a] font-medium mb-4">{flagged.size} question(s) flagged for review</p>}
            {answeredCount < MOCK_QUESTIONS.length && <p className="text-[13px] text-[#ba1a1a] font-medium mb-4">{MOCK_QUESTIONS.length - answeredCount} unanswered question(s) will be marked as skipped</p>}
            <div className="flex gap-3 w-full mt-4">
              <button onClick={() => setSubmitModal(false)} className="flex-1 h-[40px] rounded-full text-[14px] font-medium border border-[#e1e2ec] text-[#44474f] hover:bg-[#f4f4f8] transition-colors">Review Again</button>
              <button onClick={() => submitTest(false)} className="flex-1 h-[40px] rounded-full text-[14px] font-medium text-white transition-colors" style={{ backgroundColor: PRIMARY }}>Confirm Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="h-[56px] border-b border-[#e1e2ec] flex items-center justify-between px-8 bg-white z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={100} height={30} />
          <div className="w-px h-5 bg-[#e1e2ec]" />
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#44474f]">Teaching Assessment</span>
          {warnings > 0 && <span className="text-[11px] font-bold text-[#ba1a1a] bg-[#fff8f8] px-2 py-0.5 rounded-full border border-[#ba1a1a]/20">{warnings}/3 warnings</span>}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-[#8888aa]">{answeredCount}/{MOCK_QUESTIONS.length}</span>
            <div className="w-[100px] h-1.5 bg-[#f4f4f8] rounded-full overflow-hidden">
              <div className="h-full bg-[#e07b2a] transition-all duration-500" style={{ width: `${(answeredCount / MOCK_QUESTIONS.length) * 100}%` }} />
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${timeLeft < 120 ? "border-[#ba1a1a] bg-[#fff8f8] text-[#ba1a1a]" : "border-transparent text-[#1a1c1e]"}`}>
            <Clock size={14} weight={timeLeft < 120 ? "fill" : "regular"} />
            <span className="text-[18px] font-bold tabular-nums">{fmt(timeLeft)}</span>
          </div>
          <button onClick={() => setSubmitModal(true)} className="text-[12px] font-bold px-4 h-[32px] rounded-full border border-[#e1e2ec] text-[#44474f] hover:bg-[#f4f4f8] transition-colors">End Test</button>
        </div>
      </div>

      {/* Question Nav */}
      <div className="h-[48px] border-b border-[#e1e2ec] flex items-center px-8 gap-1.5 bg-[#fafafa] z-10 overflow-x-auto shrink-0">
        {MOCK_QUESTIONS.map((q, idx) => {
          const isActive = currentIdx === idx;
          const isAnswered = !!answers[q.id];
          const isFlagged = flagged.has(q.id);
          return (
            <button key={q.id} onClick={() => setCurrentIdx(idx)}
              className={`w-8 h-8 rounded-[6px] flex items-center justify-center text-[12px] font-bold transition-all relative ${
                isActive ? "bg-[#1a1c1e] text-white" : isAnswered ? "bg-[#fce4d2] text-[#e07b2a]" : "bg-white text-[#44474f] border border-[#e1e2ec] hover:border-[#c4c6d0]"
              }`}>
              {idx + 1}
              {isFlagged && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border border-white" />}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Left Panel */}
        <div className="w-1/2 h-full overflow-y-auto border-r border-[#e1e2ec] bg-white p-8 custom-scrollbar">
          <div className="flex items-center gap-2 mb-5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f4f8] text-[#1a1c1e] text-[10px] font-bold tracking-[0.1em] uppercase rounded-[4px]">
              {typeIcon(question.type)} {question.tag}
            </span>
            <span className="text-[12px] text-[#8888aa] font-medium">Q{currentIdx + 1} of {MOCK_QUESTIONS.length}</span>
            <button onClick={toggleFlag} className={`ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${flagged.has(question.id) ? "bg-[#fff8f8] text-[#ba1a1a] border border-[#ba1a1a]/20" : "bg-[#f4f4f8] text-[#8888aa] hover:text-[#44474f]"}`}>
              <Flag size={12} weight={flagged.has(question.id) ? "fill" : "regular"} /> {flagged.has(question.id) ? "Flagged" : "Flag"}
            </button>
          </div>
          {question.passage && <div className="text-[14px] leading-[1.75] text-[#44474f] mb-8">{question.passage}</div>}
          <div className={`${question.passage ? "bg-[#fafafa] border border-[#e1e2ec] rounded-[16px] p-5" : ""}`}>
            {question.passage && <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#e07b2a] mb-2 block">Question</span>}
            <p className="text-[15px] font-medium text-[#1a1c1e] leading-snug">{question.q}</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 h-full bg-[#fafafa] relative flex flex-col z-10">
          <div className="flex-1 overflow-y-auto p-8 flex flex-col custom-scrollbar pb-28">
            {question.type === "mcq" && (
              <>
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8888aa] mb-5">Select the best answer</span>
                <div className="flex flex-col gap-3">
                  {question.options?.map((opt, i) => {
                    const L = ["A","B","C","D"][i];
                    const sel = answers[question.id] === opt;
                    return (
                      <button key={i} onClick={() => setAnswers(p => ({ ...p, [question.id]: opt }))}
                        className={`flex items-start gap-3 p-4 rounded-[14px] border transition-all duration-300 text-left ${sel ? "border-[#e07b2a] bg-[#fffcf9]" : "border-[#e1e2ec] bg-white hover:border-[#c4c6d0]"}`}>
                        <div className={`w-7 h-7 rounded-[6px] flex items-center justify-center shrink-0 text-[12px] font-bold transition-colors ${sel ? "border-[#e07b2a] border text-[#e07b2a]" : "border border-[#e1e2ec] text-[#8888aa]"}`}>{L}</div>
                        <span className={`text-[13px] leading-[1.6] ${sel ? "font-medium text-[#1a1c1e]" : "text-[#44474f]"}`}>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            {question.type === "written" && (
              <>
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8888aa] mb-5">Write your response</span>
                <textarea value={answers[question.id] || ""} onChange={e => setAnswers(p => ({ ...p, [question.id]: e.target.value }))}
                  placeholder="Type your detailed answer here..."
                  className="flex-1 min-h-[280px] p-5 rounded-[16px] border border-[#e1e2ec] bg-white text-[14px] text-[#1a1c1e] outline-none transition-all focus:border-[#e07b2a] resize-none leading-relaxed placeholder:text-[#9a9aa8]" />
                <div className="flex justify-end mt-2">
                  <span className="text-[11px] text-[#8888aa]">{(answers[question.id] || "").split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </>
            )}
            {question.type === "code" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#8888aa]">Code Editor</span>
                  <span className="text-[11px] font-medium text-[#8888aa] bg-[#f4f4f8] px-2.5 py-1 rounded-full uppercase">{question.language}</span>
                </div>
                <div className="flex-1 min-h-[320px] rounded-[16px] overflow-hidden border border-[#e1e2ec] bg-[#1e1e1e]">
                  <MonacoEditor height="100%" defaultLanguage={question.language || "javascript"} theme="vs-dark"
                    value={answers[question.id] || question.starterCode || ""}
                    onChange={(v) => setAnswers(p => ({ ...p, [question.id]: v || "" }))}
                    options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: "on", scrollBeyondLastLine: false, padding: { top: 16 }, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", automaticLayout: true, tabSize: 2, wordWrap: "on" }} />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent px-8 flex items-center justify-between z-20">
            <button onClick={() => setCurrentIdx(c => Math.max(0, c - 1))} disabled={currentIdx === 0}
              className={`flex items-center gap-1.5 text-[13px] font-medium bg-white px-4 py-2 rounded-full border border-transparent hover:border-[#e1e2ec] transition-colors ${currentIdx === 0 ? "text-[#c4c6d0] cursor-not-allowed opacity-50" : "text-[#8888aa] hover:text-[#1a1c1e]"}`}>
              <ArrowLeft size={16} weight="bold" /> Back
            </button>
            {!isLast ? (
              <button onClick={() => setCurrentIdx(c => Math.min(MOCK_QUESTIONS.length - 1, c + 1))}
                className="group h-[40px] px-6 rounded-full text-[13px] font-medium flex items-center justify-center gap-2 border border-[#e1e2ec] bg-white text-[#1a1c1e] hover:bg-[#f4f4f8] transition-colors">
                Next Question <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button onClick={() => setSubmitModal(true)} className="group h-[40px] px-6 rounded-full text-[13px] font-medium flex items-center justify-center gap-2 transition-colors" style={{ backgroundColor: PRIMARY, color: "#fff" }}>
                Submit Test <CheckCircle size={16} weight="bold" />
              </button>
            )}
          </div>

          {/* Camera */}
          <div className="absolute bottom-20 right-8 w-[160px] h-[120px] bg-[#1a1c1e] rounded-[12px] overflow-hidden border border-[#44474f] z-50">
            {camError ? <div className="absolute inset-0 flex items-center justify-center"><span className="text-[10px] text-[#8888aa]">Camera unavailable</span></div>
            : <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />}
            <div className="absolute top-2 left-2 bg-[#ba1a1a] px-1.5 py-0.5 rounded-[3px] flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[9px] font-bold text-white tracking-[0.1em]">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dce0ea; border-radius: 10px; }
      `}</style>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Star,
  Video,
  Phone,
  BadgeCheck,
  Play,
} from 'lucide-react';

export interface WaMessage {
  sender: 'student' | 'mentor';
  text: string;
  formula?: {
    label: string;
    eq: string;
    hint: string;
  };
  voiceNote?: string;
  time: string;
  typingDuration: number;
  pauseAfter: number;
}

const SIAM_CONVERSATION: WaMessage[] = [
  {
    sender: 'student',
    text: 'Assalamu Alaikum Siam bhaiya! Calculus er integration by parts ta ektu bujhiye diben? Kal college-e quiz 😢',
    time: '9:30 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Walaikum Assalam Tanvir! Ekdom chinta koro na, LIATE rule ta follow korlei 2 line-e solve hoye jabe 👇',
    formula: {
      label: 'Formula Card • Integration by Parts',
      eq: '∫ u dv = u·v − ∫ v du',
      hint: 'Priority: L (Log) → I (Inverse) → A (Algebra) → T (Trig) → E (Exp)',
    },
    time: '9:30 PM',
    typingDuration: 1150,
    pauseAfter: 520,
  },
  {
    sender: 'student',
    text: "Bhaiya ∫ x·eˣ dx er khetre kon ta 'u' dhorbo ar kon ta 'dv'?",
    time: '9:31 PM',
    typingDuration: 800,
    pauseAfter: 400,
  },
  {
    sender: 'mentor',
    text: "LIATE dekho: 'x' holo Algebraic (A), ar 'eˣ' holo Exponential (E). Tai u = x ar dv = eˣ dx!",
    time: '9:31 PM',
    typingDuration: 1000,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Ohh! Tahole answer ki x·eˣ − eˣ + C ashe? Nijeke diye korlam ekhon!',
    time: '9:32 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: '100% accurate Tanvir! 👏 Darun korecho. Shortcut ta nicher voice note-e bole dilam:',
    voiceNote: "0:42 • Siam's Calculus voice note",
    time: '9:32 PM',
    typingDuration: 1100,
    pauseAfter: 550,
  },
  {
    sender: 'student',
    text: 'Voice note ta shune pura concept crystal clear hoye gelo bhaiya! 🙌',
    time: '9:33 PM',
    typingDuration: 800,
    pauseAfter: 400,
  },
  {
    sender: 'student',
    text: 'Bhaiya definite integral er limit change korar somoy ki upper-lower limit o substitute korte hoy?',
    time: '9:33 PM',
    typingDuration: 900,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Exactly! Variable x theke z-e nile limit-o z er respect-e change korbe. Tahole last-e ar x bosate hoy na.',
    time: '9:34 PM',
    typingDuration: 1050,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Accha bhaiya, ∫₀^(π/2) sin³x dx er BUET admission shortcut ta ki?',
    time: '9:34 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: "Wallis's Theorem! Nicher formula card ta save kore rakho, MCQ-te 5 second-e uttor ber hobe ⚡",
    formula: {
      label: "BUET Admission Hack • Wallis's Formula",
      eq: '∫₀^(π/2) sinⁿx dx = [(n−1)(n−3)...] / [n(n−2)...] × K',
      hint: 'K = π/2 if n is even, K = 1 if n is odd (for n=3 → 2/3)',
    },
    time: '9:35 PM',
    typingDuration: 1150,
    pauseAfter: 550,
  },
  {
    sender: 'student',
    text: '2/3 ekdom 5 second-e ber hoye gelo! Eta to magic bhaiya 🤯',
    time: '9:35 PM',
    typingDuration: 800,
    pauseAfter: 420,
  },
  {
    sender: 'student',
    text: 'Bhaiya Physics Vector er river-boat shortest path math-e angle α kivabe dhorbo?',
    time: '9:36 PM',
    typingDuration: 900,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Khata-y choto ekta right triangle eke nao! Nicher formula card ta dekho 👇',
    formula: {
      label: 'Physics Vector • Shortest Path Across River',
      eq: 'cos α = −(u / v)   &   t = d / (v·sin α)',
      hint: 'u = river current velocity, v = boat velocity (v > u)',
    },
    time: '9:36 PM',
    typingDuration: 1150,
    pauseAfter: 520,
  },
  {
    sender: 'student',
    text: 'Ar jodi minimum time-e nodi par hote bole tahole α koto hobe?',
    time: '9:37 PM',
    typingDuration: 800,
    pauseAfter: 400,
  },
  {
    sender: 'mentor',
    text: 'Minimum time-er jonno sojasuji 90° angle-e rona dite hobe (α = 90°), tokhon t_min = d / v!',
    time: '9:37 PM',
    typingDuration: 1000,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Board er 3 ta creative math ekhoni milaye fellam! Age egulo dekhe bhoy lagto 😅',
    time: '9:38 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Concept bujhle HSC Math ar Physics duitai onek mojar. Amar practice sheet er 15 ta math korcho?',
    time: '9:38 PM',
    typingDuration: 1000,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: '12 ta done bhaiya! Baki 3 ta aaj rate sesh kore WhatsApp-e photo pathabo.',
    time: '9:39 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Shabash! Pathao, ami check kore feedback diye dibo.',
    time: '9:39 PM',
    typingDuration: 900,
    pauseAfter: 420,
  },
  {
    sender: 'student',
    text: 'Bhaiya Organic Chemistry-te Alkene theke Alcohol bananor reagent ta ektu mone koraye diben?',
    time: '9:40 PM',
    typingDuration: 900,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Dilute H₂SO₄ ar heat dile Markovnikov rule onujayi alcohol hoye jabe! Nicher audio-te trick ta dilam:',
    voiceNote: '0:35 • Organic reagent memory hack',
    time: '9:40 PM',
    typingDuration: 1100,
    pauseAfter: 520,
  },
  {
    sender: 'student',
    text: 'Noted bhaiya! Ammu pashe boshe chilo, bollo apnar bujhanor style naki khub shundor 😊',
    time: '9:41 PM',
    typingDuration: 900,
    pauseAfter: 450,
  },
  {
    sender: 'mentor',
    text: 'Aunty-ke amar salam dio! Tomra bhalo korlei amader mentor der shobcheye boro shanti.',
    time: '9:41 PM',
    typingDuration: 1050,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Ji bhaiya, salam diyechi. Kal er batch-e ki Projectile Motion start hobe?',
    time: '9:42 PM',
    typingDuration: 850,
    pauseAfter: 420,
  },
  {
    sender: 'mentor',
    text: 'Hyan, kal rat 8 tay Zoom-e Projectile Motion zero theke BUET standard porjonto shuru korbo.',
    time: '9:42 PM',
    typingDuration: 1000,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Ami age thekei formula sheet ta revise kore rakhbo.',
    time: '9:43 PM',
    typingDuration: 800,
    pauseAfter: 400,
  },
  {
    sender: 'mentor',
    text: 'Anytime! Ekhon baki 3 ta math sesh kore ghumiye poro, kal quiz-e best of luck 👍',
    time: '9:43 PM',
    typingDuration: 950,
    pauseAfter: 450,
  },
  {
    sender: 'student',
    text: 'Thank you so much Siam bhaiya! Best mentor ever 🙏',
    time: '9:44 PM',
    typingDuration: 800,
    pauseAfter: 400,
  },
  {
    sender: 'mentor',
    text: 'InshaAllah kal dekha hocche Tanvir! Allah Hafiz ✨',
    time: '9:44 PM',
    typingDuration: 900,
    pauseAfter: 3200,
  },
];

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [subjectQuery, setSubjectQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('All');

  // WhatsApp simulation state
  const [displayedMessages, setDisplayedMessages] = useState<WaMessage[]>([]);
  const [activeTyping, setActiveTyping] = useState<'student' | 'mentor' | null>(null);
  const [isFading, setIsFading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;
    let timerId: NodeJS.Timeout | null = null;
    let activeResolve: (() => void) | null = null;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        if (isCancelled) {
          resolve();
          return;
        }
        activeResolve = resolve;
        timerId = setTimeout(() => {
          activeResolve = null;
          timerId = null;
          resolve();
        }, ms);
      });

    const runSimulationLoop = async () => {
      while (!isCancelled) {
        setDisplayedMessages([]);
        setActiveTyping(null);
        setIsFading(false);
        await wait(600);

        for (let i = 0; i < SIAM_CONVERSATION.length; i++) {
          if (isCancelled) break;
          const msg = SIAM_CONVERSATION[i];

          // Trigger typing indicator
          setActiveTyping(msg.sender);
          setTimeout(scrollToBottom, 50);
          await wait(msg.typingDuration);
          if (isCancelled) break;

          // Push message
          setActiveTyping(null);
          setDisplayedMessages((prev) => [...prev, msg]);
          setTimeout(scrollToBottom, 60);

          // Pause after message
          await wait(msg.pauseAfter);
          if (isCancelled) break;
        }

        if (isCancelled) break;

        // Pause at the end of the loop, then fade out and restart
        await wait(2800);
        if (isCancelled) break;

        setIsFading(true);
        await wait(600);
      }
    };

    runSimulationLoop();

    return () => {
      isCancelled = true;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (activeResolve) {
        activeResolve();
        activeResolve = null;
      }
    };
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (subjectQuery.trim()) params.set('search', subjectQuery.trim());
    if (locationQuery && locationQuery.toLowerCase() !== 'all') {
      const normalizedMode =
        locationQuery.toLowerCase() === 'online' ? 'Online' : 'Offline';
      params.set('mode', normalizedMode);
    }
    router.push(`/tuitions?${params.toString()}`);
  };

  const quickFilterTag = (tag: string) => {
    setSubjectQuery(tag);
    router.push(`/tuitions?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Emotional Hook & Search Dock */}
          <div className="lg:col-span-6 space-y-7">
            {/* Pill Badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-terracotta-50 dark:bg-terracotta-950/30 border border-terracotta-500/20 text-terracotta-600 dark:text-terracotta-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse"></span>
              Bangladesh&apos;s #1 Teacher-Student Mentorship Hub
            </div>

            {/* H1 Headline with Curved Amber Underline SVG */}
            <h1
              id="heroHeadline"
              className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-bold text-forest-900 dark:text-[#F5F2EB] leading-[1.12] tracking-tight"
            >
              <span className="line-mask"><span className="line-inner">More Than Tuition.</span></span>
              <span className="line-mask">
                <span className="line-inner">
                  Build a{' '}
                  <span className="italic text-terracotta-500 relative inline-block">
                    Mentorship Bond
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-amberwarm-500/60"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 9.5C55 2.5 145 2.5 198 9.5"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="line-mask"><span className="line-inner">That Shapes Futures.</span></span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base sm:text-lg text-forest-800/80 dark:text-[#F5F2EB]/80 max-w-xl leading-relaxed font-medium">
              Connect directly with caring, verified mentors from{' '}
              <strong className="text-forest-900 dark:text-white">BUET, DMC, and DU</strong>. No middleman commissions—just
              authentic 1-on-1 guidance and small-group batches where every student is heard.
            </p>

            {/* Interactive Search Dock */}
            <div className="hero-cta-group bg-white dark:bg-[#0F241E] p-3 rounded-3xl shadow-soft border border-forest-900/10 dark:border-white/10 max-w-xl">
              <form onSubmit={handleHeroSearch} className="grid sm:grid-cols-12 gap-2.5 items-center">
                <div className="sm:col-span-5 flex items-center gap-2.5 px-3.5 py-2.5 bg-cream dark:bg-[#153028] rounded-2xl">
                  <Search className="w-5 h-5 text-terracotta-500 shrink-0" />
                  <input
                    id="heroSubjectInput"
                    type="text"
                    value={subjectQuery}
                    onChange={(e) => setSubjectQuery(e.target.value)}
                    placeholder="Subject (e.g. HSC Physics)"
                    className="bg-transparent w-full text-sm font-semibold text-forest-900 dark:text-white placeholder-forest-800/40 dark:placeholder-white/40 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-cream dark:bg-[#153028] rounded-2xl">
                  <MapPin className="w-5 h-5 text-forest-600 dark:text-emerald-400 shrink-0" />
                  <select
                    id="heroLocationSelect"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="bg-transparent w-full text-sm font-semibold text-forest-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="dark:bg-[#0F241E]">Online &amp; Dhaka</option>
                    <option value="Offline" className="dark:bg-[#0F241E]">Dhanmondi / Uttara</option>
                    <option value="Online" className="dark:bg-[#0F241E]">Online (Zoom/Discord)</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition-all shadow-glow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Find Mentor</span>
                  </button>
                </div>
              </form>

              {/* Quick Popular Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 px-2 text-xs font-semibold text-forest-800/60 dark:text-white/60">
                <span>Popular:</span>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Higher Math')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-terracotta-100 hover:text-terracotta-600 dark:hover:bg-terracotta-500/20 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
                >
                  HSC Higher Math
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Biology')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-terracotta-100 hover:text-terracotta-600 dark:hover:bg-terracotta-500/20 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
                >
                  Medical Biology
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('IELTS')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-terracotta-100 hover:text-terracotta-600 dark:hover:bg-terracotta-500/20 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
                >
                  IELTS 7.5+
                </button>
                <button
                  type="button"
                  onClick={() => quickFilterTag('Next.js')}
                  className="px-2.5 py-1 rounded-full bg-cream dark:bg-[#153028] hover:bg-terracotta-100 hover:text-terracotta-600 dark:hover:bg-terracotta-500/20 dark:hover:text-terracotta-400 transition-colors cursor-pointer"
                >
                  Web &amp; Coding
                </button>
              </div>
            </div>

            {/* Social Proof Avatars */}
            <div className="hero-social flex flex-wrap items-center gap-5 pt-1">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Student"
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Mentor"
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  alt="Mentor"
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] object-cover"
                />
                <div className="w-11 h-11 rounded-full border-2 border-white dark:border-[#0F241E] bg-forest-900 text-white text-xs font-bold flex items-center justify-center">
                  1.5k+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amberwarm-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-forest-900 dark:text-white font-bold text-sm ml-1">
                    4.9/5
                  </span>
                </div>
                <p className="text-xs font-semibold text-forest-800/70 dark:text-white/70">
                  Trusted by <span className="font-bold text-forest-900 dark:text-white">1,200+</span> Students &amp;{' '}
                  <span className="font-bold text-forest-900 dark:text-white">350+</span> Verified Mentors
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 30-Message WhatsApp Hands-Off Infinite Loop */}
          <div className="lg:col-span-6 relative">
            <div
              id="heroChatShowcase"
              className="relative mx-auto max-w-md lg:max-w-lg rounded-[2.25rem] overflow-hidden shadow-wa border-4 border-white dark:border-[#1F2C34] bg-wa-bg dark:bg-[#0B141A] flex flex-col"
            >
              {/* WhatsApp Top Header */}
              <div className="bg-wa-header dark:bg-wa-dark text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Siam BUET CSE"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-wa-green border-2 border-wa-header"></span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-white truncate">Siam</h3>
                      <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-emerald-200 shrink-0">
                        BUET CSE
                      </span>
                      <BadgeCheck className="w-4 h-4 text-wa-blue shrink-0" />
                    </div>
                    <p
                      id="waMentorStatus"
                      className={`text-[11px] truncate transition-colors ${
                        activeTyping === 'mentor' ? 'text-wa-green font-bold' : 'text-emerald-200'
                      }`}
                    >
                      {activeTyping === 'mentor' ? 'Siam • typing...' : 'Siam • BUET CSE • online'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    id="waMsgCounter"
                    className="px-2.5 py-1 rounded-full bg-black/20 text-[10px] font-bold text-white/90"
                  >
                    {displayedMessages.length > 0 ? displayedMessages.length : 1} / 30
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Scrollable WhatsApp Conversation Body */}
              <div
                ref={chatBodyRef}
                id="waChatBody"
                className={`wa-wallpaper wa-scroll h-[495px] overflow-y-auto px-4 py-4 space-y-3 transition-opacity duration-500 ${
                  isFading ? 'opacity-15' : 'opacity-100'
                }`}
              >
                {/* Topic Date Pill */}
                <div className="flex justify-center">
                  <span
                    id="waTopicPill"
                    className="px-3 py-1 rounded-lg bg-[#D9FDD3] dark:bg-[#005C4B]/60 text-forest-900 dark:text-emerald-100 text-[10px] font-extrabold uppercase tracking-wider shadow-xs"
                  >
                    TODAY • HSC HIGHER MATH, PHYSICS &amp; ADMISSION MENTORSHIP
                  </span>
                </div>

                {/* Encryption / Zero Commission Notice */}
                <div className="flex justify-center">
                  <span className="px-3.5 py-1.5 rounded-xl bg-[#FFF3C4] dark:bg-amberwarm-500/20 text-forest-900/80 dark:text-amberwarm-100 text-[10.5px] font-semibold text-center max-w-[90%] shadow-xs">
                    🔒 Direct student-mentor WhatsApp bond • <strong>0% middleman commission</strong>
                  </span>
                </div>

                {/* Dynamic Messages Container */}
                <div id="waMessagesList" className="space-y-3">
                  {displayedMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`wa-msg-animate flex flex-col ${
                        msg.sender === 'student' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {msg.sender === 'student' ? (
                        <div className="bg-wa-outgoing dark:bg-[#005C4B] text-forest-900 dark:text-[#E9EDEF] rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[85%] shadow-xs">
                          <p className="text-[12.5px] leading-snug font-medium">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[9.5px] text-forest-900/55 dark:text-white/60">
                              {msg.time}
                            </span>
                            <span className="text-[11px] font-extrabold text-wa-blue leading-none">
                              ✓✓
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-[#1F2C34] text-forest-900 dark:text-[#E9EDEF] rounded-2xl rounded-tl-xs px-3.5 py-2.5 max-w-[88%] shadow-xs">
                          <p className="text-[12.5px] leading-snug font-medium">{msg.text}</p>
                          {msg.formula && (
                            <div className="mt-2 p-2.5 rounded-xl bg-forest-900 text-white border border-forest-800">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amberwarm-500 block">
                                {msg.formula.label}
                              </span>
                              <p className="font-mono text-xs font-bold text-emerald-300 mt-1">
                                {msg.formula.eq}
                              </p>
                              <p className="text-[10px] text-white/75 mt-1">
                                {msg.formula.hint}
                              </p>
                            </div>
                          )}
                          {msg.voiceNote && (
                            <div className="mt-2 px-2.5 py-2 rounded-xl bg-cream dark:bg-[#153028] border border-forest-900/10 dark:border-white/10 flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-wa-header text-white flex items-center justify-center shrink-0">
                                <Play className="w-3.5 h-3.5 fill-current" />
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center gap-0.5 h-3">
                                  <span className="w-1 h-2 bg-wa-header/60 rounded-full"></span>
                                  <span className="w-1 h-3 bg-wa-header rounded-full"></span>
                                  <span className="w-1 h-1.5 bg-wa-header/60 rounded-full"></span>
                                  <span className="w-1 h-3 bg-wa-header rounded-full"></span>
                                  <span className="w-1 h-2.5 bg-wa-header/80 rounded-full"></span>
                                  <span className="w-1 h-1.5 bg-wa-header/50 rounded-full"></span>
                                  <span className="w-1 h-3 bg-wa-header rounded-full"></span>
                                  <span className="w-1 h-2 bg-wa-header/70 rounded-full"></span>
                                  <span className="w-1 h-2.5 bg-wa-header rounded-full"></span>
                                  <span className="w-1 h-1.5 bg-wa-header/40 rounded-full"></span>
                                </div>
                                <span className="text-[9.5px] font-bold text-forest-800/65 dark:text-emerald-300 block mt-0.5">
                                  {msg.voiceNote}
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-end mt-1">
                            <span className="text-[9.5px] text-forest-900/50 dark:text-white/50">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Student Typing Bubble */}
                {activeTyping === 'student' && (
                  <div className="flex flex-col items-end">
                    <div className="bg-wa-outgoing dark:bg-[#005C4B] text-forest-900 dark:text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-xs inline-flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-forest-800/70 dark:text-white/70 mr-1">
                        Tanvir
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-800/60 dark:bg-white/60 wa-dot-1"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-800/60 dark:bg-white/60 wa-dot-2"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-800/60 dark:bg-white/60 wa-dot-3"></span>
                    </div>
                  </div>
                )}

                {/* Mentor Typing Bubble */}
                {activeTyping === 'mentor' && (
                  <div className="flex flex-col items-start">
                    <div className="bg-white dark:bg-[#1F2C34] text-forest-900 dark:text-white rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs inline-flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-wa-header dark:text-emerald-400 mr-1">
                        Siam
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-wa-header/70 dark:bg-emerald-400/70 wa-dot-1"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-wa-header/70 dark:bg-emerald-400/70 wa-dot-2"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-wa-header/70 dark:bg-emerald-400/70 wa-dot-3"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Read-Only Live Preview Indicator Bar */}
              <div className="bg-white/95 dark:bg-[#0F241E] px-4 py-2.5 border-t border-forest-900/10 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-forest-800/75 dark:text-white/75">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-wa-green animate-ping"></span>
                  Live 1-on-1 Mentorship Preview • Direct WhatsApp Support
                </span>
                <span className="text-terracotta-500">Auto-Loop</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

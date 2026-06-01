"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Shield,
  TrendingUp,
  Clock,
  Users,
  ChevronRight,
  Menu,
  X,
  Lock,
  Wallet,
  Headphones,
  ArrowRight,
  CheckCircle,
  UserPlus,
  CreditCard,
  Search,
  RefreshCw,
  Smile,
  Phone,
  Mail,
  MapPin,
  Star,
  Globe,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}

interface Step {
  icon: React.ElementType;
  label: string;
  num: string;
}

interface Service {
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
}

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = [
  "Home",
  "About",
  "Services",
  "How It Works",
  "Contact",
];

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Escrow = Zero Worries",
    desc: "Your NGN is locked safely before any FX moves. Sleep easy.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Rates That Don't Play Games",
    desc: "Once an ad is created, the rate stays locked. No surprises.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Clock,
    title: "24-Hour Fresh Marketplace",
    desc: "Ads expire after 24 hours, keeping rates fresh and fair.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Users,
    title: "Community-Powered",
    desc: "Built for everyday people by everyday people.",
    color: "bg-blue-50 text-blue-700",
  },
];

const STEPS: Step[] = [
  { icon: UserPlus, label: "Create an Account", num: "01" },
  { icon: CreditCard, label: "Complete KYC", num: "02" },
  { icon: Search, label: "Browse or Create FX Ad", num: "03" },
  { icon: Lock, label: "Lock NGN in Escrow", num: "04" },
  { icon: RefreshCw, label: "Exchange FX Confidently", num: "05" },
  { icon: Smile, label: "Complete & Smile", num: "06" },
];

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Peer-to-Peer FX Marketplace",
    desc: "Buy or sell foreign currency directly with real people — no middlemen, no markup.",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    desc: "Your NGN is locked safely before any FX is released. Fully transparent.",
  },
  {
    icon: Wallet,
    title: "Secure Wallet",
    desc: "Your personal BCDees wallet holds your NGN for trades and seamless refunds.",
  },
  {
    icon: Headphones,
    title: "Support & Dispute Resolution",
    desc: "Our friendly support team is always here to guide you through every trade.",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(
  threshold: number = 0.15,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]: IntersectionObserverEntry[]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Animation Wrappers ───────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ScaleIn({ children, delay = 0, className = "" }: ScaleInProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.92)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BCDeesLanding() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("Home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track scroll progress + active section
  useEffect(() => {
    const onScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 20);

      // Detect active section
      const sectionIds: string[] = [
        "home",
        "about",
        "services",
        "how-it-works",
        "contact",
      ];
      let current = "Home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100) {
            const label = NAV_LINKS.find(
              (l) => l.toLowerCase().replace(/ /g, "-") === id,
            );
            if (label) current = label;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const goToContact = (): void => scrollTo("Contact");

  const [heroRef, heroIn] = useInView(0.1);

  const contactItems: ContactItem[] = [
    {
      icon: MapPin,
      label: "Address",
      value: "20 Aso Rock St, Abule Ijoko, Ogun State, Nigeria",
      href: null,
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@bcdees.com",
      href: "mailto:info@bcdees.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 803 411 5756",
      href: "tel:+2348034115756",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body, #__next { font-family: 'DM Sans', sans-serif; }
        html { scroll-behavior: smooth; }

        /* ── Custom scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EFF6FF; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2563EB, #0ea5e9);
          border-radius: 999px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #1d4ed8; }
        * { scrollbar-width: thin; scrollbar-color: #2563EB #EFF6FF; }

        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(37,99,235,0.12);
        }
        .btn-primary {
          background: linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%);
          transition: all 0.25s ease;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.35);
        }
        .nav-link-active { color: #2563EB; font-weight: 600; }

        /* ── Scroll pill ── */
        @keyframes pillFadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .scroll-pill {
          animation: pillFadeIn 0.3s ease forwards;
        }
      `}</style>

      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Active Section Pill ── */}
      {scrolled && (
        <div className="scroll-pill fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 items-end">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="flex items-center gap-2 group"
              title={link}
            >
              {/* label pill — visible only for active */}
              <span
                className="text-xs font-500 px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  background:
                    activeSection === link
                      ? "#2563EB"
                      : "rgba(255,255,255,0.85)",
                  color: activeSection === link ? "#fff" : "#6b7280",
                  border:
                    activeSection === link
                      ? "1px solid #2563EB"
                      : "1px solid #e5e7eb",
                  opacity: activeSection === link ? 1 : 0,
                  transform:
                    activeSection === link
                      ? "translateX(0)"
                      : "translateX(8px)",
                  pointerEvents: "none",
                  backdropFilter: "blur(6px)",
                  fontSize: "11px",
                }}
              >
                {link}
              </span>
              {/* dot */}
              <span
                className="transition-all duration-300 rounded-full"
                style={{
                  width: activeSection === link ? "10px" : "7px",
                  height: activeSection === link ? "10px" : "7px",
                  background: activeSection === link ? "#2563EB" : "#CBD5E1",
                  boxShadow:
                    activeSection === link
                      ? "0 0 0 3px rgba(37,99,235,0.2)"
                      : "none",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #EFF6FF" : "none",
          boxShadow: scrolled ? "0 2px 16px rgba(37,99,235,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("Home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5 shadow-sm">
              <Image
                src="/logo.png"
                alt="BCDees Logo"
                width={28}
                height={28}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <span
              className="text-xl tracking-tight"
              style={{ fontWeight: 700 }}
            >
              <span className="text-blue-600">BC</span>
              <span className="text-gray-900">Dees</span>
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 ${
                  activeSection === l
                    ? "nav-link-active bg-blue-50"
                    : "text-gray-600"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={goToContact}
              className="btn-primary px-5 py-2 text-sm text-white rounded-xl"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} className="text-blue-600" />
            ) : (
              <Menu size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div className="px-4 pb-4 pt-2 bg-white border-t border-blue-50 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`px-4 py-3 rounded-xl text-sm text-left transition-all duration-200 ${
                  activeSection === l
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={{ fontWeight: activeSection === l ? 600 : 400 }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={goToContact}
              className="mt-2 py-2.5 text-sm text-white btn-primary rounded-xl"
              style={{ fontWeight: 600 }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{
          background:
            "linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 40%, #EFF6FF 100%)",
        }}
      >
        <div className="hero-blob w-96 h-96 bg-blue-400 top-10 right-10" />
        <div className="hero-blob w-80 h-80 bg-indigo-400 bottom-20 left-5" />
        <div className="hero-blob w-64 h-64 bg-sky-300 top-40 left-1/3" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Badge */}
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-200 text-blue-700 text-sm mb-6"
              style={{ fontWeight: 500 }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Nigeria&apos;s Safest FX Community
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
            }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6"
              style={{ fontWeight: 700, lineHeight: "1.1" }}
            >
              Smart, Simple &amp;
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #2563EB, #0ea5e9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Safe FX Trading
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
            }}
          >
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Welcome to BCDees — a community of real people connecting,
              trading, and winning together. Fair rates, friendly trading, and
              escrow-secured peace of mind.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
            }}
          >
            <button
              onClick={goToContact}
              className="btn-primary px-8 py-4 text-base text-white rounded-2xl flex items-center gap-2 w-full sm:w-auto justify-center"
              style={{ fontWeight: 600 }}
            >
              Start Trading <ArrowRight size={18} />
            </button>
            <button
              onClick={goToContact}
              className="px-8 py-4 text-base text-blue-700 bg-white border-2 border-blue-200 rounded-2xl hover:border-blue-400 transition-all w-full sm:w-auto"
              style={{ fontWeight: 500 }}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
            style={{
              opacity: heroIn ? 1 : 0,
              transition: "opacity 0.7s ease 0.7s",
            }}
          >
            {(
              [
                ["10K+", "Active Traders"],
                ["₦0", "Lost to Fraud"],
                ["24/7", "Marketplace"],
              ] as [string, string][]
            ).map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <p
                  className="text-2xl sm:text-3xl text-blue-600"
                  style={{ fontWeight: 700 }}
                >
                  {val}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE LOVE ── */}
      <section
        id="why-people-love-trading-on-bcdees"
        className="py-20 sm:py-28 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center mb-16">
            <p
              className="text-blue-600 text-sm uppercase tracking-widest mb-3"
              style={{ fontWeight: 600 }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4"
              style={{ fontWeight: 700 }}
            >
              Why People Love Trading on BCDees
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              No stress. No fear. No funny business. Just honest, secure
              currency exchange.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <ScaleIn key={f.title} delay={i * 0.1}>
                <div className="card-hover p-7 rounded-2xl border border-gray-100 bg-white h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}
                  >
                    <f.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3
                    className="text-gray-900 text-base mb-2"
                    style={{ fontWeight: 600 }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-20 sm:py-28"
        style={{
          background: "linear-gradient(180deg, #F8FAFF 0%, #EFF6FF 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center mb-16">
            <p
              className="text-blue-600 text-sm uppercase tracking-widest mb-3"
              style={{ fontWeight: 600 }}
            >
              Simple Process
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4"
              style={{ fontWeight: 700 }}
            >
              How It Works
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Six simple steps to your first safe trade.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center mb-4 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300 shadow-sm">
                      <s.icon
                        size={22}
                        className="text-blue-600"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center"
                      style={{ fontSize: "10px", fontWeight: 700 }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-700 leading-snug"
                    style={{ fontWeight: 500 }}
                  >
                    {s.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5} className="text-center mt-14">
            <button
              onClick={goToContact}
              className="btn-primary px-10 py-4 text-base text-white rounded-2xl inline-flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              Get Started Now <ChevronRight size={18} />
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <p
                className="text-blue-600 text-sm uppercase tracking-widest mb-4"
                style={{ fontWeight: 600 }}
              >
                About BCDees
              </p>
              <h2
                className="text-3xl sm:text-4xl text-gray-900 mb-6 leading-tight"
                style={{ fontWeight: 700 }}
              >
                Who We Are
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                BCDees Global is a community-driven FX platform for safe,
                simple, and stress-free currency exchange. We&apos;re building a
                trusted community where everyone can trade confidently.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our mission is simple: make foreign exchange accessible, safe,
                and transparent for every Nigerian. No gatekeepers. No hidden
                fees. Just real people trading fairly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-blue-600 shrink-0" />
                  <span className="text-gray-600 text-sm">
                    100% transparent trades
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-blue-600 shrink-0" />
                  <span className="text-gray-600 text-sm">
                    KYC-verified community
                  </span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <h3
                    className="text-xl mb-6 flex items-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Lock size={20} />
                    Our Secret Sauce: Escrow
                  </h3>
                  <div className="space-y-5">
                    {[
                      "Your NGN is securely locked before any FX is sent",
                      "No one can lose money when they follow the process",
                      "Every trade is transparent and fair",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-300 fill-yellow-300"
                        />
                      ))}
                      <span className="text-blue-200 text-sm ml-1">
                        Trusted by thousands
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-blue-100 -z-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl bg-sky-100 -z-10" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="py-20 sm:py-28"
        style={{
          background: "linear-gradient(180deg, #F8FAFF 0%, white 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center mb-16">
            <p
              className="text-blue-600 text-sm uppercase tracking-widest mb-3"
              style={{ fontWeight: 600 }}
            >
              What We Offer
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4"
              style={{ fontWeight: 700 }}
            >
              Our Services
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Everything you need for confident currency exchange — in one
              place.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <ScaleIn key={s.title} delay={i * 0.1}>
                <div className="card-hover p-8 rounded-2xl border border-gray-100 bg-white h-full group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-colors duration-300">
                    <s.icon
                      size={22}
                      className="text-blue-600 group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.8}
                    />
                  </div>
                  <h3
                    className="text-gray-900 text-lg mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                  <div
                    className="mt-5 flex items-center gap-1 text-blue-600 text-sm group-hover:gap-2 transition-all duration-200"
                    style={{ fontWeight: 500 }}
                  >
                    Learn more <ChevronRight size={16} />
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <FadeUp>
          <div
            className="max-w-4xl mx-auto rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1d4ed8 0%, #2563EB 50%, #0ea5e9 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="hero-blob w-64 h-64 bg-white top-0 right-0 opacity-100" />
              <div className="hero-blob w-48 h-48 bg-white bottom-0 left-0 opacity-100" />
            </div>
            <div className="relative">
              <h2
                className="text-3xl sm:text-4xl text-white mb-4"
                style={{ fontWeight: 700 }}
              >
                Ready to Trade with Confidence?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of Nigerians who already trade smart, simple, and
                safe on BCDees.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={goToContact}
                  className="px-10 py-4 bg-white text-blue-700 rounded-2xl text-base hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg"
                  style={{ fontWeight: 600 }}
                >
                  Create Free Account
                </button>
                <button
                  onClick={goToContact}
                  className="px-10 py-4 border-2 border-white/40 text-white rounded-2xl text-base hover:bg-white/10 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  Browse Marketplace
                </button>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center mb-16">
            <p
              className="text-blue-600 text-sm uppercase tracking-widest mb-3"
              style={{ fontWeight: 600 }}
            >
              Get In Touch
            </p>
            <h2
              className="text-3xl sm:text-4xl text-gray-900 mb-4"
              style={{ fontWeight: 700 }}
            >
              Contact Us
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              We&apos;re real people too. Reach out anytime.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {contactItems.map((c, i) => (
              <ScaleIn key={c.label} delay={i * 0.1}>
                <div className="card-hover p-7 rounded-2xl border border-gray-100 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <c.icon
                      size={20}
                      className="text-blue-600"
                      strokeWidth={1.8}
                    />
                  </div>
                  <p
                    className="text-xs text-gray-400 uppercase tracking-wider mb-2"
                    style={{ fontWeight: 600 }}
                  >
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-gray-700 text-sm hover:text-blue-600 transition-colors leading-relaxed"
                      style={{ fontWeight: 500 }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {c.value}
                    </p>
                  )}
                </div>
              </ScaleIn>
            ))}
          </div>

          {/* Contact form card */}
          {/* <FadeUp delay={0.3} className="max-w-2xl mx-auto mt-12">
            <div className="rounded-3xl border border-gray-100 p-8 sm:p-10 bg-white shadow-sm">
              <h3
                className="text-xl text-gray-900 mb-6 text-center"
                style={{ fontWeight: 600 }}
              >
                Send Us a Message
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm text-gray-500 mb-1.5"
                    style={{ fontWeight: 500 }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm text-gray-500 mb-1.5"
                    style={{ fontWeight: 500 }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm text-gray-500 mb-1.5"
                  style={{ fontWeight: 500 }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
              <button
                className="btn-primary w-full py-3.5 text-white rounded-xl text-sm"
                style={{ fontWeight: 600 }}
              >
                Send Message
              </button>
            </div>
          </FadeUp> */}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center p-1.5">
                <Image
                  src="/logo.png"
                  alt="BCDees Logo"
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl text-white" style={{ fontWeight: 700 }}>
                <span className="text-blue-400">BC</span>Dees
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {l}
                </button>
              ))}
            </nav>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>
              © {new Date().getFullYear()} BCDees Global. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

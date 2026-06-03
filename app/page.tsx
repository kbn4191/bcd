"use client";
import { useState, useEffect, useRef, FC, ReactNode } from "react";
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
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Feature {
  icon: any;
  title: string;
  desc: string;
}

interface Step {
  icon: any;
  label: string;
  num: string;
}

interface Service {
  icon: any;
  title: string;
  desc: string;
}

interface Card {
  code: string;
  account: string;
  amount: string;
  iso: string;
  grad: [string, string];
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right";
}

interface FlagImgProps {
  iso: string;
  size?: number;
}

interface CurrencyCardProps {
  card: Card;
  style?: React.CSSProperties;
}

interface FlowStep {
  num: string;
  label: string;
  sub: string;
  icon: string;
  color: string;
}

const NAV = ["Home", "About", "Services", "How It Works", "Contact"];

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Escrow = Zero Worries",
    desc: "Your NGN is locked safely before any FX moves.",
  },
  {
    icon: TrendingUp,
    title: "Rates That Don't Play Games",
    desc: "Once an ad is created, the rate stays locked.",
  },
  {
    icon: Clock,
    title: "24-Hour Fresh Marketplace",
    desc: "Ads expire after 24 hours.",
  },
  {
    icon: Users,
    title: "Community-Powered",
    desc: "Built for everyday people.",
  },
];

const STEPS: Step[] = [
  { icon: UserPlus, label: "Create an Account", num: "01" },
  { icon: CreditCard, label: "Complete KYC", num: "02" },
  { icon: Search, label: "Browse or create an FX ad", num: "03" },
  { icon: Lock, label: "Lock NGN in escrow", num: "04" },
  { icon: RefreshCw, label: "Exchange FX confidently", num: "05" },
  { icon: Smile, label: "Complete your trade and smile", num: "06" },
];

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Peer-to-Peer FX Marketplace",
    desc: "Buy or sell foreign currency directly with real people — no middlemen.",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    desc: "Your NGN is locked safely before any FX is released.",
  },
  {
    icon: Wallet,
    title: "Secure Wallet",
    desc: "Your personal BCDees wallet holds your NGN for trades and refunds.",
  },
  {
    icon: Headphones,
    title: "Support & Dispute Resolution",
    desc: "Our friendly support team is here to guide you.",
  },
];

const CARDS: Card[] = [
  {
    code: "NGN",
    account: "NGN0958473843",
    amount: "₦23,000",
    iso: "ng",
    grad: ["#0f3460", "#16213e"],
  },
  {
    code: "CAD",
    account: "CAA0958473843",
    amount: "$56,500",
    iso: "ca",
    grad: ["#1e3a8a", "#1a4bbd"],
  },
  {
    code: "USD",
    account: "USD0847392011",
    amount: "$12,800",
    iso: "us",
    grad: ["#1a3060", "#0f2050"],
  },
  {
    code: "GBP",
    account: "GBP0392847561",
    amount: "£8,450",
    iso: "gb",
    grad: ["#152d5c", "#0e2040"],
  },
  {
    code: "EUR",
    account: "EUR0573920184",
    amount: "€9,200",
    iso: "eu",
    grad: ["#1e3a8a", "#152d6e"],
  },
  {
    code: "GHS",
    account: "GHS0293847102",
    amount: "₵18,000",
    iso: "gh",
    grad: ["#163a1a", "#0f2d14"],
  },
  {
    code: "AUD",
    account: "AUD0482910374",
    amount: "A$14,750",
    iso: "au",
    grad: ["#1a3060", "#0c2248"],
  },
  {
    code: "CNY",
    account: "CNY0847201938",
    amount: "¥92,000",
    iso: "cn",
    grad: ["#3a1010", "#2a0808"],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(
  threshold: number = 0.12,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
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

function Reveal({ children, delay = 0, dir = "up" }: RevealProps) {
  const [ref, inView] = useInView();
  const t = {
    up: "translateY(28px)",
    left: "translateX(-24px)",
    right: "translateX(24px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : t[dir] || t.up,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Flag image — uses country-flags CDN (unpkg), emoji fallback ──────────────
const FLAG_EMOJI = {
  ng: "🇳🇬",
  ca: "🇨🇦",
  us: "🇺🇸",
  gb: "🇬🇧",
  eu: "🇪🇺",
  gh: "🇬🇭",
  au: "🇦🇺",
  cn: "🇨🇳",
} as any;

function FlagImg({ iso, size = 40 }: FlagImgProps) {
  const [err, setErr] = useState<boolean>(false);
  const emoji = FLAG_EMOJI[iso] || "🏳️";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.22)",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.45)",
        flexShrink: 0,
        background: "rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {err ? (
        <span style={{ fontSize: size * 0.55, lineHeight: 1 }}>{emoji}</span>
      ) : (
        <img
          src={`https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/${iso}.svg`}
          alt={iso}
          onError={() => setErr(true)}
          style={{
            width: "130%",
            height: "130%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
}

// ─── Single currency card ──────────────────────────────────────────────────────
function CurrencyCard({ card, style = {} }: CurrencyCardProps) {
  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${card.grad[0]}, ${card.grad[1]})`,
        borderRadius: 18,
        padding: "20px 22px 24px",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Gloss */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "45%",
          background:
            "linear-gradient(180deg,rgba(255,255,255,0.07),transparent)",
          borderRadius: "18px 18px 0 0",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -35,
          right: 15,
          width: 65,
          height: 65,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
          pointerEvents: "none",
        }}
      />
      {/* Top: currency code + real flag */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 4,
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "0.03em",
            }}
          >
            {card.code}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(148,163,184,0.55)",
              marginTop: 3,
              letterSpacing: "0.02em",
            }}
          >
            {card.account}
          </div>
        </div>
        <FlagImg iso={card.iso} size={40} />
      </div>
      {/* Amount */}
      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.03em",
          marginTop: 18,
          position: "relative",
        }}
      >
        {card.amount}
      </div>
    </div>
  );
}

// ─── Phone with animated flipping cards ───────────────────────────────────────
function PhoneWithCards() {
  const [idx, setIdx] = useState<number>(0);
  const [flipping, setFlipping] = useState<boolean>(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % CARDS.length);
        setFlipping(false);
      }, 320);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const main = CARDS[idx];
  const left = CARDS[(idx + 1) % CARDS.length];
  const right = CARDS[(idx + 2) % CARDS.length];

  return (
    <div
      className="phone-wrap"
      style={{
        position: "relative",
        width: 480,
        height: 420,
        margin: "0 auto",
      }}
    >
      {/* Phone frame behind cards */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          zIndex: 1,
          width: 200,
          height: 360,
          background: "#0d1525",
          borderRadius: 38,
          border: "1.5px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            9:41
          </span>
          <div
            style={{
              width: 52,
              height: 10,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}
          />
          <div style={{ display: "flex", gap: 3 }}>
            {[3, 5, 7, 9].map((h) => (
              <div
                key={h}
                style={{
                  width: 3,
                  height: h,
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background:
              "linear-gradient(180deg,transparent,rgba(14,165,233,0.22),rgba(37,99,235,0.15))",
          }}
        />
      </div>

      {/* Left card — desktop only */}
      <div
        className="hide-m"
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          zIndex: 2,
          transform: "rotate(-7deg) scale(0.78)",
          transformOrigin: "bottom left",
          opacity: 0.65,
          transition: "all 0.5s ease",
        }}
      >
        <CurrencyCard card={left} style={{ minWidth: 180 }} />
      </div>

      {/* Right card — desktop only */}
      <div
        className="hide-m"
        style={{
          position: "absolute",
          top: 10,
          right: 0,
          zIndex: 3,
          transform: "rotate(5deg) scale(0.84)",
          transformOrigin: "top right",
          opacity: 0.75,
          transition: "all 0.5s ease",
        }}
      >
        <CurrencyCard card={right} style={{ minWidth: 190 }} />
      </div>

      {/* Main flipping card — always visible */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotateY(${flipping ? "90deg" : "0deg"})`,
          transition: "transform 0.32s cubic-bezier(.55,0,.45,1)",
          zIndex: 10,
          perspective: 1200,
        }}
      >
        <CurrencyCard
          card={main}
          style={{
            minWidth: 230,
            boxShadow:
              "0 24px 72px rgba(37,99,235,0.4), 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 20,
        }}
      >
        {CARDS.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 22 : 7,
              height: 7,
              borderRadius: 99,
              background: i === idx ? "#3b82f6" : "rgba(37,99,235,0.25)",
              transition: "all 0.4s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Feature card illustrations (animated SVGs per card) ─────────────────────

function IllustrationEscrow() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes vaultPulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
        @keyframes lockBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-3px)}60%{transform:translateY(1px)}}
        @keyframes shieldGlow{0%,100%{filter:drop-shadow(0 0 3px #3b82f6)}50%{filter:drop-shadow(0 0 9px #3b82f6)}}
        @keyframes coinFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
      `}</style>
      {/* Vault body */}
      <g style={{ animation: "vaultPulse 3s ease-in-out infinite" }}>
        <rect
          x="30"
          y="18"
          width="60"
          height="54"
          rx="8"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        <rect
          x="36"
          y="24"
          width="48"
          height="42"
          rx="5"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth=".5"
          opacity=".5"
        />
        {/* Dial */}
        <circle
          cx="60"
          cy="44"
          r="14"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        <circle
          cx="60"
          cy="44"
          r="9"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth=".5"
          opacity=".5"
        />
        <circle cx="60" cy="44" r="2.5" fill="#3b82f6" />
        <line
          x1="60"
          y1="44"
          x2="67"
          y2="38"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Handle */}
        <rect
          x="76"
          y="40"
          width="9"
          height="7"
          rx="3.5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        {/* Bolts */}
        {[
          [37, 26],
          [79, 26],
          [37, 62],
          [79, 62],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="none"
            stroke="#3b82f6"
            strokeWidth=".7"
            opacity=".5"
          />
        ))}
      </g>
      {/* NGN coins floating */}
      <g style={{ animation: "coinFloat 2.5s ease-in-out infinite" }}>
        <circle
          cx="16"
          cy="38"
          r="9"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="1"
        />
        <text
          x="16"
          y="42"
          textAnchor="middle"
          fontSize="7"
          fill="#60a5fa"
          fontWeight="700"
        >
          ₦
        </text>
      </g>
      <g style={{ animation: "coinFloat 2.5s ease-in-out infinite .6s" }}>
        <circle
          cx="104"
          cy="50"
          r="7"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="1"
        />
        <text
          x="104"
          y="54"
          textAnchor="middle"
          fontSize="6"
          fill="#60a5fa"
          fontWeight="700"
        >
          ₦
        </text>
      </g>
      {/* Lock icon top */}
      <g
        style={{
          animation: "lockBounce 2.5s ease-in-out infinite",
          transformOrigin: "60px 10px",
        }}
      >
        <rect x="54" y="8" width="12" height="10" rx="2" fill="#3b82f6" />
        <path
          d="M57 8 V5 A3 3 0 0 1 63 5 V8"
          stroke="#3b82f6"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="60" cy="13" r="1.5" fill="#fff" />
      </g>
    </svg>
  );
}

function IllustrationRates() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes chartGrow{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
        @keyframes dotPop{0%,100%{r:3;opacity:.6}50%{r:5;opacity:1}}
        @keyframes lockPop{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-40px)}}
      `}</style>
      {/* Chart background */}
      <rect
        x="10"
        y="12"
        width="100"
        height="60"
        rx="8"
        fill="#0f2554"
        stroke="#1e3a8a"
        strokeWidth="1"
      />
      {/* Grid lines */}
      {[28, 40, 52, 64].map((y, i) => (
        <line
          key={i}
          x1="18"
          y1={y}
          x2="102"
          y2={y}
          stroke="#1e3a8a"
          strokeWidth=".5"
          opacity=".7"
        />
      ))}
      {/* Chart line — animated draw */}
      <path
        d="M18 62 L35 50 L50 54 L65 36 L80 40 L95 24"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        style={{ animation: "chartGrow 2.5s ease forwards" }}
      />
      {/* Fill under line */}
      <path
        d="M18 62 L35 50 L50 54 L65 36 L80 40 L95 24 L95 72 L18 72Z"
        fill="url(#cg)"
        opacity=".2"
      />
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity=".8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Dots on line */}
      {[
        [35, 50],
        [65, 36],
        [95, 24],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="#60a5fa"
          style={{ animation: `dotPop 2s ease-in-out infinite ${i * 0.4}s` }}
        />
      ))}
      {/* Lock badge — rate locked */}
      <g
        style={{
          animation: "lockPop 2s ease-in-out infinite",
          transformOrigin: "95px 24px",
        }}
      >
        <circle cx="95" cy="24" r="8" fill="#2563EB" />
        <rect x="91.5" y="23" width="7" height="6" rx="1.5" fill="#fff" />
        <path
          d="M93 23 V21 A2 2 0 0 1 97 21 V23"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
      </g>
      {/* Label */}
      <rect x="20" y="18" width="32" height="10" rx="3" fill="#1e3a8a" />
      <text
        x="36"
        y="25.5"
        textAnchor="middle"
        fontSize="6"
        fill="#60a5fa"
        fontWeight="700"
      >
        RATE LOCKED
      </text>
    </svg>
  );
}

function IllustrationMarketplace() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes clockTick{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes adFade{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
        @keyframes badgePop{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
      `}</style>
      {/* Clock face */}
      <circle
        cx="38"
        cy="45"
        r="26"
        fill="#0f2554"
        stroke="#3b82f6"
        strokeWidth="1.2"
      />
      <circle
        cx="38"
        cy="45"
        r="20"
        fill="#1e3a8a"
        stroke="#3b82f6"
        strokeWidth=".5"
        opacity=".5"
      />
      <circle cx="38" cy="45" r="2.5" fill="#3b82f6" />
      {/* Hour hand */}
      <line
        x1="38"
        y1="45"
        x2="38"
        y2="30"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Minute hand — spinning */}
      <line
        x1="38"
        y1="45"
        x2="50"
        y2="42"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          animation: "clockTick 6s linear infinite",
          transformOrigin: "38px 45px",
        }}
      />
      {/* 24h badge */}
      <g style={{ animation: "badgePop 2s ease-in-out infinite" }}>
        <rect x="22" y="14" width="32" height="13" rx="6" fill="#2563EB" />
        <text
          x="38"
          y="23.5"
          textAnchor="middle"
          fontSize="8"
          fill="#fff"
          fontWeight="800"
        >
          24H
        </text>
      </g>
      {/* Ad cards stacking */}
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          style={{ animation: `adFade 2.4s ease-in-out infinite ${i * 0.5}s` }}
        >
          <rect
            x={72 + i * 2}
            y={28 + i * 14}
            width="40"
            height="16"
            rx="5"
            fill="#1e3a8a"
            stroke="#3b82f6"
            strokeWidth=".7"
            opacity={1 - i * 0.2}
          />
          <rect
            x={76 + i * 2}
            y={31 + i * 14}
            width="14"
            height="4"
            rx="2"
            fill="#3b82f6"
            opacity=".7"
          />
          <rect
            x={76 + i * 2}
            y={37 + i * 14}
            width="22"
            height="3"
            rx="1.5"
            fill="#60a5fa"
            opacity=".4"
          />
          <circle
            cx={102}
            cy={36 + i * 14}
            r="4"
            fill="#2563EB"
            opacity={0.7 - i * 0.1}
          />
        </g>
      ))}
    </svg>
  );
}

function IllustrationCommunity() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes personPop{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-4px) scale(1.05)}}
        @keyframes connLine{0%,100%{opacity:.3}50%{opacity:.9}}
        @keyframes badge2Pop{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
      `}</style>
      {/* Connection lines */}
      {[
        [60, 45, 25, 25],
        [60, 45, 95, 25],
        [60, 45, 20, 65],
        [60, 45, 100, 65],
        [60, 45, 60, 18],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#3b82f6"
          strokeWidth="1"
          opacity=".4"
          style={{ animation: `connLine 2s ease-in-out infinite ${i * 0.3}s` }}
        />
      ))}
      {/* Center person */}
      <g
        style={{
          animation: "personPop 2.5s ease-in-out infinite",
          transformOrigin: "60px 45px",
        }}
      >
        <circle cx="60" cy="38" r="10" fill="#2563EB" />
        <circle cx="60" cy="33" r="5" fill="#60a5fa" />
        <path
          d="M50 50 Q60 44 70 50"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      {/* Surrounding people */}
      {[
        [25, 25],
        [95, 25],
        [20, 65],
        [100, 65],
        [60, 18],
      ].map(([cx, cy], i) => (
        <g
          key={i}
          style={{
            animation: `personPop 2.5s ease-in-out infinite ${i * 0.35}s`,
            transformOrigin: `${cx}px ${cy}px`,
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r="7"
            fill="#1e3a8a"
            stroke="#3b82f6"
            strokeWidth="1"
          />
          <circle cx={cx} cy={cy - 3} r="3" fill="#60a5fa" opacity=".8" />
          <path
            d={`M${cx - 5} ${cy + 5} Q${cx} ${cy + 1} ${cx + 5} ${cy + 5}`}
            stroke="#60a5fa"
            strokeWidth="1"
            fill="none"
            opacity=".7"
          />
        </g>
      ))}
      {/* "People" badge */}
      <g style={{ animation: "badge2Pop 2s ease-in-out infinite .5s" }}>
        <rect x="38" y="72" width="44" height="14" rx="7" fill="#2563EB" />
        <text
          x="60"
          y="81.5"
          textAnchor="middle"
          fontSize="7"
          fill="#fff"
          fontWeight="700"
        >
          COMMUNITY
        </text>
      </g>
    </svg>
  );
}

const FEATURE_ILLUSTRATIONS = [
  IllustrationEscrow,
  IllustrationRates,
  IllustrationMarketplace,
  IllustrationCommunity,
];

// ─── Service SVG illustrations ────────────────────────────────────────────────

function SvcIllustrationP2P() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes p2pFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes p2pArrow{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}
        @keyframes p2pGlow{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes p2pCoinSpin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
      `}</style>
      {/* Left person */}
      <g style={{ animation: "p2pFloat 3s ease-in-out infinite" }}>
        <circle
          cx="36"
          cy="42"
          r="18"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        <circle cx="36" cy="36" r="8" fill="#60a5fa" opacity=".9" />
        <path
          d="M22 54 Q36 46 50 54"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          opacity=".9"
        />
        {/* NGN tag */}
        <rect x="18" y="66" width="36" height="14" rx="7" fill="#1e3a8a" />
        <text
          x="36"
          y="76.5"
          textAnchor="middle"
          fontSize="7.5"
          fill="#93c5fd"
          fontWeight="800"
        >
          ₦ NGN
        </text>
      </g>
      {/* Right person */}
      <g style={{ animation: "p2pFloat 3s ease-in-out infinite .7s" }}>
        <circle
          cx="164"
          cy="42"
          r="18"
          fill="#0f2554"
          stroke="#38bdf8"
          strokeWidth="1.2"
        />
        <circle cx="164" cy="36" r="8" fill="#38bdf8" opacity=".9" />
        <path
          d="M150 54 Q164 46 178 54"
          stroke="#38bdf8"
          strokeWidth="1.5"
          fill="none"
          opacity=".9"
        />
        {/* USD tag */}
        <rect x="146" y="66" width="36" height="14" rx="7" fill="#0c2d5e" />
        <text
          x="164"
          y="76.5"
          textAnchor="middle"
          fontSize="7.5"
          fill="#38bdf8"
          fontWeight="800"
        >
          $ USD
        </text>
      </g>
      {/* Animated arrows */}
      <path
        d="M62 36 Q100 20 138 36"
        stroke="#3b82f6"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="60"
        style={{ animation: "p2pArrow 1.8s ease-in-out infinite" }}
        markerEnd="url(#arr1)"
      />
      <path
        d="M138 52 Q100 68 62 52"
        stroke="#38bdf8"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="60"
        style={{ animation: "p2pArrow 1.8s ease-in-out infinite .9s" }}
        markerEnd="url(#arr2)"
      />
      {/* Center lock */}
      <rect
        x="88"
        y="38"
        width="24"
        height="20"
        rx="5"
        fill="#0c1d3d"
        stroke="#3b82f6"
        strokeWidth="1.2"
      />
      <path
        d="M93 38 V33 A7 7 0 0 1 107 33 V38"
        stroke="#3b82f6"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="100" cy="48" r="3" fill="#60a5fa" />
      <line
        x1="100"
        y1="48"
        x2="100"
        y2="53"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* "NO MIDDLEMEN" badge */}
      <rect
        x="58"
        y="96"
        width="84"
        height="16"
        rx="8"
        fill="rgba(37,99,235,.15)"
        stroke="rgba(37,99,235,.3)"
        strokeWidth="1"
      />
      <text
        x="100"
        y="107"
        textAnchor="middle"
        fontSize="7"
        fill="#60a5fa"
        fontWeight="700"
        letterSpacing=".08em"
      >
        NO MIDDLEMEN
      </text>
      <defs>
        <marker
          id="arr1"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path
            d="M1 1l5 3-5 3"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </marker>
        <marker
          id="arr2"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path
            d="M1 1l5 3-5 3"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </marker>
      </defs>
    </svg>
  );
}

function SvcIllustrationEscrow() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes escShield{0%,100%{filter:drop-shadow(0 0 4px #3b82f6)}50%{filter:drop-shadow(0 0 14px #3b82f6)}}
        @keyframes escCoin{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.05)}}
        @keyframes escBar{from{width:0}to{width:70%}}
        @keyframes escPulse{0%,100%{r:14}50%{r:17}}
      `}</style>
      {/* Shield */}
      <g
        style={{
          animation: "escShield 2.5s ease-in-out infinite",
          transformOrigin: "100px 52px",
        }}
      >
        <path
          d="M100 16 L128 28 L128 52 C128 68 115 76 100 82 C85 76 72 68 72 52 L72 28 Z"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth="1.5"
          opacity=".9"
        />
        <path
          d="M100 22 L122 32 L122 52 C122 65 111 72 100 77 C89 72 78 65 78 52 L78 32 Z"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth=".5"
          opacity=".5"
        />
        <path
          d="M90 50 L97 57 L113 42"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* NGN coin floating in */}
      <g style={{ animation: "escCoin 2.8s ease-in-out infinite" }}>
        <circle
          cx="44"
          cy="52"
          r="18"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth="1"
        />
        <text
          x="44"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill="#60a5fa"
          fontWeight="800"
        >
          ₦
        </text>
      </g>
      {/* Arrow to shield */}
      <path
        d="M62 52 L70 52"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        style={{ animation: "escBar 1.5s ease-in-out infinite alternate" }}
        markerEnd="url(#escArr)"
      />
      {/* Locked badge */}
      <rect
        x="64"
        y="90"
        width="72"
        height="16"
        rx="8"
        fill="rgba(34,197,94,.12)"
        stroke="rgba(34,197,94,.3)"
        strokeWidth="1"
      />
      <text
        x="100"
        y="101"
        textAnchor="middle"
        fontSize="7"
        fill="#22c55e"
        fontWeight="700"
        letterSpacing=".08em"
      >
        ● NGN LOCKED SAFE
      </text>
      {/* Right: FX waiting */}
      <g style={{ animation: "escCoin 2.8s ease-in-out infinite .5s" }}>
        <circle
          cx="156"
          cy="52"
          r="16"
          fill="#0c2d5e"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <text
          x="156"
          y="57"
          textAnchor="middle"
          fontSize="11"
          fill="#38bdf8"
          fontWeight="800"
        >
          $
        </text>
      </g>
      <path
        d="M130 52 L140 52"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity=".5"
      />
      <defs>
        <marker
          id="escArr"
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path
            d="M1 1l5 3-5 3"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </marker>
      </defs>
    </svg>
  );
}

function SvcIllustrationWallet() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes walletFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes walletBalance{0%,40%{opacity:0;transform:translateY(4px)}50%,100%{opacity:1;transform:none}}
        @keyframes walletBar{0%{width:0}60%{width:55%}100%{width:55%}}
        @keyframes walletPing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.8);opacity:0}}
      `}</style>
      {/* Wallet card */}
      <g style={{ animation: "walletFloat 4s ease-in-out infinite" }}>
        <rect
          x="30"
          y="18"
          width="140"
          height="84"
          rx="16"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        <rect
          x="30"
          y="18"
          width="140"
          height="84"
          rx="16"
          fill="url(#wg)"
          opacity=".5"
        />
        <rect
          x="30"
          y="18"
          width="140"
          height="28"
          rx="16"
          fill="#1e3a8a"
          opacity=".5"
        />
        {/* Card chip */}
        <rect
          x="44"
          y="28"
          width="22"
          height="16"
          rx="4"
          fill="#2563EB"
          opacity=".7"
        />
        <rect
          x="44"
          y="28"
          width="22"
          height="16"
          rx="4"
          fill="none"
          stroke="#60a5fa"
          strokeWidth=".5"
        />
        {/* BCDees label */}
        <text
          x="168"
          y="40"
          textAnchor="end"
          fontSize="7"
          fill="rgba(255,255,255,.4)"
          fontWeight="700"
          letterSpacing=".1em"
        >
          BCDEES
        </text>
        {/* Balance */}
        <text
          x="44"
          y="66"
          fontSize="8"
          fill="rgba(255,255,255,.4)"
          letterSpacing=".05em"
        >
          Available Balance
        </text>
        <text
          x="44"
          y="84"
          fontSize="18"
          fill="#fff"
          fontWeight="800"
          letterSpacing="-.03em"
          style={{ animation: "walletBalance 3s ease-in-out infinite" }}
        >
          ₦2,450,000
        </text>
        {/* Contactless symbol */}
        {[8, 13, 18].map((r, i) => (
          <path
            key={i}
            d={`M155 72 A${r} ${r} 0 0 1 155 ${72 + r * 1.4}`}
            stroke="#60a5fa"
            strokeWidth="1.2"
            fill="none"
            opacity={0.4 + i * 0.2}
          />
        ))}
      </g>
      {/* Live dot */}
      <circle cx="164" cy="26" r="5" fill="#22c55e" opacity=".8" />
      <circle
        cx="164"
        cy="26"
        r="5"
        fill="#22c55e"
        style={{ animation: "walletPing 2s ease-out infinite" }}
      />
      <defs>
        <linearGradient
          id="wg"
          x1="30"
          y1="18"
          x2="170"
          y2="102"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity=".15" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity=".05" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SvcIllustrationSupport() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <style>{`
        @keyframes suppFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes suppTyping{0%,100%{opacity:.3}33%{opacity:1}66%{opacity:.6}}
        @keyframes suppMsg{0%{opacity:0;transform:translateY(6px)}20%,80%{opacity:1;transform:none}100%{opacity:0}}
        @keyframes suppPing{0%{r:8;opacity:.5}100%{r:16;opacity:0}}
      `}</style>
      {/* Headset icon center */}
      <g
        style={{
          animation: "suppFloat 4s ease-in-out infinite",
          transformOrigin: "100px 55px",
        }}
      >
        <circle
          cx="100"
          cy="55"
          r="32"
          fill="#0f2554"
          stroke="#3b82f6"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="55" r="32" fill="#3b82f6" opacity=".04" />
        {/* Headphone arc */}
        <path
          d="M82 55 A18 18 0 0 1 118 55"
          stroke="#60a5fa"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Ear cups */}
        <rect x="78" y="53" width="8" height="14" rx="4" fill="#2563EB" />
        <rect x="114" y="53" width="8" height="14" rx="4" fill="#2563EB" />
        {/* Mic */}
        <path
          d="M100 67 L100 73"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M95 73 L105 73"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      {/* Pulse ring */}
      <circle
        cx="100"
        cy="55"
        r="8"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        style={{ animation: "suppPing 2s ease-out infinite" }}
      />
      {/* Chat bubbles */}
      <g style={{ animation: "suppMsg 3s ease-in-out infinite" }}>
        <rect
          x="16"
          y="18"
          width="64"
          height="22"
          rx="10"
          fill="#1e3a8a"
          stroke="#3b82f6"
          strokeWidth=".8"
        />
        <text
          x="48"
          y="32"
          textAnchor="middle"
          fontSize="7.5"
          fill="#93c5fd"
          fontWeight="600"
        >
          Trade dispute?
        </text>
        <path d="M28 40 L24 46 L36 40" fill="#1e3a8a" />
      </g>
      <g style={{ animation: "suppMsg 3s ease-in-out infinite 1.5s" }}>
        <rect
          x="120"
          y="18"
          width="68"
          height="22"
          rx="10"
          fill="#0c2d5e"
          stroke="#38bdf8"
          strokeWidth=".8"
        />
        <text
          x="154"
          y="32"
          textAnchor="middle"
          fontSize="7.5"
          fill="#38bdf8"
          fontWeight="600"
        >
          We&apos;ve got you! ✓
        </text>
        <path d="M172 40 L176 46 L164 40" fill="#0c2d5e" />
      </g>
      {/* Typing dots */}
      <g style={{ transform: "translate(30,90)" }}>
        <rect x="0" y="0" width="44" height="16" rx="8" fill="#1e3a8a" />
        {[6, 14, 22].map((x, i) => (
          <circle
            key={i}
            cx={x + 4}
            cy="8"
            r="2.5"
            fill="#60a5fa"
            style={{
              animation: `suppTyping 1s ease-in-out infinite ${i * 0.25}s`,
            }}
          />
        ))}
      </g>
      {/* "24/7 SUPPORT" badge */}
      <rect
        x="126"
        y="88"
        width="58"
        height="16"
        rx="8"
        fill="rgba(37,99,235,.15)"
        stroke="rgba(37,99,235,.3)"
        strokeWidth="1"
      />
      <text
        x="155"
        y="99"
        textAnchor="middle"
        fontSize="6.5"
        fill="#60a5fa"
        fontWeight="700"
        letterSpacing=".08em"
      >
        24/7 SUPPORT
      </text>
    </svg>
  );
}

const SVC_ILLUSTRATIONS = [
  SvcIllustrationP2P,
  SvcIllustrationEscrow,
  SvcIllustrationWallet,
  SvcIllustrationSupport,
];

// ─── Animated escrow flow visual ──────────────────────────────────────────────
function EscrowFlowVisual() {
  const [step, setStep] = useState<number>(0);
  // Cycle through the 4 steps using the exact content provided
  const FLOW = [
    {
      num: "01",
      label: "Create an Account",
      sub: "Join the BCDees community",
      icon: "👤",
      color: "#3b82f6",
    },
    {
      num: "02",
      label: "Lock NGN in Escrow",
      sub: "Your NGN secured before FX moves",
      icon: "🔒",
      color: "#6366f1",
    },
    {
      num: "03",
      label: "Exchange FX",
      sub: "Trade confidently, rate stays locked",
      icon: "🔄",
      color: "#0ea5e9",
    },
    {
      num: "04",
      label: "Complete & Smile",
      sub: "Every trade transparent and fair",
      icon: "✅",
      color: "#22c55e",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % FLOW.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <style>{`
        @keyframes stepIn  { from { opacity:0; transform:translateY(14px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes stepOut { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(-10px) scale(.97); } }
        @keyframes pulseBlue { 0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,.5)} 50%{box-shadow:0 0 0 10px rgba(37,99,235,0)} }
        @keyframes lineGrow { from{width:0} to{width:100%} }
        @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* Main active step card */}
      <div
        key={step}
        style={{
          background: "rgba(255,255,255,.05)",
          border: `1px solid ${FLOW[step].color}44`,
          borderRadius: 20,
          padding: "28px 28px 24px",
          marginBottom: 16,
          animation: "stepIn .45s cubic-bezier(.16,1,.3,1) forwards",
          boxShadow: `0 0 0 1px ${FLOW[step].color}22, 0 16px 40px rgba(0,0,0,.3)`,
        }}
      >
        {/* Step number + icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: `${FLOW[step].color}`,
              letterSpacing: ".1em",
            }}
          >
            STEP {FLOW[step].num}
          </span>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${FLOW[step].color}22`,
              border: `1px solid ${FLOW[step].color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              animation: "pulseBlue 2s ease-in-out infinite",
            }}
          >
            {FLOW[step].icon}
          </div>
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#f1f5f9",
            marginBottom: 6,
            letterSpacing: "-.02em",
          }}
        >
          {FLOW[step].label}
        </h3>
        <p
          style={{
            fontSize: 13,
            color: "rgba(148,163,184,.7)",
            lineHeight: 1.5,
          }}
        >
          {FLOW[step].sub}
        </p>
        {/* Animated progress bar */}
        <div
          style={{
            marginTop: 20,
            height: 3,
            background: "rgba(255,255,255,.07)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            key={`bar-${step}`}
            style={{
              height: "100%",
              borderRadius: 99,
              background: `linear-gradient(90deg,${FLOW[step].color},${FLOW[step].color}88)`,
              animation: "lineGrow 2.2s linear forwards",
            }}
          />
        </div>
      </div>

      {/* Step dots row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {FLOW.map((f, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: 12,
              background: i === step ? `${f.color}18` : "rgba(255,255,255,.03)",
              border: `1px solid ${i === step ? f.color + "44" : "rgba(255,255,255,.06)"}`,
              cursor: "pointer",
              transition: "all .3s",
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 4 }}>{f.icon}</div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: i === step ? f.color : "rgba(148,163,184,.4)",
                letterSpacing: ".04em",
              }}
            >
              {f.num}
            </div>
          </button>
        ))}
      </div>

      {/* Two floating mini-stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div
          style={{
            background: "rgba(34,197,94,.08)",
            border: "1px solid rgba(34,197,94,.18)",
            borderRadius: 14,
            padding: "16px",
            animation: "floatCard 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#22c55e",
              letterSpacing: "-.03em",
            }}
          >
            ₦0
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(148,163,184,.6)",
              marginTop: 3,
              fontWeight: 500,
            }}
          >
            Platform fees
          </div>
        </div>
        <div
          style={{
            background: "rgba(37,99,235,.08)",
            border: "1px solid rgba(37,99,235,.2)",
            borderRadius: 14,
            padding: "16px",
            animation: "floatCard 4s ease-in-out infinite .8s",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#60a5fa",
              letterSpacing: "-.03em",
            }}
          >
            24h
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(148,163,184,.6)",
              marginTop: 3,
              fontWeight: 500,
            }}
          >
            Fresh marketplace
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function BCDeesLanding() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("Home");
  const [heroRef, heroIn] = useInView(0.05);

  useEffect(() => {
    const fn = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(dh > 0 ? (st / dh) * 100 : 0);
      setScrolled(st > 40);
      const ids = ["home", "about", "services", "how-it-works", "contact"];
      let cur = "Home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          const lbl = NAV.find(
            (l) => l.toLowerCase().replace(/ /g, "-") === id,
          );
          if (lbl) cur = lbl;
        }
      }
      setActiveSection(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 68,
        behavior: "smooth",
      });
    setMenuOpen(false);
  };
  const goCTA = (): void => scrollTo("Contact");

  return (
    <div
      style={{
        background: "#06101e",
        color: "#e2e8f0",
        fontFamily: "'Inter',system-ui,sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#06101e}
        ::-webkit-scrollbar-thumb{background:#2563EB;border-radius:3px}

        .pgbar{position:fixed;top:0;left:0;z-index:200;height:2px;background:linear-gradient(90deg,#2563EB,#38bdf8);transition:width .1s;pointer-events:none}

        /* ── Floating pill nav ── */
        .nav-outer{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;justify-content:center;
          padding:14px 32px;
          pointer-events:none;
          transition:padding .4s ease;
        }
        .nav-outer.scrolled{ padding:10px 32px; }

        .nav-pill{
          pointer-events:all;
          /* Shrink to fit content — same visual width as page body */
          width:fit-content;
          min-width:0;
          max-width:960px;
          height:52px;
          display:flex;align-items:center;justify-content:space-between;gap:8px;
          padding:0 10px;
          border-radius:99px;
          background:rgba(6,16,30,0.35);
          border:1px solid rgba(255,255,255,0.07);
          backdrop-filter:blur(20px) saturate(160%);
          -webkit-backdrop-filter:blur(20px) saturate(160%);
          box-shadow:0 8px 32px rgba(0,0,0,0.3), 0 0 12px rgba(37,99,235,0.12), inset 0 1px 0 rgba(255,255,255,0.06);
          transition:all .4s cubic-bezier(.16,1,.3,1);
        }
        .nav-outer.scrolled .nav-pill{
          background:rgba(6,16,30,0.72);
          border-color:rgba(37,99,235,0.22);
          box-shadow:0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 18px rgba(37,99,235,0.18);
        }
        @media(max-width:768px){
          .nav-outer{ padding:10px 16px; }
          .nav-pill{
            width:fit-content;
            min-width:0;
            max-width:calc(100vw - 32px);
            border-radius:99px;
          }
        }

        /* Nav links */
        .nl{
          background:none;border:none;cursor:pointer;
          font-family:inherit;font-size:13px;font-weight:500;
          padding:7px 14px;border-radius:99px;
          color:rgba(148,163,184,0.8);
          transition:all .2s;white-space:nowrap;
        }
        .nl:hover{
          background:rgba(255,255,255,0.08);
          color:#f1f5f9;
        }
        .nl.on{
          background:rgba(37,99,235,0.2);
          color:#93c5fd;
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .btn{background:#2563EB;color:#fff;border:none;padding:11px 22px;border-radius:99px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s;box-shadow:0 4px 14px rgba(37,99,235,.3)}
        .btn:hover{background:#1d4ed8;transform:translateY(-1px);box-shadow:0 8px 24px rgba(37,99,235,.4)}
        .btn-sm{background:rgba(37,99,235,0.15);color:#93c5fd;border:1px solid rgba(37,99,235,0.3);padding:10px 22px;border-radius:99px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s}
        .btn-sm:hover{background:rgba(37,99,235,0.25);color:#bfdbfe}

        .sec{padding:80px 0}
        .wrap{max-width:960px;margin:0 auto;padding:0 32px}

        .fc{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:28px;transition:all .3s}
        .fc:hover{background:rgba(37,99,235,.06);border-color:rgba(37,99,235,.25);transform:translateY(-3px)}

        .sc{padding:32px 24px;transition:background .25s}
        .sc:hover{background:rgba(37,99,235,.05)}

        .svc{background:#06101e;padding:44px 36px;transition:background .3s}
        .svc:hover{background:rgba(37,99,235,.05)}

        .phone-wrap{position:relative;width:480px;height:420px;margin:0 auto}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .float-anim{animation:float 7s ease-in-out infinite}

        @media(max-width:768px){
          .wrap{padding:0 16px}
          .hide-m{display:none!important}
          .show-m{display:block!important}
          [data-two]{grid-template-columns:1fr!important}
          [data-six]{grid-template-columns:1fr 1fr!important}
          [data-four]{grid-template-columns:1fr 1fr!important}
          .phone-wrap{width:300px!important;height:340px!important}
          .sec{padding:56px 0}
          .wrap{padding:0 20px}
        }
        @media(min-width:769px){.show-m{display:none!important}}

        /* ── Bottom sheet ── */
        .bs-backdrop{
          position:fixed;inset:0;z-index:150;
          background:rgba(0,0,0,0.65);
          backdrop-filter:blur(4px);
          opacity:0;pointer-events:none;
          transition:opacity .35s ease;
        }
        .bs-backdrop.open{opacity:1;pointer-events:all}
        .bs-sheet{
          position:fixed;bottom:0;left:0;right:0;z-index:160;
          background:#0d1a2e;
          border-radius:24px 24px 0 0;
          border-top:1px solid rgba(37,99,235,.2);
          padding:0 0 36px;
          transform:translateY(100%);
          transition:transform .42s cubic-bezier(.16,1,.3,1);
          box-shadow:0 -24px 60px rgba(0,0,0,.55);
        }
        .bs-sheet.open{transform:translateY(0)}
        .bs-handle{
          width:40px;height:4px;border-radius:99px;
          background:rgba(255,255,255,.15);
          margin:14px auto 4px;
        }
        .bs-link{
          display:flex;align-items:center;justify-content:space-between;
          width:100%;background:none;border:none;cursor:pointer;
          font-family:inherit;font-size:16px;font-weight:500;
          color:rgba(148,163,184,.85);
          padding:15px 24px;border-radius:0;
          transition:all .2s;text-align:left;
        }
        .bs-link:active{background:rgba(37,99,235,.08)}
        .bs-link.on{color:#60a5fa;font-weight:700}
      `}</style>

      <div className="pgbar" style={{ width: `${scrollPct}%` }} />

      {/* NAV — floating pill */}
      <div className={`nav-outer${scrolled ? " scrolled" : ""}`}>
        <div className="nav-pill">
          {/* Logo — circle container */}
          <button
            onClick={() => scrollTo("Home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 9,
              flexShrink: 0,
              padding: "0 4px",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2563EB,#0ea5e9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 0 2px rgba(37,99,235,.3), 0 4px 14px rgba(37,99,235,.4)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo.png"
                alt="BCDees"
                width={22}
                height={22}
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              <span style={{ color: "#60a5fa" }}>BC</span>
              <span style={{ color: "#f1f5f9" }}>Dees</span>
            </span>
          </button>

          {/* Desktop nav links — How It Works + Contact only */}
          <div
            className="hide-m"
            style={{
              display: "flex",
              gap: 2,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {["How It Works", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`nl${activeSection === l ? " on" : ""}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Get Started — pill button */}
          <button
            className="hide-m"
            onClick={goCTA}
            style={{
              background: "linear-gradient(135deg,#2563EB,#1d4ed8)",
              color: "#fff",
              border: "none",
              padding: "9px 20px",
              borderRadius: 99,
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(37,99,235,.35)",
              transition: "all .25s",
              letterSpacing: ".01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(37,99,235,.35)";
            }}
          >
            Get Started
          </button>

          {/* Mobile hamburger */}
          <button
            className="show-m"
            onClick={() => setMenuOpen(true)}
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#94a3b8",
              flexShrink: 0,
            }}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* ── BOTTOM SHEET (mobile menu) ── */}
      <div
        className={`bs-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`bs-sheet show-m${menuOpen ? " open" : ""}`}>
        <div className="bs-handle" />
        {/* Sheet header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 24px 16px",
            borderBottom: "1px solid rgba(37,99,235,.1)",
          }}
        >
          <span
            style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.01em" }}
          >
            <span style={{ color: "#3b82f6" }}>BC</span>
            <span style={{ color: "#f1f5f9" }}>Dees</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 99,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#94a3b8",
            }}
          >
            <X size={16} />
          </button>
        </div>
        {/* Nav links */}
        <div style={{ padding: "8px 12px" }}>
          {NAV.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className={`bs-link${activeSection === l ? " on" : ""}`}
            >
              <span>{l}</span>
              <ChevronRight
                size={16}
                color={activeSection === l ? "#60a5fa" : "rgba(148,163,184,.3)"}
              />
            </button>
          ))}
        </div>
        {/* CTA */}
        <div style={{ padding: "12px 24px 0" }}>
          <button
            className="btn"
            onClick={goCTA}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "15px",
              fontSize: 15,
              borderRadius: 14,
            }}
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* HERO */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          background: "#06101e",
          position: "relative",
          overflow: "hidden",
          paddingTop: 84,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Concentric arcs */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "160%",
            maxWidth: 1400,
            pointerEvents: "none",
            opacity: 0.35,
          }}
          viewBox="0 0 1400 800"
          fill="none"
        >
          {[180, 260, 340, 420, 500, 580, 660, 740].map((r, i) => (
            <ellipse
              key={i}
              cx="700"
              cy="0"
              rx={r * 1.4}
              ry={r * 0.55}
              stroke="#1e3a8a"
              strokeWidth="1"
              fill="none"
              opacity={0.8 - i * 0.08}
            />
          ))}
        </svg>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle,rgba(37,99,235,0.25),transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Headline */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "80px 24px 0",
            maxWidth: 680,
          }}
        >
          <style>{`
            @keyframes ampFloat{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-8px) rotate(4deg)}}
            @keyframes ampGlow{0%,100%{box-shadow:0 0 0 0 rgba(37,99,235,0),0 8px 32px rgba(0,0,0,.4)}50%{box-shadow:0 0 0 8px rgba(37,99,235,0.12),0 8px 32px rgba(0,0,0,.4)}}
            @media(min-width:769px){
              .amp-block{ display:none !important; }
              .hero-desktop{ display:block !important; }
            }
            @media(max-width:768px){
              .amp-block{ display:flex !important; }
              .hero-desktop{ display:none !important; }
            }
          `}</style>

          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(20px)",
              transition: "all .8s ease .1s",
            }}
          >
            {/* Desktop headline — single block */}
            <h1
              className="hero-desktop"
              style={{
                fontSize: "clamp(32px,5vw,62px)",
                lineHeight: 1.08,
                letterSpacing: "-.03em",
                fontWeight: 800,
                color: "#f1f5f9",
                display: "block",
              }}
            >
              Smart, Simple and
              <br />
              <span style={{ color: "#60a5fa" }}>Safe Way</span>
            </h1>

            {/* Mobile headline — each word stacked */}
            <div
              className="amp-block"
              style={{
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(48px,13vw,64px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-.03em",
                  color: "#e2e8f0",
                  margin: 0,
                }}
              >
                Smart
              </h1>

              <h1
                style={{
                  fontSize: "clamp(48px,13vw,64px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-.03em",
                  color: "#e2e8f0",
                  margin: 0,
                }}
              >
                Simple
              </h1>

              {/* Floating & circle */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1e3a8a,#2563EB)",
                  border: "1px solid rgba(96,165,250,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                  margin: "8px 0",
                  animation:
                    "ampFloat 5s ease-in-out infinite, ampGlow 3s ease-in-out infinite",
                }}
              >
                &amp;
              </div>

              <h1
                style={{
                  fontSize: "clamp(48px,13vw,64px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-.03em",
                  color: "#60a5fa",
                  margin: 0,
                }}
              >
                Safe Way
              </h1>
            </div>
          </div>
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(18px)",
              transition: "all .8s ease .25s",
            }}
          >
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "rgba(148,163,184,0.8)",
                margin: "20px auto 28px",
                maxWidth: 540,
              }}
            >
              Welcome to BCDees — a community of real people connecting,
              trading, and winning together. No stress. No fear. No funny
              business. Just fair rates, friendly trading, and escrow-secured
              peace of mind.
            </p>
          </div>
          <div
            style={{
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "none" : "translateY(16px)",
              transition: "all .8s ease .38s",
            }}
          >
            <button className="btn-sm" onClick={goCTA}>
              Open a free account <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Phone + cards */}
        <div
          className="float-anim"
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 56,
            paddingBottom: 20,
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "none" : "translateY(32px) scale(0.95)",
            transition: "all 1.1s ease .4s",
          }}
        >
          <PhoneWithCards />
        </div>

        {/* Stats */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            gap: 48,
            marginTop: 40,
            paddingBottom: 60,
            opacity: heroIn ? 1 : 0,
            transition: "opacity .9s ease .7s",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            ["10K+", "Active Traders"],
            ["₦0", "Lost to Fraud"],
            ["24/7", "Marketplace"],
          ].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-.03em",
                  background: "linear-gradient(135deg,#3b82f6,#38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(148,163,184,.45)",
                  fontWeight: 600,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NO FEES SECTION */}
      <section style={{ background: "#06101e", padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                background: "#0d1525",
                borderRadius: 24,
                overflow: "hidden",
                position: "relative",
                padding: "52px 48px",
                border: "1px solid rgba(37,99,235,.1)",
              }}
            >
              {/* Blobs */}
              <div
                style={{
                  position: "absolute",
                  top: -50,
                  right: "28%",
                  width: 130,
                  height: 190,
                  borderRadius: "50%",
                  background: "linear-gradient(160deg,#3b82f6,#06b6d4)",
                  opacity: 0.5,
                  filter: "blur(1px)",
                  pointerEvents: "none",
                  transform: "rotate(-20deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  right: 40,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#06b6d4,#14b8a6)",
                  opacity: 0.45,
                  filter: "blur(8px)",
                  pointerEvents: "none",
                }}
              />
              {/* Arc lines */}
              <svg
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  opacity: 0.06,
                  pointerEvents: "none",
                }}
                viewBox="0 0 400 300"
                fill="none"
              >
                {[60, 110, 160, 210, 260].map((r, i) => (
                  <circle
                    key={i}
                    cx="0"
                    cy="300"
                    r={r}
                    stroke="#3b82f6"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
              </svg>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 64,
                  alignItems: "center",
                  position: "relative",
                  zIndex: 2,
                }}
                data-two
              >
                {/* Left — exact content from provided text */}
                <div>
                  <h2
                    style={{
                      fontSize: "clamp(26px,3.5vw,44px)",
                      fontWeight: 800,
                      lineHeight: 1.15,
                      letterSpacing: "-.03em",
                      color: "#f1f5f9",
                      marginBottom: 24,
                    }}
                  >
                    No Fees.
                    <br />
                    One Community.
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: "rgba(148,163,184,.75)",
                      marginBottom: 16,
                    }}
                  >
                    Need to trade FX?{" "}
                    <strong style={{ color: "#fff" }}>
                      Do it with BCDees.
                    </strong>{" "}
                    Trading for the first time?{" "}
                    <strong style={{ color: "#fff" }}>
                      Get started with BCDees.
                    </strong>
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      lineHeight: 1.8,
                      color: "rgba(148,163,184,.75)",
                    }}
                  >
                    You&apos;ll enjoy{" "}
                    <strong style={{ color: "#fff" }}>
                      &#x20A6;0 platform fees
                    </strong>{" "}
                    on every trade —{" "}
                    <strong style={{ color: "#fff" }}>
                      no hidden costs or surprises.
                    </strong>
                  </p>
                </div>

                {/* Right — animated escrow flow visual */}
                <EscrowFlowVisual />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY PEOPLE LOVE */}
      <section
        className="sec"
        style={{
          background: "#0a1829",
          borderTop: "1px solid rgba(37,99,235,.08)",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 14,
                }}
              >
                Why Choose Us
              </p>
              <h2
                style={{
                  fontSize: "clamp(24px,3.2vw,40px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  color: "#f1f5f9",
                  lineHeight: 1.15,
                }}
              >
                Why People Love Trading on BCDees
              </h2>
            </div>
          </Reveal>
          <div
            data-four
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
            }}
          >
            {FEATURES.map((f, i) => {
              const Illustration = FEATURE_ILLUSTRATIONS[i];
              return (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div
                    style={{
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(37,99,235,.14)",
                      borderRadius: 20,
                      padding: "24px 22px 28px",
                      height: "100%",
                      transition: "all .35s",
                      overflow: "hidden",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(37,99,235,.07)";
                      e.currentTarget.style.borderColor = "rgba(37,99,235,.35)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 48px rgba(0,0,0,.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.03)";
                      e.currentTarget.style.borderColor = "rgba(37,99,235,.14)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Animated illustration */}
                    <div
                      style={{
                        height: 90,
                        marginBottom: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Illustration />
                    </div>
                    {/* Icon badge — matches screenshot */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(37,99,235,.18)",
                        border: "1px solid rgba(37,99,235,.28)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <f.icon size={20} color="#60a5fa" strokeWidth={1.8} />
                    </div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: "rgba(148,163,184,.65)",
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        style={{
          background: "#06101e",
          borderTop: "1px solid rgba(37,99,235,.08)",
          padding: "80px 0",
        }}
      >
        <div className="wrap">
          {/* Header */}
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 56,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    color: "#60a5fa",
                    marginBottom: 12,
                  }}
                >
                  Simple Process
                </p>
                <h2
                  style={{
                    fontSize: "clamp(24px,3.2vw,40px)",
                    fontWeight: 800,
                    letterSpacing: "-.025em",
                    color: "#f1f5f9",
                    lineHeight: 1.15,
                  }}
                >
                  How It Works
                </h2>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(148,163,184,.5)",
                  maxWidth: 260,
                  lineHeight: 1.6,
                }}
              >
                Six simple steps to your first safe trade.
              </p>
            </div>
          </Reveal>

          {/* 3×2 grid — matches screenshot exactly */}
          <div
            data-six
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              border: "1px solid rgba(37,99,235,.12)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {[
              {
                num: "01",
                icon: UserPlus,
                label: "Create an Account",
                desc: "Sign up in minutes and join the BCDees community.",
              },
              {
                num: "02",
                icon: CreditCard,
                label: "Complete KYC",
                desc: "Quick verification keeps every trader accountable.",
              },
              {
                num: "03",
                icon: Search,
                label: "Browse or create an FX ad",
                desc: "Find live rates from real people or post your own.",
              },
              {
                num: "04",
                icon: Lock,
                label: "Lock NGN in escrow",
                desc: "Your naira stays safe until both sides confirm the trade.",
              },
              {
                num: "05",
                icon: RefreshCw,
                label: "Exchange FX confidently",
                desc: "The rate is frozen — no surprises, no last-minute changes.",
              },
              {
                num: "06",
                icon: Smile,
                label: "Complete your trade and smile",
                desc: "Repeat, refer a friend, and keep growing together.",
              },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 0.07}>
                <div
                  style={{
                    padding: "40px 32px 44px",
                    borderRight:
                      (i + 1) % 3 !== 0
                        ? "1px solid rgba(37,99,235,.12)"
                        : "none",
                    borderBottom:
                      i < 3 ? "1px solid rgba(37,99,235,.12)" : "none",
                    background: "#06101e",
                    transition: "background .3s",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#0a1829")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#06101e")
                  }
                >
                  {/* Hover glow top-left */}
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      left: -40,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle,rgba(37,99,235,.12),transparent 70%)",
                      pointerEvents: "none",
                      transition: "opacity .3s",
                    }}
                  />

                  {/* Step number */}
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "rgba(37,99,235,.45)",
                      letterSpacing: ".1em",
                      marginBottom: 24,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.num}
                  </p>

                  {/* Icon badge — matches screenshot: rounded square, dark blue bg */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: "rgba(37,99,235,.15)",
                      border: "1px solid rgba(37,99,235,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 28,
                      boxShadow: "0 4px 20px rgba(37,99,235,.15)",
                    }}
                  >
                    <s.icon size={24} color="#60a5fa" strokeWidth={1.6} />
                  </div>

                  {/* Label */}
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#f1f5f9",
                      marginBottom: 10,
                      letterSpacing: "-.02em",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.label}
                  </h3>

                  {/* Short description */}
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "rgba(148,163,184,.55)",
                      maxWidth: 220,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA — pill button matching screenshot */}
          <Reveal delay={0.4}>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <button
                onClick={goCTA}
                style={{
                  background: "linear-gradient(135deg,#2563EB,#1d4ed8)",
                  color: "#fff",
                  border: "none",
                  padding: "16px 44px",
                  borderRadius: 99,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "inherit",
                  boxShadow: "0 8px 32px rgba(37,99,235,.4)",
                  transition: "all .25s",
                  letterSpacing: "-.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(37,99,235,.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(37,99,235,.4)";
                }}
              >
                Get Started Now
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          background: "#06101e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes meshMove{0%{transform:translate(0,0)}50%{transform:translate(12px,-8px)}100%{transform:translate(0,0)}}
          @keyframes glowPulse{0%,100%{opacity:.4}50%{opacity:.9}}
          @keyframes escrowSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
          @keyframes lineReveal{from{width:0}to{width:100%}}
        `}</style>

        {/* ── TOP: Full-width headline strip ── */}
        <div
          style={{
            borderBottom: "1px solid rgba(37,99,235,.1)",
            padding: "72px 0 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg,rgba(37,99,235,.04),transparent)",
              pointerEvents: "none",
            }}
          />
          <div className="wrap" style={{ position: "relative" }}>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <div style={{ height: 1, width: 40, background: "#3b82f6" }} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#60a5fa",
                  }}
                >
                  About BCDees
                </span>
              </div>
              {/* GIANT headline — full width, editorial */}
              <h2
                style={{
                  fontSize: "clamp(36px,5.5vw,72px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-.035em",
                  margin: 0,
                  color: "#f1f5f9",
                }}
              >
                Built by
                <br />
                <span
                  style={{
                    color: "#60a5fa",
                  }}
                >
                  community.
                </span>
              </h2>
            </Reveal>
          </div>
        </div>

        {/* ── MIDDLE: Two column content ── */}
        <div className="wrap" style={{ padding: "80px 40px" }}>
          <div
            data-two
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 72,
              alignItems: "start",
            }}
          >
            {/* LEFT — Body text + 4 stats */}
            <Reveal dir="left">
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.85,
                  color: "rgba(148,163,184,.8)",
                  marginBottom: 52,
                  maxWidth: 480,
                  fontWeight: 300,
                }}
              >
                BCDees Global is a community-driven FX platform for safe,
                simple, and stress-free currency exchange. Ours is a trusted
                community where everyone can trade confidently.
              </p>

              {/* 4 bold stat items — completely different from generic checklist */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  background: "rgba(37,99,235,.1)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {[
                  { num: "100%", label: "Transparent Trades" },
                  { num: "KYC", label: "Verified Community" },
                  { num: "0₦", label: "Platform Markup" },
                  { num: "24/7", label: "Escrow-Secured Every Time" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#06101e",
                      padding: "28px 24px",
                      borderRight:
                        i % 2 === 0 ? "1px solid rgba(37,99,235,.1)" : "none",
                      borderBottom:
                        i < 2 ? "1px solid rgba(37,99,235,.1)" : "none",
                      transition: "background .3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#0a1829")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#06101e")
                    }
                  >
                    <p
                      style={{
                        fontSize: 28,
                        fontWeight: 900,
                        color: "#3b82f6",
                        letterSpacing: "-.03em",
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {s.num}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "rgba(148,163,184,.5)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* RIGHT — Escrow card — completely reimagined */}
            <Reveal delay={0.15} dir="right">
              <div style={{ position: "relative" }}>
                {/* Glowing mesh background */}
                <div
                  style={{
                    position: "absolute",
                    inset: -24,
                    borderRadius: 32,
                    overflow: "hidden",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(ellipse at 60% 40%,rgba(37,99,235,.18),transparent 65%)",
                      animation: "meshMove 8s ease-in-out infinite",
                    }}
                  />
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0.06,
                    }}
                    viewBox="0 0 400 300"
                    fill="none"
                  >
                    <defs>
                      <pattern
                        id="mesh"
                        width="30"
                        height="30"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M30 0L0 0 0 30"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth=".7"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mesh)" />
                  </svg>
                </div>

                {/* Main card */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    background: "rgba(13,25,52,0.9)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 24,
                    border: "1px solid rgba(37,99,235,.25)",
                    overflow: "hidden",
                    boxShadow: "0 32px 80px rgba(0,0,0,.6)",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      height: 3,
                      background:
                        "linear-gradient(90deg,#2563EB,#38bdf8,#2563EB)",
                      backgroundSize: "200% auto",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />

                  <div style={{ padding: "40px 36px" }}>
                    {/* Header row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 32,
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: ".14em",
                            textTransform: "uppercase",
                            color: "rgba(96,165,250,.6)",
                            marginBottom: 6,
                          }}
                        >
                          Our Secret Sauce
                        </p>
                        <h3
                          style={{
                            fontSize: 28,
                            fontWeight: 800,
                            color: "#fff",
                            letterSpacing: "-.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          Escrow
                        </h3>
                      </div>
                      {/* Animated lock */}
                      <div
                        style={{ position: "relative", width: 56, height: 56 }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: "1px solid rgba(37,99,235,.25)",
                            animation: "glowPulse 2s ease-in-out infinite",
                          }}
                        />
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            background: "rgba(37,99,235,.2)",
                            border: "1px solid rgba(37,99,235,.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Lock size={24} color="#60a5fa" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>

                    {/* 3 escrow points — styled as timeline */}
                    <div style={{ position: "relative" }}>
                      {/* Vertical line */}
                      <div
                        style={{
                          position: "absolute",
                          left: 11,
                          top: 12,
                          bottom: 12,
                          width: 1,
                          background:
                            "linear-gradient(180deg,#3b82f6,rgba(37,99,235,.1))",
                        }}
                      />

                      {[
                        {
                          text: "Your NGN is securely locked before any FX is sent",
                          tag: "LOCKED",
                        },
                        {
                          text: "No one can lose money when they follow the process",
                          tag: "PROTECTED",
                        },
                        {
                          text: "Every trade is transparent and fair",
                          tag: "VERIFIED",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 20,
                            marginBottom: i < 2 ? 24 : 0,
                            position: "relative",
                          }}
                        >
                          {/* Timeline dot */}
                          <div
                            style={{
                              width: 23,
                              height: 23,
                              borderRadius: "50%",
                              background: "#06101e",
                              border: "2px solid #3b82f6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: 2,
                              zIndex: 1,
                            }}
                          >
                            <div
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "#3b82f6",
                              }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 800,
                                letterSpacing: ".12em",
                                color: "#3b82f6",
                                textTransform: "uppercase",
                                opacity: 0.7,
                              }}
                            >
                              {item.tag}
                            </span>
                            <p
                              style={{
                                fontSize: 14,
                                lineHeight: 1.6,
                                color: "rgba(219,234,254,.75)",
                                marginTop: 2,
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row — stars + live badge */}
                    <div
                      style={{
                        marginTop: 28,
                        paddingTop: 24,
                        borderTop: "1px solid rgba(255,255,255,.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ display: "flex", gap: 2 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              color="#fcd34d"
                              fill="#fcd34d"
                            />
                          ))}
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "rgba(219,234,254,.35)",
                          }}
                        >
                          Trusted by thousands
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: "rgba(34,197,94,.1)",
                          border: "1px solid rgba(34,197,94,.25)",
                          borderRadius: 99,
                          padding: "4px 12px",
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#22c55e",
                            animation: "glowPulse 1.5s ease-in-out infinite",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#22c55e",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                          }}
                        >
                          Live
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`@keyframes shimmer{from{background-position:200% center}to{background-position:-200% center}}`}</style>

      {/* SERVICES */}
      <section
        id="services"
        style={{
          background: "#06101e",
          borderTop: "1px solid rgba(37,99,235,.08)",
          padding: "80px 0",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: 56 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 14,
                }}
              >
                What We Offer
              </p>
              <h2
                style={{
                  fontSize: "clamp(24px,3.2vw,40px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  color: "#f1f5f9",
                  lineHeight: 1.15,
                }}
              >
                Everything you need
              </h2>
            </div>
          </Reveal>

          {/* 2×2 grid — exact screenshot layout */}
          <div
            data-two
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              border: "1px solid rgba(37,99,235,.12)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {SERVICES.map((s, i) => {
              const Illustration = SVC_ILLUSTRATIONS[i];
              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div
                    style={{
                      padding: "44px 40px 40px",
                      borderRight:
                        i % 2 === 0 ? "1px solid rgba(37,99,235,.12)" : "none",
                      borderBottom:
                        i < 2 ? "1px solid rgba(37,99,235,.12)" : "none",
                      background: "#06101e",
                      position: "relative",
                      overflow: "hidden",
                      transition: "background .35s",
                      cursor: "default",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#09162a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#06101e")
                    }
                  >
                    {/* Hover corner glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: -40,
                        left: -40,
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle,rgba(37,99,235,.1),transparent 70%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Animated illustration — top of card */}
                    <div
                      style={{
                        height: 108,
                        marginBottom: 24,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <Illustration />
                    </div>

                    {/* Icon badge — matches screenshot exactly: rounded square */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: "rgba(37,99,235,.15)",
                        border: "1px solid rgba(37,99,235,.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                        boxShadow: "0 4px 16px rgba(37,99,235,.15)",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <s.icon size={24} color="#60a5fa" strokeWidth={1.6} />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: 10,
                        letterSpacing: "-.02em",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.75,
                        color: "rgba(148,163,184,.65)",
                        marginBottom: 24,
                        position: "relative",
                        zIndex: 1,
                        flex: 1,
                      }}
                    >
                      {s.desc}
                    </p>

                    {/* Learn more — wired to Contact */}
                    <button
                      onClick={goCTA}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#3b82f6",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: ".02em",
                        fontFamily: "inherit",
                        transition: "gap .2s",
                        position: "relative",
                        zIndex: 1,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
                      onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
                    >
                      Learn more
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "0 32px 80px", background: "#06101e" }}>
        <style>{`
          @keyframes ctaFloat0{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-14px) rotate(-4deg)}}
          @keyframes ctaFloat1{0%,100%{transform:translateY(0) rotate(5deg)}50%{transform:translateY(-10px) rotate(7deg)}}
          @keyframes ctaFloat2{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-18px) rotate(-5deg)}}
          @keyframes ctaFloat3{0%,100%{transform:translateY(0) rotate(8deg)}50%{transform:translateY(-8px) rotate(6deg)}}
          @keyframes holoShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
          @keyframes holoGlow{0%,100%{opacity:.35}50%{opacity:.75}}
          @keyframes ctaScan{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}
        `}</style>
        <Reveal>
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              background:
                "linear-gradient(135deg,#0d1e4d 0%,#1a3a8a 50%,#0e2260 100%)",
              borderRadius: 20,
              padding: "60px 64px",
              position: "relative",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 48,
              alignItems: "center",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 40px 80px rgba(0,0,0,.5)",
            }}
            data-two
          >
            {/* Dot grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle,rgba(255,255,255,.03) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
              }}
            />

            {/* ── HOLOGRAPHIC FLOATING CURRENCY CARDS ── */}
            {/* Card 1 — NGN — top left area */}
            <div
              style={{
                position: "absolute",
                top: -20,
                left: 180,
                animation: "ctaFloat0 6s ease-in-out infinite",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 160,
                  borderRadius: 14,
                  padding: "16px 18px 18px",
                  background:
                    "linear-gradient(135deg,rgba(15,37,84,.95),rgba(30,58,138,.9))",
                  border: "1px solid rgba(255,255,255,.15)",
                  boxShadow: "0 12px 40px rgba(0,0,0,.5)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Hologram shimmer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background:
                      "linear-gradient(105deg,transparent 30%,rgba(100,180,255,.12) 45%,rgba(150,220,255,.18) 50%,rgba(100,180,255,.1) 55%,transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "holoShift 3s ease-in-out infinite",
                    pointerEvents: "none",
                  }}
                />
                {/* Scan line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(120,200,255,.4),transparent)",
                    animation: "ctaScan 3s linear infinite",
                    pointerEvents: "none",
                  }}
                />
                {/* Holo glow behind card */}
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 30,
                    background:
                      "radial-gradient(ellipse,rgba(56,189,248,.3),transparent 70%)",
                    animation: "holoGlow 3s ease-in-out infinite",
                    zIndex: -1,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(255,255,255,.9)",
                        letterSpacing: ".04em",
                      }}
                    >
                      NGN
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "rgba(255,255,255,.35)",
                        marginTop: 2,
                      }}
                    >
                      NGN0958473843
                    </div>
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255,255,255,.3)",
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/ng.png"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-.03em",
                  }}
                >
                  ₦23,000
                </div>
              </div>
            </div>

            {/* Card 2 — USD — middle right floating high */}
            <div
              style={{
                position: "absolute",
                top: -30,
                right: 220,
                animation: "ctaFloat2 7s ease-in-out infinite .8s",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 155,
                  borderRadius: 14,
                  padding: "15px 17px 17px",
                  background:
                    "linear-gradient(135deg,rgba(10,28,70,.95),rgba(20,50,120,.9))",
                  border: "1px solid rgba(255,255,255,.12)",
                  boxShadow: "0 12px 40px rgba(0,0,0,.5)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background:
                      "linear-gradient(105deg,transparent 30%,rgba(200,230,255,.1) 48%,rgba(255,255,255,.15) 52%,transparent 68%)",
                    backgroundSize: "200% 200%",
                    animation: "holoShift 4s ease-in-out infinite .5s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(180,220,255,.35),transparent)",
                    animation: "ctaScan 2.8s linear infinite .5s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 30,
                    background:
                      "radial-gradient(ellipse,rgba(96,165,250,.25),transparent 70%)",
                    animation: "holoGlow 4s ease-in-out infinite .3s",
                    zIndex: -1,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(255,255,255,.9)",
                        letterSpacing: ".04em",
                      }}
                    >
                      USD
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "rgba(255,255,255,.35)",
                        marginTop: 2,
                      }}
                    >
                      USD0847392011
                    </div>
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255,255,255,.3)",
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-.03em",
                  }}
                >
                  $12,800
                </div>
              </div>
            </div>

            {/* Card 3 — GBP — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: 100,
                animation: "ctaFloat1 5.5s ease-in-out infinite 1.2s",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 150,
                  borderRadius: 14,
                  padding: "15px 17px 17px",
                  background:
                    "linear-gradient(135deg,rgba(12,30,80,.95),rgba(25,55,130,.9))",
                  border: "1px solid rgba(255,255,255,.1)",
                  boxShadow: "0 12px 36px rgba(0,0,0,.5)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background:
                      "linear-gradient(105deg,transparent 30%,rgba(140,200,255,.1) 47%,rgba(200,240,255,.16) 53%,transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "holoShift 3.5s ease-in-out infinite 1s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(160,210,255,.35),transparent)",
                    animation: "ctaScan 3.2s linear infinite 1s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 30,
                    background:
                      "radial-gradient(ellipse,rgba(14,165,233,.22),transparent 70%)",
                    animation: "holoGlow 3.5s ease-in-out infinite .7s",
                    zIndex: -1,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(255,255,255,.9)",
                        letterSpacing: ".04em",
                      }}
                    >
                      GBP
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "rgba(255,255,255,.35)",
                        marginTop: 2,
                      }}
                    >
                      GBP0392847561
                    </div>
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255,255,255,.3)",
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/gb.png"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-.03em",
                  }}
                >
                  £8,450
                </div>
              </div>
            </div>

            {/* Card 4 — EUR — bottom left */}
            <div
              style={{
                position: "absolute",
                bottom: -15,
                left: 80,
                animation: "ctaFloat3 6.5s ease-in-out infinite .4s",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 148,
                  borderRadius: 14,
                  padding: "14px 16px 16px",
                  background:
                    "linear-gradient(135deg,rgba(14,32,88,.95),rgba(28,58,140,.9))",
                  border: "1px solid rgba(255,255,255,.1)",
                  boxShadow: "0 10px 32px rgba(0,0,0,.5)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background:
                      "linear-gradient(105deg,transparent 30%,rgba(100,170,255,.09) 47%,rgba(160,220,255,.15) 52%,transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "holoShift 5s ease-in-out infinite 1.5s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(140,200,255,.3),transparent)",
                    animation: "ctaScan 4s linear infinite 1.5s",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    borderRadius: 30,
                    background:
                      "radial-gradient(ellipse,rgba(37,99,235,.2),transparent 70%)",
                    animation: "holoGlow 5s ease-in-out infinite 1s",
                    zIndex: -1,
                    filter: "blur(12px)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "rgba(255,255,255,.9)",
                        letterSpacing: ".04em",
                      }}
                    >
                      EUR
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: "rgba(255,255,255,.35)",
                        marginTop: 2,
                      }}
                    >
                      EUR0573920184
                    </div>
                  </div>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255,255,255,.3)",
                    }}
                  >
                    <img
                      src="https://flagcdn.com/w40/eu.png"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-.03em",
                  }}
                >
                  €9,200
                </div>
              </div>
            </div>

            {/* Content — sits above cards */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <h2
                style={{
                  fontSize: "clamp(24px,3.2vw,40px)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.15,
                  letterSpacing: "-.025em",
                  marginBottom: 16,
                }}
              >
                Ready to Trade
                <br />
                with Confidence?
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(219,234,254,.65)",
                  maxWidth: 420,
                }}
              >
                Join thousands of Nigerians who already trade smart, simple, and
                safe on BCDees.
              </p>
            </div>

            {/* Buttons — right side */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flexShrink: 0,
                position: "relative",
                zIndex: 2,
              }}
            >
              <button
                onClick={goCTA}
                style={{
                  background: "#fff",
                  color: "#1e3a8a",
                  border: "none",
                  padding: "15px 32px",
                  borderRadius: 12,
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .25s",
                  boxShadow: "0 4px 20px rgba(0,0,0,.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e0e7ff";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Create Free Account
              </button>
              <button
                onClick={goCTA}
                style={{
                  background: "rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.9)",
                  border: "1px solid rgba(255,255,255,.2)",
                  padding: "14px 32px",
                  borderRadius: 12,
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .25s",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.18)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.1)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          background: "#0a1829",
          borderTop: "1px solid rgba(37,99,235,.08)",
          padding: "80px 0",
        }}
      >
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 14,
                }}
              >
                Contact Us
              </p>
              <h2
                style={{
                  fontSize: "clamp(24px,3.2vw,42px)",
                  fontWeight: 800,
                  letterSpacing: "-.025em",
                  color: "#f1f5f9",
                  lineHeight: 1.15,
                }}
              >
                BCDees Global
              </h2>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
              maxWidth: 860,
              margin: "0 auto",
            }}
          >
            {/* ADDRESS — opens Google Maps */}
            <Reveal delay={0}>
              <a
                href="https://maps.google.com/?q=20+Aso+Rock+St,+Abule+Ijoko,+Ogun+State,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(37,99,235,.14)",
                    borderRadius: 20,
                    padding: "40px 28px 36px",
                    textAlign: "center",
                    transition: "all .35s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37,99,235,.08)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.35)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 48px rgba(0,0,0,.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.03)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.14)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "rgba(37,99,235,.15)",
                      border: "1px solid rgba(37,99,235,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 4px 16px rgba(37,99,235,.2)",
                    }}
                  >
                    <MapPin size={26} color="#60a5fa" strokeWidth={1.6} />
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "rgba(96,165,250,.55)",
                      marginBottom: 12,
                    }}
                  >
                    Address
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(148,163,184,.75)",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    20 Aso Rock St, Abule Ijoko, Ogun State, Nigeria.
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      color: "#3b82f6",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Open in Maps
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
                      <path
                        d="M3 7h8M7 3l4 4-4 4"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* EMAIL — opens mail client */}
            <Reveal delay={0.1}>
              <a
                href="mailto:info@bcdees.com"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(37,99,235,.14)",
                    borderRadius: 20,
                    padding: "40px 28px 36px",
                    textAlign: "center",
                    transition: "all .35s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37,99,235,.08)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.35)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 48px rgba(0,0,0,.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.03)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.14)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "rgba(37,99,235,.15)",
                      border: "1px solid rgba(37,99,235,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 4px 16px rgba(37,99,235,.2)",
                    }}
                  >
                    <Mail size={26} color="#60a5fa" strokeWidth={1.6} />
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "rgba(96,165,250,.55)",
                      marginBottom: 12,
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#e2e8f0",
                      lineHeight: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    info@bcdees.com
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      color: "#3b82f6",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Send Email
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
                      <path
                        d="M3 7h8M7 3l4 4-4 4"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>

            {/* PHONE — opens dialer */}
            <Reveal delay={0.2}>
              <a
                href="tel:+2348034115756"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(37,99,235,.14)",
                    borderRadius: 20,
                    padding: "40px 28px 36px",
                    textAlign: "center",
                    transition: "all .35s",
                    cursor: "pointer",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(37,99,235,.08)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.35)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 48px rgba(0,0,0,.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.03)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,.14)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "rgba(37,99,235,.15)",
                      border: "1px solid rgba(37,99,235,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 4px 16px rgba(37,99,235,.2)",
                    }}
                  >
                    <Phone size={26} color="#60a5fa" strokeWidth={1.6} />
                  </div>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "rgba(96,165,250,.55)",
                      marginBottom: 12,
                    }}
                  >
                    Phone
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#e2e8f0",
                      lineHeight: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    +234 803 411 5756
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      color: "#3b82f6",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Call Now
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none">
                      <path
                        d="M3 7h8M7 3l4 4-4 4"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#040c1a",
          borderTop: "1px solid rgba(37,99,235,.08)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top bar — logo + nav + links */}
        <div
          style={{ maxWidth: 960, margin: "0 auto", padding: "40px 32px 28px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
              paddingBottom: 28,
              borderBottom: "1px solid rgba(255,255,255,.05)",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "linear-gradient(135deg,#2563EB,#0ea5e9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(37,99,235,.3)",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="BCDees"
                  width={19}
                  height={19}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#f1f5f9",
                  letterSpacing: "-.02em",
                }}
              >
                <span style={{ color: "#3b82f6" }}>BC</span>Dees
              </span>
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {NAV.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(148,163,184,.4)",
                    fontFamily: "inherit",
                    padding: "6px 14px",
                    borderRadius: 8,
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#93c5fd")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(148,163,184,.4)")
                  }
                >
                  {l}
                </button>
              ))}
            </nav>

            {/* Legal links */}
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "rgba(148,163,184,.22)",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#60a5fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(148,163,184,.22)")
                  }
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright + back to top */}
          <div
            style={{
              paddingTop: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "rgba(148,163,184,.18)",
                letterSpacing: ".07em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              © {new Date().getFullYear()} BCDees Global. All rights reserved.
              Built for Nigeria.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(148,163,184,.3)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontFamily: "inherit",
                transition: "color .2s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(148,163,184,.3)")
              }
            >
              <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                <path
                  d="M6 10V2M2 6l4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to top
            </button>
          </div>
        </div>

        {/* ── GIANT WATERMARK NAME — Pesa style: solid dark, bottom-cropped, holo glow on hover ── */}
        <style>{`
          .footer-wordmark {
            font-size: clamp(120px, 20vw, 280px);
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 0.82;
            color: #0e1a2e;
            display: block;
            white-space: nowrap;
            text-align: center;
            user-select: none;
            cursor: default;
            transition: color 0.6s ease, text-shadow 0.6s ease;
            position: relative;
          }
          .footer-wordmark:hover {
            color: #0e1a2e;
            text-shadow:
              0 0 40px rgba(56,189,248,0.55),
              0 0 80px rgba(37,99,235,0.4),
              0 0 120px rgba(14,165,233,0.25),
              0 0 200px rgba(37,99,235,0.15);
          }
        `}</style>
        <div
          style={{
            overflow: "hidden",
            marginTop: 8,
            /* crop ~35% off the bottom so text hides below fold like Pesa */
            height: "clamp(70px, 11vw, 160px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <span className="footer-wordmark">BCDees</span>
        </div>
      </footer>

      {/* Floating go-to-top button — appears when scrolled */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: 28,
            right: 24,
            zIndex: 80,
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#2563EB,#0ea5e9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(37,99,235,.5)",
            transition: "all .25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,.5)";
          }}
          title="Back to top"
        >
          <svg viewBox="0 0 14 14" width="16" height="16" fill="none">
            <path
              d="M7 11V3M3 7l4-4 4 4"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

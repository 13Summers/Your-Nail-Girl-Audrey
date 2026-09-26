import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Instagram, Star, MapPin, Mail, Menu, X, ArrowRight, Calendar, Sparkles, Heart, Clock, Eye, EyeOff, Upload, Copy, Check, LogOut, User as UserIcon, ImagePlus, Trash2, ChevronRight, Search, Edit2, Plus, Minus, ShieldCheck, Users, DollarSign, ChevronDown } from "lucide-react";

const SUPABASE_PROJECT_ID = "vrodyyjilujwjpbvdzkr";
import imgFrame2 from "@/imports/HomepageDesktop/e69d78d1a00d5fe688d283a6c69fbf69a9aa5013.png";
import imgHeroImage from "@/imports/HomepageDesktop/bcf9b889c2c7102b590fc8ac64436f6803a343e6.png";
import imgStudio1 from "@/imports/HomepageDesktop/48a11c40cc3eb52ed458f2d72ad7caccdbaae61e.png";
import imgStudio2 from "@/imports/HomepageDesktop/efa0bd5e2ea18d83f03f6d64a48bfab6ca579348.png";
import imgStudio3 from "@/imports/HomepageDesktop/SDP_9655.png";
import imgStudio4 from "@/imports/HomepageDesktop/SDP_0114.png";
import imgValueProp from "@/imports/HomepageDesktop/audrey-value-prop.png";
import imgExtensionsService from "@/imports/HomepageDesktop/Extensions Image.png";
import imgFillService from "@/imports/HomepageDesktop/Fill Image.png";
import imgFullRemovalService from "@/imports/HomepageDesktop/Full Removal Image.png";
import imgNailArtService from "@/imports/HomepageDesktop/Nail Art Image.png";
import imgNailFixService from "@/imports/HomepageDesktop/Nail Fix image.png";
import imgOverlayService from "@/imports/HomepageDesktop/Nail service image.png";
import imgGelPolishService from "@/imports/HomepageDesktop/Product Image.png";
import imgQuietEscapeBg from "@/imports/HomepageDesktop/bckgrnd-1.png";
import imgQuietEscape2Bg from "@/imports/HomepageDesktop/bckgrnd-2.png";
import imgQuietEscape4Bg from "@/imports/HomepageDesktop/bckgrnd-4.png";
import imgFinBackground from "@/imports/HomepageDesktop/fin-background.png";
import imgSDP9631 from "@/imports/HomepageDesktop/SDP_9631 small.png";
import imgSDP9540 from "@/imports/HomepageDesktop/SDP_9540.png";
import imgSDP0128 from "@/imports/HomepageDesktop/SDP_0128.png";
import asset5 from "@/imports/HomepageDesktop/SVG/Asset 5.svg";
import pocket from "@/imports/Frame2/pocket.png";
import asset35 from "@/imports/HomepageDesktop/SVG/Asset 35.svg";
import asset30 from "@/imports/HomepageDesktop/SVG/Asset 30.svg";
import asset2 from "@/imports/HomepageDesktop/SVG/Asset 2.svg";
import asset7 from "@/imports/HomepageDesktop/SVG/Asset 7.svg";
import asset6 from "@/imports/HomepageDesktop/SVG/Asset 6.svg";
import logo from "@/imports/HomepageDesktop/SVG/YNG-Logo.svg";


type Page = "home" | "portfolio" | "services" | "about" | "book" | "privacy" | "terms" | "signin" | "signup" | "dashboard" | "admin";

// ── Auth types & helpers ─────────────────────────────────────────────────────
type AppUser = {
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referralCredits: number;
  joinedDate: string;
  inspoImages: string[];
};

// ── API client ───────────────────────────────────────────────────────────────
const API_BASE = `http://127.0.0.1:54321/functions/v1/server`;
const ADMIN_TOKEN_KEY = "ynga_admin_token";

const SUPABASE_ANON_KEY = "PASTE_YOUR_LOCAL_ANON_KEY_HERE";

async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${token || SUPABASE_ANON_KEY}`,
      ...options.headers,},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function adminApi(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
  return api(path, { ...options, headers: { Authorization: `Bearer ${token}`, ...(options.headers ?? {}) } });
}

const STORE_KEY = "ynga_user";
const PORTFOLIO_GALLERY_KEY = "ynga_portfolio_gallery";

function loadUser(): AppUser | null {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null"); }
  catch { return null; }
}
function saveUser(u: AppUser) {
  localStorage.setItem(STORE_KEY, JSON.stringify(u));
}
function clearUser() {
  localStorage.removeItem(STORE_KEY);
}
function genReferralCode(name: string) {
  const prefix = name.trim().split(" ")[0].toUpperCase().slice(0, 4);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${suffix}`;
}
function validateEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePhone(p: string) { return /^\+?[\d\s\-().]{7,}$/.test(p); }
function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#e57373", "#e57373", "#f0a500", "#6B4F3A", "#5a9c6e"];
  return { score, label: labels[score] ?? "Strong", color: colors[score] ?? "#5a9c6e" };
}

const MOCK_APPOINTMENTS = [
  { id: 1, service: "Gel Full Set", date: "June 3, 2026", time: "11:00 AM", status: "Completed" },
  { id: 2, service: "Fill + Nail Art", date: "May 6, 2026", time: "2:00 PM", status: "Completed" },
  { id: 3, service: "Acrylic Full Set", date: "April 8, 2026", time: "10:00 AM", status: "Completed" },
];

// ── Shared: animal print overlay ────────────────────────────────────────────
function AnimalPrint({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ap" x="0" y="0" width="130" height="130" patternUnits="userSpaceOnUse">
            <ellipse cx="28" cy="24" rx="13" ry="8" fill="rgba(58,41,31,0.09)" transform="rotate(22 28 24)" />
            <path d="M13,16 Q7,24 13,31" stroke="rgba(58,41,31,0.07)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M42,15 Q50,24 45,33" stroke="rgba(58,41,31,0.07)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <ellipse cx="90" cy="72" rx="15" ry="9" fill="rgba(58,41,31,0.08)" transform="rotate(-18 90 72)" />
            <path d="M72,63 Q65,72 72,82" stroke="rgba(58,41,31,0.06)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M106,64 Q114,72 108,83" stroke="rgba(58,41,31,0.06)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="55" cy="108" rx="11" ry="7" fill="rgba(58,41,31,0.07)" transform="rotate(12 55 108)" />
            <path d="M42,100 Q37,108 43,116" stroke="rgba(58,41,31,0.05)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M67,99 Q73,108 68,117" stroke="rgba(58,41,31,0.05)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ap)" />
      </svg>
    </div>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#6B4F3A] text-[#6B4F3A]" />
      ))}
    </div>
  );
}

function formatAppointmentDate(value?: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatAppointmentTime(value?: string) {
  if (!value) return "";
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return value;
  const hour = Number(match[1]);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${match[2]} ${suffix}`;
}

type PortfolioLength = "short" | "medium" | "long" | "extra long";
type PortfolioArtwork = "solid" | "simple" | "custom";
type PortfolioImage = {
  id: string;
  src: string;
  title: string;
  createdAt: string;
  color: string;
  length: PortfolioLength;
  artwork: PortfolioArtwork;
  style: string;
  season: string;
};

const galleryFilterOptions = {
  color: ["Neutral", "Pink", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Brown", "Black", "White", "Chrome", "Multi"],
  length: ["short", "medium", "long", "extra long"] as PortfolioLength[],
  artwork: ["solid", "simple", "custom"] as PortfolioArtwork[],
  style: ["Classic", "French", "Minimal", "Chrome", "Animal", "Floral", "Abstract", "Patriotic", "Statement"],
  season: ["Everyday", "Spring", "Summer", "Fall", "Winter", "Holiday"],
};

const portfolioGalleryImageModules = import.meta.glob<string>(
  "../imports/HomepageDesktop/PortfolioGallery/*.{jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
);

type PortfolioGallerySeed = Omit<PortfolioImage, "id" | "src" | "createdAt"> & {
  file: string;
};

const portfolioGallerySeeds: PortfolioGallerySeed[] = [
  { file: "asset-1.jpeg", title: "Pink Polka Dot French", color: "Pink", length: "short", artwork: "simple", style: "French", season: "Spring" },
  { file: "asset-2.jpeg", title: "Tropical 3D Floral", color: "Multi", length: "medium", artwork: "custom", style: "Floral", season: "Summer" },
  { file: "asset-3.jpeg", title: "Blue Daisy Short", color: "White", length: "short", artwork: "custom", style: "Floral", season: "Spring" },
  { file: "asset-4.jpeg", title: "Monochrome Bow Chrome", color: "Multi", length: "medium", artwork: "custom", style: "Statement", season: "Everyday" },
  { file: "asset-5.jpeg", title: "Blue Pink Leopard Statement", color: "Multi", length: "medium", artwork: "custom", style: "Animal", season: "Summer" },
  { file: "asset-6.jpeg", title: "Bright Citrus Summer", color: "Multi", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset-7.jpeg", title: "Blueberry Polka Dot French", color: "White", length: "medium", artwork: "custom", style: "French", season: "Summer" },
  { file: "asset-8.jpeg", title: "Hot Pink Abstract French", color: "Pink", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset-9.jpeg", title: "Orange Aura Almond", color: "Orange", length: "long", artwork: "simple", style: "Abstract", season: "Summer" },
  { file: "asset-10.jpeg", title: "Colorful Abstract Line Art", color: "Multi", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset-53.jpeg", title: "Maximal Summer Statement", color: "Multi", length: "long", artwork: "custom", style: "Statement", season: "Summer" },
  { file: "asset-55.jpeg", title: "Pink Aqua Striped French", color: "Multi", length: "medium", artwork: "simple", style: "French", season: "Summer" },
  { file: "asset-56.jpeg", title: "Berry Star Polka Dot", color: "Multi", length: "short", artwork: "custom", style: "Abstract", season: "Everyday" },
  { file: "asset-57.jpeg", title: "Pink Star French", color: "Pink", length: "medium", artwork: "custom", style: "French", season: "Summer" },
  { file: "asset-58.jpeg", title: "Neon Summer Abstract", color: "Multi", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset-59.jpeg", title: "Jewel Tone Gold Accent", color: "Multi", length: "short", artwork: "custom", style: "Abstract", season: "Fall" },
  { file: "asset-60.jpeg", title: "Pink Bow French", color: "Pink", length: "medium", artwork: "custom", style: "French", season: "Spring" },
  { file: "asset-61.jpeg", title: "Rainbow Stripe French", color: "Multi", length: "short", artwork: "simple", style: "French", season: "Summer" },
  { file: "asset-62.jpeg", title: "Playful Summer Icon", color: "Multi", length: "short", artwork: "custom", style: "Statement", season: "Summer" },
  { file: "asset-63.jpeg", title: "Green Gold Swirl", color: "Green", length: "short", artwork: "custom", style: "Abstract", season: "Fall" },
  { file: "asset-64.jpeg", title: "Purple Zebra Short", color: "Purple", length: "short", artwork: "custom", style: "Animal", season: "Everyday" },
  { file: "asset-65.jpeg", title: "Pearl Chrome Bow French", color: "White", length: "medium", artwork: "custom", style: "Chrome", season: "Everyday" },
  { file: "asset-66.jpeg", title: "Black Star French", color: "Black", length: "medium", artwork: "custom", style: "French", season: "Winter" },
  { file: "asset 12.jpeg", title: "Mixed Floral Statement", color: "Multi", length: "extra long", artwork: "custom", style: "Statement", season: "Summer" },
  { file: "asset 13.jpeg", title: "Maximal Mixed Art", color: "Multi", length: "extra long", artwork: "custom", style: "Statement", season: "Summer" },
  { file: "asset 14.jpeg", title: "Turquoise Studded Short", color: "Blue", length: "short", artwork: "simple", style: "Minimal", season: "Summer" },
  { file: "asset 15.jpeg", title: "Red White Blue French", color: "Multi", length: "medium", artwork: "simple", style: "Patriotic", season: "Holiday" },
  { file: "asset 16.jpeg", title: "Short Star Accent", color: "Multi", length: "short", artwork: "simple", style: "Patriotic", season: "Holiday" },
  { file: "asset 18.jpeg", title: "Blue Star Custom", color: "Blue", length: "medium", artwork: "custom", style: "Patriotic", season: "Holiday" },
  { file: "asset 19.jpeg", title: "Patriotic Bow Art", color: "Multi", length: "medium", artwork: "custom", style: "Patriotic", season: "Holiday" },
  { file: "asset 20.jpeg", title: "Flag Inspired Almond", color: "Multi", length: "long", artwork: "custom", style: "Patriotic", season: "Holiday" },
  { file: "asset 21.jpeg", title: "Bright Chrome Summer", color: "Multi", length: "long", artwork: "custom", style: "Chrome", season: "Summer" },
  { file: "asset 22.jpeg", title: "Celestial Fantasy", color: "Multi", length: "long", artwork: "custom", style: "Statement", season: "Summer" },
  { file: "asset 23.jpeg", title: "White Rhinestone French", color: "White", length: "medium", artwork: "custom", style: "French", season: "Holiday" },
  { file: "asset 24.jpeg", title: "Red French Tip", color: "Red", length: "medium", artwork: "simple", style: "French", season: "Holiday" },
  { file: "asset 25.jpeg", title: "Rainbow French Almond", color: "Multi", length: "long", artwork: "simple", style: "French", season: "Summer" },
  { file: "asset 26.jpeg", title: "Burgundy Celestial", color: "Red", length: "long", artwork: "custom", style: "Statement", season: "Fall" },
  { file: "asset 27.jpeg", title: "Pink Moon Accent", color: "Pink", length: "medium", artwork: "simple", style: "Abstract", season: "Everyday" },
  { file: "asset 28.jpeg", title: "Bright Abstract Short", color: "Multi", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset 29.jpeg", title: "Soft Natural Ombre", color: "Neutral", length: "medium", artwork: "solid", style: "Classic", season: "Everyday" },
  { file: "asset 30.jpeg", title: "Pastel Floral Accent", color: "Multi", length: "medium", artwork: "custom", style: "Floral", season: "Spring" },
  { file: "asset 31.jpeg", title: "Mauve Strawberries", color: "Pink", length: "long", artwork: "simple", style: "Abstract", season: "Fall" },
  { file: "asset 32.jpeg", title: "Beach Floral Almond", color: "Multi", length: "long", artwork: "custom", style: "Floral", season: "Summer" },
  { file: "asset 33.jpeg", title: "Gold Bow French", color: "White", length: "long", artwork: "custom", style: "French", season: "Holiday" },
  { file: "asset 34.jpeg", title: "Tropical Mixed Art", color: "Multi", length: "medium", artwork: "custom", style: "Floral", season: "Summer" },
  { file: "asset 35.jpeg", title: "Soft Pink French", color: "Pink", length: "medium", artwork: "simple", style: "French", season: "Spring" },
  { file: "asset 36.jpeg", title: "Pop Art Short", color: "Multi", length: "short", artwork: "simple", style: "Statement", season: "Summer" },
  { file: "asset 37.jpeg", title: "Pastel Floral French", color: "Multi", length: "medium", artwork: "simple", style: "Floral", season: "Spring" },
  { file: "asset 38.jpeg", title: "Candy Stripe Abstract", color: "Multi", length: "medium", artwork: "custom", style: "Abstract", season: "Summer" },
  { file: "asset 39.jpeg", title: "Pink Tortoise Star", color: "Brown", length: "medium", artwork: "custom", style: "Animal", season: "Fall" },
  { file: "asset 40.jpeg", title: "Coral Chrome Short", color: "Red", length: "short", artwork: "simple", style: "Chrome", season: "Summer" },
  { file: "asset 41.jpeg", title: "Orange Floral French", color: "Orange", length: "medium", artwork: "custom", style: "Floral", season: "Fall" },
  { file: "asset 42.jpeg", title: "Bright Animal Print", color: "Multi", length: "medium", artwork: "custom", style: "Animal", season: "Summer" },
  { file: "asset 43.jpeg", title: "Pink Zebra Tortoise", color: "Brown", length: "long", artwork: "custom", style: "Animal", season: "Fall" },
  { file: "asset 44.jpeg", title: "Yellow Studded French", color: "Yellow", length: "medium", artwork: "simple", style: "French", season: "Spring" },
  { file: "asset 45.jpeg", title: "White Floral Rhinestone", color: "White", length: "medium", artwork: "custom", style: "Floral", season: "Spring" },
  { file: "asset 46.jpeg", title: "Short Floral Marble", color: "Pink", length: "short", artwork: "custom", style: "Floral", season: "Spring" },
  { file: "asset 47.jpeg", title: "Green Celestial French", color: "Green", length: "long", artwork: "custom", style: "Statement", season: "Holiday" },
  { file: "asset 48.jpeg", title: "Pastel Lace Floral", color: "Yellow", length: "medium", artwork: "custom", style: "Floral", season: "Spring" },
  { file: "asset 49.jpeg", title: "Tropical Animal Print", color: "Multi", length: "short", artwork: "custom", style: "Animal", season: "Summer" },
  { file: "asset 50.jpeg", title: "Blue Dot French", color: "Blue", length: "short", artwork: "simple", style: "French", season: "Summer" },
  { file: "asset 51.jpeg", title: "Pink Giraffe Mixed", color: "Pink", length: "short", artwork: "custom", style: "Animal", season: "Summer" },
  { file: "asset 52.jpeg", title: "Aqua Floral French", color: "Blue", length: "medium", artwork: "custom", style: "Floral", season: "Summer" },
  { file: "asset 54.jpeg", title: "Purple Chrome Plaid", color: "Chrome", length: "medium", artwork: "custom", style: "Chrome", season: "Winter" },
];

const defaultPortfolioGallery: PortfolioImage[] = portfolioGallerySeeds.map(({ file, ...details }, index) => ({
  id: `portfolio-gallery-${file.replace(/\D/g, "")}`,
  src: portfolioGalleryImageModules[`../imports/HomepageDesktop/PortfolioGallery/${file}`] ?? "",
  createdAt: new Date(Date.UTC(2026, 6, 10 - index, 12)).toISOString(),
  ...details,
}));

function prettyTag(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function loadPortfolioGallery(): PortfolioImage[] {
  try {
    const stored = JSON.parse(localStorage.getItem(PORTFOLIO_GALLERY_KEY) || "null");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch {}
  return defaultPortfolioGallery;
}

function savePortfolioGallery(items: PortfolioImage[]) {
  localStorage.setItem(PORTFOLIO_GALLERY_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("portfolio-gallery-updated"));
}

async function fetchPortfolioGallery() {
  const data = await api("/portfolio-gallery");
  return Array.isArray(data.gallery) && data.gallery.length ? data.gallery as PortfolioImage[] : defaultPortfolioGallery;
}

async function saveAdminPortfolioGallery(items: PortfolioImage[]) {
  const data = await adminApi("/admin/portfolio-gallery", {
    method: "PUT",
    body: JSON.stringify({ gallery: items }),
  });
  return Array.isArray(data.gallery) ? data.gallery as PortfolioImage[] : items;
}

function prepareGalleryImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read image"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Unable to load image"));
      img.onload = () => {
        const maxSide = 1400;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function Nav({ current, navigate, user, onSignOut }: {
  current: Page;
  navigate: (p: Page) => void;
  user: AppUser | null;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "My Work", page: "portfolio" },
    { label: "Services", page: "services" },
    { label: "About", page: "about" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255,255,255,0.08)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
        boxShadow: scrolled ? "0 1px 20px rgba(44,26,14,0.08)" : "none",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        <button
          onClick={() => navigate("home")}
          className="flex items-center"
          aria-label="Your Nail Girl Audrey - Home"
        >
          <img
            src={logo}
            alt="Your Nail Girl Audrey"
            className="h-12 w-auto"
          />
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.page} onClick={() => navigate(l.page)}
              className="text-base font-['Instrument_Sans',sans-serif] font-medium text-[#3a291f] tracking-wide transition-all hover:opacity-60 relative group">
              {l.label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-[#6B4F3A] transition-all duration-300 ${current === l.page ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <button onClick={() => navigate("dashboard")}
                className="flex items-center gap-2 text-sm font-['Instrument_Sans',sans-serif] font-medium text-[#3a291f] hover:text-[#6B4F3A] transition-colors">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#3A291F]"
                  style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span>{user.name.split(" ")[0]}</span>
              </button>
              <button onClick={() => navigate("book")}
                className="bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-[#6B4F3A] hover:shadow-lg transition-all hover:scale-105">
                Book Now
              </button>
            </>
          ) : (
            <>
            {/*
              <button onClick={() => navigate("signin")}
                className="border border-[#3A291F] text-[#3A291F] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#3A291F] hover:text-[#FAF5EF] transition-all">
                Sign In / Join
              </button>
              */}
              <button onClick={() => navigate("book")}
                className="bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-7 py-3.5 rounded-full hover:bg-[#6B4F3A] hover:shadow-lg transition-all hover:scale-105">
                Book Now
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#3a291f] min-w-11 min-h-11 flex items-center justify-center"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#f5ece0] border-t border-[rgba(58,41,31,0.1)] px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <button key={l.page} onClick={() => { navigate(l.page); setOpen(false); }}
              className="text-left text-base font-['Instrument_Sans',sans-serif] font-medium text-[#3a291f] hover:text-[#6B4F3A] transition-colors">
              {l.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-[rgba(58,41,31,0.1)]">
            {user && (
              <>
                <button onClick={() => { navigate("dashboard"); setOpen(false); }}
                  className="text-left text-sm font-['Instrument_Sans',sans-serif] font-medium text-[#3a291f]">
                  My Dashboard
                </button>
                <button onClick={() => { onSignOut(); setOpen(false); }}
                  className="text-left text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e]">
                  Sign Out
                </button>
              </>
            )}
            <button onClick={() => { navigate("book"); setOpen(false); }}
              className="bg-[#3A291F] text-[#FAF5EF] text-sm font-semibold uppercase tracking-widest px-6 py-3 rounded-full text-center transition-colors hover:bg-[#6B4F3A]">
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="relative z-10 bg-[#3A291F] text-[#FAF5EF] px-6 md:px-20 py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-6">
            <div>
          
              <h2 className="font-['Instrument_Serif',serif] text-3xl md:text-4xl text-[#F5ECE0] leading-tight">Your Nail Girl Audrey</h2>
            </div>
            <p className="max-w-md text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] leading-relaxed">
              Licensed nail technician in North Salt Lake, Utah.
            </p>
            <div className="space-y-2 font-['Instrument_Sans',sans-serif] text-sm text-[#FAF5EF]">
              <a href="mailto:Yournailgirlaudrey@gmail.com" className="block w-fit transition-colors hover:text-[#d6b470]">
                Yournailgirlaudrey@gmail.com
              </a>
              <a href="tel:+13852025742" className="block w-fit transition-colors hover:text-[#d6b470]">
                385-202-5742
              </a>
            </div>
            <div className="flex items-center gap-4">
             
              <a href="https://www.instagram.com/yournailgirlaudrey/" target="_blank" rel="noopener noreferrer" aria-label="Audrey on Instagram" title="Audrey on Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#3a291f] text-[#FAF5EF] hover:bg-[#6B4F3A] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:Yournailgirlaudrey@gmail.com" aria-label="Email Audrey" title="Email Audrey" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#3a291f] text-[#FAF5EF] hover:bg-[#6B4F3A] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
             
              <div className="space-y-3 text-sm font-['Instrument_Sans',sans-serif] text-[#FAF5EF]">
                <button onClick={() => navigate("portfolio")} className="block text-left w-full font-normal hover:text-[#6B4F3A] transition-colors">My Work</button>
                <button onClick={() => navigate("about")} className="block text-left w-full font-normal hover:text-[#6B4F3A] transition-colors">About</button>
              </div>
            </div>
            <div>
           
              <div className="space-y-3 text-sm font-['Instrument_Sans',sans-serif] text-[#FAF5EF]">
                <button onClick={() => navigate("book")} className="block text-left w-full font-normal hover:text-[#6B4F3A] transition-colors">Book Now</button>
                <button onClick={() => navigate("services")} className="block text-left w-full font-normal hover:text-[#6B4F3A] transition-colors">Services</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(255,255,255,0.08)] pt-8 text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Your Nail Girl Audrey. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-6 items-center">
            <button onClick={() => navigate("privacy")} className="text-[#FAF5EF] hover:text-[#6B4F3A] transition-colors">Privacy Policy</button>
            <button onClick={() => navigate("terms")} className="text-[#FAF5EF] hover:text-[#6B4F3A] transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── PRIVACY POLICY ──────────────────────────────────────────────────────────
function PrivacyPage({ navigate }: { navigate: (p: Page) => void }) {
  const sections = [
    {
      title: "Information we collect",
      body: "We may collect information you provide when you book an appointment, create an account, contact Audrey, or share nail inspiration. This can include your name, email address, phone number, appointment details, and the images you choose to upload. Our booking partner may also collect payment information directly to process your appointment.",
    },
    {
      title: "How we use your information",
      body: "We use your information to provide and personalize services, manage appointments, communicate about bookings, maintain your account, and improve the website experience. We may also use it to respond to questions, resolve service issues, and meet legal or business obligations.",
    },
    {
      title: "Booking & payment partners",
      body: "Appointments are managed through Square Appointments. When you book, Square’s own privacy policy and terms apply to the information you provide there, including payment details. Your Nail Girl Audrey does not store your full payment card information on this website.",
    },
    {
      title: "Sharing your information",
      body: "We do not sell your personal information. We share information only when needed to operate our services, such as with our booking and website service providers, when required by law, or when you have asked or given permission for us to do so.",
    },
    {
      title: "Photos & nail inspiration",
      body: "Images you upload to your account are used to help Audrey prepare for your appointment. Photos of completed services are only used in our portfolio or social media with your consent. You can ask us to remove a shared image by contacting Audrey.",
    },
    {
      title: "Cookies & local storage",
      body: "This website may use browser storage to remember your account session, saved inspiration, and site preferences. You can clear or manage this information through your browser settings, although doing so may affect some website features.",
    },
    {
      title: "Your choices",
      body: "You may request access to, correction of, or deletion of the personal information we hold about you, subject to applicable legal requirements. To make a request or close an account, please contact Audrey through Instagram.",
    },
    {
      title: "Updates to this policy",
      body: "We may update this Privacy Policy from time to time. The most current version will always appear on this page with its updated date. Continued use of the website after an update means you acknowledge the revised policy.",
    },
  ];

  return (
    <main className="pt-20 bg-[#f5ece0] text-[#3A291F]">
      <section className="relative overflow-hidden bg-[#3A291F] px-6 py-20 md:px-20 md:py-28">
        <AnimalPrint opacity={0.32} />
        <div className="relative mx-auto max-w-[920px]">
          <h1 className="font-['Instrument_Serif',serif] text-5xl leading-[0.95] text-[#F5ECE0] md:text-7xl">Privacy<br />Policy</h1>
          <p className="mt-7 font-['Instrument_Sans',sans-serif] text-sm text-[#d9cabe]">Last updated: September 8, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-20 md:py-24">
        <div className="mx-auto grid max-w-[920px] gap-12 md:grid-cols-[220px_1fr]">
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="font-['Instrument_Serif',serif] text-3xl leading-tight">Your information,<br />handled with care.</p>
            <button onClick={() => navigate("book")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3A291F] px-5 py-3 font-['Instrument_Sans',sans-serif] text-xs font-semibold uppercase tracking-widest text-[#FAF5EF] transition-all hover:scale-[1.02] hover:bg-[#6B4F3A]">
              Book an appointment <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </aside>

          <div>
            <p className="border-b border-[rgba(58,41,31,0.16)] pb-8 font-['Instrument_Sans',sans-serif] text-base leading-relaxed text-[#6b4f3a]">
              This Privacy Policy explains how Your Nail Girl Audrey collects, uses, and protects information when you use this website or book a service.
            </p>
            <div className="divide-y divide-[rgba(58,41,31,0.16)]">
              {sections.map((section, index) => (
                <article key={section.title} className="grid gap-3 py-8 md:grid-cols-[44px_1fr] md:gap-5">
                  <p className="font-['Instrument_Sans',sans-serif] text-xs font-bold tracking-widest text-[#a8917e]">0{index + 1}</p>
                  <div>
                    <h2 className="font-['Instrument_Serif',serif] text-3xl leading-tight">{section.title}</h2>
                    <p className="mt-3 font-['Instrument_Sans',sans-serif] text-sm leading-7 text-[#6b4f3a]">{section.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-white px-7 py-8 shadow-[0_12px_30px_rgba(58,41,31,0.06)]">
              <h2 className="font-['Instrument_Serif',serif] text-3xl">Privacy questions?</h2>
              <p className="mt-2 font-['Instrument_Sans',sans-serif] text-sm leading-6 text-[#6b4f3a]">For questions or requests about your personal information, please contact Audrey through Instagram.</p>
              <a href="https://www.instagram.com/yournailgirlaudrey/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-['Instrument_Sans',sans-serif] text-sm font-semibold text-[#3A291F] underline decoration-[#d6b470] decoration-2 underline-offset-4 hover:text-[#6B4F3A]">Message Audrey on Instagram <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── TERMS OF SERVICE ─────────────────────────────────────────────────────────
function TermsPage({ navigate, sectionId }: { navigate: (p: Page, sectionId?: string) => void; sectionId?: string }) {
  useEffect(() => {
    if (!sectionId) return;
    requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [sectionId]);

  const sections = [
    {
      title: "Using this website",
      body: "You may use this website to learn about services, view Audrey’s work, and request or manage appointments. Please provide accurate, current information when booking or creating an account. You may not use the site in a way that interferes with its operation or another guest’s experience.",
    },
    {
      title: "Appointments & bookings",
      body: "Appointments are requested and managed through our booking partner, Square Appointments. Availability, service details, pricing, deposits, and payment terms shown during checkout are part of your booking. A booking is not confirmed until you receive confirmation through the booking system.",
    },
    {
      title: "Cancellations & late arrivals",
      body: [
        "Your appointment time is reserved especially for you. Cancellations and rescheduling requests must be made at least 24 hours before your appointment. A cancellation made with fewer than 24 hours notice may result in a late-cancellation fee of 50% to 100% of the scheduled service price.",
        "If you do not arrive for your appointment and do not provide notice, you may be charged the full remaining service amount. Repeated late cancellations or no-shows may result in restrictions on, or refusal of, future bookings. If an emergency arises, please contact Audrey as soon as possible so that any available options can be discussed. Late arrivals may also shorten your service or require rescheduling, and applicable fees may still apply.",
      ],
    },
    {
      title: "Services & care",
      body: "Please share any allergies, sensitivities, injuries, or other relevant information before your appointment. Service results can vary depending on nail condition, aftercare, and daily activities. Repairs for breaks or lifting are complimentary within 10 days of an appointment; after 10 days, repairs are $3 per nail. This repair policy does not apply when booking a new set.",
    },
    {
      title: "Photos & content",
      body: "All photographs, designs, copy, and other content on this website belong to Your Nail Girl Audrey or are used with permission. Please do not copy, reproduce, or use this content without written permission. With your consent, photos of completed services may be shared in our portfolio or on social media.",
    },
    {
      title: "Third-party services",
      body: "This site may link to third-party websites and services, including Square and Instagram. Their terms and privacy practices apply when you use those services. Your Nail Girl Audrey is not responsible for third-party content, availability, or policies.",
    },
    {
      title: "Changes to these terms",
      body: "We may update these Terms of Service from time to time. The latest version will always be posted here with its updated date. By continuing to use this website or book services after an update, you agree to the revised terms.",
    },
  ];

  return (
    <main className="pt-20 bg-[#f5ece0] text-[#3A291F]">
      <section className="relative overflow-hidden bg-[#3A291F] px-6 py-20 md:px-20 md:py-28">
        <AnimalPrint opacity={0.32} />
        <div className="relative mx-auto max-w-[920px]">
          <h1 className="font-['Instrument_Serif',serif] text-5xl leading-[0.95] text-[#F5ECE0] md:text-7xl">Terms of<br />Service</h1>
          <p className="mt-7 font-['Instrument_Sans',sans-serif] text-sm text-[#d9cabe]">Last updated: September 8, 2026</p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-20 md:py-24">
        <div className="mx-auto grid max-w-[920px] gap-12 md:grid-cols-[220px_1fr]">
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="font-['Instrument_Serif',serif] text-3xl leading-tight">A few simple<br />ground rules.</p>
            <button onClick={() => navigate("book")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3A291F] px-5 py-3 font-['Instrument_Sans',sans-serif] text-xs font-semibold uppercase tracking-widest text-[#FAF5EF] transition-all hover:scale-[1.02] hover:bg-[#6B4F3A]">
              Book an appointment <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </aside>

          <div>
            <p className="border-b border-[rgba(58,41,31,0.16)] pb-8 font-['Instrument_Sans',sans-serif] text-base leading-relaxed text-[#6b4f3a]">
              These Terms of Service govern your use of the Your Nail Girl Audrey website and services. By browsing this site, booking an appointment, or creating an account, you agree to these terms.
            </p>
            <div className="divide-y divide-[rgba(58,41,31,0.16)]">
              {sections.map((section, index) => (
                <article key={section.title} id={section.title === "Cancellations & late arrivals" ? "cancellations" : undefined} className="grid gap-3 py-8 scroll-mt-28 md:grid-cols-[44px_1fr] md:gap-5">
                  <p className="font-['Instrument_Sans',sans-serif] text-xs font-bold tracking-widest text-[#a8917e]">0{index + 1}</p>
                  <div>
                    <h2 className="font-['Instrument_Serif',serif] text-3xl leading-tight">{section.title}</h2>
                    {Array.isArray(section.body) ? (
                      <div className="mt-3 space-y-4">
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className="font-['Instrument_Sans',sans-serif] text-sm leading-7 text-[#6b4f3a]">{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 font-['Instrument_Sans',sans-serif] text-sm leading-7 text-[#6b4f3a]">{section.body}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-white px-7 py-8 shadow-[0_12px_30px_rgba(58,41,31,0.06)]">
              <h2 className="font-['Instrument_Serif',serif] text-3xl">Questions?</h2>
              <p className="mt-2 font-['Instrument_Sans',sans-serif] text-sm leading-6 text-[#6b4f3a]">For questions about these terms or an upcoming appointment, please contact Audrey through Instagram.</p>
              <a href="https://www.instagram.com/yournailgirlaudrey/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-['Instrument_Sans',sans-serif] text-sm font-semibold text-[#3A291F] underline decoration-[#d6b470] decoration-2 underline-offset-4 hover:text-[#6B4F3A]">Message Audrey on Instagram <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ navigate, user }: { navigate: (p: Page) => void; user: AppUser | null }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const testimonials = [
    {
      quote: "Audrey is a true nail magician! I showed her a design and she turned it into sparkling reality.",
      name: "Tyra K.",
      rotate: "-1.75deg",
    },
    {
      name: "Emma K.",
      quote: "Audrey is an absolute artist. I showed her a photo on Pinterest and she nailed it perfectly. My nails have never looked so good.",
      rotate: "1.25deg",
    },
    {
      quote: "The private studio vibe is everything. It's just you and Audrey, which makes it feel so relaxed and special.",
      name: "Sarah M.",
      rotate: "-1deg",
    },
    {
      quote: "Audrey has a magical touch! My nails have never looked better, and the atmosphere is so relaxing.",
      name: "Samantha R.",
      rotate: "1.5deg",
    },
    {
      quote: "Professional, friendly, and talented. I always leave feeling pampered and beautiful.",
      name: "Carla D.",
      rotate: "-1.35deg",
    },
    {
      quote: "The best nail experience I've had. Attention to detail and great customer care every time.",
      name: "Mia T.",
      rotate: "1.75deg",
    },
    {
      quote: "I always leave feeling polished and confident — Audrey is incredible.",
      name: "Lena P.",
      rotate: "-0.8deg",
    },
    {
      quote: "Meticulous work and such a calm studio. Highly recommend.",
      name: "Nora S.",
      rotate: "0.5deg",
    },
    {
      quote: "My nails last longer and look better than anywhere else.",
      name: "Olivia R.",
      rotate: "-1.25deg",
    },
    {
      quote: "Perfect color matching and gorgeous finishes every time.",
      name: "Jade L.",
      rotate: "1deg",
    },
    {
      quote: "Friendly, professional, and the art is next level.",
      name: "Hannah B.",
      rotate: "-0.6deg",
    },
    {
      quote: "Booked again and again — Audrey always delivers.",
      name: "Maya C.",
      rotate: "0.9deg",
    },
  ];

  const handleTestimonialScroll = useCallback(() => {
    const track = testimonialTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-testimonial-card]"));
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    setActiveTestimonial(closestIndex);
  }, []);

  const scrollToTestimonial = useCallback((index: number) => {
    const track = testimonialTrackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-testimonial-card]")[index];
    if (!track || !card) return;
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
    setActiveTestimonial(index);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const track = testimonialTrackRef.current;
      if (!track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        track.scrollLeft = track.scrollLeft >= maxScroll ? 0 : track.scrollLeft + 1;
      }
    }, 50);

    return () => window.clearInterval(intervalId);
  }, []);

  // Load Behold widget script for Instagram feed (used on Home and Portfolio)
  useEffect(() => {
    if (!BEHOLD_FEED_ID) return;
    const existing = document.querySelector('script[src*="behold.so"]');
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://w.behold.so/widget.js";
    s.type = "module";
    document.head.appendChild(s);
  }, []);

  const features = [
    {
      icon: asset35,
      title: "Extensions",
      desc: "Full set with added length and structure. Price varies based on length. Includes one solid color. - $50-65 base price",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/XUTWXK33QFSZXUEDSHCZWY2A",
      swatch: "linear-gradient(145deg, #F5ECE0 0%, #f0d8c0 54%, #A8917E 100%)",
      tilt: "lg:-rotate-[0.5deg]",
    },
    {
      icon: asset30,
      title: "Fill",
      desc: "Maintenance for existing sets. At least 7 remaining nails from your previous set or this will be booked as a new set - $45 base price",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/4JFY2PIPNTIQRJGCCLONDEVF",
      swatch: "linear-gradient(145deg, #F5ECE0 0%, #FAF5EF 56%, #F5ECE0 100%)",
      tilt: "lg:rotate-[1deg]",
    },
    {
      icon: asset2,
      title: "Overlay on Natural Nails",
      desc: "Structured overlay designed to add strength and support to your natural nails without adding length. Includes one solid color. - $45 base price",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/43L2AZCDMAXR5OVLXDMSE63L",
      swatch: "linear-gradient(145deg, #F5ECE0 0%, #F5ECE0 54%, #A8917E 100%)",
      tilt: "lg:-rotate-[1deg]",
    },
    {
      icon: asset7,
      title: "Gel Polish Only",
      desc: "Gel polish applied to the natural nail with no added structure or length. Includes one solid color. - $30 base price",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/L456CSN73YCPCOFH76S6AAAY",
      swatch: "linear-gradient(145deg, #A8917E 0%, #A8917E 58%, #A8917E 100%)",
      tilt: "lg:-rotate-[0.5deg]",
    },
    
    {
      icon: asset6,
      title: "Full Removal",
      desc: "Complete removal of gel or enhancements, done safely to protect the natural nail. - $15",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/GYKES4GH5DCNQ3QE76GZXCJS",
      swatch: "linear-gradient(145deg, #F5ECE0 0%, #F5ECE0 55%, #A8917E 100%)",
      tilt: "lg:rotate-[0.5deg]",
    },
    {
      icon: asset5,
      title: "Nail Fix",
      desc: "Free repair for breaks or lifting within 10 days of your appointment. After 10 days, $3 per nail. Not applicable when booking a new set.",
      serviceUrl: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/REFPQSKFES3ANMSX4RMIA647",
      swatch: "linear-gradient(145deg, #A8917E 0%, #A8917E 55%, #A8917E 100%)",
      tilt: "lg:rotate-[0.8deg]",
    },
  ];

  return (
    <div className="bg-transparent overflow-x-clip">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">

        {/* Wallpaper — full bleed, parallax */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, willChange: "transform" }}
        >
          <img src={imgFrame2} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Gradient — right-to-left, text side stays readable */}
        <div className="absolute inset-0 bg-gradient-to-l from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.73)]" />

        {/* ── Mobile layout: stacked ── */}
        <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col pt-32 md:hidden">
          {/* Text content */}
          <div className="px-6 pb-8">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="space-y-7">
              <div>
                <p className="text-[14px] uppercase tracking-[4px] font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mb-4">North Salt Lake, Utah</p>
                <h1 className="font-['Instrument_Serif',serif] text-4xl text-[#3A291F] leading-[1.08] mb-5">
                  Chic, Custom Nails in North Salt Lake
                </h1>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] leading-relaxed">
                  Your Nail Girl Audrey is a private nail studio offering gel nails, acrylics, manicures, and custom nail art — every set personal, elevated, and designed for you.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image — full width below content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative mt-auto h-[68svh] min-h-[460px] max-h-[620px] w-full"
          >
            <img
              src={imgHeroImage}
              alt="Audrey — Your Nail Girl"
              className="w-full h-full object-contain object-bottom"
            />
          </motion.div>
        </div>

        {/* ── Desktop layout: side-by-side, reduced height ── */}
        <div className="hidden md:block h-[70svh] min-h-[480px]">
          {/* Image — right half, absolute */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
          >
            <img
              src={imgHeroImage}
              alt="Audrey — Your Nail Girl"
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          </motion.div>

          {/* Text — left half, vertically centered */}
          <div className="relative z-10 h-full flex items-center px-16 xl:px-24">
            <div className="w-1/2 max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                <div>
                  
                  <h1 className="mb-5 font-['Instrument_Serif',serif] text-[96px] leading-[0.95] text-[#3a291f]">

  Private Nail Tech in North Salt Lake
</h1>
                  <p className="font-['Instrument_Sans',sans-serif] text-base text-[#6b4f3a] leading-relaxed max-w-md">
                    Audrey is a licensed nail technician who specializes in structured gel manicures, extensions and custom nail art from her private home studio.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Quick Action Bar ── */}
      <div className="flex h-20 border-y border-[rgba(58,41,31,0.12)]">
        <button
          onClick={() => navigate("book")}
          className="flex-1 bg-[#3a291f] text-[#FAF5EF] flex items-center justify-center gap-3 font-['Instrument_Sans',sans-serif] text-sm uppercase tracking-[3px] hover:bg-[#6B4F3A] transition-colors group"
        >
          <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Book an Appointment
        </button>
        <button
    
          onClick={() => navigate("portfolio")}
          className="flex-1 bg-[#6B4F3A] text-white flex items-center justify-center gap-3 font-['Instrument_Sans',sans-serif] text-sm uppercase tracking-[3px] hover:bg-[#3A291F] transition-colors border-l border-white/20 group"
        >
          <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
          See My Work
        </button>
      </div>


      {/* ── Trust Strip ── */}
      <section className="relative overflow-hidden bg-[#F5ECE0] px-6 md:px-16 py-[72px] md:py-24">
        <img
          src={imgQuietEscapeBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-[1312px] mx-auto"
        >
          <div className="mb-16 md:mb-20">

            <h2 className="font-['Instrument_Serif',serif] text-[44px] sm:text-6xl md:text-[52px] text-[#3A291F] leading-[0.98] max-w-[1120px]">
              Services
            </h2>
           
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10 justify-items-center">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative z-10 hover:z-50 w-full md:max-w-[520px] bg-white rounded-[12px] p-6 min-h-[220px] flex flex-col items-center text-center shadow-[0_12px_24px_rgba(58,41,31,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_18px_36px_rgba(58,41,31,0.08)] ${f.tilt}`}
              >
                <div className="mb-2">
                  {(() => {
                    const Icon = f.icon as any;
                    if (!Icon) return null;
                    // Render icon inside a circular background and center contents
                    const circleCls = "w-18 h-18 rounded-full bg-[#A8917E] flex items-center justify-center mx-auto mb-3";
                    if (typeof Icon === "string") {
                      return (
                        <div className={circleCls}>
                          <img src={Icon} alt={`${f.title} icon`} className="w-12 h-12 object-contain" />
                        </div>
                      );
                    }
                    return (
                      <div className={circleCls}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    );
                  })()}
                  <h3 className="font-['Instrument_Sans',sans-serif] text-[22px] font-bold uppercase leading-normal text-[#3A291F] mb-0">
                    {f.title}
                  </h3>
                </div>
                <p className="font-['Instrument_Sans',sans-serif] text-[16px] text-[#6b4f3a] leading-[1.6] max-w-[330px] mx-auto">
                  {f.desc}
                </p>
                <p className="mt-4 text-[14px] font-['Instrument_Sans',sans-serif] uppercase tracking-[0.2em] text-[#a8917e]">
                  {f.title === "Nail Fix" ? "30 min+" : f.title === "Gel Polish Only" ? "1 hr+" : f.title === "Full Removal" ? "$15 ・ 1 hr" : "Price varies ・ 2 hr+"}
                </p>

                <div className="mt-4 w-full">
                  <button
                    onClick={() => window.open(f.serviceUrl ?? "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services", "_blank", "noopener,noreferrer")}
                    className="w-full rounded-full bg-[#6B4F3A] text-[#ffffff] text-[14px] font-['Instrument_Sans',sans-serif] uppercase tracking-[0.18em] px-4 py-2 shadow-sm transition hover:opacity-95"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works section removed per request */}

      {/* ── Services Preview ── */}
      <section className="hidden px-4 sm:px-6 md:px-10 lg:px-16 py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: `url(${imgQuietEscape4Bg})` }}>
        <div className="max-w-[1200px] mx-auto rounded-[16px] bg-[#FAF5EF] px-5 py-16 sm:px-8 md:px-14 lg:px-20 md:py-[112px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 md:mb-[62px]"
          >
            <h2 className="font-['Instrument_Serif',serif] text-[38px] sm:text-[46px] md:text-[56px] text-[#3A291F] leading-[1.04] mb-6">
              Nail services for every style, season, and set.
            </h2>
            <p className="font-['Instrument_Sans',sans-serif] text-[15px] md:text-base text-[#6B4F3A] max-w-[720px] mx-auto leading-[1.65]">
              Whether you’re starting fresh, maintaining your current set, or adding custom details, Audrey offers services designed around your nails, your style, and your routine.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 lg:gap-x-10 gap-y-11 md:gap-y-[58px]">
            {[
              {
                name: "Extensions",
                desc: "Full set with added length and structure. Price varies based on length. Includes one solid color. - $50-65 base price",
                image: imgExtensionsService,
                imageShape: "aspect-[540/345]",
                copyInset: "px-[5.56%]",
                span: "md:col-span-2",
              },
              {
                name: "Fill",
                desc: "Maintenance for existing sets with one solid color. At least 7 remaining nails from your previous set or this will be booked as a new set - $45 base price",
                image: imgFillService,
                imageShape: "aspect-[540/345]",
                copyInset: "px-[5.56%]",
                span: "md:col-span-2",
              },
              {
                name: "Overlay (Natural Nails)",
                desc: "Structured overlay designed to add strength and support to your natural nails without adding length. Includes one solid color. - $45 base price",
                image: imgOverlayService,
                imageShape: "aspect-[540/345]",
                copyInset: "px-[5.56%]",
                span: "md:col-span-2",
              },
              {
                name: "Gel Polish Only",
                desc: "Gel polish applied to the natural nail with no added structure or length. Includes one solid color. - $30 base price",
                image: imgGelPolishService,
                imageShape: "aspect-[810/345]",
                copyInset: "px-[3.7%]",
                span: "md:col-span-3",
              },
              {
                name: "Nail Art",
                desc: "Select your unique nail art, with pricing tailored per nail service.",
                image: imgNailArtService,
                imageShape: "aspect-[810/345]",
                copyInset: "px-[3.7%]",
                span: "md:col-span-3",
              },
              {
                name: "Nail Fix",
                desc: "Free repair for breaks or lifting within 10 days of your appointment. After 10 days, $3 per nail. Not applicable when booking a new set.",
                image: imgNailFixService,
                imageShape: "aspect-[810/345]",
                copyInset: "px-[3.7%]",
                span: "md:col-span-3",
              },
              {
                name: "Full Removal",
                desc: "Complete removal of gel or enhancements, done safely to protect the natural nail. - $15",
                image: imgFullRemovalService,
                imageShape: "aspect-[810/345]",
                copyInset: "px-[3.7%]",
                span: "md:col-span-3",
              },
            ].map((s, i) => (
              <motion.button
                type="button"
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`group flex w-full cursor-pointer flex-col items-stretch appearance-none border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:-translate-y-1 ${s.span}`}
                onClick={() => navigate("services")}
              >
                <div className={`${s.imageShape} mb-3.5 md:mb-4 overflow-visible`}>
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                </div>
                <div className={`-mt-5 ${s.copyInset}`}>
                  <p className="font-['Instrument_Serif',serif] text-[24px] leading-[1.08] text-[#3a291f] mb-3">{s.name}</p>
                  <p className="font-['Instrument_Sans',sans-serif] text-[14px] md:text-[15px] text-[#6B4F3A] leading-[1.5] mb-2.5">{s.desc}</p>
                  <p className="font-['Instrument_Sans',sans-serif] text-[14px] font-bold text-[#6B4F3A] uppercase tracking-[0.04em] underline underline-offset-[3px] decoration-[1.5px] group-hover:no-underline transition-all">
                    View Service
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Instagram feed via Behold, or setup prompt */}
      {BEHOLD_FEED_ID ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative min-h-[460px] overflow-hidden bg-cover bg-center md:min-h-[500px]" style={{ backgroundImage: `url(${imgQuietEscape2Bg})` }}>
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-16 py-12 bg-transparent">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-['Instrument_Serif',serif] text-[32px] md:text-[52px] leading-[1.05] text-[#3A291F]">My Work</h2>
            </div>
            {/* @ts-ignore */}
            <div className="bg-transparent">
              <behold-widget feed-id={BEHOLD_FEED_ID} />
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://www.instagram.com/yournailgirlaudrey/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#3A291F] text-[#FAF5EF] rounded-full px-7 py-3.5 hover:bg-[#6B4F3A] transition-all hover:shadow-lg hover:scale-105 active:scale-95 font-['Instrument_Sans',sans-serif] text-sm font-semibold"
              >
                <Instagram className="w-4 h-4" />
                Follow @yournailgirlaudrey
              </a>
            </div>
          
          </div>

        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${imgQuietEscape2Bg})` }}
        >
          <div className="relative z-10 max-w-[920px] mx-auto px-6 md:px-16 py-20 bg-transparent">
            <div className="max-w-md mx-auto bg-transparent">
              <Instagram className="w-10 h-10 text-[#a8917e] mx-auto mb-5" />
              <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F] mb-3">Connect Instagram</h2>
              <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] leading-relaxed mb-6">
                To show real photos from <strong>@yournailgirlaudrey</strong>, connect the account using{' '}
                <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="text-[#6B4F3A] underline hover:no-underline">
                  Behold.so
                </a>{' '}
                (free). Then paste the feed ID into <code className="bg-[#3A291F]/10 px-1.5 py-0.5 rounded text-sm font-mono">BEHOLD_FEED_ID</code> at the top of <code className="bg-[#3A291F]/10 px-1.5 py-0.5 rounded text-sm font-mono">App.tsx</code>.
              </p>
              <ol className="text-left text-sm font-['Instrument_Sans',sans-serif] text-[#6b4f3a] space-y-2 mb-8 max-w-xs mx-auto">
                <li className="flex gap-3"><span className="text-[#6B4F3A] font-bold flex-shrink-0">1.</span>Go to <a href="https://behold.so" target="_blank" rel="noopener noreferrer" className="text-[#6B4F3A] underline">behold.so</a> and create a free account</li>
                <li className="flex gap-3"><span className="text-[#6B4F3A] font-bold flex-shrink-0">2.</span>Connect the @yournailgirlaudrey Instagram account</li>
                <li className="flex gap-3"><span className="text-[#6B4F3A] font-bold flex-shrink-0">3.</span>Create a feed and copy the Feed ID</li>
                <li className="flex gap-3"><span className="text-[#6B4F3A] font-bold flex-shrink-0">4.</span>Paste it into <code className="bg-[#3A291F]/10 px-1 rounded text-sm font-mono">BEHOLD_FEED_ID</code></li>
              </ol>
              <a
                href="https://www.instagram.com/yournailgirlaudrey/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3A291F] text-[#FAF5EF] rounded-full px-7 py-3.5 hover:bg-[#6B4F3A] transition-all hover:shadow-lg text-sm font-['Instrument_Sans',sans-serif] font-semibold"
              >
                <Instagram className="w-4 h-4" />
                View on Instagram for now
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Testimonials ── */}
      <section
        className="relative overflow-visible bg-[#FAF5EF] bg-cover bg-center py-20 md:py-[104px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(245,236,224,0.18) 0%, rgba(242,234,223,0.65) 70%, #F2EADF 100%), url(${imgQuietEscape2Bg})`,
        }}
      >
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-14 px-6 text-center md:mb-[112px]"
          >
        
            <h2 className="font-['Instrument_Serif',serif] text-[40px] md:text-[52px] leading-[1.05] text-[#3A291F]">What clients are saying</h2>
          </motion.div>

          <div
            ref={testimonialTrackRef}
            onScroll={handleTestimonialScroll}
            className="flex gap-8 overflow-x-auto px-6 pb-12 pt-4 md:gap-9 md:px-[max(24px,calc((100vw-1280px)/2))] md:pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Client testimonials"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                data-testimonial-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="min-w-[246px] md:min-w-[252px]"
              >
                <div
                  className="group relative flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_12px_24px_rgba(44,26,14,0.06)] transition-all duration-300 md:rotate-[var(--testimonial-rotate)] hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_18px_36px_rgba(44,26,14,0.08)]"
                  style={{ "--testimonial-rotate": t.rotate } as CSSProperties}
                >
                  <div className="flex flex-col px-6 py-6">
                    <p className="font-['Instrument_Sans',sans-serif] text-[20px] leading-[1.42] text-[#3a291f] mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-2 text-right">
                      <p className="font-['Instrument_Sans',sans-serif] text-[22px] font-bold leading-none text-[#3A291F]">{t.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2.5 px-6">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => scrollToTestimonial(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-8 bg-[#3A291F] hover:bg-[#6B4F3A]" : "w-2.5 bg-[#FFFFFF]/80 hover:bg-[#6B4F3A]"}`}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={activeTestimonial === i ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="relative overflow-visible px-6 md:px-16 py-20 md:py-24 text-center bg-[#FAF5EF] bg-cover bg-center"
        style={{
          backgroundColor: "#F2EADF",
          backgroundImage: `linear-gradient(to bottom, #F2EADF 0%, rgba(242,234,223,0.94) 12%, rgba(242,234,223,0.76) 26%, rgba(242,234,223,0.48) 40%, rgba(242,234,223,0.22) 54%, rgba(242,234,223,0) 68%), url(${imgFinBackground})`,
          backgroundBlendMode: "normal, multiply",
          backgroundPosition: "center, center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover, auto 108%",
        }}
      >
        <img
          src={imgSDP9540}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -bottom-24 z-30 w-[260px] -rotate-[4deg] sm:w-[320px] md:w-[360px] lg:w-[420px]"
        />
        <img
          src={imgSDP9631}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-0 -bottom-0  w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] z-30"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl mx-auto"
        >
          <h2 className="font-['Instrument_Serif',serif] text-4xl md:text-5xl text-[#3A291F] mb-5">Ready for your next set?</h2>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("book")}
              className="bg-[#3A291F] text-[#F5ECE0] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#6B4F3A] hover:shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Book Now
            </button>
            <a
              href="sms:+13852025742"
              className="inline-flex items-center justify-center rounded-full bg-[#FAF5EF] px-5 py-3 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#6b4f3a] shadow-sm transition-colors hover:bg-[#F5ECE0]"
            >
              Contact Me
            </a>

          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ── BOOK NOW PAGE ────────────────────────────────────────────────────────────
function BookNowPage({ user, navigate }: { user: AppUser | null; navigate: (p: Page, sectionId?: string) => void }) {
  const details = [
    { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "North Salt Lake, UT\nAddress shared after booking" },
    { icon: <Clock className="w-4 h-4" />, label: "Hours", value: "Tue, Thu, Fri, and Sat. \n9 AM - 6 PM" },
    { icon: <Heart className="w-4 h-4" />, label: "What to bring", value: "Inspo photos or\na vibe in mind" },
    { icon: <Sparkles className="w-4 h-4" />, label: "Cancellations", value: "24-hour notice required\nLate fees may apply" },
  ];

  return (
    <div className="min-h-screen bg-[#f5ece0]">

  {/* ── Hero ── */}
<div className="relative bg-[#FAF5EF] pt-36 pb-0 px-6 md:px-16 overflow-hidden">
  <img
    src={imgFrame2}
    alt=""
    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
    aria-hidden
  />

  <div className="relative z-10 max-w-[1280px] mx-auto">
    <div className="flex flex-col lg:flex-row gap-12 items-end">

      {/* Text — left */}
      <div className="flex-1 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-['Instrument_Serif',serif] text-6xl md:text-8xl text-[#3A291F] leading-none mb-6">
            Book Your Appointment
          </h1>

          <p className="font-['Instrument_Sans',sans-serif] text-base text-[#6b4f3a] leading-relaxed max-w-lg">
            Ready for your next set? Choose your service and find a time that
            works for you.
          </p>
        </motion.div>
      </div>

      {/* Image — right */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.2 }}
  className="flex-shrink-0 w-full lg:w-[420px] h-[520px] lg:h-[520px] object-contain"
>
  <img
    src={imgStudio3}
    alt="Book a nail appointment with Audrey"
    className="block w-full h-full object-contain object-top"
  />
</motion.div>

    </div>
  </div>
</div>

      {/* ── Detail strip ── */}
      <div className="bg-[#FAF5EF] border-b border-[rgba(58,41,31,0.1)]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[rgba(58,41,31,0.08)]">
            {details.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="flex flex-col gap-1.5 py-6 px-5 md:px-8"
              >
                <div className="flex items-center gap-2 text-[#6B4F3A]">
                  {d.icon}
                  {d.label === "Cancellations" ? (
                    <button
                      onClick={() => navigate("terms", "cancellations")}
                      className="text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#3A291F] underline decoration-[#a8917e] underline-offset-4 transition-colors hover:text-[#6B4F3A]"
                    >
                      {d.label}
                    </button>
                  ) : (
                    <span className="text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#3A291F]">{d.label}</span>
                  )}
                </div>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6B4F3A] leading-relaxed whitespace-pre-line">{d.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full booking embed ── */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 md:px-16 lg:py-6">
        <div className="mx-auto max-w-5xl">
          {/* Branded frame around the booking widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 2px 32px rgba(44,26,14,0.08)" }}
          >
            {/* Header bar */}
            <div
              className="px-8 py-5 flex items-center justify-between"
              style={{ background: "#A8917E" }}
            />

            {/* In-site booking widget powered by Square Appointments */}
            <SquareBooking className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
// Behold feed ID — paste Audrey's feed ID from behold.so here after setup
const BEHOLD_FEED_ID = "tSK7gTBMIeLcvuB1p2nl";

function SquareBooking({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const src = "https://square.site/appointments/buyer/widget/d4zpolc67zk6vn/LK5GF914V70PS.js";
    if (containerRef.current.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    containerRef.current.appendChild(s);
  }, []);

  return <div ref={containerRef} className={className} />;
}

function PortfolioPage() {
  // Portfolio page no longer loads the Behold widget script; it's loaded on HomePage

  return (
    <div className="min-h-screen bg-[#f5ece0] relative">
      <img
        src={imgFrame2}
        alt=""
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-50"
        aria-hidden
      />
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 pt-36 pb-24 relative z-10">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 1 }} transition={{ duration: 0.7 }} className="mb-12">

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-['Instrument_Serif',serif] text-5xl md:text-8xl text-[#3A291F] max-w-lg">
              My Work
            </h1>
            <a
              href="https://www.instagram.com/yournailgirlaudrey/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[#3A291F] text-[#FAF5EF] rounded-full px-7 py-3.5 hover:bg-[#6B4F3A] transition-all hover:shadow-lg hover:scale-105 active:scale-95 font-['Instrument_Sans',sans-serif] text-sm font-semibold"
            >
              <Instagram className="w-4 h-4" />
              Follow @yournailgirlaudrey
            </a>
          </div>
  
        </motion.div>

        {/* Instagram feed moved to Home page */}

        <PortfolioGallery />

        <div className="mt-14 text-center">
          <a
            href="https://www.instagram.com/yournailgirlaudrey/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#3A291F] text-[#FAF5EF] rounded-full px-10 py-4 hover:bg-[#6B4F3A] transition-all hover:shadow-xl hover:scale-105 active:scale-95 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest"
          >
            <Instagram className="w-5 h-5" />
            See More on Instagram
          </a>

        </div>

      </div>
    </div>
  );
}

function PortfolioGallery() {
  const [items, setItems] = useState<PortfolioImage[]>(loadPortfolioGallery);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({
    color: "all",
    artwork: "all",
    style: "all",
    season: "all",
  });

  useEffect(() => {
    let cancelled = false;
    fetchPortfolioGallery()
      .then((gallery) => {
        if (!cancelled) {
          setItems(gallery);
          savePortfolioGallery(gallery);
        }
      })
      .catch(() => {});
    const syncGallery = () => setItems(loadPortfolioGallery());
    window.addEventListener("portfolio-gallery-updated", syncGallery);
    window.addEventListener("storage", syncGallery);
    return () => {
      cancelled = true;
      window.removeEventListener("portfolio-gallery-updated", syncGallery);
      window.removeEventListener("storage", syncGallery);
    };
  }, []);

  const filteredItems = items
    .filter((item) => filters.color === "all" || item.color === filters.color)
    .filter((item) => filters.artwork === "all" || item.artwork === filters.artwork)
    .filter((item) => filters.style === "all" || item.style === filters.style)
    .filter((item) => filters.season === "all" || item.season === filters.season)
    .sort((a, b) => {
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "color") return a.color.localeCompare(b.color);
      if (sort === "length") return galleryFilterOptions.length.indexOf(a.length) - galleryFilterOptions.length.indexOf(b.length);
      if (sort === "style") return a.style.localeCompare(b.style);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  useEffect(() => {
    setVisibleCount(12);
  }, [filters.color, filters.artwork, filters.style, filters.season, sort]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;
      const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      if (remaining < 700) setVisibleCount((count) => Math.min(count + 8, filteredItems.length));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredItems.length, hasMore]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ color: "all", artwork: "all", style: "all", season: "all" });
    setSort("newest");
  };

  const selectCls = "w-full rounded-md border border-[rgba(58,41,31,0.14)] bg-white px-3 py-2.5 font-['Instrument_Sans',sans-serif] text-sm text-[#3A291F] focus:outline-none focus:border-[#6B4F3A]";

  return (
    <section className="mt-20">
      <div className="mb-8 grid grid-cols-1 gap-3 rounded-lg bg-[#FAF5EF] p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="block">
          <span className="mb-1.5 block font-['Instrument_Sans',sans-serif] text-[14px] font-bold uppercase tracking-[2px] text-[#a8917e]">Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className={selectCls}>
            <option value="newest">Newest to oldest</option>
            <option value="oldest">Oldest to newest</option>
            <option value="color">Color A-Z</option>
            <option value="length">Length short-long</option>
            <option value="style">Style A-Z</option>
          </select>
        </label>
        {(["style", "color", "artwork", "season"] as const).map((key) => (
          <label key={key} className="block">
            <span className="mb-1.5 block font-['Instrument_Sans',sans-serif] text-[14px] font-bold uppercase tracking-[2px] text-[#a8917e]">{prettyTag(key)}</span>
            <select value={filters[key]} onChange={(event) => updateFilter(key, event.target.value)} className={selectCls}>
              <option value="all">All</option>
              {galleryFilterOptions[key].map((option) => (
                <option key={option} value={option}>{prettyTag(option)}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mb-8 flex justify-end">
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-full bg-[#FAF5EF] px-5 py-3 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#6b4f3a] shadow-sm transition-colors hover:bg-[#F5ECE0]"
        >
          Reset
        </button>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a]">
          Showing {visibleItems.length} of {filteredItems.length} sets
        </p>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-[#a8917e]/40 bg-[#FAF5EF]/60 px-8 py-16 text-center">
          <ImagePlus className="mx-auto mb-4 h-9 w-9 text-[#a8917e]" />
          <p className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F]">No sets match those filters.</p>
          <p className="mt-2 font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a]">Try another color, length, artwork type, style, or season.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-lg bg-[#FAF5EF]">
              <div className="aspect-[4/5] overflow-hidden bg-[#F5ECE0]">
                <img src={item.src} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </article>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + 8, filteredItems.length))}
            className="rounded-full bg-[#3A291F] px-8 py-3.5 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#FAF5EF] transition-all hover:bg-[#6B4F3A] hover:shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}

// ── SERVICES PAGE ────────────────────────────────────────────────────────────
const serviceCategories = [
  {
    title: "Base Prices",
    services: [
      { name: "Gel Polish Only", desc: "Gel polish applied to the natural nail with no added structure or length. Includes one solid color.", price: "$30", caption: "Base Price" },
      { name: "Fill", desc: "Maintenance for existing sets. Includes one solid color. Must have at least 7 nails remaining from your previous set. Otherwise, this will be booked as a new set.", price: "$45", caption: "Base Price" },
      { name: "Overlay (Natural Nails)", desc: "Structured overlay designed to add strength and support to your natural nails without adding length. Includes one solid color.", price: "$45", caption: "Base Price" },
      { name: "Extensions", desc: "Full set with added length and structure. Price varies based on length. Includes one solid color.", price: "$50-$65", caption: "Base Price" },
    ],
  },
  {
    title: "Nail Art & Add-Ons",
    services: [
      { name: "Solid Color", desc: "One solid color is included with Gel Polish Only, Fill, Overlay (Natural Nails) and Extension services.", price: "Included", caption: "Base Price" },
      { name: "Simple Art", desc: "For example: Chrome, Polka Dots, or French Tips across all nails.", price: "+ $5", caption: "All Nails" },
      { name: "Custom Art", desc: "See price examples", price: "+ $1-5", caption: "per nail" },
    ],
  },
  {
    title: "Extensions (Full Set)",
    services: [
      { name: "Short", desc: "Slim, natural-looking extension sets with premium materials.", price: "$50", caption: "Size Guide" },
      { name: "Medium", desc: "Maintain your extension set between appointments.", price: "$55", caption: "Size Guide" },
      { name: "Long", desc: "Slim, natural-looking extension sets with premium materials.", price: "$60", caption: "Size Guide" },
      { name: "Extra Long", desc: "Maintain your extension set between appointments.", price: "$65+", caption: "Size Guide" },
    ],
  },
  {
    title: "Extras",
    services: [
      { name: "Nail Fix", desc: "Free repair for breaks or lifting within 10 days of your appointment.", price: "Free", caption: "10 days" },
      { name: "Nail Fix", desc: "Price after 10 days. Not applicable when booking a new set.", price: "$3", caption: "Per Nail" },
      { name: "Full Removal", desc: "Complete removal of gel or enhancements, done safely to protect the natural nail.", price: "$15", caption: "All Nails" },
    ],
  },
];

const serviceBookingUrls = {
  gelPolish: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/L456CSN73YCPCOFH76S6AAAY",
  overlay: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/43L2AZCDMAXR5OVLXDMSE63L",
  extensions: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/XUTWXK33QFSZXUEDSHCZWY2A",
  fill: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/4JFY2PIPNTIQRJGCCLONDEVF",
  fullRemoval: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/GYKES4GH5DCNQ3QE76GZXCJS",
  nailFix: "https://book.squareup.com/appointments/d4zpolc67zk6vn/location/LK5GF914V70PS/services/REFPQSKFES3ANMSX4RMIA647",
};

type BookingDecisionStepId =
  | "start"
  | "bare"
  | "hasNails"
  | "previousSet"
  | "fill"
  | "newSetLowNails"
  | "removalOnly"
  | "removalPlusNew"
  | "nailBreak"
  | "nailFixFree"
  | "nailFixPaid"
  | "newSetReminder";

type BookingDecisionOption = {
  label: string;
  helper?: string;
  next: BookingDecisionStepId;
};

type BookingDecisionAction = {
  title: string;
  href?: string;
  bestFor?: string;
  includes?: string;
  price: string;
  time?: string;
  lengthPrices?: string[];
  note?: string;
};

type BookingDecisionStep = {
  eyebrow: string;
  question: string;
  lead?: string;
  options?: BookingDecisionOption[];
  actions?: BookingDecisionAction[];
  note?: string;
};

const bookingDecisionSteps: Record<BookingDecisionStepId, BookingDecisionStep> = {
  start: {
    eyebrow: "Start here",
    question: "Do you currently have nails on?",
    lead: "Choose the answer that matches your nails today.",
    options: [
      { label: "No, my natural nails are bare", helper: "Book based on what you want", next: "bare" },
      { label: "Yes, I currently have nails on", helper: "Choose what you need next", next: "hasNails" },
    ],
  },
  hasNails: {
    eyebrow: "Current nails",
    question: "What do you need help with?",
    lead: "Choose the option that best matches your appointment need.",
    options: [
      { label: "Yes, I have a previous set and need maintenance", helper: "Check if a fill is right", next: "previousSet" },
      { label: "Yes, I only need removal", helper: "Safe removal of gel or enhancements", next: "removalOnly" },
      { label: "Yes, I want removal plus a new set", helper: "Choose the service you want next", next: "removalPlusNew" },
    ],
  },
  bare: {
    eyebrow: "Natural nails",
    question: "What do you want?",
    lead: "Book based on what you want:",
    actions: [
      {
        title: "Book Gel Polish Only",
        href: serviceBookingUrls.gelPolish,
        bestFor: "Simple gel color on natural nails with no added strength or length",
        price: "$30",
        time: "1 hr+",
      },
      {
        title: "Book Overlay on Natural Nails",
        href: serviceBookingUrls.overlay,
        bestFor: "Structured gel overlay that adds support without adding length",
        price: "$45 base price",
        time: "2 hr+",
      },
      {
        title: "Book Extensions",
        href: serviceBookingUrls.extensions,
        bestFor: "A full set with added length and structure",
        price: "Short $50, Medium $55, Long $60, Extra Long $65+",
        time: "2 hr+",
        lengthPrices: ["Short: $50", "Medium: $55", "Long: $60", "Extra Long: $65+"],
      },
    ],
  },
  previousSet: {
    eyebrow: "Existing set",
    question: "Do you have at least 7 nails still remaining from your previous set?",
    options: [
      { label: "Yes", helper: "Maintenance on an existing set", next: "fill" },
      { label: "No", helper: "Book Extensions or Overlay as a new set", next: "newSetLowNails" },
    ],
  },
  fill: {
    eyebrow: "Maintenance",
    question: "Book a Fill",
    actions: [
      {
        title: "Book Fill",
        href: serviceBookingUrls.fill,
        bestFor: "Maintenance on an existing set",
        includes: "One solid color",
        price: "$45 base price",
        time: "2 hr+",
      },
    ],
  },
  newSetLowNails: {
    eyebrow: "Start fresh",
    question: "Book a new set instead",
    lead: "A fill requires at least 7 nails remaining.",
    actions: [
      {
        title: "Book Extensions",
        href: serviceBookingUrls.extensions,
        bestFor: "A full set with added length and structure",
        price: "Short $50, Medium $55, Long $60, Extra Long $65+",
        time: "2 hr+",
        lengthPrices: ["Short: $50", "Medium: $55", "Long: $60", "Extra Long: $65+"],
      },
      {
        title: "Book Overlay on Natural Nails",
        href: serviceBookingUrls.overlay,
        bestFor: "Structured gel overlay that adds support without adding length",
        price: "$45 base price",
        time: "2 hr+",
      },
    ],
  },
  removalOnly: {
    eyebrow: "Removal",
    question: "Book Full Removal",
    actions: [
      {
        title: "Book Full Removal",
        href: serviceBookingUrls.fullRemoval,
        bestFor: "Safe removal of gel or enhancements",
        price: "$15",
        time: "1 hr",
      },
    ],
  },
  removalPlusNew: {
    eyebrow: "Removal + new set",
    question: "What service do you want next?",
    lead: "Book the service you want next. Add removal if needed.",
    actions: [
      {
        title: "Book Gel Polish Only",
        href: serviceBookingUrls.gelPolish,
        bestFor: "Simple gel color on natural nails with no added strength or length",
        price: "$30",
        time: "1 hr+",
      },
      {
        title: "Book Overlay on Natural Nails",
        href: serviceBookingUrls.overlay,
        bestFor: "Structured gel overlay that adds support without adding length",
        price: "$45 base price",
        time: "2 hr+",
      },
      {
        title: "Book Extensions",
        href: serviceBookingUrls.extensions,
        bestFor: "A full set with added length and structure",
        price: "Short $50, Medium $55, Long $60, Extra Long $65+",
        time: "2 hr+",
        lengthPrices: ["Short: $50", "Medium: $55", "Long: $60", "Extra Long: $65+"],
      },
    ],
  },
  nailBreak: {
    eyebrow: "Repair",
    question: "Did a nail break or lift?",
    options: [
      { label: "Yes, within 10 days of my appointment", helper: "Free repair", next: "nailFixFree" },
      { label: "Yes, after 10 days", helper: "$3 per nail", next: "nailFixPaid" },
      { label: "Is this for booking a new set?", helper: "Nail Fix is only for repairs", next: "newSetReminder" },
    ],
  },
  nailFixFree: {
    eyebrow: "Repair",
    question: "Book Nail Fix",
    actions: [
      {
        title: "Book Nail Fix",
        href: serviceBookingUrls.nailFix,
        bestFor: "Breaks or lifting within 10 days of your appointment",
        price: "Free repair",
      },
    ],
  },
  nailFixPaid: {
    eyebrow: "Repair",
    question: "Book Nail Fix",
    actions: [
      {
        title: "Book Nail Fix",
        href: serviceBookingUrls.nailFix,
        bestFor: "Breaks or lifting after 10 days",
        price: "$3 per nail",
        time: "30 min+",
      },
    ],
  },
  newSetReminder: {
    eyebrow: "New set",
    question: "Do not book Nail Fix",
    lead: "Nail Fix is only for repairs, not new sets.",
    actions: [
      {
        title: "Book Gel Polish Only",
        href: serviceBookingUrls.gelPolish,
        bestFor: "Simple gel color on natural nails with no added strength or length",
        price: "$30",
        time: "1 hr+",
      },
      {
        title: "Book Overlay on Natural Nails",
        href: serviceBookingUrls.overlay,
        bestFor: "Structured gel overlay that adds support without adding length",
        price: "$45 base price",
        time: "2 hr+",
      },
      {
        title: "Book Extensions",
        href: serviceBookingUrls.extensions,
        bestFor: "A full set with added length and structure",
        price: "Short $50, Medium $55, Long $60, Extra Long $65+",
        time: "2 hr+",
        lengthPrices: ["Short: $50", "Medium: $55", "Long: $60", "Extra Long: $65+"],
      },
    ],
  },
};

function BookingDecisionDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-['Instrument_Sans',sans-serif] text-[14px] uppercase tracking-[2px] text-[#a8917e]">{label}</dt>
      <dd className="mt-1 font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#3A291F]">{value}</dd>
    </div>
  );
}

function BookingDecisionActionCard({ action }: { action: BookingDecisionAction }) {
  const content = (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-['Instrument_Serif',serif] text-2xl leading-tight text-[#3A291F]">{action.title}</p>
          {action.bestFor && (
            <p className="mt-2 font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">
              <span className="font-semibold text-[#3A291F]">Best for:</span> {action.bestFor}
            </p>
          )}
        </div>
        {action.href && (
          <span className="inline-flex items-center justify-center gap-2 rounded-md bg-[#3A291F] px-4 py-2 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#F5ECE0] transition-colors group-hover:bg-[#6B4F3A]">
            Book
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {action.includes && <BookingDecisionDetail label="Includes" value={action.includes} />}
        <BookingDecisionDetail label="Price" value={action.price} />
        {action.time && <BookingDecisionDetail label="Time" value={action.time} />}
      </dl>
      {action.lengthPrices && (
        <div className="mt-5 rounded-md border border-[#F5ECE0] bg-[#FAF5EF] p-4">
          <p className="font-['Instrument_Sans',sans-serif] text-[14px] uppercase tracking-[2px] text-[#a8917e]">Price depends on length</p>
          <div className="mt-3 grid grid-cols-2 gap-2 font-['Instrument_Sans',sans-serif] text-sm text-[#3A291F] sm:grid-cols-4">
            {action.lengthPrices.map((price) => (
              <span key={price}>{price}</span>
            ))}
          </div>
        </div>
      )}
      {action.note && (
        <p className="mt-4 font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">{action.note}</p>
      )}
    </>
  );

  if (!action.href) {
    return (
      <div className="rounded-lg border border-[#A8917E] bg-white px-5 py-5">
        {content}
      </div>
    );
  }

  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-[#A8917E] bg-white px-5 py-5 transition-all hover:-translate-y-0.5 hover:border-[#6B4F3A] hover:shadow-[0_14px_30px_rgba(58,41,31,0.10)] focus:outline-none focus:ring-2 focus:ring-[#d6b470]"
    >
      {content}
    </a>
  );
}

function BookingDecisionTree() {
  const [stepId, setStepId] = useState<BookingDecisionStepId>("start");
  const [history, setHistory] = useState<BookingDecisionStepId[]>([]);
  const step = bookingDecisionSteps[stepId];

  const goToStep = (next: BookingDecisionStepId) => {
    setHistory((prev) => [...prev, stepId]);
    setStepId(next);
  };

  const goBack = () => {
    const previous = history[history.length - 1];
    if (!previous) return;
    setStepId(previous);
    setHistory((prev) => prev.slice(0, -1));
  };

  const startOver = () => {
    setStepId("start");
    setHistory([]);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 overflow-hidden rounded-lg bg-[#3A291F] shadow-[0_24px_60px_rgba(44,26,14,0.16)]"
    >
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative overflow-hidden bg-[#3A291F] px-6 py-8 text-[#F5ECE0] md:p-10 lg:p-12">
          <div className="absolute inset-0 opacity-20" aria-hidden>
            <AnimalPrint opacity={0.7} />
          </div>
          <div className="relative z-10">
         
            <h2 className="mt-4 font-['Instrument_Serif',serif] text-4xl leading-none md:text-5xl">Find the right appointment</h2>
            <p className="mt-5 max-w-sm font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#FAF5EF]">
              Start with what your nails look like today, then choose the booking option that matches your result.
            </p>
           
          </div>
        </div>

        <div className="bg-[#FAF5EF] px-6 py-8 md:p-10">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-['Instrument_Sans',sans-serif] text-[14px] font-semibold uppercase tracking-[3px] text-[#a8917e]">{step.eyebrow}</p>
              <div className="mt-3 h-1.5 w-28 overflow-hidden rounded-full bg-[#F5ECE0]">
                <div
                  className="h-full rounded-full bg-[#d6b470] transition-all duration-300"
                  style={{ width: `${Math.min(100, 20 + history.length * 16)}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-md border border-[#A8917E] px-4 py-2 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#3A291F] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#d6b470]"
                >
                  Back
                </button>
              )}
              {stepId !== "start" && (
                <button
                  type="button"
                  onClick={startOver}
                  className="rounded-md bg-[#F5ECE0] px-4 py-2 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#3A291F] transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#d6b470]"
                >
                  Start over
                </button>
              )}
            </div>
          </div>

          <h3 className="font-['Instrument_Serif',serif] text-3xl leading-tight text-[#3A291F] md:text-4xl">{step.question}</h3>
          {step.lead && (
            <p className="mt-3 font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">{step.lead}</p>
          )}

          {step.options && (
            <div className="mt-7 grid gap-3">
              {step.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => goToStep(option.next)}
                  className="group w-full rounded-lg border border-[#A8917E] bg-white/75 px-5 py-4 text-left transition-all hover:border-[#6B4F3A] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#d6b470]"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span>
                      <span className="block font-['Instrument_Sans',sans-serif] text-sm font-semibold text-[#3A291F]">{option.label}</span>
                      {option.helper && (
                        <span className="mt-1 block font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">{option.helper}</span>
                      )}
                    </span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#a8917e] transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {step.actions && (
            <div className="mt-7 grid gap-4">
              {step.actions.map((action) => (
                <BookingDecisionActionCard key={action.title} action={action} />
              ))}
            </div>
          )}

          {step.note && (
            <p className="mt-5 rounded-md bg-[#FAF5EF] px-4 py-3 font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">{step.note}</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function ServicesPage({ navigate }: { navigate: (p: Page, sectionId?: string) => void }) {
  return (
    <div className="bg-[#f5ece0] min-h-screen">
{/* Hero */}
<div className="relative bg-[#FAF5EF] pt-36 pb-0 px-6 md:px-16 overflow-hidden">
  <img
    src={imgFrame2}
    alt=""
    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
    aria-hidden
  />

  <div className="relative z-10 max-w-[1280px] mx-auto">
    <div className="flex flex-col lg:flex-row gap-12 items-end">

      {/* Text — left */}
      <div className="flex-1 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-['Instrument_Serif',serif] text-6xl md:text-8xl text-[#3A291F] leading-none mb-6">
            Services & Pricing
          </h1>

          <p className="font-['Instrument_Sans',sans-serif] text-base text-[#6b4f3a] leading-relaxed max-w-lg">
            Every service includes a solid color. Prices shown are starting
            rates. Final pricing may vary depending on nail length and design
            complexity. Feel free to contact me if you'd like a price estimate
            before booking.
          </p>
        </motion.div>
      </div>

      {/* Image — right */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex-shrink-0 w-full lg:w-[420px] h-[400px] lg:h-[520px]"
      >
        <img
          src={imgStudio4}
          alt="Nail services by Audrey"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

    </div>
  </div>
</div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08 }}
              className="bg-[#FAF5EF] rounded-3xl overflow-hidden"
            >
              <div
                className="px-8 py-5 flex items-center justify-between"
                style={{ background: "#A8917E" }}
              >
                <h2 className="font-['Instrument_Sans',sans-serif] font-bold text-sm uppercase tracking-widest text-[#3A291F]">{cat.title}</h2>
              </div>
              <div>
                {cat.services.map((s, si) => (
                  <div
                    key={si}
                    className={`px-8 py-5 flex justify-between items-start gap-4 hover:bg-white/40 transition-colors ${si > 0 ? "border-t border-[rgba(58,41,31,0.08)]" : ""}`}
                  >
                    <div className="flex-1">
                      <p className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F] mb-1">{s.name}</p>
                      <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <p className="font-['Instrument_Sans',sans-serif] font-bold text-[#6B4F3A] text-base whitespace-nowrap">{s.price}</p>
                      <p className="font-['Instrument_Sans',sans-serif] text-[14px] text-[#6b4f3a] uppercase tracking-wide">{s.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-16 min-h-[440px] overflow-hidden rounded-3xl bg-[#FAF5EF] shadow-[0_24px_60px_rgba(44,26,14,0.16)]"
          style={{
            backgroundImage: `linear-gradient(rgba(250,245,239,0.18), rgba(250,245,239,0.18)), url(${imgFinBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative z-10 p-8 pb-[340px] md:p-12 md:pr-[340px]">
            <div className="mb-4 flex items-center gap-2 text-[#6B4F3A]">
              <Clock className="h-4 w-4" />
              <p className="font-['Instrument_Sans',sans-serif] text-[14px] font-bold uppercase tracking-[2px]">Booking policy</p>
            </div>
            <h2 className="font-['Instrument_Serif',serif] text-3xl leading-tight text-[#3A291F] md:text-4xl">
              Cancellations &amp; late arrivals
            </h2>
            <p className="mt-4 max-w-3xl font-['Instrument_Sans',sans-serif] text-sm leading-relaxed text-[#6b4f3a]">
              Please cancel or reschedule at least 24 hours before your appointment. Changes made with less notice may be charged 50% to 100% of the scheduled service, and no-shows may be charged the full remaining amount. Arriving late may shorten your service or require rescheduling.
            </p>
            <p className="mt-4 max-w-3xl font-['Instrument_Sans',sans-serif] text-base font-bold leading-relaxed text-[#6B4F3A]">
              If an emergency comes up, contact Audrey as soon as possible.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {[
                { icon: Clock, title: "24-hour notice" },
                { icon: DollarSign, title: "Late/no-show fee" },
                { icon: Calendar, title: "Arrive on time" },
              ].map(({ icon: PolicyIcon, title }) => (
                <div key={title} className="flex items-center gap-3 rounded-xl border border-[rgba(58,41,31,0.1)] bg-white/65 px-3 py-3">
                  <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F5ECE0] text-[#6B4F3A]">
                    <PolicyIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="font-['Instrument_Sans',sans-serif] text-sm font-semibold leading-tight text-[#3A291F]">{title}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("terms", "cancellations")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3A291F] px-7 py-3.5 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#FAF5EF] transition-all hover:bg-[#6B4F3A]"
              >
                Read the full policy
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="sms:+13852025742"
                className="inline-flex items-center justify-center rounded-full bg-[#FAF5EF] px-5 py-3 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#6b4f3a] shadow-sm transition-colors hover:bg-[#F5ECE0]"
              >
                Contact me
              </a>
            </div>
          </div>
          <img
            src={imgSDP0128}
            alt="Audrey holding a nail file"
            className="absolute bottom-0 right-0 h-[320px] w-full object-contain object-bottom md:right-5 md:h-[94%] md:w-[300px]"
          />
        </motion.section>

        <BookingDecisionTree />

        {/* Note + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#FAF5EF] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
        >
          <div className="flex-1">
            <h3 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F] mb-3">Not sure what you need?</h3>
            <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] leading-relaxed max-w-md">
              Reach out via Instagram and Audrey will help you find the perfect service for your nails, lifestyle, and budget.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            
            <a
              href="https://www.instagram.com/yournailgirlaudrey/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#3A291F] text-[#3A291F] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#3A291F] hover:text-[#F5ECE0] transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              DM on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="bg-[#f5ece0] min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#FAF5EF] pt-36 pb-0 px-6 md:px-16 overflow-hidden">
          <img
          src={imgFrame2}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
          aria-hidden
        />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1 pb-16">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
             
                <h1 className="font-['Instrument_Serif',serif] text-6xl md:text-8xl text-[#3A291F] leading-none mb-6">Hi, I'm Audrey</h1>

                <p className="font-['Instrument_Sans',sans-serif] text-base text-[#6b4f3a] leading-relaxed max-w-lg">
                — a licensed nail technician based in North Salt Lake, Utah. I opened my private studio because I believe nail appointments should feel like an experience, not an assembly line.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex-shrink-0 w-full lg:w-[420px] h-[400px] lg:h-[520px]"
            >
              <img
                src={pocket}
                alt="Audrey, Your Nail Girl"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Value Prop */}
      <section
        className="px-6 md:px-16 py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgQuietEscape2Bg})` }}
      >
        <div className="max-w-[1020px] mx-auto">
          <div className="bg-[#3a291f] rounded-[16px] md:rounded-[18px] overflow-hidden flex flex-col md:flex-row min-h-[560px] md:min-h-[720px] lg:min-h-[720px]">
            <div className="w-full md:w-1/2 h-[420px] md:h-auto overflow-hidden">
              <motion.img
                src={imgValueProp}
                alt="Audrey showing nail art"
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>

            <div className="w-full md:w-1/2 flex items-center bg-[#6B4F3A]">
              <motion.div
                className="w-full px-8 py-12 md:px-10 lg:px-12 xl:px-14"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-['Instrument_Serif',serif] text-white text-[46px] sm:text-[58px] md:text-[54px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] mb-7 max-w-[460px]">
                  My Story
                </h2>

                <p className="font-['Instrument_Sans',sans-serif] text-white/85 text-base md:text-[17px] leading-[1.75] mb-8 max-w-[470px]">
                 <p>
                I've been obsessed with nails since I was a kid — always experimenting, always reaching for the next creative challenge. I went to Davis Tech and became a licensed nail technician. I fell in love with the precision, the artistry, and most of all, the way a great set of nails makes a client feel.
              </p>
              <p>
                After school, I knew I wanted to create a space that felt different — quieter, more personal, more intentional. So I opened my own studio in a quite residential area in North Salt Lake. No noise, no rush, no one else waiting. Just you, me, and your nails.
              </p>
              <p>
                I specialize in gel and custom nail art — from clean neutrals and classic French tips to bold statement sets and intricate seasonal designs. Whatever you're envisioning, I want to help bring it to life.
              </p>
                </p>

                <button
                  onClick={() => navigate("services")}
                  className="border border-[#3A291F] bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-8 py-4 rounded-full hover:border-[#6B4F3A] hover:bg-[#6B4F3A] transition-all"
                >
                  View Services & Pricing
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-[#f5ece0] px-6 md:px-16 py-20 md:py-28 overflow-hidden">

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >

            <h2 className="font-['Instrument_Serif',serif] text-4xl md:text-5xl text-[#3A291F]">Studio Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Craft Over Speed",
                desc: "I take my time with every set. No rushing, no cutting corners. Your nails deserve my full attention.",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Personal Connection",
                desc: "I genuinely care about my clients. I try my best to remember what you like, what you don't, and I always want you to leave obsessed with your nails.",
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Education Never Stops",
                desc: "Nail trends and techniques evolve constantly. I'm always learning and practicing to improve my skills.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-[rgba(58,41,31,0.07)] hover:shadow-lg transition-shadow"
              >
                <div className="text-[#6B4F3A] mb-4">{v.icon}</div>
                <h3 className="font-['Instrument_Sans',sans-serif] font-bold text-sm uppercase tracking-widest text-[#3A291F] mb-3">{v.title}</h3>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ── SIGN IN PAGE ─────────────────────────────────────────────────────────────
function SignInPage({ navigate, onSignIn }: { navigate: (p: Page) => void; onSignIn: (u: AppUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Password is required."); return; }
    setLoading(true);
    try {
      const data = await api("/clients/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onSignIn({ ...data.user, inspoImages: data.user.inspoImages ?? [] });
      navigate("dashboard");
    } catch (err: any) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-white border border-[rgba(58,41,31,0.15)] rounded-2xl px-4 py-3.5 text-sm font-['Instrument_Sans',sans-serif] text-[#3A291F] placeholder-[#a8917e] focus:outline-none focus:border-[#6B4F3A] transition-colors";

  return (
    <div className="min-h-screen bg-[#f5ece0] flex flex-col items-center justify-center px-6 py-32">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-[420px]">

        {/* ── Sign in section ── */}
        <div className="mb-10">
          <h1 className="font-['Instrument_Serif',serif] text-4xl text-[#3A291F] mb-1">Sign in</h1>
          <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mb-7">
            Welcome back — sign in to access your dashboard, referral credits, and inspo gallery.
          </p>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-['Instrument_Sans',sans-serif] font-semibold text-[#3a291f] mb-1.5">
                Email address <span className="text-[#6B4F3A]">*</span>
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" autoComplete="email" className={inputCls} />
            </div>

            <div>
              <label className="block text-sm font-['Instrument_Sans',sans-serif] font-semibold text-[#3a291f] mb-1.5">
                Password <span className="text-[#6B4F3A]">*</span>
              </label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password" className={inputCls + " pr-11"} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8917e] hover:text-[#3a291f] transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm font-['Instrument_Sans',sans-serif] text-red-600 bg-red-50 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold py-4 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg disabled:opacity-60 mt-1">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <button className="w-full text-center text-sm font-['Instrument_Sans',sans-serif] text-[#6b4f3a] underline underline-offset-2 hover:text-[#3A291F] transition-colors mt-4">
            Forgot your password?
          </button>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-[rgba(58,41,31,0.12)] mb-10" />

        {/* ── New here section ── */}
        <div>
          <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F] mb-1">New here?</h2>
          <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mb-6">
            Create an account to track appointments, earn referral credits, and save your nail inspo — it only takes a minute.
          </p>
          <button onClick={() => navigate("signup")}
            className="w-full border-2 border-[#3A291F] text-[#3A291F] text-sm font-['Instrument_Sans',sans-serif] font-semibold py-4 rounded-full hover:bg-[#3A291F] hover:text-[#FAF5EF] transition-all">
            Create account
          </button>
        </div>

      </motion.div>
    </div>
  );
}

// ── SIGN UP / ONBOARDING PAGE ─────────────────────────────────────────────────
function SignUpPage({ navigate, onSignIn }: { navigate: (p: Page) => void; onSignIn: (u: AppUser) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newUser, setNewUser] = useState<AppUser | null>(null);
  const [copied, setCopied] = useState(false);

  const pw = passwordStrength(password);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!validateEmail(email)) e.email = "Please enter a valid email.";
    if (!validatePhone(phone)) e.phone = "Please enter a valid phone number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (pw.score < 2) e.password = "Please choose a stronger password.";
    if (password !== confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const submitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      referralCode: genReferralCode(name),
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
    try {
      const data = await api("/clients/register", { method: "POST", body: JSON.stringify(payload) });
      const u: AppUser = { ...data.user, inspoImages: [] };
      saveUser(u);
      setNewUser(u);
      onSignIn(u);
      setStep(3);
    } catch (err: any) {
      setErrors({ confirm: err.message || "Registration failed. Please try again." });
    }
  };

  const copyCode = () => {
    if (newUser) { navigator.clipboard.writeText(newUser.referralCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const inputCls = "w-full bg-white/70 border border-[rgba(58,41,31,0.15)] rounded-xl px-4 py-3 text-sm font-['Instrument_Sans',sans-serif] text-[#3A291F] placeholder-[#a8917e] focus:outline-none focus:border-[#6B4F3A] transition-colors";
  const labelCls = "block text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#3a291f] mb-2";
  const errCls = "text-sm font-['Instrument_Sans',sans-serif] text-red-600 mt-1";

  return (
    <div className="min-h-screen bg-[#f5ece0] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">

          {/* Step indicators */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-['Instrument_Sans',sans-serif] transition-all ${s === step ? "text-[#3A291F]" : s < step ? "bg-[#6B4F3A] text-[#3A291F]" : "bg-[#F5ECE0] text-[#a8917e]"}`}
                    style={s === step ? { background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" } : {}}>
                    {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  {s < 2 && <div className={`w-8 h-px ${s < step ? "bg-[#6B4F3A]" : "bg-[#F5ECE0]"}`} />}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mb-8">
            <p className="text-[14px] uppercase tracking-[4px] font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mb-3">
              {step === 1 ? "Step 1 of 2" : step === 2 ? "Step 2 of 2" : "You're in!"}
            </p>
            <h1 className="font-['Instrument_Serif',serif] text-4xl md:text-5xl text-[#3A291F]">
              {step === 1 ? "Create Your Account" : step === 2 ? "Set Your Password" : `Welcome, ${newUser?.name.split(" ")[0]}!`}
            </h1>
          </div>

          <div className="bg-[#FAF5EF] rounded-3xl p-8 md:p-10">
            {step === 1 && (
              <form onSubmit={submitStep1} className="flex flex-col gap-5">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Audrey Smith" className={inputCls} />
                  {errors.name && <p className={errCls}>{errors.name}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" className={inputCls} />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
                <div>
                  <label className={labelCls}>Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(801) 555-0100" autoComplete="tel" className={inputCls} />
                  {errors.phone && <p className={errCls}>{errors.phone}</p>}
                </div>
                <button type="submit"
                  className="w-full bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-4 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg mt-2 flex items-center justify-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-center text-sm font-['Instrument_Sans',sans-serif] text-[#6b4f3a]">
                  Already have an account?{" "}
                  <button type="button" onClick={() => navigate("signin")} className="text-[#6B4F3A] font-semibold hover:underline">Sign in</button>
                </p>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={submitStep2} className="flex flex-col gap-5">
                <div>
                  <label className={labelCls}>Password</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password"
                      className={inputCls + " pr-11"} />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8917e]">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                            style={{ background: i <= pw.score ? pw.color : "#F5ECE0" }} />
                        ))}
                      </div>
                      <p className="text-sm font-['Instrument_Sans',sans-serif]" style={{ color: pw.color }}>{pw.label}</p>
                    </div>
                  )}
                  {errors.password && <p className={errCls}>{errors.password}</p>}
                  <ul className="mt-2 space-y-1">
                    {[["At least 8 characters", password.length >= 8], ["One uppercase letter", /[A-Z]/.test(password)], ["One number", /[0-9]/.test(password)], ["One special character", /[^A-Za-z0-9]/.test(password)]].map(([label, met]) => (
                      <li key={label as string} className="flex items-center gap-1.5 text-sm font-['Instrument_Sans',sans-serif]" style={{ color: met ? "#5a9c6e" : "#a8917e" }}>
                        <Check className={`w-3 h-3 ${met ? "opacity-100" : "opacity-30"}`} /> {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <input type={showPw ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" autoComplete="new-password" className={inputCls} />
                  {errors.confirm && <p className={errCls}>{errors.confirm}</p>}
                </div>
                <p className="text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] leading-relaxed bg-[#f5ece0] rounded-xl p-3">
                  🔒 Your account is stored securely. For best protection, use a unique password you don't use elsewhere.
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 border border-[#3A291F] text-[#3A291F] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-4 rounded-full hover:bg-[#3A291F] hover:text-[#FAF5EF] transition-all">
                    Back
                  </button>
                  <button type="submit"
                    className="flex-1 bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-4 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg">
                    Create Account
                  </button>
                </div>
              </form>
            )}

            {step === 3 && newUser && (
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-[#3A291F] font-['Instrument_Serif',serif]"
                  style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                  {newUser.name[0]}
                </div>
                <div>
                  <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mb-4">Your referral code — share it and earn $10 credit when a friend books for the first time.</p>
                  <div className="flex items-center gap-3 bg-white/60 rounded-2xl px-5 py-3 border border-[rgba(58,41,31,0.1)]">
                    <p className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F] flex-1 tracking-widest">{newUser.referralCode}</p>
                    <button onClick={copyCode} className="text-[#6B4F3A] hover:text-[#3A291F] transition-colors">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button onClick={() => navigate("dashboard")}
                  className="w-full bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-4 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg">
                  Go to My Dashboard
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────────
function DashboardPage({ user, navigate, onUpdate, onSignOut }: {
  user: AppUser;
  navigate: (p: Page) => void;
  onUpdate: (u: AppUser) => void;
  onSignOut: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    api(`/clients/${encodeURIComponent(user.email)}/appointments`)
      .then(d => setAppointments(d.appointments ?? []))
      .catch(() => setAppointments([]));
  }, [user.email]);

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target?.result as string;
        const updated = { ...user, inspoImages: [dataUrl, ...user.inspoImages] };
        saveUser(updated);
        onUpdate(updated);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }, [user, onUpdate]);

  const removeImage = (url: string) => {
    const updated = { ...user, inspoImages: user.inspoImages.filter(i => i !== url) };
    saveUser(updated);
    onUpdate(updated);
    setDeleting(null);
  };

  return (
    <div className="min-h-screen bg-[#f5ece0]">
      {/* Dashboard header */}
      <div className="bg-[#FAF5EF] pt-28 pb-12 px-6 md:px-16 relative overflow-hidden">
        <AnimalPrint opacity={0.4} />
        <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[14px] uppercase tracking-[4px] font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mb-2">My Account</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-[#3A291F] font-['Instrument_Serif',serif] flex-shrink-0"
                style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                {user.name[0]}
              </div>
              <div>
                <h1 className="font-['Instrument_Serif',serif] text-4xl md:text-5xl text-[#3A291F]">Welcome back, {user.name.split(" ")[0]}.</h1>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mt-1">{user.email} · Member since {user.joinedDate}</p>
              </div>
            </div>
          </motion.div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={() => navigate("book")}
              className="bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg">
              Book Appointment
            </button>
            <button onClick={onSignOut}
              className="flex items-center gap-2 border border-[rgba(58,41,31,0.2)] text-[#6b4f3a] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:border-[#3A291F] hover:text-[#3A291F] transition-all">
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-12 space-y-10">

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Referral Credits", value: `$${user.referralCredits}`, sub: "Earned from referrals", icon: <Star className="w-5 h-5" /> },
            { label: "Appointments", value: appointments.length, sub: "Booked sessions", icon: <Calendar className="w-5 h-5" /> },
            { label: "Inspo Saved", value: user.inspoImages.length, sub: "Nail design ideas", icon: <ImagePlus className="w-5 h-5" /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-[#FAF5EF] rounded-2xl p-6 flex items-start gap-4">
              <div className="text-[#6B4F3A] mt-0.5">{stat.icon}</div>
              <div>
                <p className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F]">{stat.value}</p>
                <p className="font-['Instrument_Sans',sans-serif] font-bold text-[14px] uppercase tracking-widest text-[#3a291f] mt-1">{stat.label}</p>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Referral section */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[#3A291F] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[14px] uppercase tracking-[4px] font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mb-2">Refer a Friend</p>
            <h2 className="font-['Instrument_Serif',serif] text-2xl md:text-3xl text-[#FAF5EF] mb-2">Give $10, Get $10</h2>
            <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e] leading-relaxed max-w-md">
              Share your code and when a friend books their first appointment, you both get $10 in credit toward your next visit.
            </p>
          </div>
          <div className="flex-shrink-0">
            <p className="text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] text-[#a8917e] mb-2">Your Code</p>
            <div className="flex items-center gap-3 bg-[#3a291f] rounded-2xl px-5 py-3">
              <p className="font-['Instrument_Serif',serif] text-2xl text-[#FAF5EF] tracking-widest">{user.referralCode}</p>
              <button onClick={copyCode} className="text-[#6B4F3A] hover:text-[#FAF5EF] transition-colors ml-2">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && <p className="text-sm font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mt-1 text-center">Copied!</p>}
          </div>
        </motion.div>

        {/* Appointments */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F] mb-5">Appointments</h2>
          <div className="bg-[#FAF5EF] rounded-3xl overflow-hidden divide-y divide-[rgba(58,41,31,0.08)]">
            {appointments.length === 0 && (
              <div className="px-7 py-10 text-center">
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">No appointments yet — book your first one!</p>
              </div>
            )}
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between px-7 py-5 hover:bg-white/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#f5ece0] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[#6B4F3A]" />
                  </div>
                  <div>
                    <p className="font-['Instrument_Serif',serif] text-lg text-[#3A291F]">{appt.service}</p>
                    <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">{formatAppointmentDate(appt.date)}{appt.time ? ` at ${formatAppointmentTime(appt.time)}` : ""}</p>
                  </div>
                </div>
                <span className="text-sm font-['Instrument_Sans',sans-serif] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-[#f5ece0] text-[#6b4f3a]">
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button onClick={() => navigate("book")}
              className="text-sm font-['Instrument_Sans',sans-serif] font-semibold text-[#6B4F3A] hover:underline">
              + Book your next appointment
            </button>
          </div>
        </motion.div>

        {/* Inspo Gallery */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F]">My Inspo Gallery</h2>
              <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mt-1">Save nail designs you love and share them with Audrey at your appointment.</p>
            </div>
            <button onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 bg-[#3A291F] text-[#FAF5EF] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest px-5 py-3 rounded-full hover:bg-[#6B4F3A] transition-all hover:shadow-lg flex-shrink-0">
              <Upload className="w-3.5 h-3.5" /> Add Photos
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} aria-label="Upload images" title="Upload images" />
          </div>

          {user.inspoImages.length === 0 ? (
            <button onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-[#a8917e]/40 bg-[#FAF5EF]/60 rounded-3xl py-16 flex flex-col items-center gap-3 hover:border-[#6B4F3A] transition-colors group">
              <ImagePlus className="w-10 h-10 text-[#a8917e] group-hover:text-[#6B4F3A] transition-colors" />
              <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a]">Upload your first inspo photo</p>
              <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">JPG, PNG, WEBP supported</p>
            </button>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {user.inspoImages.map((img, i) => (
                <div key={i} className="break-inside-avoid rounded-xl overflow-hidden bg-[#FAF5EF] relative group">
                  <img src={img} alt={`Inspo ${i + 1}`} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <button onClick={() => setDeleting(img)}
                      aria-label="Delete image"
                      title="Delete image"
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-red-500 rounded-full p-2 hover:bg-white">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delete confirm */}
          {deleting && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[#f5ece0] rounded-3xl p-8 max-w-sm w-full text-center">
                <p className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F] mb-3">Remove this photo?</p>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mb-6">This can't be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleting(null)}
                    className="flex-1 border border-[#3A291F] text-[#3A291F] text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-3 rounded-full">
                    Cancel
                  </button>
                  <button onClick={() => removeImage(deleting)}
                    className="flex-1 bg-red-500 text-white text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest py-3 rounded-full hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

// ── ADMIN PAGES ───────────────────────────────────────────────────────────────
type AdminClient = Omit<AppUser, "inspoImages"> & { createdAt?: string };
type AdminAppt = { id: string; service: string; date: string; time?: string; status: string; createdAt: string; notes?: string; price?: string; source?: string };
type PortfolioImageDraft = Pick<PortfolioImage, "title" | "color" | "length" | "artwork" | "style" | "season">;

function newPortfolioDraft(): PortfolioImageDraft {
  return {
    title: "",
    color: "Neutral",
    length: "medium",
    artwork: "simple",
    style: "Classic",
    season: "Everyday",
  };
}

function AdminPage({ navigate }: { navigate: (p: Page) => void }) {
  // ── Login state ──
  const [authed, setAuthed] = useState(() => !!localStorage.getItem(ADMIN_TOKEN_KEY));
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ── Dashboard state ──
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [stats, setStats] = useState<{ totalClients: number; totalAppointments: number; totalCredits: number } | null>(null);
  const [selected, setSelected] = useState<AdminClient | null>(null);
  const [appts, setAppts] = useState<AdminAppt[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({ name: "", phone: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addAppt, setAddAppt] = useState(false);
  const [newAppt, setNewAppt] = useState({ service: "", date: "", time: "", status: "Completed" });
  const [changePw, setChangePw] = useState(false);
  const [newPwVal, setNewPwVal] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [galleryItems, setGalleryItems] = useState<PortfolioImage[]>(loadPortfolioGallery);
  const [galleryDraft, setGalleryDraft] = useState<PortfolioImageDraft>(newPortfolioDraft);
  const [galleryDragActive, setGalleryDragActive] = useState(false);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [cd, sd] = await Promise.all([
        adminApi("/admin/clients"),
        adminApi("/admin/stats"),
      ]);
      setClients(cd.clients ?? []);
      setStats(sd);
      fetchPortfolioGallery()
        .then((gallery) => {
          setGalleryItems(gallery);
          savePortfolioGallery(gallery);
        })
        .catch(() => {});
    } catch {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) loadDashboard(); }, [authed]);

  const selectClient = async (client: AdminClient) => {
    setSelected(client);
    setEditing(false);
    setConfirmDelete(false);
    setAddAppt(false);
    setEditFields({ name: client.name, phone: client.phone });
    try {
      const d = await adminApi(`/admin/clients/${encodeURIComponent(client.email)}/appointments`);
      setAppts(d.appointments ?? []);
    } catch { setAppts([]); }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    setLoginLoading(true);
    try {
      const d = await api("/admin/login", { method: "POST", body: JSON.stringify({ password: pw }) });
      localStorage.setItem(ADMIN_TOKEN_KEY, d.token);
      setAuthed(true);
    } catch (err: any) {
      setLoginErr(err.message || "Invalid password");
    } finally {
      setLoginLoading(false);
    }
  };

  const saveClient = async () => {
    if (!selected) return;
    try {
      const d = await adminApi(`/admin/clients/${encodeURIComponent(selected.email)}`, {
        method: "PUT", body: JSON.stringify(editFields),
      });
      const updated = d.client;
      setSelected(updated);
      setClients(cs => cs.map(c => c.email === updated.email ? updated : c));
      setEditing(false);
    } catch {}
  };

  const adjustCredits = async (delta: number) => {
    if (!selected) return;
    try {
      const d = await adminApi(`/admin/clients/${encodeURIComponent(selected.email)}/credits`, {
        method: "POST", body: JSON.stringify({ delta }),
      });
      const updated = { ...selected, referralCredits: d.referralCredits };
      setSelected(updated);
      setClients(cs => cs.map(c => c.email === updated.email ? updated : c));
    } catch {}
  };

  const deleteClient = async () => {
    if (!selected) return;
    await adminApi(`/admin/clients/${encodeURIComponent(selected.email)}`, { method: "DELETE" });
    setClients(cs => cs.filter(c => c.email !== selected.email));
    setSelected(null);
    setConfirmDelete(false);
    loadDashboard();
  };

  const submitAppt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !newAppt.service || !newAppt.date) return;
    try {
      const d = await adminApi(`/admin/clients/${encodeURIComponent(selected.email)}/appointments`, {
        method: "POST", body: JSON.stringify(newAppt),
      });
      setAppts(a => [d.appointment, ...a]);
      setNewAppt({ service: "", date: "", time: "", status: "Completed" });
      setAddAppt(false);
      if (stats) setStats({ ...stats, totalAppointments: stats.totalAppointments + 1 });
    } catch {}
  };

  const deleteAppt = async (id: string) => {
    if (!selected) return;
    await adminApi(`/admin/clients/${encodeURIComponent(selected.email)}/appointments/${id}`, { method: "DELETE" });
    setAppts(a => a.filter(x => x.id !== id));
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi("/admin/password", { method: "PUT", body: JSON.stringify({ newPassword: newPwVal }) });
      setPwMsg("Password updated.");
      setNewPwVal("");
      setTimeout(() => { setPwMsg(""); setChangePw(false); }, 2000);
    } catch (err: any) { setPwMsg(err.message); }
  };

  const signOut = () => { localStorage.removeItem(ADMIN_TOKEN_KEY); setAuthed(false); setClients([]); setSelected(null); };

  const persistGallery = (items: PortfolioImage[]) => {
    setGalleryItems(items);
    savePortfolioGallery(items);
    saveAdminPortfolioGallery(items)
      .then((saved) => {
        setGalleryItems(saved);
        savePortfolioGallery(saved);
      })
      .catch(() => {});
  };

  const addGalleryFiles = useCallback((files: FileList | File[]) => {
    const images = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!images.length) return;
    images.forEach((file, index) => {
      prepareGalleryImage(file).then((src) => {
        const title = galleryDraft.title.trim() || file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
        const item: PortfolioImage = {
          id: `${Date.now()}-${index}-${file.name}`,
          src,
          title,
          createdAt: new Date().toISOString(),
          color: galleryDraft.color,
          length: galleryDraft.length,
          artwork: galleryDraft.artwork,
          style: galleryDraft.style,
          season: galleryDraft.season,
        };
        setGalleryItems((current) => {
          const next = [item, ...current];
          savePortfolioGallery(next);
          saveAdminPortfolioGallery(next).catch(() => {});
          return next;
        });
      }).catch(() => {});
    });
    setGalleryDraft(newPortfolioDraft());
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }, [galleryDraft]);

  const updateGalleryItem = (id: string, updates: Partial<PortfolioImage>) => {
    persistGallery(galleryItems.map((item) => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteGalleryItem = (id: string) => {
    persistGallery(galleryItems.filter((item) => item.id !== id));
  };

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const inputCls = "w-full bg-white border border-[rgba(58,41,31,0.15)] rounded-xl px-3 py-2.5 text-sm font-['Instrument_Sans',sans-serif] text-[#3A291F] placeholder-[#a8917e] focus:outline-none focus:border-[#6B4F3A] transition-colors";

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#3A291F] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-10">
            <ShieldCheck className="w-10 h-10 text-[#6B4F3A] mx-auto mb-4" />
            <h1 className="font-['Instrument_Serif',serif] text-4xl text-[#FAF5EF]">Admin Access</h1>
            <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e] mt-2">Your Nail Girl Audrey</p>
          </div>
          <div className="bg-[#3a291f] rounded-3xl p-8">
            <form onSubmit={login} className="flex flex-col gap-4">
              <div>
                <label className="block text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#a8917e] mb-2">Admin Password</label>
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••••"
                  className="w-full bg-[#3A291F] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-sm font-['Instrument_Sans',sans-serif] text-[#FAF5EF] placeholder-[#6b4f3a] focus:outline-none focus:border-[#6B4F3A] transition-colors" />
              </div>
              {loginErr && <p className="text-sm text-red-400 font-['Instrument_Sans',sans-serif]">{loginErr}</p>}
              <button type="submit" disabled={loginLoading}
                className="w-full py-3.5 rounded-full text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest text-[#3A291F] disabled:opacity-60 transition-all"
                style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                {loginLoading ? "Verifying…" : "Sign In"}
              </button>
            </form>
            <p className="text-center text-sm font-['Instrument_Sans',sans-serif] text-[#6b4f3a] mt-5">
              Default password: <code className="text-[#6B4F3A]">AudreyAdmin2026!</code>
            </p>
          </div>
          <button onClick={() => navigate("home")} className="mt-6 w-full text-center text-sm font-['Instrument_Sans',sans-serif] text-[#6b4f3a] hover:text-[#a8917e] transition-colors">
            ← Back to site
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5ece0]">
      {/* Header */}
      <div className="bg-[#3A291F] px-6 md:px-10 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#6B4F3A]" />
          <span className="font-['Instrument_Serif',serif] text-xl text-[#FAF5EF]">Admin Panel</span>
          <span className="text-[#6b4f3a] text-sm font-['Instrument_Sans',sans-serif]">· Your Nail Girl Audrey</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setChangePw(!changePw)}
            className="text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] hover:text-[#FAF5EF] transition-colors">
            Change Password
          </button>
          <button onClick={() => navigate("home")}
            className="text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] hover:text-[#FAF5EF] transition-colors">
            View Site
          </button>
          <button onClick={signOut}
            className="flex items-center gap-1.5 text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] hover:text-[#FAF5EF] transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Change password panel */}
      {changePw && (
        <div className="bg-[#3a291f] px-6 md:px-10 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <form onSubmit={savePassword} className="flex items-center gap-3 max-w-md">
            <input type="password" value={newPwVal} onChange={e => setNewPwVal(e.target.value)} placeholder="New admin password (min 8 chars)"
              className="flex-1 bg-[#3A291F] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2 text-sm font-['Instrument_Sans',sans-serif] text-[#FAF5EF] placeholder-[#6b4f3a] focus:outline-none focus:border-[#6B4F3A] transition-colors" />
            <button type="submit" className="px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest text-[#3A291F] font-['Instrument_Sans',sans-serif]"
              style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>Save</button>
            {pwMsg && <span className="text-sm font-['Instrument_Sans',sans-serif] text-[#6B4F3A]">{pwMsg}</span>}
          </form>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="px-6 md:px-10 py-5 grid grid-cols-3 gap-4 border-b border-[rgba(58,41,31,0.1)]">
          {[
            { label: "Total Clients", value: stats.totalClients, icon: <Users className="w-4 h-4" /> },
            { label: "Total Appointments", value: stats.totalAppointments, icon: <Calendar className="w-4 h-4" /> },
            { label: "Credits Issued", value: `$${stats.totalCredits}`, icon: <DollarSign className="w-4 h-4" /> },
          ].map((s, i) => (
            <div key={i} className="bg-[#FAF5EF] rounded-2xl px-5 py-4 flex items-center gap-3">
              <span className="text-[#6B4F3A]">{s.icon}</span>
              <div>
                <p className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F]">{s.value}</p>
                <p className="text-[14px] uppercase tracking-widest font-['Instrument_Sans',sans-serif] text-[#a8917e]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio gallery manager */}
      <div className="px-6 md:px-10 py-8 border-b border-[rgba(58,41,31,0.1)]">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[14px] uppercase tracking-[3px] font-['Instrument_Sans',sans-serif] text-[#6B4F3A] mb-2">Portfolio Gallery</p>
            <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F]">Manage filterable gallery</h2>
            <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mt-1">Drag photos in, add tags, and those tags power the public portfolio filters.</p>
          </div>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-full bg-[#3A291F] px-5 py-3 font-['Instrument_Sans',sans-serif] text-sm font-semibold uppercase tracking-widest text-[#FAF5EF] transition-all hover:bg-[#6B4F3A] hover:shadow-lg"
          >
            <Upload className="h-3.5 w-3.5" />
            Add Images
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.4fr]">
          <div
            onDragOver={(event) => { event.preventDefault(); setGalleryDragActive(true); }}
            onDragLeave={() => setGalleryDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setGalleryDragActive(false);
              addGalleryFiles(event.dataTransfer.files);
            }}
            className={`rounded-2xl border-2 border-dashed bg-[#FAF5EF]/70 p-5 transition-colors ${galleryDragActive ? "border-[#6B4F3A] bg-white" : "border-[#a8917e]/40"}`}
          >
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => addGalleryFiles(event.target.files || [])}
              aria-label="Upload portfolio gallery images"
              title="Upload portfolio gallery images"
            />
            <div className="mb-5 rounded-xl bg-white/70 px-5 py-8 text-center">
              <ImagePlus className="mx-auto mb-3 h-9 w-9 text-[#a8917e]" />
              <p className="font-['Instrument_Sans',sans-serif] text-sm font-semibold text-[#3A291F]">Drop 4:5 nail images here</p>
              <p className="mt-1 font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">or use Add Images above. JPG, PNG, and WEBP work best.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="gallery-title" className="block text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#a8917e] mb-1.5">Title for upload</label>
                <input
                  id="gallery-title"
                  value={galleryDraft.title}
                  onChange={(event) => setGalleryDraft((draft) => ({ ...draft, title: event.target.value }))}
                  placeholder="Optional, file name used if blank"
                  className={inputCls}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(["color", "length", "artwork", "style", "season"] as const).map((key) => (
                  <label key={key} className={key === "season" ? "col-span-2" : ""}>
                    <span className="block text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#a8917e] mb-1.5">{prettyTag(key)}</span>
                    <select
                      value={galleryDraft[key]}
                      onChange={(event) => setGalleryDraft((draft) => ({ ...draft, [key]: event.target.value }))}
                      className={inputCls}
                    >
                      {galleryFilterOptions[key].map((option) => (
                        <option key={option} value={option}>{prettyTag(option)}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-['Instrument_Sans',sans-serif] text-sm font-semibold text-[#3A291F]">{galleryItems.length} gallery images</p>
              <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">Newest images show first by default</p>
            </div>
            <div className="grid max-h-[520px] grid-cols-1 gap-4 overflow-y-auto pr-1 xl:grid-cols-2">
              {galleryItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-[rgba(58,41,31,0.08)] bg-[#f5ece0] p-3">
                  <div className="grid grid-cols-[96px_1fr] gap-3">
                    <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#F5ECE0]">
                      <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <input
                        value={item.title}
                        onChange={(event) => updateGalleryItem(item.id, { title: event.target.value })}
                        className={inputCls}
                        aria-label={`Title for ${item.title}`}
                        title={`Title for ${item.title}`}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        {(["color", "length", "artwork", "style", "season"] as const).map((key) => (
                          <select
                            key={key}
                            value={item[key]}
                            onChange={(event) => updateGalleryItem(item.id, { [key]: event.target.value } as Partial<PortfolioImage>)}
                            className="w-full rounded-lg border border-[rgba(58,41,31,0.12)] bg-white px-2 py-2 font-['Instrument_Sans',sans-serif] text-sm text-[#3A291F] focus:outline-none focus:border-[#6B4F3A]"
                            aria-label={`${prettyTag(key)} for ${item.title}`}
                            title={`${prettyTag(key)} for ${item.title}`}
                          >
                            {galleryFilterOptions[key].map((option) => (
                              <option key={option} value={option}>{prettyTag(option)}</option>
                            ))}
                          </select>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-['Instrument_Sans',sans-serif] text-[14px] uppercase tracking-[1.5px] text-[#a8917e]">
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(item.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 font-['Instrument_Sans',sans-serif] text-sm font-semibold text-red-500 transition-colors hover:bg-red-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden">

        {/* Client list */}
        <div className="w-72 flex-shrink-0 border-r border-[rgba(58,41,31,0.1)] flex flex-col bg-white">
          <div className="p-4 border-b border-[rgba(58,41,31,0.08)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8917e]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients…"
                className="w-full pl-9 pr-3 py-2 text-sm font-['Instrument_Sans',sans-serif] bg-[#f5ece0] rounded-xl border border-[rgba(58,41,31,0.1)] text-[#3A291F] placeholder-[#a8917e] focus:outline-none focus:border-[#6B4F3A] transition-colors" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading && <p className="text-center text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] py-8">Loading…</p>}
            {!loading && filtered.length === 0 && (
              <p className="text-center text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] py-8">No clients yet</p>
            )}
            {filtered.map(client => (
              <button key={client.email} onClick={() => selectClient(client)}
                className={`w-full text-left px-4 py-3.5 border-b border-[rgba(58,41,31,0.06)] hover:bg-[#f5ece0] transition-colors ${selected?.email === client.email ? "bg-[#FAF5EF]" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-[#3A291F] font-['Instrument_Sans',sans-serif]"
                    style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                    {client.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-['Instrument_Sans',sans-serif] font-semibold text-sm text-[#3A291F] truncate">{client.name}</p>
                    <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e] truncate">{client.email}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-y-auto p-8">
          {!selected ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Users className="w-12 h-12 text-[#F5ECE0] mx-auto mb-4" />
                <p className="font-['Instrument_Serif',serif] text-2xl text-[#a8917e]">Select a client</p>
                <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e] mt-1">Choose from the list to view details</p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl space-y-8">

              {/* Client header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#3A291F] font-['Instrument_Serif',serif]"
                    style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <h2 className="font-['Instrument_Serif',serif] text-3xl text-[#3A291F]">{selected.name}</h2>
                    <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">Member since {selected.joinedDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(!editing); setEditFields({ name: selected.name, phone: selected.phone }); }}
                    className="flex items-center gap-1.5 border border-[rgba(58,41,31,0.15)] text-[#3a291f] text-sm font-['Instrument_Sans',sans-serif] font-semibold px-4 py-2 rounded-full hover:bg-[#FAF5EF] transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setConfirmDelete(true)}
                    className="text-sm font-['Instrument_Sans',sans-serif] font-semibold px-4 py-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit form */}
              {editing && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-[#FAF5EF] rounded-2xl p-6 space-y-4">
                  <p className="font-['Instrument_Sans',sans-serif] font-bold text-sm uppercase tracking-widest text-[#3a291f]">Edit Client Info</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-name" className="block text-sm font-['Instrument_Sans',sans-serif] font-semibold text-[#3a291f] mb-1.5">Name</label>
                      <input id="edit-name" value={editFields.name} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="edit-phone" className="block text-sm font-['Instrument_Sans',sans-serif] font-semibold text-[#3a291f] mb-1.5">Phone</label>
                      <input id="edit-phone" value={editFields.phone} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveClient} className="px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest text-[#3A291F] font-['Instrument_Sans',sans-serif]"
                      style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>Save</button>
                    <button onClick={() => setEditing(false)} className="px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-[rgba(58,41,31,0.2)] text-[#3a291f] font-['Instrument_Sans',sans-serif] hover:bg-[#f5ece0] transition-colors">Cancel</button>
                  </div>
                </motion.div>
              )}

              {/* Client info cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone },
                  { label: "Referral Code", value: selected.referralCode },
                  { label: "Joined", value: selected.joinedDate },
                ].map(item => (
                  <div key={item.label} className="bg-[#FAF5EF] rounded-2xl px-5 py-4">
                    <p className="text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#a8917e] mb-1">{item.label}</p>
                    <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#3A291F] break-all">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Credits */}
              <div className="bg-[#3A291F] rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-[14px] uppercase tracking-[2px] font-['Instrument_Sans',sans-serif] font-bold text-[#a8917e] mb-1">Referral Credits</p>
                  <p className="font-['Instrument_Serif',serif] text-4xl text-[#FAF5EF]">${selected.referralCredits ?? 0}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => adjustCredits(-10)}
                    aria-label="Decrease credits"
                    title="Decrease credits"
                    className="w-9 h-9 rounded-full bg-[#3a291f] text-[#FAF5EF] flex items-center justify-center hover:bg-[#6B4F3A] transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e]">$10</span>
                  <button onClick={() => adjustCredits(10)}
                    aria-label="Increase credits"
                    title="Increase credits"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#3A291F] hover:brightness-110 transition-all"
                    style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Appointments */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F]">Appointments</h3>
                  <button onClick={() => setAddAppt(!addAppt)}
                    className="flex items-center gap-1.5 text-sm font-['Instrument_Sans',sans-serif] font-semibold uppercase tracking-widest text-[#3A291F] border border-[rgba(58,41,31,0.2)] px-4 py-2 rounded-full hover:bg-[#FAF5EF] transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                {addAppt && (
                  <motion.form initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    onSubmit={submitAppt} className="bg-[#FAF5EF] rounded-2xl p-5 mb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="new-service" className="block text-sm font-semibold font-['Instrument_Sans',sans-serif] text-[#3a291f] mb-1">Service</label>
                        <input id="new-service" value={newAppt.service} onChange={e => setNewAppt(a => ({ ...a, service: e.target.value }))} placeholder="Gel Full Set" className={inputCls} />
                      </div>
                      <div>
                          <label htmlFor="new-status" className="block text-sm font-semibold font-['Instrument_Sans',sans-serif] text-[#3a291f] mb-1">Status</label>
                          <select id="new-status" value={newAppt.status} onChange={e => setNewAppt(a => ({ ...a, status: e.target.value }))}
                            className={inputCls}>
                          <option>Completed</option>
                          <option>Upcoming</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="new-date" className="block text-sm font-semibold font-['Instrument_Sans',sans-serif] text-[#3a291f] mb-1">Date</label>
                          <input id="new-date" type="date" value={newAppt.date} onChange={e => setNewAppt(a => ({ ...a, date: e.target.value }))} className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="new-time" className="block text-sm font-semibold font-['Instrument_Sans',sans-serif] text-[#3a291f] mb-1">Time (optional)</label>
                          <input id="new-time" type="time" value={newAppt.time} onChange={e => setNewAppt(a => ({ ...a, time: e.target.value }))} className={inputCls} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest text-[#3A291F] font-['Instrument_Sans',sans-serif]"
                        style={{ background: "linear-gradient(-79deg,#987943,#d6b470,#987943)" }}>Save</button>
                      <button type="button" onClick={() => setAddAppt(false)} className="px-5 py-2 rounded-full text-sm border border-[rgba(58,41,31,0.2)] text-[#3a291f] font-['Instrument_Sans',sans-serif] hover:bg-[#f5ece0] transition-colors">Cancel</button>
                    </div>
                  </motion.form>
                )}

                <div className="bg-white rounded-2xl overflow-hidden divide-y divide-[rgba(58,41,31,0.06)]">
                  {appts.length === 0 && <p className="text-center text-sm font-['Instrument_Sans',sans-serif] text-[#a8917e] py-8">No appointments yet</p>}
                  {appts.map(appt => (
                    <div key={appt.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#f5ece0] transition-colors group">
                      <div>
                        <p className="font-['Instrument_Sans',sans-serif] font-semibold text-sm text-[#3A291F]">{appt.service}</p>
                        <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#a8917e]">{formatAppointmentDate(appt.date)}{appt.time ? ` · ${formatAppointmentTime(appt.time)}` : ""}{appt.price ? ` · ${appt.price}` : ""}</p>
                        {appt.notes && <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mt-1 max-w-md">{appt.notes}</p>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-['Instrument_Sans',sans-serif] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#FAF5EF] text-[#6b4f3a]">{appt.status}</span>
                        <button onClick={() => deleteAppt(appt.id)}
                          aria-label="Delete appointment"
                          title="Delete appointment"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delete confirm */}
              {confirmDelete && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#f5ece0] rounded-3xl p-8 max-w-sm w-full text-center">
                    <p className="font-['Instrument_Serif',serif] text-2xl text-[#3A291F] mb-2">Delete {selected.name}?</p>
                    <p className="font-['Instrument_Sans',sans-serif] text-sm text-[#6b4f3a] mb-6">This removes all their data and appointments permanently.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setConfirmDelete(false)} className="flex-1 border border-[#3A291F] text-[#3A291F] text-sm font-semibold uppercase tracking-widest py-3 rounded-full font-['Instrument_Sans',sans-serif]">Cancel</button>
                      <button onClick={deleteClient} className="flex-1 bg-red-500 text-white text-sm font-semibold uppercase tracking-widest py-3 rounded-full hover:bg-red-600 font-['Instrument_Sans',sans-serif]">Delete</button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
 const location = useLocation();
const routerNavigate = useNavigate();

const pathToPage: Record<string, Page> = {
  "/": "home",
  "/my-work": "portfolio",
  "/services": "services",
  "/about": "about",
  "/book": "book",
  "/privacy": "privacy",
  "/terms": "terms",
  "/signin": "signin",
  "/signup": "signup",
  "/dashboard": "dashboard",
  "/admin": "admin",
};

const page: Page = pathToPage[location.pathname] ?? "home";

const termsSection =
  page === "terms" && location.hash
    ? location.hash.replace("#", "")
    : undefined;
  const [user, setUser] = useState<AppUser | null>(loadUser);

  const navigate = (p: Page, sectionId?: string) => {
  const pageToPath: Record<Page, string> = {
    home: "/",
    portfolio: "/my-work",
    services: "/services",
    about: "/about",
    book: "/book",
    privacy: "/privacy",
    terms: "/terms",
    signin: "/signin",
    signup: "/signup",
    dashboard: "/dashboard",
    admin: "/admin",
  };

  let path = pageToPath[p];

  if (p === "terms" && sectionId) {
    path += `#${sectionId}`;
  }

  routerNavigate(path);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleSignIn = (u: AppUser) => { setUser(u); saveUser(u); };
  const handleSignOut = () => { clearUser(); setUser(null); navigate("home"); };
  const handleUpdate = (u: AppUser) => { setUser(u); saveUser(u); };


return (
  <div className="min-h-screen bg-[#f5ece0] font-['Instrument_Sans',sans-serif]">
    {page !== "admin" && (
      <Nav
        current={page}
        navigate={navigate}
        user={user}
        onSignOut={handleSignOut}
      />
    )}

    <main>
      {page === "home" && <HomePage navigate={navigate} user={user} />}
      {page === "book" && <BookNowPage user={user} navigate={navigate} />}
      {page === "portfolio" && <PortfolioPage />}
      {page === "services" && <ServicesPage navigate={navigate} />}
      {page === "about" && <AboutPage navigate={navigate} />}
      {page === "privacy" && <PrivacyPage navigate={navigate} />}
      {page === "terms" && (
        <TermsPage navigate={navigate} sectionId={termsSection} />
      )}
      {page === "signin" && (
        <SignInPage navigate={navigate} onSignIn={handleSignIn} />
      )}
      {page === "signup" && (
        <SignUpPage navigate={navigate} onSignIn={handleSignIn} />
      )}
      {page === "dashboard" && user && (
        <DashboardPage
          user={user}
          navigate={navigate}
          onUpdate={handleUpdate}
          onSignOut={handleSignOut}
        />
      )}
      {page === "dashboard" && !user && (
        <SignInPage navigate={navigate} onSignIn={handleSignIn} />
      )}
      {page === "admin" && <AdminPage navigate={navigate} />}
    </main>

    {page !== "admin" && <Footer navigate={navigate} />}
  </div>
);
}

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: "3D" | "E-com" | "Brand" | "UI/UX";
  role: string;
  stack: string[];
  cover: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: { label: string; value: string }[];
  gallery: string[];
};

// Placeholder imagery via Unsplash (royalty-free) — swap for real case study art later.
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS: Project[] = [
  {
    slug: "aurora-couture",
    title: "Aurora Couture",
    client: "Aurora Maison",
    year: "2025",
    category: "E-com",
    role: "Design · 3D · Build",
    stack: ["Three.js", "Shopify Hydrogen", "GSAP"],
    cover: img("photo-1520975916090-3105956dac38"),
    summary:
      "A liquid-metal e-commerce flagship for a Parisian couture house, blending atelier craft with realtime 3D garment showcases.",
    challenge:
      "Translate the tactility of haute couture into a digital flagship without sacrificing conversion velocity.",
    approach:
      "We sculpted a custom WebGL fabric shader, choreographed a scroll-pinned product theatre, and rebuilt the cart around an editorial spine.",
    outcome: [
      { label: "Conversion", value: "+38%" },
      { label: "AOV", value: "+22%" },
      { label: "Lighthouse", value: "97" },
      { label: "Awards", value: "3" },
    ],
    gallery: [
      img("photo-1483985988355-763728e1935b"),
      img("photo-1490481651871-ab68de25d43d"),
      img("photo-1469334031218-e382a71b716b"),
    ],
  },
  {
    slug: "halo-finance",
    title: "Halo Finance",
    client: "Halo Capital",
    year: "2025",
    category: "UI/UX",
    role: "Product · Brand",
    stack: ["React", "TanStack", "D3", "Framer"],
    cover: img("photo-1551288049-bebda4e38f71"),
    summary:
      "A wealth platform reimagined as a calm, opinionated workspace — replacing dashboards with narrative briefings.",
    challenge: "Reduce decision fatigue across 14 portfolio surfaces.",
    approach:
      "An adaptive briefing engine, an obsidian dark canvas, and motion language tuned for institutional restraint.",
    outcome: [
      { label: "Time-to-insight", value: "-61%" },
      { label: "NPS", value: "72" },
      { label: "Retention", value: "+19%" },
      { label: "Markets", value: "9" },
    ],
    gallery: [
      img("photo-1554260570-e9689a3418b8"),
      img("photo-1611974789855-9c2a0a7236a3"),
      img("photo-1559526324-4b87b5e36e44"),
    ],
  },
  {
    slug: "vesper-motors",
    title: "Vesper Motors",
    client: "Vesper EV",
    year: "2024",
    category: "3D",
    role: "WebGL · Direction",
    stack: ["Three.js", "GLSL", "Lenis"],
    cover: img("photo-1492144534655-ae79c964c9d7"),
    summary:
      "A configurator that treats the vehicle as sculpture — realtime PBR, cinematic lensing, and a one-handed buy flow.",
    challenge: "Ship a configurator that loads under 2s on a mid-tier phone.",
    approach:
      "Streamed Draco meshes, deferred shading on capable devices, baked beauty for the rest. One narrative per trim.",
    outcome: [
      { label: "Reservations", value: "11k" },
      { label: "Mobile FPS", value: "60" },
      { label: "Bundle", value: "212kb" },
      { label: "Markets", value: "12" },
    ],
    gallery: [
      img("photo-1503376780353-7e6692767b70"),
      img("photo-1542362567-b07e54358753"),
      img("photo-1494976388531-d1058494cdd8"),
    ],
  },
  {
    slug: "monolith-studio",
    title: "Monolith Studio",
    client: "Monolith",
    year: "2024",
    category: "Brand",
    role: "Brand · Site",
    stack: ["TanStack Start", "WebGL", "GSAP"],
    cover: img("photo-1517999144091-3d9dca6d1e43"),
    summary:
      "A brand system and portfolio for a sculpture studio — chrome, basalt, and a single, defiant typeface.",
    challenge: "Build a portfolio that feels carved, not coded.",
    approach: "Generative chrome shaders, a kinetic wordmark, and a typographic grid that breathes.",
    outcome: [
      { label: "Inbound leads", value: "+220%" },
      { label: "Press", value: "27" },
      { label: "Awards", value: "FWA" },
      { label: "CR", value: "9.1%" },
    ],
    gallery: [
      img("photo-1558865869-c93f6f8482af"),
      img("photo-1505873242700-f289a29e1e0f"),
      img("photo-1519681393784-d120267933ba"),
    ],
  },
  {
    slug: "lumen-skincare",
    title: "Lumen Skincare",
    client: "Lumen",
    year: "2024",
    category: "E-com",
    role: "Design · Build",
    stack: ["Shopify", "GSAP", "Three.js"],
    cover: img("photo-1556228720-195a672e8a03"),
    summary:
      "An apothecary-grade ritual experience — ingredient theatre, ritual flows, subscription that doesn't feel like one.",
    challenge: "Turn a 6-product line into an ecosystem.",
    approach: "Ritual storytelling, ingredient atlas, soft-glow product theatre, hyper-personal quiz.",
    outcome: [
      { label: "AOV", value: "+44%" },
      { label: "Subs", value: "+71%" },
      { label: "Returns", value: "-18%" },
      { label: "CR", value: "6.4%" },
    ],
    gallery: [
      img("photo-1556228578-8c89e6adf883"),
      img("photo-1571781926291-c477ebfd024b"),
      img("photo-1522335789203-aaa14ec79a07"),
    ],
  },
  {
    slug: "atlas-residency",
    title: "Atlas Residency",
    client: "Atlas",
    year: "2023",
    category: "3D",
    role: "WebGL · Direction",
    stack: ["Three.js", "Cloudflare", "GLSL"],
    cover: img("photo-1545153996-e1d3fb86e4d0"),
    summary:
      "A hotel group's flagship site rebuilt as an architectural film — every property a chapter, every chapter a shader.",
    challenge: "Differentiate 28 properties without 28 templates.",
    approach: "A modular cinema engine with location-aware lighting and audio.",
    outcome: [
      { label: "Bookings", value: "+27%" },
      { label: "Time on site", value: "4:12" },
      { label: "Awards", value: "Awwwards SOTM" },
      { label: "Markets", value: "14" },
    ],
    gallery: [
      img("photo-1564501049412-61c2a3083791"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1551882547-ff40c63fe5fa"),
    ],
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "Brand Systems",
    body: "Identity, voice, and motion principles that scale from boardroom to billboard.",
    deliverables: ["Logo & Wordmark", "Type System", "Motion Language", "Guidelines"],
  },
  {
    n: "02",
    title: "UI / UX Design",
    body: "Editorial product design with the rigour of a system and the soul of a film.",
    deliverables: ["Discovery", "Information Architecture", "Prototyping", "Design Systems"],
  },
  {
    n: "03",
    title: "3D & WebGL",
    body: "Realtime 3D, custom shaders, and physically-based experiences that hold up at 60fps.",
    deliverables: ["Three.js / R3F", "Custom GLSL", "Configurators", "Realtime PBR"],
  },
  {
    n: "04",
    title: "E-commerce",
    body: "Conversion-engineered storefronts that feel like flagship boutiques, not catalogues.",
    deliverables: ["Shopify Hydrogen", "Headless Stacks", "Subscription", "Checkout"],
  },
  {
    n: "05",
    title: "Motion",
    body: "Choreographed transitions, kinetic typography, and scroll narratives that earn attention.",
    deliverables: ["Brand Films", "Site Motion", "Loaders", "Interaction Audio"],
  },
  {
    n: "06",
    title: "Engineering",
    body: "Edge-rendered, type-safe, and obsessively performant — built to outlive trends.",
    deliverables: ["TanStack Start", "Cloudflare Edge", "Realtime", "Performance"],
  },
];

export const STUDIOS = [
  { city: "Paris", tz: "Europe/Paris", coords: "48.85°N · 2.35°E" },
  { city: "Tokyo", tz: "Asia/Tokyo", coords: "35.68°N · 139.69°E" },
  { city: "New York", tz: "America/New_York", coords: "40.71°N · 74.00°W" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export const AGENCY = {
  name: "NOCTURNE",
  tagline: "We build the future of the web.",
  email: "studio@nocturne.dev",
  description:
    "An independent design studio crafting realtime, sculptural experiences for brands that refuse to look like everyone else.",
};

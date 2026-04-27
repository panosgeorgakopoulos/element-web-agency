export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: "3D" | "E-com" | "Brand" | "UI/UX" | "Web App / E-com";
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
    slug: "aegean-drives",
    title: "Aegean Drives",
    client: "Aegean Drives",
    year: "2024",
    category: "Web App / E-com",
    role: "Lead Engineer",
    stack: ["React", "Next.js", "Stripe", "PostgreSQL"],
    cover: img("photo-1533473359331-0135ef1b58bf"),
    summary:
      "A high-performance vehicle rental platform engineered for the Greek islands, featuring real-time fleet availability, dynamic pricing, and seamless checkout flows akin to industry leaders like Sixt.",
    challenge:
      "Engineered a solution to manage complex island-hopping logistics and real-time fleet synchronization while maintaining sub-second performance.",
    approach:
      "Architected with a mobile-first philosophy using Next.js and a robust serverless backend to handle high-concurrency booking requests during peak season.",
    outcome: [
      { label: "Load Time", value: "< 1.2s" },
      { label: "Lighthouse", value: "99" },
      { label: "Checkout Steps", value: "3" },
    ],
    gallery: [
      img("photo-1544620347-c4fd4a3d5957"),
      img("photo-1506012787146-f92b2d7d6d96"),
      img("photo-1519641471654-76ce0107ad1b"),
    ],
  },
];

export const SERVICES = [
  {
    n: "01",
    title: "Full-Stack Engineering",
    body: "Building robust, type-safe web applications that scale from prototype to production with ease.",
    deliverables: ["React / Next.js", "Node.js / Bun", "PostgreSQL", "Edge Functions"],
  },
  {
    n: "02",
    title: "UI / UX Design",
    body: "Creating premium digital experiences where functional precision meets aesthetic excellence.",
    deliverables: ["Interface Design", "Prototyping", "Design Systems", "Motion Language"],
  },
  {
    n: "03",
    title: "E-commerce & Payments",
    body: "High-conversion checkout flows and complex payment orchestrations designed for modern commerce.",
    deliverables: ["Stripe Integration", "Cart Logic", "Subscription Systems", "Payout Flows"],
  },
  {
    n: "04",
    title: "API Integrations",
    body: "Bridging platforms with secure, high-performance API architectures and real-time data sync.",
    deliverables: ["REST & GraphQL", "Third-party APIs", "Webhooks", "Custom Middleware"],
  },
];

export const STUDIOS = [
  { city: "Athens", tz: "Europe/Athens" },
  { city: "Remote", tz: "Global" },
];

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/panagiotis-sergios-georgakopoulos/" },
  { label: "GitHub", href: "https://github.com/panosgeorgakopoulos" },
  { label: "X / Twitter", href: "https://x.com" },
];

export const AGENCY = {
  name: "Element Web",
  tagline: "High-performance web engineering.",
  email: "hello@elementweb.io",
  description:
    "An elite, independent web engineering studio led by Panos Georgakopoulos, specializing in high-performance web apps and booking systems.",
};

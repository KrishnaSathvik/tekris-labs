export type ProductCategory =
  "developer-tools" | "ai-automation" | "creative-learning" | "productivity" | "software";

export type ProductPlatform = "chatgpt" | "web";

export interface Product {
  slug: string;
  name: string;
  summary: string;
  category: ProductCategory;
  platform: ProductPlatform;
  icon: string;
  /** Official public destination. Leave unset until the listing URL is verified. */
  listingUrl?: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "developer-tools": "Developer Tools",
  "ai-automation": "AI & Automation",
  "creative-learning": "Creative & Learning",
  productivity: "Productivity",
  software: "Software Applications",
};

export const PLATFORM_LABELS: Record<ProductPlatform, string> = {
  chatgpt: "ChatGPT plugin",
  web: "Web app",
};

export const products: Product[] = [
  {
    slug: "sql-copilot",
    name: "SQL Copilot",
    summary: "Write, review, and improve SQL with correctness-aware guidance.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab40fcbcc3c81919e0c679fee35faaf",
    icon: "/products/sql-copilot.svg",
  },
  {
    slug: "production-rag-genai-copilot",
    name: "RAG & GenAI Copilot",
    summary: "Production-focused RAG architecture, debugging, evaluation, and reliability.",
    category: "ai-automation",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab42163e9048191ab6e8c14258a48c3",
    icon: "/products/production-rag-genai-copilot.svg",
  },
  {
    slug: "atelier-pottery-mentor",
    name: "Atelier Pottery Mentor",
    summary: "Pottery mentorship for technique, critique, glazes, and firing.",
    category: "creative-learning",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab42f2f629081918472e7498a8ef589",
    icon: "/products/atelier-pottery-mentor.png",
  },
  {
    slug: "imago",
    name: "Imago",
    summary: "Visual-first image generation, editing, and information design.",
    category: "creative-learning",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab42aaa4d808191be10baa770d399ad",
    icon: "/products/imago.png",
  },
  {
    slug: "llm-agent-builder-copilot",
    name: "LLM & Agent Builder Copilot",
    summary: "Design reliable LLM, tool, MCP, and agent workflows.",
    category: "ai-automation",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab425eb851c819183be21bdcdf25677",
    icon: "/products/llm-agent-builder-copilot.svg",
  },
  {
    slug: "software-data-ai-copilot",
    name: "Software & AI Copilot",
    summary: "Repository-first coding help for software, data, and AI projects.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab41ed5b8c4819199eb5bbf91ce25f5",
    icon: "/products/software-data-ai-copilot.png",
  },
  {
    slug: "production-data-engineering-copilot",
    name: "Data Engineering Copilot",
    summary: "Data pipeline architecture, debugging, recovery, and reliability.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab424ad5b448191b8fede2ebf569333",
    icon: "/products/production-data-engineering-copilot.svg",
  },
  {
    slug: "power-bi-report-builder-copilot",
    name: "Power BI Report Copilot",
    summary: "Build and debug Power BI reports, semantic models, and DAX.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab409346c7c8191bacd83080aee170d",
    icon: "/products/power-bi-report-builder-copilot.svg",
  },
  {
    slug: "product-app-architect",
    name: "Product & App Architect",
    summary: "Turn product ideas into focused plans, UX flows, and architecture.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab4123730588191bc9267b9458b2670",
    icon: "/products/product-app-architect.svg",
  },
  {
    slug: "cloud-platform-engineering-copilot",
    name: "Platform Engineering Copilot",
    summary: "Cloud platform architecture, Kubernetes, IaC, and reliability.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab434710ac881918a118d3e2fdade0b",
    icon: "/products/cloud-platform-engineering-copilot.png",
  },
  {
    slug: "unix-copilot",
    name: "Unix Copilot",
    summary: "Safe Unix, Linux, macOS, and shell command workflows.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab427b8c6908191a438adb4b6f315d4",
    icon: "/products/unix-copilot.svg",
  },
  {
    slug: "web-app-qa-release-copilot",
    name: "Web App QA & Release Copilot",
    summary: "Web app QA, regression testing, and release readiness.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab4313dbfa08191ae3aa86c67c57b96",
    icon: "/products/web-app-qa-release-copilot.png",
  },
  {
    slug: "technical-interview-copilot",
    name: "Technical Interview Copilot",
    summary: "Role-aware technical interview preparation, practice, and feedback.",
    category: "creative-learning",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab405a6785081918aefad75d5faeef5",
    icon: "/products/technical-interview-copilot.png",
  },
  {
    slug: "research-technical-writing-copilot",
    name: "Research & Writing Copilot",
    summary: "Deep research, source verification, and technical writing.",
    category: "productivity",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab4352c7c48819199c4dd10b40fefe3",
    icon: "/products/research-technical-writing-copilot.png",
  },
  {
    slug: "seo-website-growth-copilot",
    name: "SEO & Growth Copilot",
    summary: "Technical SEO, Search Console analysis, and content strategy.",
    category: "productivity",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab436f61b688191958e1fe2235a5420",
    icon: "/products/seo-website-growth-copilot.png",
  },
  {
    slug: "job-outreach-copilot",
    name: "Job Outreach Copilot",
    summary: "Find and qualify roles, then draft truthful recruiter outreach and follow-ups.",
    category: "productivity",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ab406f25d6881918965f198eaa43903",
    icon: "/products/job-outreach-copilot.svg",
  },
  {
    slug: "build-mcp-apps-agents",
    name: "Build MCP Apps & Agents",
    summary: "Design, build and test MCP servers, tool contracts and interactive MCP Apps.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ae8cbe5a6708191b99fec2318f2e009",
    icon: "/products/build-mcp-apps-agents.png",
  },
  {
    slug: "web-mobile-app-builder",
    name: "Web & Mobile App Builder",
    summary: "Plan and build websites, PWAs and mobile apps with a considered visual system.",
    category: "developer-tools",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6ae8cc5ee77c81918ab31ed7701a28de",
    icon: "/products/web-mobile-app-builder.png",
  },
  {
    slug: "design-game-studio",
    name: "Design Game Studio",
    summary: "Turn a game idea into a small, playable 2D or 3D project.",
    category: "creative-learning",
    platform: "chatgpt",
    listingUrl: "https://chatgpt.com/plugins/plugins_6aea3d430b4c8191a4423700cf3bc0fa",
    icon: "/products/design-game-studio.png",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

const FEATURED_SLUGS = [
  "production-rag-genai-copilot",
  "software-data-ai-copilot",
  "sql-copilot",
] as const;

export function getFeaturedProducts(): Product[] {
  return FEATURED_SLUGS.map((slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Featured product not found: ${slug}`);
    return product;
  });
}

export function getCategoriesInUse(): ProductCategory[] {
  const used = new Set(products.map((product) => product.category));
  return (Object.keys(CATEGORY_LABELS) as ProductCategory[]).filter((category) =>
    used.has(category),
  );
}

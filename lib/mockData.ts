import { BrandAd, HairAnalysis, Procedure, Product, Recommendation } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "p_88",
    name: "Moist Curl Cream",
    brand: "CurlLab",
    description: "Крем для увлажнения волнистых и кудрявых волос.",
    image: "/images/product-curl-cream.svg",
    price: 19.9,
    category: "styling",
    hairTypes: ["Wavy-2B", "Curly-3A"],
    partnerLink: "https://trk.example/p_88",
    tags: ["увлажнение", "кудри"]
  },
  {
    id: "p_21",
    name: "Scalp Detox Serum",
    brand: "DermaHair",
    description: "Сыворотка для кожи головы с мятой и ниацинамидом.",
    image: "/images/product-scalp-serum.svg",
    price: 27.5,
    category: "treatment",
    hairTypes: ["Straight-1", "Wavy-2A", "Wavy-2B"],
    partnerLink: "https://trk.example/p_21",
    tags: ["детокс", "кожа головы"]
  }
];

export const mockProcedures: Procedure[] = [
  {
    id: "proc_01",
    title: "Утренний ритуал для 2B волн",
    summary: "Лёгкое очищение и защита от влажности за 15 минут.",
    steps: [
      "Нанесите бессульфатный шампунь и тщательно смойте.",
      "Используйте кондиционер только на длину.",
      "Сушите волосы диффузором на низкой температуре."
    ],
    duration: 15,
    difficulty: "easy",
    coverImage: "/images/procedure-morning.svg"
  },
  {
    id: "proc_02",
    title: "Spa-вечер для сухих кончиков",
    summary: "Глубокое увлажнение и масляная маска раз в неделю.",
    steps: [
      "Сделайте мягкий пилинг кожи головы.",
      "Нанесите питательную маску с алоэ.",
      "Запечатайте влагу маслом жожоба."
    ],
    duration: 40,
    difficulty: "medium",
    coverImage: "/images/procedure-spa.svg"
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec_01",
    title: "Программа для волнистых 2B",
    description: "Фокус на увлажнение и легкую укладку.",
    products: mockProducts
  }
];

export const mockAnalyses: HairAnalysis[] = [
  {
    id: "a_demo_curly",
    hairType: "Wavy-2B",
    issues: ["Dry ends", "Frizz"],
    drynessScore: 70,
    curlScore: 60,
    recommendations: [
      "Используйте бессульфатный шампунь дважды в неделю.",
      "Добавьте увлажняющую маску с алоэ."
    ],
    createdAt: new Date().toISOString(),
    imageUrl: "/images/sample-analysis.svg"
  }
];

export const mockAds: BrandAd[] = [
  {
    id: "ad_01",
    name: "Aurora Haircare",
    cta: "Получить пробник",
    image: "/images/ad-aurora.svg",
    url: "/advertisers",
    metrics: { ctr: 4.2, impressions: 12000 }
  }
];


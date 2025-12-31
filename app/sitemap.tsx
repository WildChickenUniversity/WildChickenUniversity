import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wcu.edu.pl",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://wcu.edu.pl/admission",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://wcu.edu.pl/diploma",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://wcu.edu.pl/pages/achievements",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://wcu.edu.pl/review",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://wcu.edu.pl/pages/alumni",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://wcu.edu.pl/pages/about",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://wcu.edu.pl/pages/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://wcu.edu.pl/pages/disclaimer",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

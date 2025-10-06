import { MetadataRoute } from 'next';
import { countiesIE } from '@/lib/countiesIE';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.exitpayout.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en/redundancy-calculator/ireland`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/redundancy-calculator/ireland/counties`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // County pages
  const countyPages = countiesIE.map((county) => ({
    url: `${baseUrl}/en/redundancy-calculator/ireland/${county.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...countyPages];
}

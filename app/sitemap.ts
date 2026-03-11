import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // ⚠️ IMPORTANT: Replace with your actual Hostinger domain
  const baseUrl = 'https://viraltrendingmemes.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Top priority for your homepage
    },
    {
      url: `${baseUrl}/?type=video`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?type=image`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upload`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // Upload page doesn't change as often
      priority: 0.5,
    },
  ];
}
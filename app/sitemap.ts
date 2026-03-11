import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import Meme from '@/models/meme';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ⚠️ IMPORTANT: Replace with your actual Hostinger domain
  const baseUrl = 'https://viraltrendingmemes.com';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
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

  try {
    // Fetch all approved memes
    await connectDB();
    const memes = await Meme.find({ isApproved: true }).select('slug updatedAt createdAt').lean() as any[];

    // Add meme routes dynamically
    const memeRoutes: MetadataRoute.Sitemap = memes.map((meme) => ({
      url: `${baseUrl}/meme/${meme.slug}`,
      lastModified: meme.updatedAt || meme.createdAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...routes, ...memeRoutes];
  } catch (error) {
    console.error("Error generating sitemap for memes:", error);
    return routes; // graceful fallback
  }
}
import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import Meme from '@/models/meme';

export const dynamic = 'force-dynamic';

// Batch size for sitemap generation — prevents memory spikes on large datasets
const SITEMAP_BATCH_SIZE = 2000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.viraltrendingmemes.com';

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  try {
    await connectDB();

    // Fetch memes in batches using cursor to prevent memory spikes
    let allMemeRoutes: MetadataRoute.Sitemap = [];
    let skip = 0;
    let hasMore = true;

    while (hasMore) {
      const memes = await Meme.find({ isApproved: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(SITEMAP_BATCH_SIZE)
        .select('slug updatedAt createdAt')
        .lean() as any[];

      const memeRoutes: MetadataRoute.Sitemap = memes.map((meme) => ({
        url: `${baseUrl}/meme/${meme.slug}`,
        lastModified: meme.updatedAt || meme.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

      allMemeRoutes = [...allMemeRoutes, ...memeRoutes];
      skip += SITEMAP_BATCH_SIZE;
      hasMore = memes.length === SITEMAP_BATCH_SIZE;

      // Safety cap: 50,000 URLs (Google sitemap limit)
      if (allMemeRoutes.length >= 50000) break;
    }

    return [...routes, ...allMemeRoutes];
  } catch (error) {
    console.error("Error generating sitemap for memes:", error);
    return routes; // graceful fallback
  }
}
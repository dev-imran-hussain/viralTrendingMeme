import { connectDB } from '@/lib/db';
import Meme from '@/models/meme';

export async function GET() {
  await connectDB();

  const baseUrl = 'https://www.viraltrendingmemes.com';

  // Fetch latest 50 approved memes for the RSS feed
  const memes = await Meme.find({ isApproved: true })
    .sort({ createdAt: -1 })
    .limit(50)
    .select('title slug description category mediaUrl mediaType createdAt')
    .lean() as any[];

  const rssItems = memes.map((meme) => {
    const pubDate = meme.createdAt
      ? new Date(meme.createdAt).toUTCString()
      : new Date().toUTCString();

    const description = meme.description
      || `Download this hilarious ${meme.category} meme! Free to download and share.`;

    return `
    <item>
      <title><![CDATA[${meme.title}]]></title>
      <link>${baseUrl}/meme/${meme.slug}</link>
      <guid isPermaLink="true">${baseUrl}/meme/${meme.slug}</guid>
      <description><![CDATA[${description}]]></description>
      <category>${meme.category}</category>
      <pubDate>${pubDate}</pubDate>
      ${meme.mediaType === 'image'
        ? `<enclosure url="${meme.mediaUrl}" type="image/jpeg" />`
        : `<enclosure url="${meme.mediaUrl}" type="video/mp4" />`
      }
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ViralTrendingMemes - Latest Memes</title>
    <link>${baseUrl}</link>
    <description>The internet's best collection of funny videos, dank photos, dark humor, and viral trends. Updated every single day.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

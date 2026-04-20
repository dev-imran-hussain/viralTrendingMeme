import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // If you ever make an admin dashboard, put the route here so Google ignores it
        disallow: '/admin/',
      },
      {
        // Allow AI crawlers for GEO/AI Overview visibility
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.viraltrendingmemes.com/sitemap.xml',
  };
}
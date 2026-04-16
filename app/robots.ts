import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // If you ever make an admin dashboard, put the route here so Google ignores it
      disallow: '/admin/', 
    },
    sitemap: 'https://www.viraltrendingmemes.com/sitemap.xml',
  };
}
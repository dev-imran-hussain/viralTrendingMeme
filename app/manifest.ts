import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ViralTrendingMemes',
    short_name: 'ViralMemes',
    description: "The internet's best collection of funny videos, dank photos, dark humor, and viral trends.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        // TODO: Generate a proper 192x192 PNG icon and place in /public
        src: '/icon-192X192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        // TODO: Generate a proper 512x512 PNG icon and place in /public
        src: '/icon-512X512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

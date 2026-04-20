const https = require('https');

const SITEMAP_URL = 'https://www.viraltrendingmemes.com/sitemap.xml';
const PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

console.log(`Pinging Google with sitemap: ${SITEMAP_URL}`);

https.get(PING_URL, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Successfully pinged Google Search Console!');
  } else {
    console.error(`❌ Failed to ping Google. Status Code: ${res.statusCode}`);
  }
}).on('error', (e) => {
  console.error(`❌ Error pinging Google: ${e.message}`);
});

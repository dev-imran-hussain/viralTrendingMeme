const SITEMAP_URL = 'https://www.viraltrendingmemes.com/sitemap.xml';
const GOOGLE_PING_URL = `https://www.google.com/ping?sitemap=${SITEMAP_URL}`;

async function pingGoogle() {
  try {
    console.log(`🚀 Pinging Google with sitemap: ${SITEMAP_URL}...`);

    // Google ke server ko GET request bhej rahe hain
    const response = await fetch(GOOGLE_PING_URL);

    if (response.ok) {
      console.log('✅ Success! Google has been notified. Tera sitemap queue mein lag gaya hai.');
    } else {
      console.error('❌ Failed to ping Google:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Error pinging Google:', error.message);
  }
}

pingGoogle();
// lib/indexNow.ts

export async function pingIndexNow(urlToPing: string) {
  const host = "viraltrendingmemes.com";
  // ⚠️ Replace this with the exact key you created in Step 1
  const key = "vtm_indexnow_8675309"; 

  const endpoint = "https://api.indexnow.org/indexnow";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: [urlToPing],
      }),
    });

    if (response.ok) {
      console.log(`🚀 IndexNow Ping Success for: ${urlToPing}`);
    } else {
      console.error(`❌ IndexNow Ping Failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("❌ Error pinging IndexNow:", error);
  }
}
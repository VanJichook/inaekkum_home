// scripts/fetch_rss.js
const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");

async function fetchRSS() {
  const parser = new Parser({
    headers: {
      "User-Agent": "Mozilla/5.0 (RSS Fetch Bot)"
    }
  });

  const RSS_URL = "https://rss.blog.naver.com/inaekkum.xml";

  try {
    console.log("Fetching Naver RSS...");

    const feed = await parser.parseURL(RSS_URL);

    const result = {
      title: feed.title || "Naver RSS",
      lastBuildDate: feed.lastBuildDate || new Date().toISOString(),
      items: feed.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        contentSnippet: item.contentSnippet || ""
      }))
    };

    const outputDir = path.join(__dirname, "..", "data");
    const outputFile = path.join(outputDir, "naver_rss.json");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

    console.log("✔ RSS saved to data/naver_rss.json");
  } catch (err) {
    console.error("RSS fetch failed:", err);
    process.exit(1);
  }
}

fetchRSS();

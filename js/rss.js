// rss.js — Naver blog RSS loader

function loadRSS() {
  const box = document.getElementById("rss-feed");
  if (!box) return;

  fetch("https://api.rss2json.com/v1/api.json?rss_url=https://rss.blog.naver.com/inaekkum.xml")
    .then(r => r.json())
    .then(data => {
      if (!data.items) {
        box.innerHTML = '<h4>Naver Blog</h4><p>No posts available.</p>';
        return;
      }

      box.innerHTML = "<h4>Naver Blog</h4>";

      data.items.slice(0, 3).forEach(item => {
        const wrap = document.createElement("div");
        wrap.style.marginTop = "0.6em";

        const date = new Date(item.pubDate).toLocaleDateString("ko-KR");

        wrap.innerHTML = `
          <a href="${item.link}" target="_blank">• ${item.title}</a>
          <span style="display:block; color:#888; font-size:0.85em; margin-left:0.8em;">
            ${date}
          </span>
        `;

        box.appendChild(wrap);
      });
    })
    .catch(() => {
      box.innerHTML = '<h4>Naver Blog</h4><p>Failed to load feed.</p>';
    });
}

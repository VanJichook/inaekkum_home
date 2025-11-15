// main.js (v2.0) with RSS integration

// 페이지 로드시 기본 HOME 로드
window.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

// 네비게이션 버튼 처리
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.section) {
    const section = e.target.dataset.section;

    document.querySelectorAll("nav button")
      .forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    loadSection(section);
  }
});

// --------------------------
// 섹션 로더
// --------------------------
function loadSection(name) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  fetch(`https://vanjichook.github.io/inaekkum_official/sections/${name}.html?v=7`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      setTimeout(() => content.classList.add("loaded"), 50);

      if (name === "about") initLangSwitch();
      if (name === "news") loadRSS();
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

// --------------------------
// NEWS RSS LOADER
// --------------------------
function loadRSS() {
  const box = document.getElementById("rss-feed");
  if (!box) return;

  box.innerHTML = `<h4>Naver Blog</h4><p>Loading latest posts…</p>`;

  fetch('https://vanjichook.github.io/inaekkum_official/data/naver_rss.json?ts=' + Date.now())
    .then(r => r.json())
    .then(data => {
      if (!data.items) {
        box.innerHTML = '<h4>Naver Blog</h4><p>No posts available.</p>';
        return;
      }

      box.innerHTML = '<h4>Naver Blog</h4>';

      data.items.slice(0, 3).forEach(item => {
        const wrap = document.createElement('div');
        wrap.className = 'rss-item';
        const date = new Date(item.pubDate).toLocaleDateString('ko-KR');

        wrap.innerHTML = `
          <a href="${item.link}" target="_blank">• ${item.title}</a>
          <span style="display:block; color:#888; font-size:0.85em; margin-left:0.2em;">${date}</span>
        `;

        box.appendChild(wrap);
      });
    })
    .catch(err => {
      console.error("RSS load error", err);
      box.innerHTML = '<h4>Naver Blog</h4><p>Failed to load feed.</p>';
    });
}

// --------------------------
// ABOUT 언어 스위치
// --------------------------
function initLangSwitch() {
  const switchBtn = document.getElementById("langSwitch");
  if (!switchBtn) return;

  const introKO = document.getElementById("introKO");
  const introEN = document.getElementById("introEN");
  const aboutKO = document.getElementById("aboutKO");
  const aboutEN = document.getElementById("aboutEN");
  const membersKO = document.getElementById("membersKO");
  const membersEN = document.getElementById("membersEN");

  function applyLang(isEN) {
    if (introKO) introKO.style.display = isEN ? "none" : "block";
    if (introEN) introEN.style.display = isEN ? "block" : "none";

    if (aboutKO) aboutKO.style.display = isEN ? "none" : "block";
    if (aboutEN) aboutEN.style.display = isEN ? "block" : "none";

    if (membersKO) membersKO.style.display = isEN ? "none" : "grid";
    if (membersEN) membersEN.style.display = isEN ? "grid" : "none";
  }

  switchBtn.addEventListener("change", () => {
    applyLang(switchBtn.checked);
  });

  applyLang(switchBtn.checked);
}

// --------------------------
// MUSIC 모달
// --------------------------
function openAlbumModal(key) {
  const modal = document.getElementById('album-modal');
  const wrap = document.getElementById('albumModalInner');
  const sw = document.getElementById('albumLangSwitch');

  if (!window.albumData) return;
  const data = window.albumData[key];
  if (!data) return;

  wrap.innerHTML = `
    <div id="albumKR">${data.kr}</div>
    <div id="albumEN" style="display:none;">${data.en}</div>
  `;

  if (sw) {
    sw.checked = false;
    sw.onchange = () => {
      document.getElementById('albumKR').style.display = sw.checked ? 'none' : 'block';
      document.getElementById('albumEN').style.display = sw.checked ? 'block' : 'none';
    };
  }

  modal.style.display = 'flex';
}

function closeAlbumModal() {
  const modal = document.getElementById('album-modal');
  if (modal) modal.style.display = 'none';
}

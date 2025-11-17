// main.js (with MUSIC modal C-style + EN toggle)

// PAGE LOAD ------------------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.section) {
    const section = e.target.dataset.section;

    document.querySelectorAll("nav button").forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    loadSection(section);
  }
});

// SECTION LOADER -------------------------------------------------
function loadSection(name) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  fetch(`https://vanjichook.github.io/inaekkum_official/sections/${name}.html?v=7`)
    .then((res) => res.text())
    .then((html) => {
      content.innerHTML = html;
      setTimeout(() => content.classList.add("loaded"), 50);

      if (name === "home") setTimeout(() => loadBandsintownWidget(), 80);
      if (name === "about") initLangSwitch();
      if (name === "news") loadRSS();
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

// BANDSINTOWN ----------------------------------------------------
function loadBandsintownWidget() {
  const container = document.getElementById("bit-widget-container");
  if (!container) return;

  container.innerHTML = `
    <a class="bit-widget-initializer"
      data-artist-name="id_15583383"
      data-events-to-display=""
      data-background-color="rgba(255,255,255,1)"
      data-separator-color="rgba(115,207,217,1)"
      data-text-color="rgba(34,36,38,1)"
      data-font="Andalé Mono"
      data-auto-style="true"
      data-button-label-capitalization="uppercase"
      data-header-capitalization="uppercase"
      data-location-capitalization="uppercase"
      data-venue-capitalization="uppercase"
      data-display-local-dates="true"
      data-local-dates-position="tab"
      data-display-past-dates="true"
      data-display-details="false"
      data-display-lineup="false"
      data-display-start-time="true"
      data-social-share-icon="false"
      data-display-limit="all"
      data-date-format="MMM. D, YYYY"
      data-date-orientation="horizontal"
      data-date-border-color="#4A4A4A"
      data-date-border-width="1px"
      data-date-capitalization="capitalize"
      data-date-border-radius="10px"
      data-event-ticket-cta-size="medium"
      data-event-custom-ticket-text=""
      data-event-ticket-text="TICKETS"
      data-event-ticket-icon="false"
      data-event-ticket-cta-text-color="rgba(255,255,255,1)"
      data-event-ticket-cta-bg-color="rgba(115,207,217,1)"
      data-event-ticket-cta-border-color="rgba(115,207,217,1)"
      data-event-ticket-cta-border-width="0px"
      data-event-ticket-cta-border-radius="2px"
      data-sold-out-button-text-color="rgba(255,255,255,1)"
      data-sold-out-button-background-color="rgba(115,207,217,1)"
      data-sold-out-button-border-color="rgba(115,207,217,1)"
      data-sold-out-button-clickable="true"
      data-event-rsvp-position="left"
      data-event-rsvp-cta-size="medium"
      data-event-rsvp-only-show-icon="false"
      data-event-rsvp-text="RSVP"
      data-event-rsvp-icon="false"
      data-event-rsvp-cta-text-color="rgba(115,207,217,1)"
      data-event-rsvp-cta-bg-color="rgba(255,255,255,1)"
      data-event-rsvp-cta-border-color="rgba(115,207,217,1)"
      data-event-rsvp-cta-border-width="1px"
      data-event-rsvp-cta-border-radius="2px"
      data-follow-section-position="top"
      data-follow-section-alignment="center"
      data-follow-section-header-text="Get updates on new shows, new music, and more"
      data-follow-section-cta-size="medium"
      data-follow-section-cta-text="FOLLOW"
      data-follow-section-cta-icon="false"
      data-follow-section-cta-text-color="rgba(255,255,255,1)"
      data-follow-section-cta-bg-color="rgba(115,207,217,1)"
      data-follow-section-cta-border-color="rgba(115,207,217,1)"
      data-follow-section-cta-border-width="0px"
      data-follow-section-cta-border-radius="2px"
      data-play-my-city-position="bottom"
      data-play-my-city-alignment="center"
      data-play-my-city-header-text="Don’t see a show near you?"
      data-play-my-city-cta-size="medium"
      data-play-my-city-cta-text="REQUEST A SHOW"
      data-play-my-city-cta-icon="false"
      data-play-my-city-cta-text-color="rgba(255,255,255,1)"
      data-play-my-city-cta-bg-color="rgba(115,207,217,1)"
      data-play-my-city-cta-border-color="rgba(115,207,217,1)"
      data-play-my-city-cta-border-width="0px"
      data-play-my-city-cta-border-radius="2px"
      data-language="en"
      data-layout-breakpoint="900"
      data-app-id="c32c33f654874394a2c1c87a4002e826"
      data-bit-logo-position="bottomRight"
      data-bit-logo-color="rgba(34,36,38,1)"
    ></a>

  const oldScript = document.getElementById("bit-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "bit-script";
  script.src = "https://widgetv3.bandsintown.com/main.min.js?reload=" + Date.now();
  script.async = true;
  document.body.appendChild(script);
}

// RSS ------------------------------------------------------------
function loadRSS() {
  const box = document.getElementById("rss-feed");
  if (!box) return;

  box.innerHTML = `<h4>Naver Blog</h4><p>Loading latest posts…</p>`;

  fetch("https://vanjichook.github.io/inaekkum_official/data/naver_rss.json?ts=" + Date.now())
    .then((r) => r.json())
    .then((data) => {
      if (!data.items) {
        box.innerHTML = `<h4>Naver Blog</h4><p>No posts available.</p>`;
        return;
      }

      box.innerHTML = `<h4>Naver Blog</h4>`;

      data.items.slice(0, 3).forEach((item) => {
        const date = new Date(item.pubDate).toLocaleDateString("ko-KR");
        const wrap = document.createElement("div");
        wrap.className = "rss-item";
        wrap.innerHTML = `
          <a href="${item.link}" target="_blank">• ${item.title}</a>
          <span style="display:block; color:#888; font-size:0.85em;">${date}</span>`;
        box.appendChild(wrap);
      });
    })
    .catch(() => {
      box.innerHTML = `<h4>Naver Blog</h4><p>Failed to load feed.</p>`;
    });
}

// ABOUT LANG SWITCH ---------------------------------------------
function initLangSwitch() {
  const sw = document.getElementById("langSwitch");
  if (!sw) return;

  const introKO = document.getElementById("introKO");
  const introEN = document.getElementById("introEN");
  const aboutKO = document.getElementById("aboutKO");
  const aboutEN = document.getElementById("aboutEN");
  const membersKO = document.getElementById("membersKO");
  const membersEN = document.getElementById("membersEN");

  function apply(isEN) {
    if (introKO) introKO.style.display = isEN ? "none" : "block";
    if (introEN) introEN.style.display = isEN ? "block" : "none";

    if (aboutKO) aboutKO.style.display = isEN ? "none" : "block";
    if (aboutEN) aboutEN.style.display = isEN ? "block" : "none";

    if (membersKO) membersKO.style.display = isEN ? "none" : "grid";
    if (membersEN) membersEN.style.display = isEN ? "grid" : "none";
  }

  sw.addEventListener("change", () => apply(sw.checked));
  apply(sw.checked);
}

// ----------------------------------------------------------------
// MUSIC MODAL (C-style: Spotify Layout + EN Toggle)
// ----------------------------------------------------------------
async function openAlbumModal(key) {
  const modal = document.getElementById("album-modal");
  const box = document.getElementById("albumModalInner");
  const data = window.albumData[key];
  if (!data) return;

  let trackHTML = data.tracks
    .map(
      (t, i) => `
        <div class="track-item">
          <div class="track-index">${i + 1}</div>
          <div class="track-info">
            <div class="track-title-en">${t.en}</div>
            <div class="track-title-kr">${t.kr}</div>
          </div>
          <div class="track-video">${t.vid ? `<button onclick=\"openTrackVideo('${t.vid}')\">영상</button>` : ''}</div>
        </div>`
    )
    .join("");

  box.innerHTML = `
    <div class="album-header">
      <img src="${data.cover}" class="album-cover" />
      <div class="album-meta">
        <h2>${data.title}</h2>
        <p>${data.date}</p>
        <label class="lang-toggle">
          <input type="checkbox" id="albumLangSwitch"> ENG
        </label>
      </div>
    </div>

    <div class="album-section">
      <h3>Tracklist</h3>
      <div class="tracklist">${trackHTML}</div>
    </div>

    <div id="albumKR">${data.kr}</div>
    <div id="albumEN" style="display:none;">${data.en}</div>
  `;

  const sw = document.getElementById("albumLangSwitch");
  sw.onchange = () => {
    document.getElementById("albumKR").style.display = sw.checked ? "none" : "block";
    document.getElementById("albumEN").style.display = sw.checked ? "block" : "none";
  };

  modal.style.display = "flex";
}

function openTrackVideo(id) {
  const modal = document.getElementById("album-modal");
  const box = document.getElementById("albumModalInner");

  box.innerHTML = `
    <iframe width="100%" height="360" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
  `;

  modal.style.display = "flex";
}

function closeAlbumModal() {
  document.getElementById("album-modal").style.display = "none";
}

/* --- MUSIC MODAL CSS (C-style Spotify Layout) --- */
const style = document.createElement('style');
style.innerHTML = `
  .album-header { display:flex; gap:1.5em; margin-bottom:1.8em; }
  .album-cover { width:180px; border-radius:10px; }
  .album-meta h2 { margin:0; font-size:1.8em; }
  .album-meta p { margin:0.3em 0 1em; color:#666; }
  .tracklist { display:flex; flex-direction:column; gap:0.6em; margin:1em 0 2em; }
  .track-item { display:flex; align-items:center; gap:1em; padding:0.6em 0; border-bottom:1px solid #eee; }
  .track-index { width:24px; text-align:center; color:#555; }
  .track-info { flex:1; }
  .track-title-en { font-weight:600; }
  .track-title-kr { font-size:0.9em; color:#777; }
  .track-video button { padding:0.3em 0.8em; border:1px solid #bbb; background:none; border-radius:4px; cursor:pointer; }
  @media(max-width:600px){ .album-header{flex-direction:column; align-items:center;} .album-cover{width:60%;} }
`;
document.head.appendChild(style);


// main.js (v2.0)

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

  fetch(`https://vanjichook.github.io/inaekkum_official/sections/${name}.html?v=6`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      setTimeout(() => content.classList.add("loaded"), 50);

      if (name === "home") loadBandsintownWidget();
      if (name === "about") initLangSwitch();
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

// --------------------------
// ABOUT: 언어 스위치 통합
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

// =====================================
//  Bandsintown (옵션 포함 + 중복 제거)
// =====================================
function loadBandsintownWidget() {
  const container = document.getElementById("bit-widget-container");
  if (!container) return;

  container.innerHTML = "";

  const init = document.createElement("a");
  init.className = "bit-widget-initializer";

   init.setAttribute("data-artist-name", "id_15583383");
  init.setAttribute("data-events-to-display", "");
  init.setAttribute("data-background-color", "rgba(255,255,255,1)");
  init.setAttribute("data-separator-color", "rgba(115,207,217,1)");
  init.setAttribute("data-text-color", "rgba(34,36,38,1)");
  init.setAttribute("data-font", "Andalé Mono");
  init.setAttribute("data-auto-style", "true");

  init.setAttribute("data-button-label-capitalization", "uppercase");
  init.setAttribute("data-header-capitalization", "uppercase");
  init.setAttribute("data-location-capitalization", "uppercase");
  init.setAttribute("data-venue-capitalization", "uppercase");
  init.setAttribute("data-display-local-dates", "true");
  init.setAttribute("data-local-dates-position", "tab");
  init.setAttribute("data-display-past-dates", "true");
  init.setAttribute("data-display-details", "false");
  init.setAttribute("data-display-lineup", "false");
  init.setAttribute("data-display-start-time", "true");
  init.setAttribute("data-social-share-icon", "false");
  init.setAttribute("data-display-limit", "all");

  init.setAttribute("data-date-format", "MMM. D, YYYY");
  init.setAttribute("data-date-orientation", "horizontal");
  init.setAttribute("data-date-border-color", "#4A4A4A");
  init.setAttribute("data-date-border-width", "1px");
  init.setAttribute("data-date-capitalization", "capitalize");
  init.setAttribute("data-date-border-radius", "10px");

  init.setAttribute("data-event-ticket-cta-size", "medium");
  init.setAttribute("data-event-custom-ticket-text", "");
  init.setAttribute("data-event-ticket-text", "TICKETS");
  init.setAttribute("data-event-ticket-icon", "false");
  init.setAttribute("data-event-ticket-cta-text-color", "rgba(255,255,255,1)");
  init.setAttribute("data-event-ticket-cta-bg-color", "rgba(115,207,217,1)");
  init.setAttribute("data-event-ticket-cta-border-color", "rgba(115,207,217,1)");
  init.setAttribute("data-event-ticket-cta-border-width", "0px");
  init.setAttribute("data-event-ticket-cta-border-radius", "2px");

  init.setAttribute("data-sold-out-button-text-color", "rgba(255,255,255,1)");
  init.setAttribute("data-sold-out-button-background-color", "rgba(115,207,217,1)");
  init.setAttribute("data-sold-out-button-border-color", "rgba(115,207,217,1)");
  init.setAttribute("data-sold-out-button-clickable", "true");

  init.setAttribute("data-event-rsvp-position", "left");
  init.setAttribute("data-event-rsvp-cta-size", "medium");
  init.setAttribute("data-event-rsvp-only-show-icon", "false");
  init.setAttribute("data-event-rsvp-text", "RSVP");
  init.setAttribute("data-event-rsvp-icon", "false");
  init.setAttribute("data-event-rsvp-cta-text-color", "rgba(115,207,217,1)");
  init.setAttribute("data-event-rsvp-cta-bg-color", "rgba(255,255,255,1)");
  init.setAttribute("data-event-rsvp-cta-border-color", "rgba(115,207,217,1)");
  init.setAttribute("data-event-rsvp-cta-border-width", "1px");
  init.setAttribute("data-event-rsvp-cta-border-radius", "2px");

  init.setAttribute("data-follow-section-position", "top");
  init.setAttribute("data-follow-section-alignment", "center");
  init.setAttribute("data-follow-section-header-text", "Get updates on new shows, new music, and more");
  init.setAttribute("data-follow-section-cta-size", "medium");
  init.setAttribute("data-follow-section-cta-text", "FOLLOW");
  init.setAttribute("data-follow-section-cta-icon", "false");
  init.setAttribute("data-follow-section-cta-text-color", "rgba(255,255,255,1)");
  init.setAttribute("data-follow-section-cta-bg-color", "rgba(115,207,217,1)");
  init.setAttribute("data-follow-section-cta-border-color", "rgba(115,207,217,1)");
  init.setAttribute("data-follow-section-cta-border-width", "0px");
  init.setAttribute("data-follow-section-cta-border-radius", "2px");

  init.setAttribute("data-play-my-city-position", "bottom");
  init.setAttribute("data-play-my-city-alignment", "center");
  init.setAttribute("data-play-my-city-header-text", "Don’t see a show near you?");
  init.setAttribute("data-play-my-city-cta-size", "medium");
  init.setAttribute("data-play-my-city-cta-text", "REQUEST A SHOW");
  init.setAttribute("data-play-my-city-cta-icon", "false");
  init.setAttribute("data-play-my-city-cta-text-color", "rgba(255,255,255,1)");
  init.setAttribute("data-play-my-city-cta-bg-color", "rgba(115,207,217,1)");
  init.setAttribute("data-play-my-city-cta-border-color", "rgba(115,207,217,1)");
  init.setAttribute("data-play-my-city-cta-border-width", "0px");
  init.setAttribute("data-play-my-city-cta-border-radius", "2px");

  init.setAttribute("data-language", "en");
  init.setAttribute("data-layout-breakpoint", "900");
  init.setAttribute("data-bit-logo-position", "bottomRight");
  init.setAttribute("data-bit-logo-color", "rgba(34,36,38,1)");

  container.appendChild(init);

  // 스크립트 재로딩
  const oldScript = document.getElementById("bit-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "bit-script";
  script.src = "https://widgetv3.bandsintown.com/main.min.js?reload=" + Date.now();
  script.async = true;
  document.body.appendChild(script);
}

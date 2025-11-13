// main.js

// 페이지 로드시 기본 home 로드
window.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

// 네비게이션 버튼 클릭 처리
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.section) {
    const section = e.target.dataset.section;

    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    loadSection(section);
  }
});

// 섹션 AJAX 로드
function loadSection(name) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  fetch(`https://vanjichook.github.io/inaekkum_official/sections/${name}.html?v=5`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      setTimeout(() => content.classList.add("loaded"), 50);

      if (name === "home") loadBandsintownWidget();
      if (name === "about") initLangToggle();
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

// ABOUT 언어 토글 기능
function initLangToggle() {
  const ko = document.getElementById("aboutKO");
  const en = document.getElementById("aboutEN");
  const buttons = document.querySelectorAll(".lang-btn");

  if (!ko || !en) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      ko.style.display = btn.dataset.lang === "ko" ? "block" : "none";
      en.style.display = btn.dataset.lang === "en" ? "block" : "none";
    });
  });
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

  // ---- 전체 스타일 옵션 ----
  init.setAttribute("data-artist-name", "id_15583383");
  init.setAttribute("data-background-color", "rgba(255,255,255,1)");
  init.setAttribute("data-separator-color", "rgba(115,207,217,1)");
  init.setAttribute("data-text-color", "rgba(34,36,38,1)");
  init.setAttribute("data-font", "Andalé Mono");
  init.setAttribute("data-auto-style", "true");

  // Capitalization
  init.setAttribute("data-button-label-capitalization", "uppercase");
  init.setAttribute("data-header-capitalization", "uppercase");
  init.setAttribute("data-location-capitalization", "uppercase");
  init.setAttribute("data-venue-capitalization", "uppercase");

  // Dates
  init.setAttribute("data-display-local-dates", "true");
  init.setAttribute("data-local-dates-position", "tab");
  init.setAttribute("data-display-past-dates", "true");
  init.setAttribute("data-date-format", "MMM. D, YYYY");
  init.setAttribute("data-date-orientation", "horizontal");
  init.setAttribute("data-date-border-color", "#4A4A4A");
  init.setAttribute("data-date-border-width", "1px");
  init.setAttribute("data-date-border-radius", "10px");

  // Ticket Button
  init.setAttribute("data-event-ticket-text", "TICKETS");
  init.setAttribute("data-event-ticket-cta-text-color", "rgba(255,255,255,1)");
  init.setAttribute("data-event-ticket-cta-bg-color", "rgba(115,207,217,1)");
  init.setAttribute("data-event-ticket-cta-border-color", "rgba(115,207,217,1)");

  // Follow Button
  init.setAttribute("data-follow-section-cta-bg-color", "rgba(115,207,217,1)");
  init.setAttribute("data-follow-section-cta-text-color", "rgba(255,255,255,1)");

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

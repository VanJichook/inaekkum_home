// main.js

// 페이지 시작 시 기본 home.html 로드
window.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

// nav 버튼 클릭 이벤트
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.section) {
    const section = e.target.dataset.section;

    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    loadSection(section);
  }
});

// AJAX로 HTML 파일 로드
function loadSection(name) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  fetch(`sections/${name}.html`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;

      // 섹션 불러온 후 슬쩍 딜레이 두고 fade-in
      setTimeout(() => content.classList.add("loaded"), 50);

      // ★ HOME일 때만 Bandsintown 초기화
      if (name === "home") {
        loadBandsintownWidget();
      }
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

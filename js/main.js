// main.js

window.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.section) {
    const section = e.target.dataset.section;

    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    loadSection(section);
  }
});

function loadSection(name) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  fetch(`sections/${name}.html`)
    .then(res => res.text())
    .then(html => {
      content.innerHTML = html;
      setTimeout(() => content.classList.add("loaded"), 50);

      if (name === "home") {
        loadBandsintownWidget?.();
      }
      if (name === "about") {
        initLangToggle();
      }
    })
    .catch(() => {
      content.innerHTML = "<p style='padding:2em;'>Failed to load section.</p>";
    });
}

function initLangToggle() {
  const ko = document.getElementById("aboutKO");
  const en = document.getElementById("aboutEN");
  const buttons = document.querySelectorAll(".lang-btn");

  if (!ko || !en) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === "ko") {
        ko.style.display = "block";
        en.style.display = "none";
      } else {
        ko.style.display = "none";
        en.style.display = "block";
      }
    });
  });
}

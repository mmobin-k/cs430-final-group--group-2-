// shared.js - Firebase setup, auth guard, sidebar, theme, toast

import { initializeApp }                        from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const cfg = {
  apiKey:            "AIzaSyDIc_a-0tx6ef-oKIdWSrDKEnEeukjeU04",
  authDomain:        "kanflow-508dd.firebaseapp.com",
  projectId:         "kanflow-508dd",
  storageBucket:     "kanflow-508dd.firebasestorage.app",
  messagingSenderId: "371974028391",
  appId:             "1:371974028391:web:632ae55106c289c24fe8c2",
};

export const app  = initializeApp(cfg);
export const auth = getAuth(app);

// Redirect to login if not signed in, then call back with the user object
export function requireAuth(callback) {
  onAuthStateChanged(auth, user => {
    if (!user) { window.location.href = "login.html"; return; }

    // Fill in user info across the sidebar
    const nameEl = document.getElementById("user-name-text");
    const avEl   = document.getElementById("user-av");
    const name   = user.displayName || user.email;
    if (nameEl) nameEl.textContent = name;
    if (avEl)   avEl.textContent   = (user.displayName || user.email).charAt(0).toUpperCase();

    callback(user);
  });
}

// Wire up the sign out button
export function initSignOut() {
  document.getElementById("signout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
}

// Dark/light theme toggle
export function initTheme() {
  const btn    = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("kanflow_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Default to dark if no stored preference
  const isDark = stored ? stored === "dark" : prefersDark !== false;
  applyTheme(isDark);

  btn?.addEventListener("click", () => {
    const currentlyDark = document.documentElement.getAttribute("data-theme") !== "light";
    applyTheme(!currentlyDark);
    localStorage.setItem("kanflow_theme", !currentlyDark ? "dark" : "light");
  });
}

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  btn.setAttribute("aria-label", btn.title);
  btn.innerHTML = dark
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"/></svg>`;
}

// Mobile sidebar toggle
export function initSidebar() {
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("sidebar-overlay");
  const toggle   = document.getElementById("sidebar-toggle");

  function open()  { sidebar?.classList.add("open"); overlay?.classList.add("show"); }
  function close() { sidebar?.classList.remove("open"); overlay?.classList.remove("show"); }

  toggle?.addEventListener("click",  open);
  overlay?.addEventListener("click", close);

  // Close sidebar when a nav link is clicked on mobile
  sidebar?.querySelectorAll(".nav-link").forEach(a => {
    a.addEventListener("click", close);
  });
}

// Toast notification
let toastTimer;
export function showToast(msg, type = "info") {
  const el = document.getElementById("toast");
  if (!el) return;
  clearTimeout(toastTimer);
  el.textContent = msg;
  el.className   = `toast ${type}`;
  void el.offsetWidth;
  el.classList.add("show");
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

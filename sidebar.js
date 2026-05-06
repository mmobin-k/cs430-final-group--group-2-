// sidebar.js - builds and injects the sidebar into every page

export function buildSidebar(activePage) {
  const links = [
    {
      id:   "board",
      href: "index.html",
      cls:  "nav-board",
      icon: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
               <rect x="1" y="1" width="5" height="16" rx="1.5"/>
               <rect x="8" y="1" width="5" height="11" rx="1.5"/>
               <rect x="14.5" y="1" width="2.5" height="7" rx="1.5"/>
             </svg>`,
      label: "Board",
      color: "var(--coral)",
    },
    {
      id:   "analytics",
      href: "analytics.html",
      cls:  "nav-analytics",
      icon: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
               <polyline points="1,14 5.5,8 9,11 14,4 17,2"/>
               <circle cx="17" cy="2" r="1.5" fill="currentColor" stroke="none"/>
             </svg>`,
      label: "Analytics",
      color: "var(--sky)",
    },
    {
      id:   "resources",
      href: "resources.html",
      cls:  "nav-resources",
      icon: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
               <polygon points="9,1 17,5.5 17,12.5 9,17 1,12.5 1,5.5"/>
             </svg>`,
      label: "Resources",
      color: "var(--lime)",
    },
    {
      id:   "team",
      href: "team.html",
      cls:  "nav-team",
      icon: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
               <circle cx="7" cy="6" r="3"/>
               <path d="M1 17c0-3.5 2.5-5.5 6-5.5s6 2 6 5.5"/>
               <circle cx="14" cy="6" r="2.2"/>
               <path d="M14 11.5c2 0 3.5 1.2 3.5 4"/>
             </svg>`,
      label: "Team",
      color: "var(--amber)",
    },
    {
      id:   "about",
      href: "about.html",
      cls:  "nav-about",
      icon: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
               <circle cx="9" cy="9" r="8"/>
               <line x1="9" y1="8" x2="9" y2="14"/>
               <circle cx="9" cy="5" r=".9" fill="currentColor" stroke="none"/>
             </svg>`,
      label: "About",
      color: "var(--purple)",
    },
  ];

  const navHtml = links.map(l => `
    <a href="${l.href}"
       class="nav-link ${l.cls}${l.id === activePage ? " active" : ""}"
       aria-current="${l.id === activePage ? "page" : "false"}"
       style="${l.id === activePage ? `color:${l.color}` : ""}">
      ${l.icon}
      ${l.label}
    </a>
  `).join("");

  return `
    <!-- Mobile toggle -->
    <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Open navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="sidebar-overlay" id="sidebar-overlay" aria-hidden="true"></div>

    <nav class="sidebar" id="sidebar" aria-label="Main navigation">
      <a href="index.html" class="sidebar-logo" aria-label="KanFlow home">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="2" width="10" height="36" rx="3" fill="var(--coral)"/>
          <rect x="15" y="2" width="10" height="26" rx="3" fill="var(--lime)"/>
          <rect x="28" y="2" width="10" height="18" rx="3" fill="var(--sky)"/>
        </svg>
        <span class="sidebar-logo-text">Kan<span>Flow</span></span>
      </a>

      <ul class="sidebar-nav" role="list">
        ${navHtml}
      </ul>

      <div class="sidebar-user">
        <div class="sidebar-user-info">
          <div class="user-av" id="user-av" aria-hidden="true">?</div>
          <span class="user-name-text" id="user-name-text" aria-label="Signed in user"></span>
        </div>
        <div class="sidebar-actions">
          <button class="btn-icon" id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <button class="btn-signout" id="signout-btn" aria-label="Sign out of KanFlow">Sign Out</button>
        </div>
      </div>
    </nav>
  `;
}

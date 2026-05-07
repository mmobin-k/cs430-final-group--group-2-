# KanFlow

A real-time Kanban board web app built for the CS 430 Internet Multimedia Programming semester project. KanFlow lets teams manage sprint tasks across five workflow columns with live sync, analytics, and a built-in focus music player,  all built on vanilla HTML5, CSS3, and JavaScript with no frontend frameworks.

---

## Pages

| File | Route | Description |
|---|---|---|
| `index.html` | `/` | Kanban board — main sprint view |
| `analytics.html` | `/analytics` | Live Canvas charts and sprint stats |
| `team.html` | `/team` | Member management and workload view |
| `resources.html` | `/resources` | Agile/Kanban learning resources |
| `about.html` | `/about` | Project info, team, and media credits |
| `login.html` | `/login` | Firebase Auth sign-in / sign-up |
| `sidebar.js` | — | Shared sidebar component (JS module) |
| `shared.js` | — | Shared Firebase init, auth helpers, theme, toast |
| `shared.css` | — | Design tokens, layout, sidebar, buttons, utilities |

---

## Features

**Kanban Board (`index.html`)**
- Five columns: Backlog, To Do, In Progress, Review, Done
- Drag-and-drop cards between columns (HTML5 Drag and Drop API)
- Keyboard navigation using arrow keys move cards between columns, `N` opens the new task modal
- Task modal with title, description, priority, assignee, due date, and tags
- Client-side form validation with inline error messages
- Live filters by priority, assignee, and keyword search
- Sprint progress bar and stat chips (total / done / in progress)
- All task data syncs in real time via Cloud Firestore

**Focus Music Player**
- Persistent audio bar on the board page
- Play/pause, seek, and volume controls
- Uses `preload="none"`;  audio only loads when the user presses play
- Source: SoundHelix Song 1 (free use license)

**Analytics (`analytics.html`)**
- Four live Canvas 2D charts using no chart libraries
  - Bar chart: tasks by status column
  - Donut chart: priority split (High / Medium / Low)
  - Line chart: sprint velocity (tasks completed per day)
  - Horizontal bar: workload per assignee
- Charts re-draw automatically when task or member data changes

**Team (`team.html`)**
- Add and remove team members stored in Firestore
- Per-member task progress bars pulled from the board in real time

**Resources (`resources.html`)**
- Curated Agile and Kanban reading cards with tags and descriptions
- Embedded YouTube video with expandable written transcript
- SVG workflow diagram

---

## Tech Stack

- HTML5, CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript ES6+ modules, no frameworks
- Canvas 2D API (charts)
- HTML5 Drag and Drop API
- HTML5 Audio / Video
- SVG (logo, illustrations, icons)
- Firebase Authentication (email/password + Google)
- Cloud Firestore (real-time data)
- Google Fonts Syne + DM Sans (Open Font License)

---

## File Structure

```
kanflow/
├── index.html        # Board
├── analytics.html    # Charts
├── team.html         # Team management
├── resources.html    # Learning resources
├── about.html        # Project info and credits
├── login.html        # Authentication
├── sidebar.js        # Shared sidebar component
├── shared.js         # Firebase init, auth, theme, toast helpers
└── shared.css        # Shared styles and design tokens
└── favicon.png       # Pixel icon representing the website in browser tabs
```

---

## Accessibility

- Skip-to-main links on all pages
- ARIA roles, labels, and `aria-live` regions throughout
- Focus trap in the task modal; Escape closes it
- Keyboard arrow-key navigation for moving cards between columns
- Screen reader announcements for card moves via an `aria-live="assertive"` region
- SVG elements include `role="img"` with `<title>` descriptions
- Video content includes a written transcript in an expandable `<details>` block

---

## Media Credits

| Type | Asset | License |
|---|---|---|
| Audio | SoundHelix Song 1 | Free use [soundhelix.com](https://www.soundhelix.com) |
| Video | "simpleshow explains the Agile Company" by simpleshow GmbH | Standard YouTube embed |
| SVG | Logo, diagrams, and illustrations | Original, created with SVG Editor |
| Canvas | All charts | Original native Canvas 2D API |
| Fonts | Syne + DM Sans | Open Font License via [Google Fonts](https://fonts.google.com) |

---

## Team

| Name | Role |
|---|---|
| Aashish Joshi | Frontend Development |
| Natalia Criollo | UX Design |
| Muhammad Mobin | Backend / Firebase - Project Management |

---

## Course

CS 430 — Internet Multimedia Programming

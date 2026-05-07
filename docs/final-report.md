# KanFlow — Project Documentation

**CS 430: Internet Multimedia Programming | NJCU | Spring 2026**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Process](#2-design-process)
3. [Wireframes](#3-wireframes)
4. [Technologies Used](#4-technologies-used)
5. [Key Features](#5-key-features)
6. [Challenges Faced](#6-challenges-faced)
7. [How GitHub Was Used](#7-how-github-was-used)
8. [Individual Contributions](#8-individual-contributions)
9. [References](#9-references)

---

## 1. Project Overview

KanFlow is a fully functional, real-time Kanban board web application built for the CS 430 Internet Multimedia Programming semester group project. It enables teams to create, assign, and track tasks across five workflow columns: Backlog, To Do, In Progress, Review, and Done. Every change syncs instantly to the cloud via Firebase Firestore.

The application is built entirely on web standards with no JavaScript frameworks. Firebase Authentication handles user sign-in and Cloud Firestore provides real-time data persistence. Every page shares a common sidebar, theme toggle, and sign-out mechanism through shared ES modules (`shared.js` and `sidebar.js`).

KanFlow was designed to demonstrate mastery of core multimedia web programming concepts: semantic HTML5, accessible interactive UI, multiple media types (audio, video, SVG, and Canvas), and ethical data handling. The end result is a product that is genuinely useful and ready for real use.

> **Figure 1:** Application architecture overview diagram *(insert image)*

### 1.1 Application Pages

| Page | Description |
|---|---|
| `index.html` | Kanban board and main sprint view with drag-and-drop task management and a focus music player |
| `analytics.html` | Live Canvas 2D charts showing sprint velocity, task distribution, and workload |
| `team.html` | Team member management with live task count and completion stats per member |
| `resources.html` | Curated Agile/Kanban learning material with embedded video and SVG diagrams |
| `about.html` | Project description, technology stack, and full media credits |
| `contact.html` | Contact form with full validation for team inquiries |
| `login.html` | Firebase Authentication sign-in and sign-up page |

---

## 2. Design Process

The design process followed a user-centered approach, moving from concept and research through wireframing, a defined design system, and iterative implementation. The goal was to produce an interface that felt professional and usable, not just technically functional.

### 2.1 Research and Concept

The team began by researching existing Kanban tools including Trello, Jira, and Linear to understand established conventions for board layout, task card anatomy, and column management. Key observations that informed our decisions:

- Column-based layout with horizontal card flow is the universally understood Kanban pattern
- Cards should show priority, assignee, and status at a glance without requiring a click
- Dark-first color schemes are preferred by developers and reduce eye strain during long work sessions
- Real-time sync (changes appearing instantly without a page refresh) is now an expected baseline

### 2.2 Design System

Before writing any component code, the team defined a shared design system in `shared.css` using CSS custom properties. This ensured visual consistency across all seven pages and made the dark/light theme toggle a single attribute change rather than component-by-component overrides.

| Token | Value / Purpose |
|---|---|
| `--coral` (#FF4D1C) | Primary brand accent used for buttons, active states, and high-priority tasks |
| `--sky` (#1A8FFF) | Secondary accent used for links, focus rings, and info states |
| `--lime` (#4DDD6A) | Success and done state used for completion bars and the Done column |
| `--amber` (#FFB020) | Warning / medium priority |
| `--purple` (#8B5CF6) | Tertiary accent used for the Review column and analytics charts |
| `--bg` / `--bg-card` | Dark mode: #09090C and #13131A. Light mode: #F5F5F5 and #FFFFFF |
| `--text` / `--text-sub` | Dark mode: #F0EFFF and #B0AFCC. Light mode: #1A1A1A and #555555 |
| Syne (`font-d`) | Display font used for headings, labels, and navigation |
| DM Sans (`font-b`) | Body font used for card text, form inputs, and descriptions |
| `--radius` / `--radius-lg` | 8px and 14px, applied consistently across all components |

### 2.3 Component Design Decisions

- Sidebar navigation is sticky and full-height, keeping all pages reachable without scrolling back to a top nav
- Task cards use a left border accent color to communicate priority at a glance, never color alone
- Modal forms slide in from the right rather than overlaying the full screen, keeping the board visible for context
- The analytics page uses Canvas 2D rather than a chart library. This kept the page lightweight and showed direct use of the Canvas API
- The audio player is a fixed bar within the board page, visible while working without navigating away

---

## 3. Wireframes

Wireframes were produced before development began to align the team on layout and navigation structure. Low-fidelity sketches established the core layouts, which were then refined into the final implementations shown below.

### 3.1 Kanban Board (`index.html`)

**Figure 2:** Wireframe — Kanban board layout

```
+------------------+-------------------------------------------------------+
|  KanFlow         |  [  Total: 27  ] [ Done: 12 ] [ In Prog: 6 ]         |
|  [K] logo        +-------------------------------------------------------+
|                  |  ▶ Focus music player ────────────────── vol: [|||  ] |
|  Board      <──  +-------------------------------------------------------+
|  Analytics       |  Filter: [All Columns ▼] [All Priority ▼] [Assignee ▼]|
|  Team            +------------+------------+------------+------------+----+
|  Resources       | BACKLOG(4) | TO DO  (6) | IN PROG(5) | REVIEW (3) |DONE|
|  About           +------------+------------+------------+------------+----+
|  Contact         | ┌────────┐ | ┌────────┐ | ┌────────┐ | ┌────────┐ |    |
|                  | │● Title │ | │● Title │ | │● Title │ | │● Title │ |    |
|  ──────────────  | │  [who] │ | │  [who] │ | │  [who] │ | │  [who] │ |    |
|  [A] User name   | │  📅 due│ | │  📅 due│ | │  📅 due│ | │  📅 due│ |    |
|  [Sign out]      | └────────┘ | └────────┘ | └────────┘ | └────────┘ |    |
|  [🌙] theme      | ┌────────┐ | ┌────────┐ | ┌────────┐ |            |    |
|                  | │● Title │ | │● Title │ | │● Title │ |            |    |
|                  | │  [who] │ | │  [who] │ | │  [who] │ |            |    |
|                  | │  📅 due│ | │  📅 due│ | │  📅 due│ |            |    |
|                  | └────────┘ | └────────┘ | └────────┘ |            |    |
|                  | [+ Add col]|            |            |            |    |
+------------------+------------+------------+------------+------------+----+
```

---

### 3.2 Analytics Dashboard (`analytics.html`)

**Figure 4:** Wireframe — Analytics page with four charts

```
+------------------+--------------------------------------------------------------+
|  KanFlow         |  Analytics                                                   |
|  [K] logo        |  Task counts sync live from the board                        |
|                  +--------------------------------------------------------------+
|  Board           |  [ 27 TOTAL ] [ 12 DONE ] [ 6 IN PROGRESS ] [ 0 UNASSIGNED ]|
|  Analytics  <──  +-------------------------------+------------------------------+
|  Team            |  Tasks by Status              |  Priority Split              |
|  Resources       |  ┌─────────────────────────┐  |  ┌──────────────────────┐   |
|  About           |  |  █                      |  |  |       ╭───╮          |   |
|  Contact         |  |  █     █                |  |  |     ╭─┤ 27├─╮        |   |
|                  |  |  █     █    █            |  |  |     │ ╰───╯ │        |   |
|                  |  |  █     █    █    █       |  |  |     ╰───────╯        |   |
|  ──────────────  |  | BKL   TODO  INP  REV  DNE|  |  |  ■ High  ■ Med  ■Lo |   |
|  [A] User name   |  └─────────────────────────┘  |  └──────────────────────┘   |
|  [Sign out]      +-------------------------------+------------------------------+
|  [🌙] theme      |  Sprint Velocity              |  Workload by Member          |
|                  |  ┌─────────────────────────┐  |  ┌──────────────────────┐   |
|                  |  |        ╱╲               |  |  | Alex   ████████      |   |
|                  |  |       ╱  ╲    ╱         |  |  | Sam    ██████        |   |
|                  |  |      ╱    ╲  ╱          |  |  | Taylor █████████     |   |
|                  |  |  ───╱      ╲╱           |  |  | Jordan ███████       |   |
|                  |  |  Mon Tue Wed Thu Fri    |  |  └──────────────────────┘   |
|                  |  └─────────────────────────┘  |                              |
+------------------+-------------------------------+------------------------------+
```

---

### 3.3 Team Manager (`team.html`)

**Figure 6:** Wireframe — Team page with add-member form and member cards

```
+------------------+----------------------------------------------------------+
|  KanFlow         |  Team                                                    |
|  [K] logo        |  Workload overview - task counts sync live from board    |
|                  +----------------------------------------------------------+
|  Board           |  [ 4 MEMBERS ]  [ 27 TOTAL TASKS ]  [ 12 COMPLETED ]    |
|  Analytics       +----------------------------------------------------------+
|  Team       <──  |  [Full name________________]  [Role (e.g. Designer)____] |
|  Resources       |                                             [+ Add Member]|
|  About           +----------------------------------------------------------+
|  Contact         |  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   |
|                  |  | ✎         x  |  | ✎         x  |  | ✎         x  |   |
|                  |  |    ╭────╮    |  |    ╭────╮    |  |    ╭────╮    |   |
|  ──────────────  |  |    │ A  │    |  |    │ S  │    |  |    │ T  │    |   |
|  [A] User name   |  |    ╰────╯    |  |    ╰────╯    |  |    ╰────╯    |   |
|  [Sign out]      |  |  Alex Chen   |  |  Sam Rivera  |  |  Taylor Kim  |   |
|  [🌙] theme      |  |  Frontend Dev|  |  Backend Dev |  |  UX Designer |   |
|                  |  | [1BKL][2TODO]|  | [1TODO][1INP]|  | [2DONE][1INP]|   |
|                  |  |  7 tasks     |  |  6 tasks     |  |  7 tasks     |   |
|                  |  | completion   |  | completion   |  | completion   |   |
|                  |  | ████░░░  57% |  | ██░░░░░  33% |  | ███░░░░  43% |   |
|                  |  └──────────────┘  └──────────────┘  └──────────────┘   |
+------------------+----------------------------------------------------------+
```

---

### 3.4 Login Page (`login.html`)

**Figure 8:** Wireframe — Login and sign-up form

```
+-----------------------------------------------------------------------+
|                                                                       |
|                         ╔═══════════════╗                             |
|                         ║  [K] KanFlow  ║                             |
|                         ╚═══════════════╝                             |
|                                                                       |
|                    ┌───────────────────────────┐                     |
|                    │                           │                     |
|                    │   Welcome back            │                     |
|                    │   Sign in to continue     │                     |
|                    │                           │                     |
|                    │   Email                   │                     |
|                    │   [_______________________│                     |
|                    │                           │                     |
|                    │   Password                │                     |
|                    │   [_______________________│                     |
|                    │                           │                     |
|                    │   [ Sign In ────────────] │                     |
|                    │                           │                     |
|                    │   ─────────── or ─────────│                     |
|                    │                           │                     |
|                    │   [ G  Continue w/ Google]│                     |
|                    │                           │                     |
|                    │   Don't have an account?  │                     |
|                    │   Sign up                 │                     |
|                    │                           │                     |
|                    └───────────────────────────┘                     |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## 4. Technologies Used

KanFlow uses no JavaScript frameworks. Every feature is implemented with native browser APIs and web standards, resulting in a near-zero dependency footprint and fast load times.

### 4.1 Core Web Technologies

| Technology | How it is used in KanFlow |
|---|---|
| HTML5 | Semantic elements used throughout: `header`, `nav`, `main`, `section`, `article`, `figure`, `figcaption`, `footer`, `details`, and `summary`. Forms use native validation attributes. |
| CSS3 Custom Properties | All colors, border radii, and spacing defined as CSS variables in `shared.css`, enabling the dark/light theme toggle with a single attribute change on the root element. |
| CSS Grid & Flexbox | Board columns use CSS Grid. The sidebar, stat bar, team grid, and analytics cards use Flexbox. Both are responsive via media queries. |
| Vanilla JavaScript (ES6+) | Arrow functions, destructuring, template literals, optional chaining, and Promises used throughout. No transpilation step required. |
| ES Modules | `sidebar.js` and `shared.js` are imported with native `type=module`. Firebase is imported from the Firebase CDN as ESM. |
| HTML5 Drag and Drop API | Kanban cards use `draggable=true` with `dragstart`, `dragover`, `dragleave`, and `drop` event listeners for column-to-column movement. |
| Canvas 2D API | All four analytics charts drawn directly on `<canvas>` elements using `CanvasRenderingContext2D`. No charting library used. |
| SVG | Login logo, resources workflow diagram, and principles card are hand-authored inline SVG. |
| HTML5 Audio | Looping background audio on the board page with custom player UI for play/pause, seek, and volume. |
| Firebase Authentication | Email/password and Google Sign-In. `requireAuth()` in `shared.js` guards every page. |
| Cloud Firestore | NoSQL real-time database. Tasks and members stored under `users/{uid}/tasks` and `users/{uid}/members`. Live `onSnapshot` listeners re-render UI on any change. |
| Firebase Hosting | Production deployment via Firebase CLI. Every deploy is versioned with rollback available from the Firebase Console. |

### 4.2 Multimedia Types

| Type | Location | Purpose | Details |
|---|---|---|---|
| SVG | `login.html`, `resources.html` | Brand logo, workflow diagram, principles card | Original inline SVG with `<title>` and `<desc>` for accessibility |
| Canvas | `analytics.html` | Live data charts | Bar, donut, line, and workload charts via Canvas 2D API |
| Audio | `index.html` | Focus music player | SoundHelix Song 1, `preload=none`, custom controls |
| Video | `resources.html` | Educational content | YouTube iframe embed with written transcript |

---

## 5. Key Features

### 5.1 Kanban Board

| Feature | Description |
|---|---|
| Task Cards | Each card shows title, priority accent bar (red/amber/green), assignee pill, and due date. |
| Drag and Drop | Native HTML5 drag-and-drop moves cards between columns. Firestore persists the new status on drop. |
| Keyboard Navigation | Arrow keys move focused cards between columns. `N` opens the new task modal. `Escape` closes it. |
| New Task Modal | Slide-in modal with title, priority, assignee, and due date fields. All fields have live validation. |
| Edit and Delete | Each card has an edit pencil and delete bin icon. Edit pre-fills the modal. Delete requires confirmation. |
| Filter Toolbar | Filter by column, priority, or assignee. Assignee dropdown dynamically populated from Team page. |
| Stat Bar | Live counts for total, per-column, and per-priority tasks. Updates automatically on every Firestore snapshot. |
| Focus Mode Audio | Persistent player bar streams royalty-free background music with play, pause, seek, and volume. |

### 5.2 Analytics Dashboard

| Chart | Description |
|---|---|
| Status Bar Chart | Vertical bars showing task count per column with grid lines and value labels. |
| Priority Donut Chart | Donut chart split into High, Medium, and Low priority with total count in the center. |
| Velocity Line Chart | Tasks completed per day of the current week with gradient area fill. |
| Workload Bar Chart | Horizontal bars showing task count per team member. Updates automatically as members are added or removed. |

### 5.3 Team Manager

- Full CRUD operations: add, view, edit (name and role), and remove members
- Member cards show live task count and completion percentage calculated from the tasks collection
- Color-coded avatars generated deterministically from the member's name
- Changes reflect instantly on the board assignee dropdown and analytics workload chart

### 5.4 Contact Page

- Contact form with name, email, subject dropdown, and message fields
- Full client-side validation with inline error messages and ARIA descriptions
- Character counter on the message field
- Success confirmation banner on valid submission

---

## 6. Challenges Faced

Building KanFlow came with some real technical hurdles. Here is a breakdown of the main ones and how we solved them.

### 6.1 Firebase ES Module Compatibility

Firebase v9 and later uses a modular ESM import style that is very different from the older v8 API. Since KanFlow uses native browser ES modules, every Firebase import needed to use the full CDN ESM path. When we accidentally mixed the two styles, we got silent initialization failures that were really hard to track down.

**How we fixed it:** We standardized all Firebase imports to use the versioned ESM CDN path (`gstatic.com/firebasejs/12.11.0/...`) and restructured `shared.js` to export a single initialized app instance, so no page ever initializes Firebase twice.

### 6.2 Real-Time Listener Ordering

The Team page needed both the members and tasks Firestore listeners to be loaded before it could render member cards with the task breakdown pills. Since both listeners fire independently and asynchronously, the cards would sometimes render before the task data was ready, leaving the pills empty on first load.

**How we fixed it:** We changed both `onSnapshot` listeners to call `renderAll()` instead of separate update functions. That way, whichever listener fires last always triggers a full re-render with all the data in place.

### 6.3 Canvas Responsiveness

The Canvas 2D API works with fixed pixel dimensions. Charts that looked great on a standard 1080p screen ended up too small or slightly off on high-DPI displays and smaller screens. Unlike most HTML elements, canvas does not automatically respond to CSS sizing.

**How we fixed it:** We added a `ResizeObserver` to redraw all charts whenever the container width changed, and we set canvas dimensions programmatically to account for the `devicePixelRatio` of the display.

### 6.4 Drag-and-Drop on Mobile

The HTML5 Drag and Drop API does not work with touch events on iOS Safari. That meant users on iPhones and iPads could not drag cards at all, which was a problem since moving cards between columns is the whole point of the app.

**How we fixed it:** We built keyboard arrow-key navigation as a fully functional fallback. Any card can be moved between columns using the Left and Right arrow keys. The edit modal also lets users change the status column through a dropdown.

### 6.5 Folder Structure and Module Paths After Restructuring

We originally had all files sitting in the root folder. When we reorganized everything into `css/`, `js/`, `images/`, and `docs/` subfolders to meet the CS 430 folder structure requirements, every single import path and CSS link across all seven HTML files broke.

**How we fixed it:** We updated every `href` and `import` path across all files. `shared.css` moved to `css/styles.css`, and `sidebar.js` and `shared.js` were merged into a single `js/script.js` file.

### 6.6 Firebase API Key Exposure

The Firebase config object, including the API key, was originally hardcoded directly in `login.html`. Firebase API keys are not secret the same way a backend key would be, but leaving them exposed in a public repo without proper security rules is still a real risk we needed to address.

**How we fixed it:** We added strict Firestore security rules to enforce per-user data isolation, and restricted authorized domains in the Firebase Console so the credentials cannot be used from any unauthorized site.

---

## 7. How GitHub Was Used

We used GitHub for version control, team collaboration, and tracking progress throughout the project.

### 7.1 Repository Structure

> **Figure 10:** Screenshot — GitHub repository showing folder structure and commit history *(insert image)*

### 7.2 Branching Strategy

We followed a feature-branch workflow so the main branch stayed stable and deployable at all times.

| Branch | Purpose |
|---|---|
| `main` | Production-ready code. Only merged into after peer review. |
| `dev` | Integration branch where features were merged and tested together before going to main. |
| `feature/board` | Kanban board, drag-and-drop, and task modal development. |
| `feature/analytics` | Canvas 2D charts and Firestore data wiring for the analytics page. |
| `feature/team` | Team member CRUD, avatar generation, and live task count sync. |
| `feature/auth` | Firebase Authentication setup, `shared.js` module, and login page. |
| `feature/design` | `shared.css` design system, theme toggle, SVG assets, and responsive layout. |

### 7.3 Commit Practices

- We kept commits small and focused on one change or feature at a time
- Commit messages followed the format: `type(scope): description`. For example: `feat(board): add drag-and-drop column persistence`
- Each team member committed to their own feature branch and opened a pull request into `dev` when the work was ready

### 7.4 Pull Requests and Code Review

Every feature branch was merged through a pull request. At least one team member had to review and approve before anything went into `dev`. We used PR comments to flag issues, suggest improvements, and make sure things were tested.

> **Figure 11:** Screenshot — Example pull request with review comments *(insert image)*

### 7.5 GitHub and Firebase Hosting

The main branch was connected to Firebase Hosting. Running `firebase deploy` from the local main branch pushed the latest version to the live site. GitHub was our single source of truth, so the deployed site always reflected the state of `main`.

---

## 8. Individual Contributions

We split the work based on each person's strengths, with everyone taking ownership of specific pages and features. That said, everyone also helped with planning, code review, and testing across the whole project.

### 8.1 Primary Responsibilities

| Member | Primary Role | Key Contributions |
|---|---|---|
|  | Frontend Development | Board page layout and CSS Grid column system; task card components and priority styling; drag-and-drop implementation and Firestore status sync; new task modal, form validation, and edit/delete logic; dark/light theme toggle and shared CSS variables |
|  | Backend Development | Firebase project setup, Auth configuration, and Firestore security rules; `shared.js` module: `requireAuth`, `initTheme`, `initSignOut`, `initSidebar`; real-time `onSnapshot` listeners across all pages; Firebase Hosting deployment pipeline and versioning |
|  | UX / Design | Design system: color palette, typography scale, spacing tokens; SVG illustrations: login logo, resources workflow diagram, principles card; Login, About, Resources, and Contact page layout and content; responsive design and mobile breakpoints across all pages |
|  | QA & Integration | Analytics page: all four Canvas 2D charts and live data wiring; team manager page: member CRUD, avatar generation, task count sync; accessibility audit: ARIA labels, keyboard navigation, focus management; cross-browser testing and performance review |

### 8.2 Shared Responsibilities

- Project planning and feature scoping
- Peer code review via pull request comments on GitHub
- `sidebar.js` shared navigation module
- Ethical design review to make sure we had no dark patterns, proper data isolation, and no advertising
- Media sourcing, licensing verification, and About page citations
- Final deployment to Firebase Hosting and post-deploy testing

---

## 9. References

### 9.1 External Assets and Licenses

| Asset | Source | License | Usage |
|---|---|---|---|
| Syne Font | [Google Fonts](https://fonts.google.com) | OFL 1.1 | Headings and brand text |
| DM Sans Font | [Google Fonts](https://fonts.google.com) | OFL 1.1 | Body text across all pages |
| SoundHelix Song 1 | [soundhelix.com](https://www.soundhelix.com) | Free use, no attribution required | Background audio player on board |
| Agile Company Video | simpleshow GmbH via YouTube | Standard YouTube embed | Educational embed on Resources page |
| SVG & Canvas artwork | Original, created for this project | Original work | All illustrations and charts |
| Firebase SDK | [firebase.google.com](https://firebase.google.com) | Apache 2.0 | Authentication, Firestore, Hosting |

### 9.2 Technical References

- [MDN Web Docs - HTML5 Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [MDN Web Docs - Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Firebase Documentation - Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Documentation - Authentication](https://firebase.google.com/docs/auth)
- [Firebase Documentation - Hosting](https://firebase.google.com/docs/hosting)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21)
- [MDN Web Docs - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [ES Modules in the Browser - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### 9.3 Design Inspiration

- [Linear](https://linear.app) - dark-first design system and sprint board layout
- [Trello](https://trello.com) - Kanban card anatomy and column management conventions
- [Jira](https://www.atlassian.com/software/jira) - sprint velocity and analytics dashboard concepts

---

*CS 430 | Internet Multimedia Programming | NJCU | Spring 2026*

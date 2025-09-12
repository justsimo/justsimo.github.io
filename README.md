# justsimo.github.io
# justsimo.github.io — Portfolio & CV

[![Status](https://img.shields.io/badge/status-active-success)](#)
[![Hosting](https://img.shields.io/badge/hosted_on-GitHub_Pages-222)](#)
[![Built with](https://img.shields.io/badge/built_with-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.4.1-7952B3)](#)
[![AOS](https://img.shields.io/badge/AOS-2.3.1-0aa)](#)

A modern, single‑page **portfolio & CV** website for **Simone Gatto** (Computer Engineer — AI & ML). It showcases projects, skills, education, and experiences with smooth, accessible animations and a clean, mobile‑first layout.

**Live:** [https://justsimo.github.io](https://justsimo.github.io)

> Recruiters: jump straight to **[Projects](#projects)** and **[Contact](#contact)**.

---

## Table of contents

* [Highlights](#highlights)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Structure](#structure)
* [Accessibility & UX](#accessibility--ux)
* [Performance & SEO](#performance--seo)
* [Contact](#contact)
* [Italiano 🇮🇹](#italiano-)

---

## Highlights

* ✨ **Professional** look, focused on **AI/ML & Data** profile.
* 📱 **Responsive** layout with careful mobile/tablet design.
* 🧭 **Smart navbar** with scroll‑spy and smooth offset for anchored sections.
* 🧩 **Project cards** with mobile‑only "See Hard Skills" toggle for compact layouts.
* 🎯 **AOS animations** tuned to trigger when elements enter the viewport (respecting reduced‑motion preferences).

## Features

* **Sections**: Hero, About, Projects, Tech Stack, Education, Work Experience, Additional Experiences, Contact.
* **Loader** with progress bar and accessible ARIA roles.
* **Sticky navbar** with active state sync (IntersectionObserver + fallback).
* **Anchored navigation** with dynamic offset (no titles hidden by the navbar).
* **AOS animations** (`duration: 700`, `once: true`, `anchorPlacement: 'top-bottom'`).
* **Mobile menu lock** (prevents background scroll while menu is open).
* **Lazy images** via `loading="lazy"` on heavy visuals.

## Tech stack

* **Core:** HTML5, CSS3, JavaScript (no build step required)
* **Frameworks & libs:** Bootstrap 4.4.1, jQuery (for Bootstrap), AOS (Animate On Scroll)
* **Fonts & icons:** Google Fonts (Inter, Montserrat), Font Awesome 4.7

## Structure

```
/ (repo root)
├─ index.html
├─ style.css
├─ /script/
│  └─ script.js
├─ /bootstrap-4.4.1-dist/
├─ /images/
│  ├─ qrcodebsod.svg
│  ├─ linkedin.png, new-mail.png, me2.png, DSC02696.JPG
└─ /fonts/
   └─ fonts.css
```

## Accessibility & UX

* Respects `prefers-reduced-motion` (AOS disabled for users who opt out of motion).
* Clear ARIA labels and roles on loader, progress, nav, and lists.
* Keyboard‑ and screen‑reader‑friendly anchors with visible focus via browser defaults/Bootstrap.
* Mobile hard‑skills **toggle buttons** come with proper `aria-controls`/`aria-expanded`.

## Performance & SEO

* **Meta tags**: `description`, `keywords`, `theme-color`.
* **Images**: use optimized formats (JPEG/WEBP) and add dimensions.
* **Minify** CSS/JS for production if needed (optional step).
* **Caching**: leverage GitHub Pages caching; version assets with `?v=` query strings when updating.


## Contact

* **Email:** [simonegatto.dev@gmail.com](mailto:simonegatto.dev@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/simone-gatto23/](https://www.linkedin.com/in/simone-gatto23/)

---

## Italiano 🇮🇹

### Descrizione

Sito **portfolio & CV** moderno, responsive e accessibile, pensato per presentare il profilo **AI/ML & Data** di Simone Gatto con progetti, competenze, formazione ed esperienze.

### Punti chiave

* Design professionale orientato alla **leggibilità**.
* Navbar intelligente con **scroll‑spy** e offset per le ancore.
* **Animazioni AOS** all’ingresso in viewport, rispettando `prefers-reduced-motion`.
* **Toggle mobile** per le hard skills nelle card dei progetti.

### Contatti

Email: **[simonegatto.dev@gmail.com](mailto:simonegatto.dev@gmail.com)**
**LinkedIn:** [https://www.linkedin.com/in/simone-gatto23/](https://www.linkedin.com/in/simone-gatto23/)


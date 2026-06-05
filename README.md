# justsimo.github.io — Personal Portfolio

[![Status](https://img.shields.io/badge/status-active-success)](#)
[![Hosted on](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222222)](#)
[![Built with](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)](#)
[![Responsive](https://img.shields.io/badge/responsive-mobile%20first-22c55e)](#)

Personal portfolio website of **Simone Gatto**, AI/ML Engineer focused on practical Artificial Intelligence solutions, Generative AI, NLP, RAG, Document AI, Computer Vision, model evaluation and Machine Unlearning.

The website is designed as a professional single-page portfolio to present my current profile, research activity, selected technical projects, skills, education, work experience and contact links.

**Live website:** [https://justsimo.github.io](https://justsimo.github.io)

---

## Table of Contents

- [Overview](#overview)
- [Website Sections](#website-sections)
- [Main Features](#main-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Run Locally](#run-locally)
- [Deploy on GitHub Pages](#deploy-on-github-pages)
- [Maintenance Notes](#maintenance-notes)
- [Contact](#contact)
- [Usage Notice](#usage-notice)

---

## Overview

This repository contains the source code of my personal website and portfolio.

The goal of the website is to provide a clear and updated overview of who I am professionally: an AI/ML Engineer with experience in applied Machine Learning, Generative AI, NLP, RAG, Document AI, Computer Vision and Machine Unlearning.

The design combines a recognizable tech-inspired visual identity with a clean professional structure. The content is intentionally organized to highlight research, practical projects, technical skills and professional experience without making the website feel overloaded.

---

## Website Sections

The website is organized as a single-page portfolio with the following main sections:

- **Hero** — short professional introduction and primary call to action.
- **About** — profile summary, focus areas and personal positioning.
- **Research & Publication** — highlighted peer-reviewed publication on Machine Unlearning.
- **Projects** — selected academic and technical projects across ML, NLP, Computer Vision, distributed systems, web development and low-level programming.
- **Tech Stack** — structured overview of programming languages, AI/ML tools, NLP/GenAI technologies, computer vision tools, DevOps tools and backend/data technologies.
- **Education** — academic background, thesis and certifications.
- **Work Experience** — professional and practical experiences.
- **Additional Experiences** — leadership, tutoring, volunteering and community-building activities.
- **Contact** — email and social/professional links.

---

## Main Features

- **Single-page responsive layout** optimized for desktop, tablet and mobile.
- **Professional portfolio structure** focused on AI/ML Engineering and applied research.
- **Research-first positioning** with a dedicated publication section.
- **Project cards** with concise descriptions and visible technical skills.
- **Mobile-friendly project skills** with compact toggles for smaller screens.
- **Sticky navigation bar** with smooth section navigation.
- **Consistent scroll animations** using AOS, reduced and simplified for a cleaner user experience.
- **Reduced-motion support** for users who prefer fewer animations.
- **Mobile menu fallback** to improve reliability if external scripts fail to load.
- **External CV link** to keep the downloadable CV easy to update.
- **GitHub Pages ready** with no build step required.

---

## Tech Stack

The website is built with a lightweight static stack:

- **HTML5** — semantic page structure.
- **CSS3** — custom styling, responsive layout and visual identity.
- **JavaScript** — navigation behavior, loader, mobile interactions and UI enhancements.
- **Bootstrap 4.4.1** — responsive grid and base UI utilities (only the minified CSS/JS are bundled).
- **AOS — Animate On Scroll** — lightweight scroll animations.
- **Selawik (self-hosted)** — web typography, served locally as a single font family with the correct weights.

No framework, build tool or package manager is required to run the website.

---

## Repository Structure

```text
.
├── index.html                 # Main website page
├── style.css                  # Main stylesheet
├── README.md                  # Repository documentation
├── bootstrap-4.4.1-dist/      # Local Bootstrap assets
├── images/                    # Images, icons and visual assets
└── script/
    └── script.js              # Custom JavaScript behavior
```

The CV is linked externally through Google Drive, so the repository does not need to include a local CV file.

---

## Run Locally

Since this is a static website, it can be opened directly in a browser.

For a cleaner local development workflow, run a simple local server from the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

---

## Deploy on GitHub Pages

This repository is designed to work directly with GitHub Pages.

Typical deployment flow:

1. Commit changes to the repository.
2. Push to the `main` branch.
3. Enable GitHub Pages from the repository settings.
4. Select the root folder of the `main` branch as the publishing source.
5. Visit the live website after GitHub Pages finishes the deployment.

If CSS or JavaScript changes are not visible immediately, clear the browser cache or update the asset version query strings in `index.html`.

---

## Maintenance Notes

Useful checks before publishing new updates:

- Verify that the **Download CV** button points to the latest CV.
- Verify that the **View Paper** button points to the correct DOI.
- Check that all contact links work correctly.
- Test the website on mobile and desktop.
- Keep project descriptions concise and aligned with the current professional profile.
- Avoid adding too many animations or long text blocks that could reduce readability.

---

## Contact

- **Email:** [simonegatto.dev@gmail.com](mailto:simonegatto.dev@gmail.com)
- **LinkedIn:** [linkedin.com/in/simone-gatto23](https://www.linkedin.com/in/simone-gatto23/)
- **Website:** [justsimo.github.io](https://justsimo.github.io)

---

## Usage Notice

This repository contains the source code and personal content of my portfolio website.

The code can be used as inspiration for learning purposes, but the personal information, images, project descriptions, research references, CV links and visual identity are specific to Simone Gatto and should not be reused as-is.

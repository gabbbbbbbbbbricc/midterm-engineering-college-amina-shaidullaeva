# Engineering College — Official Brochure Website 🦅

## 1. Project Overview & Visual Identity
A responsive, accessible, multi-page brochure website built for **Engineering College** (Home of the Bald Eagles).
- **Color Palette:** Eye-friendly Deep Navy (`#0f172a`), Slate Grey (`#1e293b`), and Calm Sky Blue (`#38bdf8`) accents.
- **Layout Architecture:** Inspired by modular grid systems (Harbour.Space structural hierarchy) using semantic HTML5, CSS3, Bootstrap 5, and vanilla ES6 JavaScript.

## 2. Page Map (6 Distinct Pages)
1. `index.html` — **Home**: Hero section, Bald Eagle mascot badge, key institutional metrics, and core discipline cards.
2. `programs.html` — **About & Programs**: College philosophy and interactive filterable catalog of 6 academic tracks.
3. `admissions.html` — **Admissions**: 4-step application pipeline, tuition/fees table, and interactive GPA Merit Grant Calculator.
4. `student-life.html` — **Student Life / News**: Student clubs (Enactus & Eco-Lab, Bald Eagle Trekking, Acoustic Lounge) and campus news.
5. `contact.html` — **Contact**: Direct contact channels and a validated Contact Us form with anti-spam protection.
6. `registration.html` — **Registration**: Advanced prospective student registration form with inline validation and confirmation state.

## 3. Features Implemented
- **Fixed Responsive Navigation:** Collapsible Bootstrap 5 navbar with clear active states and keyboard focus rings.
- **Two Validated Forms:**
  - *Registration Form:* Validates full name, email, phone, program select, study mode radio buttons, intake date, password match (8+ chars), optional scholarship field, and policy checkbox.
  - *Contact Form:* Validates required inputs, includes a hidden honeypot field + arithmetic anti-spam check (`4 + 3 = 7`), and shows user feedback.
- **Additional JavaScript Interactions:**
  1. **Live Program Category Filter** (`programs.html`) — filters tracks by Computing, Bio/Eco, or Cyber without page reload.
  2. **Bald Eagle Merit Grant Calculator** (`admissions.html`) — dynamically calculates scholarship tier based on GPA slider.
  3. **Eye-Comfort Tone Switcher** (All pages) — switches between Deep Navy and Warm Slate palettes using `localStorage`.

## 4. Known Limitations
- All form submissions are processed client-side (no backend database connected, per project constraints).

## 5. Attribution & Credits
- **Framework:** [Bootstrap 5.3](https://getbootstrap.com/) via CDN.
- **Icons/Typography:** Native Unicode vector symbols (`🦅`) and system UI/Inter sans-serif stack (zero external heavy media assets).

## 6. Live URL & Navigation
- **Live Site:** `https://gabbbbbbbbbricc.github.io/midterm-engineering-college/` *(replace with your exact repo URL after deployment)*
- Open `index.html` or use the fixed top navigation bar to move between all 6 pages.
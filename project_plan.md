# IIMB-redesign

## 1. Project Description
A modern redesign of the Indian Institute of Management Bangalore (IIMB) public website.
Positioning: a world-class management institution presented with clarity, sophistication, and
confidence. The redesign focuses on **user journeys** (Admissions, Programmes, Faculty, Research),
**content discoverability**, and a **scalable design system** that keeps very different content
types (programmes, faculty profiles, news, events, student life) visually consistent.

Target users: prospective students & applicants, current students, faculty & researchers,
recruiters, alumni, media, and partners.

## 2. Page Structure
- `/` - Home (hero, quick navigation, introduction, programme discovery, faculty & research, news & events, campus life)
- `/programmes` - Programmes (discovery + comparison table + filters)
- `/faculty` - Faculty & Research directory (search + filters + profile cards)
- `/about` - About IIMB (institution story, leadership, campus, priorities)
- `/design-in-action` - Design system showcase (three very different content types proving consistency)

## 3. Core Features
- [x] Sticky primary navigation with mega-style quick links + search entry point
- [x] Full-bleed hero with clear value proposition and primary/secondary CTAs
- [x] "Quick journey" navigation tiles (Admissions, Programmes, Faculty, Research, Placements, Campus)
- [x] Programme discovery with category tabs + programme cards
- [x] Programme comparison table
- [x] Faculty & research spotlight
- [x] News & events highlights
- [x] Student achievements & campus life
- [x] Reusable design system (Navbar, Footer, buttons, section headings, cards, badges)
- [x] Design-in-action page demonstrating the system across data-dense, editorial and people content
- [x] Responsive desktop / tablet / mobile behaviour
- [ ] Phase 2+: News index, Research detail, Admissions journey pages

## 4. Data Model Design
No database required for this phase. This is a public informational content website.
Content is served from structured mock data files under `src/mocks/` for now.

## 5. Backend / Third-party Integration Plan
- Database: Not required now — static informational content (mock data files)
- Shopify: Not needed
- Stripe: Not needed
- Others: None

## 6. Development Phase Plan

### Phase 1: Design System + Homepage
- Goal: Establish the visual language (color scales, typography, components) and deliver the
  redesigned homepage end to end.
- Deliverable: Tailwind theme + design tokens, Navbar, Footer, and a complete homepage with all
  engagement sections.

### Phase 2: Programmes + Faculty + About
- Goal: Extend the site to the key inner journeys using the same design system.
- Deliverable: `/programmes` (discovery + comparison), `/faculty` (search + filters), `/about`.

### Phase 3: Deeper journeys (optional)
- Goal: News index, research detail, admissions journey, accessibility polish.
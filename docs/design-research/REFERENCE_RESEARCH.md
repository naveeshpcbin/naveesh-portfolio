# Design Reference Research

**Project**: Naveesh — An Immersive Personal Portfolio  
**Date**: October 2026  
**Research Focus**: Portfolio architecture, typography, lighting & depth, 3D/WebGL spatial integration, portrait presentation, engineering credibility, interaction craftsmanship.

---

## 1. Catalog of Inspected References

### Reference 1: Dennis Snellenberg
- **URL**: `https://dennissnellenberg.com/`
- **Category**: Immersive & Interactive Portfolio / Creative Developer
- **Inspected Areas**: Hero viewport, project showcase list, magnetic cursor, interactive work case studies.
- **Design Principles Observed**:
  - Kinetic typography scaling across viewports with mathematical rhythm.
  - Case studies presented as horizontal rows that reveal dynamic visual cards upon hover.
  - Fluid bezier-eased transitions that feel physical without causing layout shifts.
- **Useful Interactions**:
  - Hover states that trigger subtle floating thumbnail previews with smooth lerp physics.
  - Floating contact badge that follows scroll with spring damping.
- **Lessons for Naveesh's Portfolio**:
  - Projects deserve dedicated typographic hierarchy and clear metadata (year, stack, status) instead of cookie-cutter grid cards.
- **Ideas NOT to Copy**:
  - Gigantic portrait cutouts taking over 70% of the initial viewport.
  - Heavy locomotive-scroll dependencies that hijack native trackpad physics.
- **Access Limitations**: None.

---

### Reference 2: Rauno Freiberg
- **URL**: `https://rauno.me/`
- **Category**: Principal Design Engineer / Craftsmanship & Micro-Interactions
- **Inspected Areas**: Spatial framing, coordinate system, craft logs, navigation minimap.
- **Design Principles Observed**:
  - Architecture-inspired spatial grid with hairline borders (`1px solid rgba(255,255,255,0.08)`).
  - Telemetry badges and coordinate markers (e.g., live UTC time, scroll tracker).
  - High contrast monochrome base (`#000` / `#fff`) punctured by purposeful electric red accents.
- **Useful Interactions**:
  - Interactive minimap highlighting active viewport section.
  - Interactive toggle states with tactile tactile feedback and subtle sound design consideration.
- **Lessons for Naveesh's Portfolio**:
  - As an ECE student at Thiagarajar College of Engineering working on embedded systems, ESP32, and hardware telemetry, technical coordinate badges and precision framing resonate deeply with his authentic identity.
- **Ideas NOT to Copy**:
  - Pure ASCII or hyper-abstract layouts that obscure core biographical facts.
- **Access Limitations**: None.

---

### Reference 3: Emil Kowalski
- **URL**: `https://emilkowal.ski/`
- **Category**: Interaction Designer & UI Engineer
- **Inspected Areas**: Writing layout, project index, animation craftsmanship essays.
- **Design Principles Observed**:
  - Unflinching focus on typography and negative space; zero gratuitous visual fluff.
  - High signal-to-noise ratio: content is immediately accessible without waiting for intro animations.
- **Useful Interactions**:
  - Micro-scale hover glows and crisp focus rings that respect WCAG AA contrast.
- **Lessons for Naveesh's Portfolio**:
  - Every visual effect must justify its existence. Animation should communicate hierarchy and state, not mask lack of content.
- **Ideas NOT to Copy**:
  - Excessive minimalism that omits visual imagery or interactive 3D entirely.
- **Access Limitations**: None.

---

### Reference 4: Paco Coursey
- **URL**: `https://paco.me/`
- **Category**: Minimalist Systems & Design Engineer
- **Inspected Areas**: 3-column index, typography tokens, craft inventory.
- **Design Principles Observed**:
  - Restrained dark gray canvas (`#1c1c1c` instead of pure harsh `#000000`).
  - Strict typographic hierarchy using tabular numbers and mono badges for dates and statuses.
- **Useful Interactions**:
  - Instant keyboard navigation shortcuts and clean column filtering.
- **Lessons for Naveesh's Portfolio**:
  - Warm dark neutrals (`#0B0B0A`, `#141413`) create a far more luxurious, editorial feel than cold pure black.
- **Ideas NOT to Copy**:
  - Text-only layout with no visual representation of physical engineering or hardware.
- **Access Limitations**: None.

---

### Reference 5: Brittany Chiang
- **URL**: `https://brittanychiang.com/`
- **Category**: Developer Portfolio / Sticky Navigation
- **Inspected Areas**: Dual-column sticky desktop layout, cursor radial spotlight, project cards.
- **Design Principles Observed**:
  - Left column remains stationary displaying identity, summary, and nav anchors; right column scrolls smoothly through experience and projects.
  - Radial spotlight subtly follows the mouse cursor, illuminating card borders.
- **Useful Interactions**:
  - Pill tags for tech stacks with clean contrast ratios.
- **Lessons for Naveesh's Portfolio**:
  - Subtle cursor-following illumination adds depth without rendering overhead.
- **Ideas NOT to Copy**:
  - Full-width dual-column layout limits cinematic hero presentations and 3D spatial integration.
- **Access Limitations**: None.

---

### Reference 6: Lee Robinson
- **URL**: `https://leerob.io/`
- **Category**: Engineering Leader & AI Educator Portfolio
- **Inspected Areas**: Bio length switcher (`Default` vs `Long`), custom illustrative backdrop, writing/blog index.
- **Design Principles Observed**:
  - User agency: allowing the visitor to choose reading depth (`Default` vs `Long` bio).
  - Subtle hand-crafted SVG backdrop integrated with mathematical vector curves.
- **Useful Interactions**:
  - Segmented toggle control for biography depth.
- **Lessons for Naveesh's Portfolio**:
  - Allowing visitors to inspect both high-level engineering summaries and deep technical architecture details gives the portfolio professional maturity.
- **Ideas NOT to Copy**:
  - Flat 2D vector sky backdrop which does not convey Naveesh's hardware/semiconductor focus.
- **Access Limitations**: None.

---

### Reference 7: Teenage Engineering
- **URL**: `https://teenage.engineering/`
- **Category**: Hardware Design & Industrial Creative Technology
- **Inspected Areas**: Navigation grid, industrial schematics, typography hierarchy, CAD-like wireframes.
- **Design Principles Observed**:
  - Industrial engineering aesthetic: hairline borders, technical measurement marks, precision mechanical iconography.
  - Univers Next Pro typography with stark, unyielding clarity.
  - Hardware treated as sculpture with high contrast lighting and realistic materials.
- **Useful Interactions**:
  - Mechanical click animations, tactile toggle switches, interactive dials.
- **Lessons for Naveesh's Portfolio**:
  - Perfect alignment with Naveesh's Electronics & Communication Engineering background. Hardware schematics, semiconductor pinouts, and embedded telemetry cards fit this vocabulary naturally.
- **Ideas NOT to Copy**:
  - Extreme avant-garde e-commerce navigation that sacrifices discoverability for quirkiness.
- **Access Limitations**: None.

---

### Reference 8: Maxime Heckel
- **URL**: `https://blog.maximeheckel.com/`
- **Category**: Real-time 3D, WebGL Shaders & Creative Technology
- **Inspected Areas**: WebGL shader sandboxes, OKLCH color token system, Departure Mono + Inter font pairings, interactive component callouts.
- **Design Principles Observed**:
  - Seamless bridge between deep technical writing and real-time interactive 3D WebGL canvases.
  - Custom dark theme built on OKLCH perceptual lightness, avoiding color banding.
  - Framed canvas viewports with technical headers and live FPS/shader control knobs.
- **Useful Interactions**:
  - Interactive WebGL shaders that react to cursor proximity with smooth decay.
  - Subtle card borders illuminated with directional gradients.
- **Lessons for Naveesh's Portfolio**:
  - Real-time 3D should be an interactive spatial canvas that complements the content rather than distorting a 2D portrait photo.
- **Ideas NOT to Copy**:
  - Heavy multi-canvas pages that drop frame rates on low-power mobile GPUs.
- **Access Limitations**: None.

---

### Reference 9: Minimal Gallery
- **URL**: `https://minimal.gallery/`
- **Category**: Curated Web Design Showcase
- **Inspected Areas**: Grid systems, card hover states, filter navigation, typography scale.
- **Design Principles Observed**:
  - Restrained palette with strict spacing tokens (4px, 8px, 16px, 24px, 32px, 48px).
  - Editorial thumbnail presentation with consistent aspect ratios and hairline frame bevels.
- **Useful Interactions**:
  - Instant tag filtering and smooth card fade-ins.
- **Lessons for Naveesh's Portfolio**:
  - Project cards should have consistent visual framing and aspect ratios so companion project photos look curated and intentional.
- **Ideas NOT to Copy**:
  - Gallery-style infinite masonry feeds that lose personal identity.
- **Access Limitations**: None.

---

### Reference 10: One Page Love
- **URL**: `https://onepagelove.com/`
- **Category**: Single-Page Storytelling & Narrative Flow
- **Inspected Areas**: Section transitions, smooth scrolling anchors, call-to-action placement.
- **Design Principles Observed**:
  - Strong narrative arc: Introduction → Core Identity → Featured Work → Technical Capabilities → Contact.
  - High scannability: visitors can understand the candidate's core competencies within 5 seconds.
- **Useful Interactions**:
  - Floating pill navigation that indicates current reading progress.
- **Lessons for Naveesh's Portfolio**:
  - Naveesh's single-page structure must tell a coherent story: from his ECE foundations at TCE Madurai to cutting-edge AI and semiconductor telemetry.
- **Ideas NOT to Copy**:
  - Marketing landing page formulas (sales funnels, aggressive testimonial carousels).
- **Access Limitations**: None.

---

### Reference 11: Danilo Woznica
- **URL**: `https://danilowoz.com/`
- **Category**: Design-Driven Developer / React Engineering
- **Inspected Areas**: Hero statement, personal photo section ("Memories"), project cards with access badges.
- **Design Principles Observed**:
  - High personal authenticity: photographic imagery presented naturally with clean borders, warm lighting, and dignified human framing.
  - Human philosophy combined with technical rigor ("I see code as a tool for design").
- **Useful Interactions**:
  - Subtle card hover highlighting, UTC live clock indicator.
- **Lessons for Naveesh's Portfolio**:
  - Naveesh's authentic photograph (`images/IMG_20260209_135437.jpg`) must be framed with dignity and human warmth. Clean editorial framing, precision corner bevels, and subtle depth layers work infinitely better than artificial cookie-cutter cutout domes.
- **Ideas NOT to Copy**:
  - Horizontal scrolling project cards that hide content on mobile viewports.
- **Access Limitations**: None.

---

### Reference 12: Linear
- **URL**: `https://linear.app/`
- **Category**: State of the Art Dark Mode & Systems UI
- **Inspected Areas**: Dark theme tokens (`#08090a`), micro-borders, telemetry indicators, keyboard-centric navigation.
- **Design Principles Observed**:
  - Deep dark background with subtle multi-stop radial gradient glows.
  - Precision 1px borders with localized illumination (`oklch(... / 0.15)`).
  - Monospace telemetry tags, status dots (pulsing green for active systems), and micro-chips.
- **Useful Interactions**:
  - Keyboard shortcut hints (`⌘K`, `Esc`), high-framerate micro-interactions.
- **Lessons for Naveesh's Portfolio**:
  - Dark mode needs depth and atmospheric lighting rather than flat gray rectangles. Status indicators (e.g. `SYSTEM ONLINE`, `ACTIVE HARDWARE`) reinforce engineering credibility.
- **Ideas NOT to Copy**:
  - SaaS product pricing grids or enterprise feature tables.
- **Access Limitations**: None.

---

### Reference 13: Matklad (Alex Kladov)
- **URL**: `https://matklad.github.io/`
- **Category**: Systems Engineer & Rust Language Architect
- **Inspected Areas**: Typography choices (EB Garamond + JetBrains Mono), writing layout, content density.
- **Design Principles Observed**:
  - Academic yet modern editorial typography: classic serif headers paired with crisp modern monospace.
  - Zero fluff: genuine intellectual rigor and architectural depth.
- **Useful Interactions**:
  - Hyper-clean reading experience with optimal line lengths (65–75 characters per line).
- **Lessons for Naveesh's Portfolio**:
  - Pairing a refined serif or warm editorial display face with precision monospace (`JetBrains Mono` / `Space Mono`) conveys high intellect, academic credibility, and engineering sophistication.
- **Ideas NOT to Copy**:
  - Raw unstyled HTML styling that lacks visual excitement or modern interactive craft.
- **Access Limitations**: None.

---

### Reference 14: Nikita Prokopov (Tonsky)
- **URL**: `https://tonsky.me/`
- **Category**: Craft-focused Software Engineer & Typographer
- **Inspected Areas**: Bespoke typography, brutalist clarity, craftsmanship manifesto.
- **Design Principles Observed**:
  - Unapologetic individuality and craftsmanship in every detail.
  - Clear visual anchors and authentic authorial voice.
- **Useful Interactions**:
  - Instant load times, zero bloat, zero tracking scripts.
- **Lessons for Naveesh's Portfolio**:
  - Don't build a template that looks like every other Silicon Valley website; let Naveesh's unique personality and ECE engineering passions shine through.
- **Ideas NOT to Copy**:
  - Aggressive brutalist asymmetry that confuses non-technical visitors.
- **Access Limitations**: None.

---

### Reference 15: Stripe Press
- **URL**: `https://press.stripe.com/`
- **Category**: Physical & Digital Editorial Craft
- **Inspected Areas**: Literary typography, warm cream and deep charcoal palette, 3D interactive book presentations.
- **Design Principles Observed**:
  - Luxurious editorial aesthetic: warm cream typography (`#EFEEE9`), deep ink darks (`#0E0E0D`), subtle gold accents.
  - Physical objects rendered in WebGL with realistic tactile lighting, material roughness, and subtle shadows.
- **Useful Interactions**:
  - Interactive 3D spatial rotation that responds smoothly to pointer gestures.
- **Lessons for Naveesh's Portfolio**:
  - The "sophisticated dark editorial aesthetic with cream-colored typography" requested by Naveesh finds its highest expression here. Warm cream text on deep charcoal with subtle metallic/gold accents feels bespoke and timeless.
- **Ideas NOT to Copy**:
  - E-commerce cart mechanics.
- **Access Limitations**: None.

---

### Reference 16: Brian Lovin
- **URL**: `https://brianlovin.com/`
- **Category**: Product Designer (Notion AI) & Design Technologist
- **Inspected Areas**: Avatar presentation, clean list hierarchies, project external links.
- **Design Principles Observed**:
  - Clean avatar integration with dignified border treatment.
  - Project entries featuring crisp one-line descriptions, external arrow glyphs, and distinct metadata tags.
- **Useful Interactions**:
  - Fast page transitions, simple icon links with hover color shifts.
- **Lessons for Naveesh's Portfolio**:
  - Project cards should have direct GitHub repository badges and live preview links with unmistakable external affordances.
- **Ideas NOT to Copy**:
  - Light mode default with low contrast secondary text.
- **Access Limitations**: None.

---

### Reference 17: Mosan Sites
- **URL**: `https://mosansites.ai/` (Requested Reference)
- **Outcome**: Connection failed: `dial tcp: lookup mosansites.ai: no such host`.
- **Reporting**: Address does not resolve to an active domain. Reported transparently without fabrication.

---

### Reference 18: Pedro Duarte
- **URL**: `https://peduarte.com/`
- **Outcome**: Connection timed out on port 443. Reported transparently.

---

## 2. Synthesis of Recurring Principles
1. **Photographic Dignity vs. Distortion**: Great portfolios never deform or warp the subject's face using fake 3D mesh domes or jagged cookie-cutter cutout masks. They use architectural framing, subtle depth parallax, and directional lighting.
2. **Editorial Typographic Harmony**: Warm cream text (`#F4F3EE` / `#EFEEE9`) on deep ink canvas (`#0B0B0A`) with a disciplined pairing of modern display sans/serif and precision monospace.
3. **Spatial WebGL Integration**: Three.js/WebGL should provide an atmospheric, interactive spatial environment (e.g. interactive semiconductor telemetry lattice, particle depth field, or hardware coordinate grid) rather than an uncanny plastic mask.
4. **Engineering Credibility**: Real GitHub repositories, verified test suites, authentic technical details (ESP32-S3, PyTorch, LoRaWAN, Digital Twins), and verifiable code links.

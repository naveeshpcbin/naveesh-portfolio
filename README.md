# Naveesh — Premium 3D Personal Portfolio & Administration Prototype
## Phase 1: Complete Frontend Demo & Interaction Prototype

An editorial, cinematic personal portfolio website and interactive administrative dashboard prototype engineered for **Naveesh**, Electronics and Communication Engineering student at **Thiagarajar College of Engineering, Madurai, Tamil Nadu**.

---

## 1. Project Overview

This project showcases Naveesh's engineering projects, academic identity, multidisciplinary research interests, and technical content.

The portfolio is structured around two distinct operational layers:
1. **Public-Facing Portfolio**: An editorial visual experience featuring an interactive 3D portrait hero, oversized typography marquee, comprehensive project showcase (PRW-Wild, OpenPerplex AI, Bovine Mastitis SIH 2026, APAAR ID, Mood Travel, Zitter), achievement archive, technical interests, SemiconNavee media, and direct contact channels.
2. **Interactive Administration Dashboard (`/admin`)**: A dedicated prototype demonstration interface allowing local testing of project management, document upload workflows, publication status toggles (Draft / Published / Private), profile text updates, and external link configurations.

> **Important Architecture Notice**: This is **Phase 1**. Supabase backend integration is not connected in this phase. All demonstration workflows run on a swappable repository and service architecture decoupled from presentation components, allowing Phase 2 Supabase authentication, database tables, and storage buckets to be connected without refactoring UI layers.

---

## 2. Technology Stack

- **Core Framework**: React 18 with TypeScript (strict type checking)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS configured with a dark editorial palette (`#0B0B0A` primary background, `#141413` secondary, `#EFEEE9` cream typography)
- **3D Graphics & WebGL**: Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
- **3D Model Authoring**: Blender 5.2.2 LTS (headless Python execution pipeline)
- **Icons**: Lucide React
- **Typography**: Helvetica Neue ME with system font fallbacks

---

## 3. How to Run the Application Locally

### Prerequisites
- Node.js (v18+ or v20+, tested on v24.22)
- npm (v9+, tested on v11.19)

### Setup & Launch
```bash
# Navigate to the project directory
cd "d:\Personnal portfolio"

# Install dependencies (already installed)
npm install

# Start the local development server
npm run dev
```

The application will be live at:
- **Public Portfolio**: [http://localhost:5173/](http://localhost:5173/)
- **Admin Dashboard Prototype**: [http://localhost:5173/admin](http://localhost:5173/admin) (or click the **ADMIN DEMO** button in the header)

---

## 4. How to Build for Production

```bash
# Run TypeScript validation and compile production bundle
npm run build

# Preview the production build locally
npm run preview
```

Production output is compiled to `/dist` with asset minification and gzip compression.

---

## 5. Project Directory Structure

```
d:/Personnal portfolio/
├── dist/                              # Compiled production build
├── images/                            # Original uncompressed photographs (PRESERVED INTACT)
│   ├── IMG_20260209_135437.jpg        # Authentic high-resolution portrait of Naveesh (3820x4094)
│   ├── oWPJM.jpg                      # Semiconductor & AI circuit concept image
│   ├── rQ7Fm.jpg                      # Workstation engineering photo
│   └── sI9AM.jpg                      # Formal rooftop portrait
├── public/                            # Static public web assets
│   ├── images/                        # Optimized web derivatives & symlinked assets
│   └── models/
│       └── naveesh.glb                # Real 3D GLB portrait mesh generated via Blender (2.0 MB)
├── src/
│   ├── components/
│   │   ├── about/                     # AboutSection component & philosophy pillars
│   │   ├── achievements/              # Archive cards, document preview modal, publication filter
│   │   ├── admin/                     # Dashboard, projects manager, file upload demo, profile editor
│   │   ├── contact/                   # Email copy action, verified links, unconfigured status
│   │   ├── content/                   # SemiconNavee technical media cards
│   │   ├── hero/                      # Hero section, continuous Marquee, PortraitScene, PortraitFallback
│   │   ├── interests/                 # 9 technical interest pillars
│   │   ├── navigation/                # Navbar, mobile slide-in drawer
│   │   ├── projects/                  # ProjectCard, ProjectModal (with 54/54 test report view)
│   │   └── ui/                        # SectionHeader, StatusBadge
│   ├── config/
│   │   └── site.ts                    # Central configuration for identity & verified URLs
│   ├── data/
│   │   ├── demo-achievements.ts       # Typed starter achievement & report data
│   │   ├── demo-profile.ts            # Typed starter biography, degree, & interests
│   │   └── demo-projects.ts           # Typed starter project records with verification details
│   ├── lib/
│   │   └── utilities.ts               # cn(), formatDate(), slugify() helpers
│   ├── pages/
│   │   ├── AdminPage.tsx              # /admin route container
│   │   ├── HomePage.tsx               # / homepage container
│   │   └── NotFoundPage.tsx           # 404 handler
│   ├── repositories/                  # Abstract data access layer (LocalStorage prototype adapter)
│   │   ├── achievements.repository.ts
│   │   ├── profile.repository.ts
│   │   ├── projects.repository.ts
│   │   └── social-links.repository.ts
│   ├── services/                      # Application service layer (Phase 2 Supabase target)
│   │   ├── achievements.service.ts
│   │   ├── profile.service.ts
│   │   ├── projects.service.ts
│   │   ├── social-links.service.ts
│   │   └── storage.service.ts         # Object URL prototype adapter with Supabase Storage boundary
│   ├── types/                         # Strict TypeScript domain interfaces
│   │   ├── achievement.ts
│   │   ├── profile.ts
│   │   └── project.ts
│   ├── App.tsx                        # Client-side router supporting / and /admin
│   ├── index.css                      # Tailwind base & editorial typography rules
│   └── main.tsx                       # React DOM entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 6. How the 3D Portrait Integration Works

The hero's centerpiece is a real 3D WebGL scene loaded via `@react-three/fiber` (`PortraitScene.tsx`).

### Pipeline & Features
1. **Scene Composition**:
   - Camera positioned with a 44° field-of-view and restrained depth.
   - 3-point studio lighting: a warm key directional light (`#FFFFFF`, intensity 2.2), an ambient fill (`#EFEEE9`), and an accent spotlight (`#D8D7D2`) casting highlights across the sculpted titanium bezel.
2. **Subtle Pointer Tracking**:
   - In each frame (`useFrame`), the pointer's coordinates smoothly rotate the model horizontally and vertically using dampening interpolation (`THREE.MathUtils.damp`).
   - Angular limits are clamped between -0.15 and +0.15 radians to ensure the portrait stays front-facing and natural.
3. **Floating & Ambient Particles**:
   - A `@react-three/drei` `Float` component gives the portrait a slow, subtle idle breathing elevation (`floatingRange: [-0.04, 0.04]`).
   - A 120-point ambient floating particle cloud surrounds the model, catching specular light.
4. **Graceful Fallback (`PortraitFallback.tsx`)**:
   - Automatically activates if WebGL is unsupported, if WebGL context is lost, or if the user has `prefers-reduced-motion` enabled.
   - Renders an editorial composite of Naveesh's photograph with titanium border, subtle ambient glow, and system status tag.

---

## 7. Where the Generated 3D Model is Stored

- **File**: `public/models/naveesh.glb`
- **Size**: 2,009,488 bytes (~2.0 MB binary GLTF)
- **Source**: Headlessly generated in Blender 5.2.2 from the authentic high-resolution photograph `images/IMG_20260209_135437.jpg`.
- **Geometry**: Subdivided dimensional relief mesh with facial feature elevation, rounded portrait contour, and an integrated dark titanium bezel frame (`TitaniumBezelMat`).

---

## 8. How Supplied Personal URLs are Configured

Personal URLs are managed in a single source of truth at `src/config/site.ts` and editable dynamically via the `/admin` prototype:
- **Email**: `naveeshpcp.in@gmail.com`
- **GitHub**: `https://github.com/naveeshpcbin`
- **Verified Repositories**:
  - APAAR ID Platform: `https://github.com/naveeshpcbin/APAAR-ID-BASED-SYSTEM`
  - Mood-Based Travel Engine: `https://github.com/naveeshpcbin/moodtravel`
- **Unconfigured Destinations**: LinkedIn, YouTube, Instagram, WhatsApp, and Zitter are marked with `isConfigured: false` and `url: ''`. Per prompt instructions, fake or dead `href="#"` links are never rendered. They appear as pending configuration items in the admin dashboard and contact section.

---

## 9. How Project Metadata is Managed in the Demo

1. Starter data is defined in `src/data/demo-projects.ts`.
2. Upon initialization, `projects.repository.ts` stores this data in browser `localStorage` under `naveesh_portfolio_projects_v1`.
3. In the `/admin` interface, you can:
   - Create new projects with full metadata (overview, problem, approach, technologies, GitHub and live demo URLs).
   - Edit existing project fields in real time.
   - Toggle visibility (`Published` vs `Unpublished`). Unpublished projects are hidden from the public site.
   - Reorder projects (`#1` through `#6`) to control which appears first.
   - Reset back to starter defaults with one click.

---

## 10. How the Achievement-Management Demonstration Works

1. Starter records in `src/data/demo-achievements.ts` showcase genuine, non-fabricated items (e.g. the PRW-Wild Telemetry Verification Report with 54/54 passing tests).
2. The administration prototype demonstrates:
   - Creating new achievement records.
   - **Local File Picker**: Selecting any local PDF, Word document, or image.
   - **Interactive Preview**: Generates an in-memory Object URL showing the filename, file size, and document icon.
   - **Publication Control**: Toggling between `Draft`, `Published`, and `Private`.
   - **Public Empty State**: Filtering on categories with no published documents displays a polished notice explaining that credentials appear once published.

---

## 11. Which Features are Mock Implementations

- **Authentication**: Access to `/admin` is open for local prototyping. No fake password prompt is used; the banner explicitly indicates prototype status.
- **Data Persistence**: Uses browser `localStorage` via `src/repositories/`. Changes are saved locally on your machine.
- **File Storage**: Uploads generate in-memory browser `blob:` Object URLs rather than uploading to a cloud CDN.

---

## 12. How Phase 2 Supabase Integration Should be Implemented

The application architecture has been specifically designed with an **inversion-of-control boundary** to make Supabase integration direct:

1. **Database Tables**:
   - `projects`: Maps 1:1 with `src/types/project.ts`
   - `achievements`: Maps 1:1 with `src/types/achievement.ts`
   - `profiles`: Maps 1:1 with `src/types/profile.ts`
   - `social_links`: Maps 1:1 with `SocialLink`
2. **Repository Replacement**:
   - Replace `LocalStorageProjectsRepository` with `SupabaseProjectsRepository` using `supabase.from('projects').select('*')`.
   - Replace `LocalStorageAchievementsRepository` with `SupabaseAchievementsRepository`.
3. **Storage Buckets**:
   - Create Supabase Storage buckets: `achievement-documents` and `project-assets`.
   - In `src/services/storage.service.ts`, swap `URL.createObjectURL(file)` for `supabase.storage.from(bucket).upload(path, file)`.
4. **Authentication**:
   - Wrap `/admin` with Supabase Auth (`supabase.auth.getUser()`) using email OTP or OAuth.

---

## 13. Known Limitations

- **3D Asset Generation**: Generated locally via Blender 5.2.2 LTS as a high-density 3D sculpted portrait medallion with facial contours and titanium bezel. True multi-view neural photogrammetry / AI image-to-3D mesh generation was not run on external cloud APIs to protect personal photograph privacy per user instructions.
- **Zitter Repository**: Marked as `EXPLORATION` with external link unconfigured, as the URL was not provided in the workspace.
- **Social Accounts**: LinkedIn, YouTube (SemiconNavee), Instagram, and WhatsApp are marked unconfigured until authentic URLs are provided.

---

## 14. Actual Verification Results

- **TypeScript Compilation**: Passed with 0 errors (`tsc`).
- **Production Bundle**: Passed with 0 errors (`vite build`, 2,204 modules transformed).
- **Desktop Browser Inspection**: Verified at 1440x900 across all 7 sections.
- **Mobile Drawer Inspection**: Verified at 390x844 with keyboard escape and backdrop dismissal.
- **3D WebGL Canvas**: Initialized with 60 FPS, smooth pointer lerp, and zero WebGL errors.
- **Admin Prototype**: Tested project creation, status toggling, reordering, local file selection, and publication filtering.

# Emergence — Physics Galaxy, version 3

Physics is the galaxy. Six peer star systems contain major-concept planets. Specific capabilities are moons; Explore and Apply are asteroid activity markers. Missions reuse capability records across locations rather than creating duplicate skills.

## Open

Current branch preview (third-party host):
https://raw.githack.com/PraxisIsPerfect/Emergent_learning_system/main/index.html?v=3

Pinned version:
https://rawcdn.githack.com/PraxisIsPerfect/Emergent_learning_system/92d894ede874c5ffae3c0212038c7470a13f8a12/index.html

The preview host was not accessible from the build environment, so no hosted end-to-end verification is claimed. GitHub source files were verified byte-for-byte against the locally tested files. Old pinned v1/v2 URLs do not update when refreshed. Hosting may cache the current-branch URL.

For local use, keep the six runtime files together and run `python3 -m http.server 8000`, then open localhost:8000. A single-file HTML edition is included in the downloadable build. No runtime libraries, fonts, API keys, or network services are required. HTML attachment viewers may disable JavaScript; an inline static SVG remains visible.

## Scope

Six systems: Mechanics; Waves & Light; Electricity & Magnetism; Thermal Physics; Quantum Physics; Spacetime & Relativity. Twenty-eight concept planets are mapped, with thirteen implemented capabilities across three systems. Dashed outlines denote unbuilt content, not missing learner prerequisites.

Working capabilities: position, displacement, elapsed time, speed, acceleration, net force, force/mass/acceleration, weight, ideal free fall, gravitational-force ratios, period/frequency, light travel time, and event coordinates. The last three are new in v3. The other systems and advanced relativity planets are roadmap outlines, not finished instruction.

Two short guided missions are implemented: Drop timer and Signal relay. These reuse generated Apply tasks and are not yet authentic, open-ended projects.

## Architecture

- `catalog-v3.js`: systems, planets, capability prerequisites, default ordering, missions. Containment and prerequisites are separate.
- `learning-v3.js`: authored instruction, interactive SVG models, question generators, evidence gates, export/reset, storage migration.
- `galaxy-v3.js`: perspective-projected 3D scene, navigation, responsive layout, mission routes.
- `pathway-v2.css`: retained activity and base styles.
- `galaxy-v3.css`: new galaxy shell and navigation styles.
- `index.html`: entry point, static fallback, scope, source links, and dialogs.

Only those files are active. Older `app.js`, `styles.css`, and `pathway-v2.js` remain legacy files in the repository. Tests and screenshots are included in the downloadable build.

## Progression and data

Each capability needs two new first-attempt numerical responses plus correct selected explanations, in two authored context families and without hints. This is a provisional introductory-readiness rule, not validated mastery, spaced repetition, or proof of lasting transfer. Exploration and elapsed time give no credit. Later difficulty marks a narrow revisit without relocking downstream work. The finite problem generators may exhaust; repeated questions remain practice.

Prerequisites branch: elapsed time opens oscillation; speed opens light timing; displacement plus elapsed time opens event coordinates. Learners need not finish all of Mechanics to reach spacetime foundations. This first spacetime activity does NOT assess time dilation or relativistic frame changes.

Browser-local storage key: `emergence-galaxy-v3`. Valid v2 credits are migrated once when available on the same browser origin. A different hosting domain cannot read old local storage. Export and confirmed reset are available from Learning record. Retains 500 detailed attempts plus credits and a seen-question index. No AI, analytics, microphone, camera, or learner server. Client-side assessment is not tamper-resistant and is unsuitable for high-stakes certification.

## Standards

The hierarchy and prerequisite graph are design decisions, not a TEKS-prescribed sequence. Existing activities address partial slices of PHYS.5.A/C/E/F/H; period and frequency connects to PHYS.8.C. Relativity bridges are extensions. Full standards attainment is not claimed.

Sources are linked in Map guide: TEKS Guide Physics 5.C/E/F/H and 8.C; its wave-properties resource; NASA ideal free fall; Einstein Online on events and spacetime.

## Verification

68 automated functional assertions passed with no JavaScript runtime errors. Included: all thirteen capability gates; wrong values/reasons; hints; cross-system prerequisites; local-storage contract; v2 migration; export/reset; missions; camera controls; mobile widths 320/390/768; static fallback.

Environment: Chromium desktop and mobile emulation. The browser runner blocks navigation, so tests injected the HTML and mocked localStorage for storage-contract tests. A test-only accessor supplied generated answers to automation; that accessor is absent from production. This is not learner validation, physical-iPhone Safari testing, real-origin persistence verification, or hosted end-to-end testing.

The existing GitHub Pages workflow previously failed because Pages was not enabled. This release does not claim permanent Pages hosting is active.

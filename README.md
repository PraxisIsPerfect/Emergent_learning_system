# Emergence — Physics pathway, version 2

Space → Time → Motion → Force → Gravity.

Ten skills: position, displacement, elapsed time, speed, acceleration, net force, Newton's second law/inertia, weight, ideal free fall, and relative gravitational force.

The map uses real 3D coordinates and perspective projection, with drag, pinch/wheel zoom, pause, and reset. Available work glows mint; completed work is quieter; locked work is dim with a lock shape; a later revisit glows amber. No slogans or checked/not-checked labels on the map.

## Preview

Current-branch preview (third-party host; not verified end-to-end from the build environment):
https://raw.githack.com/PraxisIsPerfect/Emergent_learning_system/main/index.html?v=2

Pinned version:
https://rawcdn.githack.com/PraxisIsPerfect/Emergent_learning_system/3cf50e0824bc31137770611628ead5ae987937cc/index.html

A previous pinned Gravity & Time URL will not update when refreshed. Use the current-branch URL for subsequent iterations. The host may cache changes.

For local use, keep index.html, pathway-v2.css, and pathway-v2.js together and run `python3 -m http.server 8000`. No build step or runtime dependency. File-preview viewers may disable JavaScript; the static SVG fallback remains visible.

## Progression

Each skill requires two first-attempt, unassisted responses to new problems, using two authored context types. Both numerical values and a selected explanation must be correct. Hints, reopening instruction during a problem, or repeating a revealed problem are supported practice and do not satisfy a gate. Simulations and time spent do not unlock anything.

A later error flags the particular skill without removing earned prerequisites. An eligible later response clears its review flag. This policy is intentionally simple and is NOT validated knowledge tracing, spaced repetition, or proof of durable transfer. The question generators are finite, and some context changes are near transfer rather than substantially different tasks. Broader assessment and delayed project validation remain future work.

Progress is browser-local under `emergence-pathway-v2`. The last 500 attempts plus progression credits persist. Export and confirmed reset are available through the record icon. No cloud learner profile or AI tutor. Client-side storage is not tamper-resistant and is unsuitable for high-stakes certification.

## Standards scope

The route is an authored dependency sequence, not a TEKS-mandated order. It assumes signed numbers, arithmetic, units, and basic algebra. Space means position/displacement, not astronomy; Time means intervals, not relativity.

Partial connections: Physics 5.A, 5.C, 5.E, 5.F, and 5.H. Complete standards attainment is NOT claimed. Full graph construction, comprehensive free-body diagrams, scientific notation, and orbital predictions are not yet assessed.

Primary sources:
- https://teksguide.org/teks/phys5a/overview
- https://teksguide.org/teks/phys5c/overview
- https://teksguide.org/teks/phys5e/overview
- https://teksguide.org/teks/phys5f/overview
- https://teksguide.org/teks/phys5h/overview
- https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/free-fall-without-air-resistance/

## Testing

69 automated assertions passed, with zero JavaScript errors. Tested in Chromium desktop and mobile emulation at 320, 390, and 768 pixels; tested a JavaScript-disabled fallback. All ten skill gates were exercised, including wrong explanations, wrong values, hints, revisiting instruction, progression, later review flags, export, reset, camera controls, negative numeric input, simulation, and persistence contract.

Important limits: the browser runner blocks navigation, so HTML was injected and localStorage was mocked for persistence-contract tests. A test-only accessor supplied generated task solutions to the UI automation; that accessor is NOT in the delivered JavaScript. These are functional tests, not learner validation, physical-iPhone Safari testing, or a hosted end-to-end test.

Production source hashes were verified byte-for-byte against the published GitHub blobs. Older app.js and styles.css remain inactive legacy assets.

The repository's existing Pages workflow previously failed because Pages was not enabled. Permanent Pages hosting still requires Settings → Pages → Source: GitHub Actions, followed by a successful workflow run. This build does not claim that hosting is active.

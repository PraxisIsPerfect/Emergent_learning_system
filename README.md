# Emergence — Gravity & Time

A focused 3D learning-universe prototype: two concepts, one free-fall experiment, and a small claim-specific evidence loop.

## Preview

Browser preview through a third-party static-file host:
https://rawcdn.githack.com/PraxisIsPerfect/Emergent_learning_system/2a7684636d3288bd1a8dca27f51af53be53d7cbb/index.html

This host may show a destination-confirmation page. The preview URL has not been verified end-to-end from the build environment.

## GitHub Pages

The existing deployment failed at `actions/configure-pages` because Pages was not enabled. To activate permanent hosting: Settings → Pages → Build and deployment → Source → GitHub Actions. Then rerun the latest deployment workflow. Expected address after a successful deployment: https://praxisisperfect.github.io/Emergent_learning_system/

## Run locally

Keep index.html, styles.css, and app.js together. Serve the directory with `python3 -m http.server 8000`, then visit http://localhost:8000. No runtime libraries, API keys, fonts, package installation, or build process are required.

## Included

- Two selectable concepts in actual 3D coordinates with perspective projection, orbit, pinch/wheel zoom, and pause/reset controls.
- Responsive mobile layout and inline SVG fallback when JavaScript is blocked.
- Analytic free-fall simulation: Earth/Moon, adjustable height, two masses, elapsed time, speed, and playback controls.
- Eight authored checks across mass/free-fall, elapsed intervals, and time/distance relationships.
- Context-specific review flags, hint and repetition tracking, browser-local evidence, JSON export, and confirmed reset.

A missed or assisted check queues only its narrow claim. A new independent context can clear its review flag, not certify mastery. Simulation observation has zero evidentiary weight. Passing time alone never marks a skill forgotten.

## Boundaries

No AI, camera, voice, account system, cloud learner profile, calibrated knowledge-tracing model, or validated spaced-repetition scheduler. Not an official TEKS mapping. Time here means elapsed-time measurement; gravitational time dilation is outside scope. The finite question bank eventually repeats; repeated items remain assisted practice.

## Testing

27 automated checks passed with no JavaScript errors in Chromium desktop and mobile emulation, including the JavaScript-disabled fallback, camera movement, analytic physics, assistance flags, review queue, export, reset, and persistence contract. HTML was injected because browser navigation was unavailable; persistence-contract tests used a localStorage mock. This is not a real-device Safari test or an end-to-end hosted deployment test.

## Physics sources

https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/free-fall-without-air-resistance/

https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/motion-of-free-falling-object/

https://www.nist.gov/how-do-you-measure-it/how-do-you-measure-second

# DewDrop

A sleek, minimalist landing page for a fictional flavoured mineral water brand, built as a hands-on **agentic coding experiment**.

## The experiment

This project is based on the freeCodeCamp.org course [Codex & AI Coding Agents — Learn Agentic Coding](https://www.youtube.com/watch?v=ajfQWhGQGLE), taught by Tom Chant (Scrimba). The course opens with a deliberately small exercise: prompt a coding agent to build a landing page for a flavoured mineral water company called DewDrop.

This repository is that exercise, rebuilt outside the course environment. It does **not** use Scrimba's agent, Codex, or any other tool presented in the course. The work was done with a different CLI agent (opencode) while applying the course's methodology:

- Give the agent a clear, constrained brief.
- Plan before editing and keep changes reviewable.
- Verify behaviour rather than trusting the output.
- Inspect diffs, protect secrets, and commit deliberately.

The point is not to reproduce the course's exact result. It is to see what a modern coding agent can produce from the same one-line brief, using the course's practices, and to document where human direction still matters.

## What's inside

- A responsive single-page site: hero, tasting-pack offer, flavour collection, mineral comparison, testimonials, subscription, and footer.
- A sales offer below the hero: five 330 ml bottles for €10, connected to the pack counter.
- Five flavours driven by a single data module. Selecting one retints the page, the can, and the ambient canvas.
- A lightweight particle canvas with drifting droplets, mouse interaction, and flavour-reactive colour.
- Optional synthesized sound (Web Audio API) with no audio files.
- Accessible interactions: keyboard-navigable flavour tabs, visible focus states, and reduced-motion support.
- No framework and no build step: plain HTML, CSS, and JavaScript.

## Stack

| Layer | Choice |
| --- | --- |
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS with custom properties |
| Behaviour | Vanilla JavaScript (ES2020) |
| Graphics | Canvas 2D |
| Audio | Web Audio API |
| Dev server | [live-server](https://www.npmjs.com/package/live-server) |

## Project structure

```
dewdrop/
├── index.html              Page markup and section shells
├── css/
│   └── style.css           Theme, layout, components, responsive rules
├── js/
│   ├── flavors-data.js     Flavour, mineral, and testimonial data
│   ├── canvas-drops.js     Ambient droplet particle system
│   ├── sound.js            Synthesized droplet and UI sounds
│   └── main.js             Rendering, state, and interactions
├── package.json            Scripts and dev dependency
└── README.md
```

## Run it

```bash
npm install
npm start
```

`npm start` serves the site on [http://localhost:8000](http://localhost:8000) and reloads on change.

No Node.js is required to view the page. Any static server works:

```bash
python3 -m http.server 8000
```

Python's server does not auto-reload, which is why `live-server` is the default here.

## Experiment notes

The brief used to start the project:

> build a sleek, minimalist landing page for a flavoured mineral water company called DewDrop.

The build happened in two sessions:

1. The first session established the foundation: five detailed flavours, mineral comparison data, testimonial copy, the droplet canvas, and the Web Audio module. It stopped before producing the page itself, leaving only the assets and data.
2. The second session read the existing work, kept its direction, and finished the markup, styling, rendering, and interaction layer. It was verified in headless Chromium at desktop and mobile sizes, including flavour switching, pack counter, menu, sound toggle, and form behaviour.

That split is part of the experiment: an agent inheriting unfinished work must first understand what exists before adding to it.

The tasting-pack section also follows the course's first hands-on challenge: add a sales section offering five bottles for ten. The price is kept in euros to match the rest of the page.

## Ideas for a next iteration

- Add a real cart or checkout flow instead of the local pack counter.
- Move the content into a small data/API layer.
- Add automated tests for flavour selection and rendering.
- Replace the CSS can with product photography or 3D renders.
- Deploy as a static site.

## Attribution and disclaimer

- Course: [Codex & AI Coding Agents — Learn Agentic Coding](https://www.youtube.com/watch?v=ajfQWhGQGLE) by freeCodeCamp.org, taught by Tom Chant (Scrimba).
- This project is an independent learning experiment and is not affiliated with or endorsed by freeCodeCamp.org, Scrimba, or OpenAI.
- DewDrop is a fictional brand. All product names, tasting notes, mineral figures, testimonials, and award claims are invented for demonstration purposes.

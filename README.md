# djgam-frontend

Frontend for DJGAM, a light static site for the university event. Built with pure HTML, CSS and vanilla JavaScript using Tailwind CDN and canvas confetti for interaction.

The site includes a themed layout, image galleries from prior events and a smooth scroll experience without a build step.

## Why this exists

The event needed a fast, deployable landing page without a framework. This repo delivers a single page that can be hosted on any static host.

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
└── images
```

## Prerequisites

Any static server or just open `index.html` in a browser.

## Usage

```bash
git clone https://github.com/mastaan66/djgam-frontend.git
cd djgam-frontend
python3 -m http.server 8000
```

Open `http://localhost:8000`. No install step is required.

## Contributing

Issues and pull requests are welcome.

## License

MIT. See LICENSE.

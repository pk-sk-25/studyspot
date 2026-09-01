# StudySpot

A campus study-location tracker built for the Penn Spark Red Developer Technical Assessment.

## What it does

StudySpot lets students keep a personal list of good places to study on campus. You can add a spot with its name, location, noise level, and whether it has outlets; search and filter that list; and use a "Pick for me" button to randomly land on one of the spots that currently matches your filters. Everything is saved to the browser's `localStorage`, so your list is still there when you come back.

## Features included

- Study spots displayed as cards
- Add / edit / delete a study spot (via a modal form)
- Search by name or location
- Filter by noise level
- Filter for outlet availability
- "Pick for me" — randomly selects from the currently filtered spots
- Persistence via `localStorage`
- Responsive layout (desktop, tablet, mobile)
- "About this place" lookup on each card, pulling a short summary from Wikipedia's API for that location

Not included on purpose, to stay within the suggested time budget: user accounts/auth and a backend database. The assessment says not everything needs to be covered, and `localStorage` persistence covers the "save my data" need without a backend for a single-user tool like this.

## Time spent

~3 hours

## Tech stack

React 18 + Vite, plain CSS. No backend. One external API call (Wikipedia's REST summary endpoint) for the location lookup feature.

## Running it locally

\`\`\`bash
git clone https://github.com/pk-sk-25/studyspot.git
cd studyspot
npm install
npm run dev
\`\`\`

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Live deployment

Deployed at: https://neon-semifreddo-206668.netlify.app/

# Lendsqr Frontend Assessment Submission

## Candidate

Michael Ebube

## Project

Lendsqr frontend assessment admin console.

## App URL

https://michael-ebube-lendsqr-fe-test.vercel.app

## Source Code

Replace this with the public repository URL:

https://github.com/<your-github-username>/lendsqr-fe-test

## Loom Video

Replace this with the Loom video URL.

## Overview

I built a React and TypeScript implementation of the Lendsqr admin console assessment. The app includes the login screen, dashboard shell, users list, user filtering, user detail view, responsive navigation, and local persistence for selected user records.

## Approach and Technical Decisions

The project uses Vite because it provides a fast React development workflow with a simple production build. I used TypeScript to keep the user data structures, route data, and component props predictable while implementing the assessment requirements.

Styling is handled with SCSS so the interface can closely follow the supplied design with reusable variables, nested component styles, and responsive breakpoints. I used the provided SVG assets for dashboard statistics and sidebar navigation icons so the visual language stays close to the Lendsqr design.

The user list is powered by a local mock API service that returns deterministic mock records. This keeps the assessment self-contained while still satisfying the requirement to display a large users dataset. The user detail page stores the selected user in local storage before navigation, which supports the requirement for retrieving selected user details even when the detail page is refreshed.

The app uses React Router for the main application routes:

- `/login`
- `/dashboard`
- `/dashboard/users`
- `/dashboard/users/:userId`

## Design Review

I focused on matching the Lendsqr admin console structure: a fixed top navigation, left sidebar, user stats cards, searchable users table, status badges, row actions, and a detailed user profile layout. I used the original asset icons where available instead of replacing them with generic icon library equivalents, because the assessment design depends heavily on those icon shapes and colors.

Some small implementation decisions were made to keep the assessment stable and usable:

- The mock API is local and deterministic, so the app does not depend on a remote server.
- User details are cached in local storage so detail pages remain available after navigation or refresh.
- The layout includes responsive adjustments for tablet and mobile widths.
- Work Sans is loaded as the global font to match the requested typography.

## Testing

The project includes Vitest and React Testing Library tests for the mock API, local storage behavior, login page behavior, and users page behavior.

Useful commands:

```bash
npm install
npm run dev
npm run build
npm run test:run
```

## Submission Checklist

- Public repository named `lendsqr-fe-test`
- Deployed app URL using the required naming pattern
- Public documentation URL
- Loom video URL, no more than 3 minutes, with face visible while comparing the design and implementation
- Google Form submitted
- Email sent to `careers@lendsqr.com` notifying them of the submission

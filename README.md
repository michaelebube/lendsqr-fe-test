# Lendsqr Frontend Assessment

React, TypeScript, and SCSS implementation of the Lendsqr admin console assessment.

## Features

- Login page matching the Lendsqr assessment visual direction
- Dashboard shell with responsive sidebar and top navigation
- Users page backed by a deterministic mock API with 500 records
- User details page that stores and retrieves selected user details from local storage
- Positive and negative scenario tests with Vitest and React Testing Library

## Tech Choices

- **Vite + React + TypeScript** for a fast, typed frontend workflow.
- **SCSS** for modular styling, variables, and responsive layout control.
- **Local mock API service** to keep the assessment self-contained while still returning 500 user records.
- **Local storage cache** for the user details requirement and offline-friendly detail retrieval.

## Getting Started

```bash
npm install
npm run dev
```

## Useful Commands

```bash
npm run build
npm run test:run
npm run lint
```

## Routes

- `/login`
- `/dashboard`
- `/dashboard/users`
- `/dashboard/users/:userId`

## Deployment

Deploy the repository to a free host such as Vercel or Netlify and use a URL in this format:

```text
https://<candidate-name>-lendsqr-fe-test.<cloud-platform-domain>
```

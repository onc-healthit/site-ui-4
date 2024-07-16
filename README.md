# SITE UI 4.0

## Project Overview

- SITE and ETT are being combined into one streamlined website which will be known as SITE 4.0. The functionality will remain similar, however, the user experience will be greatly improved. In addition, the frontend (and to some extent the backend) tech stack will be updated and unified, offering security, maintainability, and performance enhancements
- The Standards Implementation & Testing Environment (SITE) is a centralized collection of testing tools and resources designed to assist health IT developers and health IT users fully evaluate specific technical standards and maximize the potential of their health IT implementations

## Readme

- This document is designed to help get a general understanding of the app, some of our processes, understand how to set it up and run it, and effectively develop the application as a cohesive team
- Whether major or minor (including typos), please edit this document as you see fit for the benefit of the team

## Development Process

- Please review the [Process document](https://github.com/onc-healthit/site-ett-docs/blob/main/site-ui-4-process.md)

## Stack

- Next.js 14
- React 18
- Typescript 5
- MUI 5
- CSS 3 (but mostly using React Styled Components)
- HTML 5
- Node.js 20

## Setup Requirements

- Install Node.js 20+ (latest LTS should work at this time)
  - Suggest installing and managing versions with FNM (Fast Node Manager)

## Installation

- Clone the repo
- Open in Visual Studio Code (preferred) or software of your choice
- Use npm to install dependencies
  - `npm install`
- Use npm to run the development server
  - `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to view the application

## Branches

- main
  - This is the main branch on the project from which releases are made. Do not ever commit directly to this branch. The only time code should make its way to this branch is via a PR from dev
- dev
  - This is the main development branch. We should strive to merge as often as possible to this branch (and pull as often as possible locally) to ensure minimal major merge conflicts
  - In general we should create a PR to this branch but direct commits are also not out of the question. Especially if it's something minor, that way, we meet the first point
  - Due to the small size of the team, forks are not required. Instead, we will make feature branches, or, alternate dev branches, on this remote repo. This will make it easier for us to share and work together simultaneously on code that is in progress. When you are ready to work, please create a branch off of dev, and label it like this
    - Feature Branches
      - firstName-branchDerivedFrom-feature
        - e.g.
          - dan-dev-nav
    - Alternate dev Branches
      - firstName-branchDerivedFrom
        - e.g.
          - dan-dev
    - Note
      - In rare situations, branching off of something other than dev may be helpful, hence the option, but, I can't imagine any reason why we should ever branch off of main for this project until it goes to true production

## Environment Vars and Environment Management

- TODO

## Coding Style

- Setup prettier, eslint for code formatting in VS Code(only works with VS Code). ( \*\*Note: The config setup has been completed, steps can be referenced from here https://www.franciscomoretti.com/blog/how-to-set-up-prettier-and-eslint-in-vs-code-for-next-js)
  - Install ESLint VS Code Extension on VS Code
  - Install Prettier VS Code Extension on VS Code
  - Note: .prettierrc config file needs to exist in the repo for the formatting to work.
- For now:

  - Do

    - Keep line widths reasonable
      - In general 2 files should be able to be read vertically on one (hi-res) monitor. Obviously this is vague, we will implement this via an automated style guide pushed to this repo
    - Use types most of the time
    - Use camelCase most of the time
    - Use `const` when possible
    - Use functional React components
    - Use Next.js app routing
    - Make function names highly descriptive of what they do
    - Extract reusable code into functions as much as possible
    - If code becomes too long, for clarity, extract it into separate functions, even if not reusable
    - Be consistent

  - Avoid
    - Semicolons unless required for the code to work as intended
    - `var` unless for some reason you need that level of scope, use `let` instead
    - Class based React components
    - Next.js pages routing

## Commits

- Commits should
  - Start with a capital letter
  - Be brief yet descriptive of the update
  - Be written in present-tense
- Examples taken from the first few commits to this repo:
  - Reduce page and globals to basics
  - Add create-next-app@latest default
  - Update readme to default Next.js
- See the [Commits section in our process](https://github.com/onc-healthit/site-ett-docs/blob/main/site-ui-4-process.md#commits) for more info

## Troubleshooting

- TODO

---

## Next.js Default Info

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## E2E tests

1. Run npm install
2. Update cypress/config/cypress.config.dev.ts with credentials- When login functionality is implemented. Not needed now.
3. Run npm run test which will open cypress window -> choose E2E testing -> Choose browser to run the tests against -> choose test files to run. This will use dev config file.
4. Running test through cmd, npm run test:dev. This will use electron headless browser to run the tests.

## Component tests

1. Run npx cypress open which will open cypress window -> choose Component Testing -> Choose browser to run the tests against -> choose test files to run.

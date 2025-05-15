# For The Record Code Test - James Allan

This is my approach to complete the Fibonacci Frequency Code test for For the Record.

It's a browser-based web application built with HTML, CSS, and TypeScript. It runs entirely in the browser, with no backend dependencies. The app features interactive UI components, timed behaviours, and modular TypeScript code with unit tests powered by Jest.

<p align="center">
<img width="400" alt="Screenshot 2025-05-15 at 8 38 51 pm" src="https://github.com/user-attachments/assets/818fd240-a944-4493-b4c7-6cc4202322c2" />
</p>

## Getting Started

Follow these steps to build and run the project locally.

### Prerequisites

**This project uses Node.js v18+.** If you don’t already have Node or NVM (Node Version Manager) installed:

1. Install Node (recommended: version v22.15.1).
2. Optionally install NVM to manage Node versions: https://github.com/nvm-sh/nvm

Then, if you have NVM installed:

```bash
nvm install & nvm use
```

### Installation
Install dependencies:

```bash
npm install
```

### Available Scripts

- **Build the project** - Compiles the TypeScript source files to JavaScript:
   - `npm run build`
- **Start a local server** - Serves the project files locally:
   - `npm run serve`
- **Execute tests**:
  - `npm test`
- **Run build, serve, and tests together** - Builds the project, starts the server in the background, and runs the test suite:
  - `npm run start:all`

### Project Structure

```
├── index.html
├── styles.css
├── main.ts
├── src/
│   ├── app.ts
│   ├── ...
├── dist/         # Compiled JS output
├── __tests__/    # Unit tests
├── tsconfig.json
├── package.json
```

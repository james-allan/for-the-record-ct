# For The Record Code Test - James Allan

This is my approach to the Fibonacci Frequency Code test for **For the Record**.

It's a browser-based web application built with HTML, CSS, and TypeScript. It runs entirely in the browser, with no backend dependencies. The app features interactive UI components, timed behaviours, and modular TypeScript code with unit tests powered by Jest.

| <img width="697" alt="Screenshot 2025-05-16 at 12 33 34 am" src="https://github.com/user-attachments/assets/e987e9b3-7409-4457-9735-6fac789781c3" />  | <img width="691" alt="Screenshot 2025-05-16 at 12 49 34 am" src="https://github.com/user-attachments/assets/dd3be34e-19f1-4be5-8119-959939c89e84" /> |
| ------------- | ------------- |

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

- **Build the project** - Compiles the TypeScript and Tailwind source files:
   - `npm run build`
- **Build the CSS files:** - Compliles Tailwind source files:
   - `npm run build:css`
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

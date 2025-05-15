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
 

### Testing Intructions

1. Clone this repository
    - `git clone https://github.com/james-allan/for-the-record-ct.git`
3. Navigate to the root directory of this repository
    - `cd for-the-record-ct`
5. (Optional) Use Node.js v18+
    - _If you're using nvm, run:_ `nvm install & nvm use` 
7. Install dependencies
    - Run `npm install`
9. Build, test, and serve the app
    - Run `npm run start:all`
    - This command will build, run the test suite and start a local server you can test on.
11. Go to `http://localhost:<port>`. The port will depend on where serve started the server.

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

---

## Part 2 Questions

### Question 1

> You have a new requirement to implement for your application: its logic should stay
exactly the same but it will need to have a different user interface (e.g. if you wrote a
web app, a different UI may be a REPL).
> 
> Please describe how you would go about implementing this new UI in your application?
Would you need to restructure your solution in any way?

My current approach is structured in a way to separate between the UI layer and the core logic. The logic for processing input and generating output is in TypeScript files like app.ts, while UI interactions (like reading from an input field, updating the DOM) are handled in separate modules like input.ts.

Because of this separation, if I needed to implement a new UI I wouldn't need to change the core logic at all.

Instead, I would:

1. Reuse app.ts exactly as is, since it contains the core processing logic.
2. Replace or add a new interface module that:
3. Reads input from a different source (eg a new input.ts could be built to read from a inputs file or command line).
4. Sends that input to the core logic in app.ts.
5. Outputs the result to a new target (eg a new `output.ts`)

This modular and separation of concerns allows the same logic to power different UIs. For example a Node.js script could read input from a file, call the core logic function from app.ts, and write the output to another file.

If the application were initially more tightly coupled, like if the DOM logic and app logic were mixed in a single file, I would need to refactor the processing logic and UI layer. However, in my current design, that refactor is already done.

### Question 2

> You now need to make your application “production ready” , and deploy it so that it can
be used by customers.
> 
> Please describe the steps you’d need to take for this to happen.

To get the application ready for production, there would be a bunch of different things I would consider. 

**Preparing for Production**

- **Accessibility** - my approach so far I haven't strongly considered accessibility. Making sure I'm following best practices with accessibility standards to ensure app is usable by all users.
- Add more robust error handling to catch runtime issues and provide feedback to users.
- Implement remote error reporting (like Sentry) to keep track of errors users are encountering.
- Implement analytics to track usage.
- Update my build script to compile a build package which only contains essential assets.
- Make the page more responsive to ensure it works on different device sizes. I've used Tailwind so far so that should be fairly straight forward. 
- Ensure user features like darkmode are supported. Again Tailwind should assist here.
- Consider adding contact details and an about information so users can get in contact etc.
- Write documentation and instructions for users on how to use the app. 

**Add Persistent User State**
If maintaining user state across sessions was something we would like to introduce, a form of client-side or server-side storage depending on the requirement would be needed. Given the current app's simplicity, local client-side storage would be lightweight and the simple apporach, however to get persistent user state accross devices you'd need to consider a more robust server-side storage with user log in etc. 

**Hosting Setup**
Since the app, in it's current state, is a static site (HTML + JS + CSS), it can be deployed to a platform like: Netlify, Vercel, or even GitHub Pages for automatic CI/CD.

Steps would include:
1. Pushing the build folder to the host.
2. Setting up a custom domain if required.

**Deployment**

I'd setup a CI/CD pipeline (eg GitHub Actions) to automate:

1. Building the app
2. Running tests
3. Depending on the my deployment preferences, deploy to the site on push to main/production branch or GitHub action run.


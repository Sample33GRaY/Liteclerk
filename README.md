# LiteclerkWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Node version v22.21.1

```bash
nvm use 22
```

Install angular cli

```bash
npm install -g @angular/cli
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Local AI Chat

This project can show a floating chatbox that runs locally through [Ollama](https://ollama.com/). It does not require a paid OpenAI API key.

1. Install Ollama.
2. Pull a model, for example:

```bash
ollama pull llama3.2:3b
```

3. Make sure Ollama is running on `http://127.0.0.1:11434`.
4. Start the app with `ng serve`.

The app proxies chat messages through `POST /api/chat`, so the browser never talks directly to an external AI service. You can change the model by setting `OLLAMA_MODEL` before starting the server.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Node version v22.21.1

```bash
nvm use 22
```



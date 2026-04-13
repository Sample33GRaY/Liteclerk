import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const ollamaModel = process.env['OLLAMA_MODEL'] || 'llama3.2:3b';
const ollamaEndpoint = process.env['OLLAMA_ENDPOINT'] || 'http://127.0.0.1:11434/api/chat';
const chatSystemPrompt = [
  'You are the Liteclerk website assistant.',
  'Answer briefly, clearly, and helpfully.',
  'Focus on Liteclerk products, services, partners, and contact options.',
  'If a question is outside the website context, say you can only help with Liteclerk information.',
].join(' ');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const incomingMessages = Array.isArray(req.body?.messages) ? req.body.messages : null;
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!incomingMessages && !message) {
    res.status(400).json({ message: 'Message is required.' });
    return;
  }

  try {
    const sanitizedIncomingMessages = incomingMessages
      ? incomingMessages
          .filter(
            (entry: unknown) =>
              entry &&
              typeof entry === 'object' &&
              'role' in entry &&
              'content' in entry &&
              (entry as { role?: unknown; content?: unknown }).role &&
              (entry as { role?: unknown; content?: unknown }).content,
          )
          .map((entry: { role: string; content: string }) => ({
            role: entry.role === 'assistant' ? 'assistant' : entry.role === 'system' ? 'system' : 'user',
            content: String(entry.content),
          }))
      : null;

    const messages = sanitizedIncomingMessages
      ? sanitizedIncomingMessages[0]?.role === 'system'
        ? sanitizedIncomingMessages
        : [{ role: 'system', content: chatSystemPrompt }, ...sanitizedIncomingMessages]
      : [
          { role: 'system', content: chatSystemPrompt },
          ...history
            .filter(
              (entry: unknown) =>
                entry &&
                typeof entry === 'object' &&
                'role' in entry &&
                'content' in entry &&
                (entry as { role?: unknown; content?: unknown }).role &&
                (entry as { role?: unknown; content?: unknown }).content,
            )
            .slice(-12)
            .map((entry: { role: string; content: string }) => ({
              role: entry.role === 'assistant' ? 'assistant' : 'user',
              content: String(entry.content),
            })),
          { role: 'user', content: message },
        ];

    const response = await fetch(ollamaEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        messages,
      }),
    });

    if (!response.ok) {
      res.status(502).json({
        message: `Unable to reach the local model at ${ollamaEndpoint}. Start Ollama and pull ${ollamaModel}.`,
      });
      return;
    }

    const payload = (await response.json()) as {
      message?: { content?: string };
    };

    res.json({
      reply: payload.message?.content?.trim() || 'No reply was returned by the local model.',
    });
  } catch {
    res.status(502).json({
      message: `Local chat is unavailable. Start Ollama and make sure ${ollamaModel} is installed.`,
    });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

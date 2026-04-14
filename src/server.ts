import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const ollamaModel = process.env['OLLAMA_MODEL'] || 'llama3.2:3b';
const ollamaEndpoint = process.env['OLLAMA_ENDPOINT'] || 'http://127.0.0.1:11434/api/chat';
const chatSystemPrompt = [
  'You are the Liteclerk website assistant.',
  'Answer briefly, clearly, and helpfully.',
  'Focus on Liteclerk products, services, partners, and contact options.',
  'If a question is outside the website context, say you can only help with Liteclerk information.',
].join(' ');

const angularAppEngine = new AngularAppEngine();

async function handleChatRequest(request: Request): Promise<Response> {
  const body = await request.json().catch(() => ({}));
  const incomingMessages = Array.isArray(body?.messages) ? body.messages : null;
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const history = Array.isArray(body?.history) ? body.history : [];

  if (!incomingMessages && !message) {
    return new Response(JSON.stringify({ message: 'Message is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
      return new Response(
        JSON.stringify({
          message: `Unable to reach the local model at ${ollamaEndpoint}. Start Ollama and pull ${ollamaModel}.`,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const payload = (await response.json()) as {
      message?: { content?: string };
    };

    return new Response(
      JSON.stringify({
        reply: payload.message?.content?.trim() || 'No reply was returned by the local model.',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({
        message: `Local chat is unavailable. Start Ollama and make sure ${ollamaModel} is installed.`,
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Handle the /api/chat endpoint
  if (request.method === 'POST' && new URL(request.url, 'http://localhost').pathname === '/api/chat') {
    return handleChatRequest(request);
  }

  // Handle all other requests with Angular
  const response = await angularAppEngine.handle(request, context);
  return response || new Response('Not found', { status: 404 });
}

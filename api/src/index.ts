import { Hono } from 'hono';
import { register, login, refresh, session } from './handlers/auth.handler';
import { session_middleware } from './middlewares';
import { serve } from 'bun';
import { cors } from 'hono/cors';

const app = new Hono({});
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: [
      'X-Custom-Header',
      'Upgrade-Insecure-Requests',
      'Content-Type',
    ],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PATCH'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    credentials: true,
  })
);
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// public routes
app.post('/register', register);
app.post('/login', login);
app.post('/refresh', refresh);

// routes which require authentication (middleware)
// app.use('/session', session_middleware);
app.get('/session', session_middleware, session);

serve({
  port: 8070,
  fetch: app.fetch,
});

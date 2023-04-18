import debug from 'debug';
import supertest from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

import { close } from '../boilerplate/db/index.js';

import app from '../src/app.js'; // Link to server setup

const testlog = debug('testlog');
// Inspiration from:
// https://zellwk.com/blog/endpoint-testing/

describe('test REST Service', () => {
  let request = null;

  beforeAll(() => {
    testlog('before all tests: start server');
    request = supertest.agent(app);
  });

  afterAll(async () => {
    testlog('after all tests: close server');
    await close();
  });

  it('Gets the types endpoint', async () => {
    const res = await request.get('/test');
    expect(res.status).toBe(200);
    expect(res.body).toContainEqual({ test: 'It works' });
  });
});

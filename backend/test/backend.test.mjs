import { expect, afterAll, test, describe } from 'vitest';
import fetch from 'node-fetch';
import app from '../src/index.js';

afterAll(() => app.close());

describe("Backed tests", () => {
    test('GET / responds with Hello World!', async () => {
        const response = await fetch('http://localhost:3001/');
        expect(response.ok).toBe(true);
        const text = await response.text();
        expect(text).toContain('<h1>hahaha</h1>');
    });
});
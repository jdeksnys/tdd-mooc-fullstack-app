import { expect, afterAll, test, describe } from 'vitest';
import fetch from 'node-fetch';
import app from '../src/index.js';

afterAll(() => app.close());

describe("Backend tests", () => {
    test('get all todo items', async () => {
        const response = await fetch('http://localhost:3001/');
        expect(response.ok).toBe(true);
        let data = await response.json();
        expect(data[0].value).to.equal("do the laundry");
        expect(data[0].important).to.equal(false);
    });
});
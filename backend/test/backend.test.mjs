import { expect, afterAll, test, describe } from 'vitest';
import fetch from 'node-fetch';
import app from '../src/index.js';
import axios from "axios";

afterAll(() => app.close());

describe("Backend tests", () => {
    test('get all todo items', async () => {
        const response = await fetch('http://localhost:3001/items');
        expect(response.ok).toBe(true);
        let data = await response.json();
        expect(data[0].value).to.equal("do the laundry");
        expect(data[0].important).to.equal(false);
    });

    test('get todo items by ok id', async () => {
        const response = await fetch("http://localhost:3001/items?id=1");
        expect(response.ok).toBe(true);
        let data = await response.json();
        console.log(data);
        expect(data.length).to.equal(1);
        expect(data[0].value).to.equal("do the laundry");
        expect(data[0].important).to.equal(false);
    });

    test('get todo items by bad id', async () => {
        const response = await fetch(`http://localhost:3001/items?id=99`);
        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
    });
});
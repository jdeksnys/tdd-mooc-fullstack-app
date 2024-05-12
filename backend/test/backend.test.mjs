import { expect, afterAll, test, describe, afterEach } from 'vitest';
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
        expect(data.length).to.equal(1);
        expect(data[0].value).to.equal("do the laundry");
        expect(data[0].important).to.equal(false);
    });

    test('get todo items by bad id', async () => {
        const response = await fetch(`http://localhost:3001/items?id=99`);
        expect(response.ok).toBe(false);
        expect(response.status).toBe(404);
    });


    test('add todo item', async () => {
        let item = {id:null, value:"exam prep", important:true};
        const url = 'http://localhost:3001/items';
        const response = await axios.post(url, item);
        
        expect(response.status).to.equal(200);
        const response2 = await fetch('http://localhost:3001/items');
        expect(response2.ok).toBe(true);
        let data = await response2.json();
        expect(data[data.length-1].value).to.equal("exam prep");
        expect(data[data.length-1].important).to.equal(true);
    });

    test('try add todo empty item', async () => {
        let item = {id:null, value:"", important:true};
        const url = 'http://localhost:3001/items';
        const response = await axios.post(url, item);
        expect(response.status).to.equal(200);
        
        const response2 = await fetch('http://localhost:3001/items');
        expect(response2.ok).toBe(true);
        let data = await response2.json();
        expect(data[data.length-1].value).to.equal("exam prep");
        expect(data[data.length-1].important).to.equal(true);
    });

    test('delete item', async () => {
        const url = 'http://localhost:3001/delete';
        const response = await axios.post(url, {id:1});
        expect(response.status).to.equal(200);
        console.log(response.data.message);
        expect(response.data.message).to.equal("id=1 deleted");
        
        const response2 = await fetch('http://localhost:3001/items');
        expect(response2.ok).toBe(true);
        let data = await response2.json();
        expect(data[0].value).to.equal("finish homework");
        expect(data[0].important).to.equal(true);
    });
});
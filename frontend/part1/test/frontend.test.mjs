import { expect, afterAll, test, describe, afterEach, page, it, vi, afterEach, spyOn } from 'vitest';
const { exec } = require('child_process');
import "../src/requests.js"

describe("Frontend tests", () => {
    test("example", async () => {
        expect(1).to.equal(1);
    });   
});



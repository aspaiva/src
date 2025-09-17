const { test, expect } = require('@jest/globals');
const Server = require('./server');
const request = require('supertest');

const apiMock = jest.fn((app, repository) => true);

test('Server starts and responds to /', async () => {
    await Server.startServer(apiMock);
    const response = await request('http://localhost:3000').get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is running');
    await Server.stopServer();
});

test('Server handles errors', async () => {
    await Server.startServer(apiMock);
    const response = await request('http://localhost:3000').get('/nonexistent');
    expect(response.status).toBe(404); // Not Found for nonexistent route
    await Server.stopServer();
}); 

test('Server stops correctly', async () => {
    // await Server.startServer(apiMock);
    const result = await Server.stopServer();
    expect(result).toBeTruthy();
});
const db = require('./database.js');
const { test, expect } = require('@jest/globals');

test('Database connection positive', async () => {
    const cliente = await db.connect();
    expect(cliente).toBeDefined();
});

test('Database connection error', async () => {
    const cliente = await db.connect('invalid_connection_string', 'invalid_db_name');
    // Quando não acha o db_name conecta no db test padrão do mongodb
    expect(cliente.dbName).not.toBe('test');
});

test('Close database connection', async () => {
    const cliente = await db.connect();
    const result = await db.closeConnection(cliente);
    expect(result).toBeTruthy();
});

test('Close database connection failure', async () => {
    const result = await db.closeConnection(null);
    expect(result).toBeTruthy();
});

// test('Database connection positive', async () => {
//     const cliente = await db.connect();
//     expect(cliente).toBeDefined();
//     db.closeConnection(cliente);
// });

// test('Close database connection', async () => {
//     const cliente = await db.connect();
//     const result = await db.closeConnection(cliente);
//     expect(result).toBeTruthy();
// });

// test('Close database connection null client', async () => {
//     const result = await db.closeConnection(null);
//     expect(result).toBeTruthy();
// });
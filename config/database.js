const { MongoClient } = require('mongodb');

let client = null;

async function connect(pdbConnectionString, pdbName) {
    pdbConnectionString = pdbConnectionString || process.env.DB_CONNECTION;
    pdbName = pdbName || process.env.DB_NAME;
    
    console.log('parm dbConnectionString:', pdbConnectionString);

    try {
        if (!client) {
            console.log('Creating new MongoClient instance');
            client = new MongoClient(pdbConnectionString);
        }
    
        await client.connect();
        console.log('Connected to database');

        return client.db(pdbName);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return null;
    }
}

async function closeConnection(pConnection) {
    if (!pConnection) {
        return true;
    }

    await pConnection.client.close();
    pConnection = null;
    return true;
}

module.exports = { connect, closeConnection };
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

let theServer = null;

async function startServer(api, repository) {
    const app = express();

    // Middleware
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(express.json());  // For parsing application/json and body-parser is deprecated

    // Simple route for testing
    app.get('/', (req, res) => {
        res.send('Server is running');
    });
    
    // api == movies.js (no primeiro exemplo, mas pode variar conforme o microsserviço)
    // todo ms que vai precisar receber (app, repository) na entrada para manter a sintaxe
    // e a variavel app indica a instancia do express a ser usada, criada logo acima
    // repository é a interface de acesso a dados, que pode variar conforme o microsserviço
    api(app, repository); 

    const PORT = process.env.PORT || 3000;
    theServer = app.listen(PORT, () => {
        console.log(`Server ${process.env.MICROSSERVICE_NAME} running on port ${PORT}`);
    });

    // Middleware for error handling
    app.use((err, req, res, next) => {
        // console.error(err.stack); 
        console.error(err);
        res.status(500).send('Something broke!');
        // res.sendStatus(500);
    });

    return app;
}

async function stopServer() {
    if (theServer) {
        await theServer.close();
    }
    return true;
}

module.exports = {
    startServer,
    stopServer
};

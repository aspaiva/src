const server = require('./server/server');
const api = require('./api/cinemaCatalog');
const repo = require('./repository/repository');

( async () => {
    try {
        await server.startServer(api, repo);
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit with failure 
    }   
})();
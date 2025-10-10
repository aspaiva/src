const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistema_loja', 'root', 'senha123', {
    host: '127.0.0.1',
    dialect: 'mysql'
}); 

module.exports = {
    sequelize
}


const Sequelize = require('sequelize');
const db = require('../db');

const Fabricante = db.sequelize.define('fabricantes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "O nome do fabricante não pode ser vazio",
            },
            len: {
                args: [5, 100], 
                msg: "O nome do fabricante deve ter entre 5 e 100 caracteres",
            },
        },  
    }
});

module.exports = Fabricante;
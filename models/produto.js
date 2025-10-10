const Sequelize = require('sequelize');
const db = require('../db');
const fabricante = require('./fabricante');

const Produto = db.sequelize.define('produtos', {
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
                msg: "O nome do produto não pode ser vazio",
            },
            len: {
                args: [10, 100],
                msg: "O nome do produto deve ter entre 10 e 100 caracteres",
            },
        },
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {
                msg: "O preço deve ser um número decimal válido",
            },
            min: {
                args: [0],
                msg: "O preço não pode ser negativo",
            },
        },
    }
});

Produto.belongsTo(fabricante, {
    foreignKey: 'fabricanteId',
    as: 'fabricante',
    constraint: true,
    onDelete: 'CASCADE'
});

module.exports = Produto;
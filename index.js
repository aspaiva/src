(async () => {
    const database = require('./db');
    const Produto = require('./models/produto');
    try {
        await database.sequelize.sync(); // usar { force: true } somente quando quiser recriar as tabelas
        console.log("Banco de dados sincronizado com sucesso.");

        // Exemplo de criação de um fabricante
        const Fabricante = require('./models/fabricante');
        const novoFabricante = await Fabricante.create({ nome: 'Fabricante Exemplo 1' });
        console.log("Fabricante criado:", novoFabricante.toJSON());

        // Exemplo de criação de um produto associado ao fabricante
        const novoProduto = await Produto.create({ 
            nome: 'Produto Exemplo 1', 
            preco: 99.99,
            fabricanteId: novoFabricante.id // Associando ao fabricante criado
        });
        console.log("Produto criado:", novoProduto.toJSON());

    } catch (error) {
        console.error("Erro ao sincronizar o banco de dados:", error);
    }
})();

//Criando a tabela e definindo as caracteristicas das colunas
exports.up = function (knex) {
    return knex.schema.createTable('pessoas', function (table) {
        table.increments();
        table.string('nome').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable();
    })
};
//Função rollback para desfazer as alterações
exports.down = function (knex) {
    return knex.schema.dropTable('pessoas');
};

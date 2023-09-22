exports.up = knex => {
    return knex.schema.raw('CREATE SCHEMA journal_mac')
};

exports.down = knex => {
    return knex.schema.dropSchema('journal_mac', true)
};
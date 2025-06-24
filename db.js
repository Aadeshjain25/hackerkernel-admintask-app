const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'aadesh200425',
        database: 'hackerkernel_adminapp'
    }
})

Model.knex(knex);
module.exports = knex;
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('status', (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('status')
  }
}

module.exports = StatusSchema

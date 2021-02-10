'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTypeSchema extends Schema {
  up () {
    this.create('user_types', (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('type').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_types')
  }
}

module.exports = UserTypeSchema

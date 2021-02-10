'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.integer('credits').unsigned().defaultTo(0)
      table.string('avatar_url')
      table.string('type_id').notNullable().references('id').inTable('user_types')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

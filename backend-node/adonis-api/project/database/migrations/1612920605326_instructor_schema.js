'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorSchema extends Schema {
  up () {
    this.create('instructors', (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('user_id').notNullable().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('instructors')
  }
}

module.exports = InstructorSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchedulesSchema extends Schema {
  up () {
    this.create('schedules', (table) => {
      table.string('id').primary().notNullable().unique()
      table.date('date').notNullable()
      table.string('status_id').notNullable().references('id').inTable('status')
      table.string('user_id').notNullable().references('id').inTable('users')
      table.string('instructor_id').notNullable().references('id').inTable('instructors')
      table.timestamps()
    })
  }

  down () {
    this.drop('schedules')
  }
}

module.exports = SchedulesSchema

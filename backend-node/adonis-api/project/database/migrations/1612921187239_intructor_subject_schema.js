'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IntructorSubjectSchema extends Schema {
  up () {
    this.create('intructor_subjects', (table) => {
      table.string('subject_id').notNullable().references('id').inTable('subjects')
      table.string('instructor_id').notNullable().references('id').inTable('instructors')
      table.primary(['subject_id','instructor_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('intructor_subjects')
  }
}

module.exports = IntructorSubjectSchema

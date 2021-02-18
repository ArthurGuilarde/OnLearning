'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorSubjectSchema extends Schema {
  up () {
    this.create('instructor_subjects', (table) => {
      table.string('subject_id').notNullable().references('id').inTable('subjects')
      table.string('instructor_id').notNullable().references('id').inTable('instructors')
      table.primary(['subject_id','instructor_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('instructor_subjects')
  }
}

module.exports = InstructorSubjectSchema

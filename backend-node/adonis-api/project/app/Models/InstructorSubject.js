'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InstructorSubject extends Model {

  Instructor() {
    return this.belongsTo('App/Models/Instructor', 'instructor_id', 'id');
  }

  Subject() {
    return this.hasMany('App/Models/Subject', 'subject_id', 'id');
  }
}

module.exports = InstructorSubject

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class IntructorSubject extends Model {

  Instructor() {
    return this.belongsTo('App/Models/Instructor', 'instructor_id', 'id').with('Instructor');
  }
}

module.exports = IntructorSubject

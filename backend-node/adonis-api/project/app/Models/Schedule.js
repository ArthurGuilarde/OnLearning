'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  static get incrementing () {
    return false
  }

  static get dates () {
    return super.dates.concat(['date'])
  }

  User() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  Instructor() {
    return this.manyThrough(
      'App/Models/Instructor',
      'User',
      'instructor_id',
      'id'
    )
  }

  Subject() {
    return this.manyThrough(
      'App/Models/InstructorSubject',
      'Subject',
      'instructor_id',
      'instructor_id',
    )
  }


  Status() {
    return this.belongsTo('App/Models/Status', 'status_id', 'id');
  }

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')
  }
}

module.exports = Schedule

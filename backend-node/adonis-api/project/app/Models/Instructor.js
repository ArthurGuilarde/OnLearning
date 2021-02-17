'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instructor extends Model {
  static get incrementing () {
    return false
  }

  Instructor() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')
  }
}

module.exports = Instructor

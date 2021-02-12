'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
  static get incrementing () {
    return false
  }

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')
  }
}

module.exports = Schedule

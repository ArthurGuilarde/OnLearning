'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {
  static get incrementing () {
    return false
  }

  static get table () {
    return 'status'
  }

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')
  }
}

module.exports = Status

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Product extends Model {
  static get incrementing () {
    return false
  }

  static get computed () {
    return ['url']
  }

  getUrl () {
    if (this.avatar_url){
      return `${Env.get('APP_URL')}/avatar/image/${this.avatar_url}`
    }
  }
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')
  }
}

module.exports = Product

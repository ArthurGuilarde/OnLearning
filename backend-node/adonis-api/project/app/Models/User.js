'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Env = use('Env')
const uuid = use('uuid')

class User extends Model {

  static get hidden () {
    return ['password']
  }

  static get incrementing () {
    return false
  }

  relationWithType () {
    return this.belongsTo('App/Models/UserType', 'type_id', 'id');
  }

  static get computed () {
    return ['url']
  }

  getUrl () {
    return `${Env.get('APP_URL')}/avatar/image/${this.avatar_url}`
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('beforeCreate', 'GeneratorIdHook.generate')

  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User

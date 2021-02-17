'use strict'

/*
|--------------------------------------------------------------------------
| UserTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
/** @type {import('@adonisjs/lucid/src/Database')} */
const Factory = use('Factory')
const Database = use('Database')
const UserType = use('App/Models/UserType')

class UserTypeSeeder {
  async run () {
    await UserType.createMany([
      {
      type:'Student'
      },
      {
        type:'Teacher'
      }
    ])
  }
}

module.exports = UserTypeSeeder

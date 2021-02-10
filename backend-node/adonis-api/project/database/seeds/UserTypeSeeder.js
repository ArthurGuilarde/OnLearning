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
const uuid = use('uuid')

class UserTypeSeeder {
  async run () {
    await UserType.createMany([
      {
      id:uuid.v4(),
      type:'Student'
      },
      {
        id:uuid.v4(),
        type:'Teacher'
      }
    ])
  }
}

module.exports = UserTypeSeeder

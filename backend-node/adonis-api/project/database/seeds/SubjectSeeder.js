'use strict'

/*
|--------------------------------------------------------------------------
| SubjectSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Subject = use('App/Models/Subject')

class SubjectSeeder {
  async run () {
    await Subject.createMany([
      {
        name: 'English'
      },
      {
        name: 'Spanish'
      },
      {
        name: 'French'
      },
      {
        name: 'Math'
      },
      {
        name: 'History'
      },
    ])
  }
}

module.exports = SubjectSeeder

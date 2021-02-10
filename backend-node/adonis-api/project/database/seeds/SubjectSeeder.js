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
const uuid = use('uuid')

class SubjectSeeder {
  async run () {
    await Subject.createMany([
      {
        id: uuid.v4(),
        name: 'English'
      },
      {
        id: uuid.v4(),
        name: 'Spanish'
      },
      {
        id: uuid.v4(),
        name: 'French'
      },
      {
        id: uuid.v4(),
        name: 'Math'
      },
      {
        id: uuid.v4(),
        name: 'History'
      },
    ])
  }
}

module.exports = SubjectSeeder

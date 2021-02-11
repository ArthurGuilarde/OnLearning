'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Status = use('App/Models/Status')
const uuid = use('uuid')

class StatusSeeder {
  async run () {
    await Status.createMany([
      {
        id: uuid.v4(),
        name: 'Pendente'
      },
      {
        id: uuid.v4(),
        name: 'Concluido'
      },
      {
        id: uuid.v4(),
        name: 'Cancelado'
      },
    ])
  }
}

module.exports = StatusSeeder

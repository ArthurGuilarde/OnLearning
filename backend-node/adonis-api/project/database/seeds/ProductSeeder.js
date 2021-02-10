'use strict'

/*
|--------------------------------------------------------------------------
| ProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database =use('Database')
const Product = use('App/Models/Product')
const uuid = use('uuid')

class ProductSeeder {
  async run () {
    await Product.createMany([
      {
        id: uuid.v4(),
        title:'Pacote Iniciante',
        description:'Pacote com 4 créditos',
        price:16000,
        credits:4
      },
      {
        id: uuid.v4(),
        title:'Pacote Intermediário',
        description:'Pacote com 8 créditos',
        price:31000,
        credits:8
      },
      {
        id: uuid.v4(),
        title:'Pacote Avançado',
        description:'Pacote com 12 créditos',
        price:45000,
        credits:12
      },
    ])
  }
}

module.exports = ProductSeeder

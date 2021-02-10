'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.string('id').primary().notNullable().unique()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('price').unsigned().notNullable()
      table.integer('credits').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
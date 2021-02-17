'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/login', 'SessionController.create').as('login.create')
Route.get('/products', 'ProductController.index').as('products.index')
Route.post('/users', 'UserController.store').as('users.store')

Route.group(() => {
  Route.resource('instructors', 'InstructorController').apiOnly().except('store')
  Route.resource('users', 'UserController').apiOnly().except('store')
  Route.resource('schedules', 'ScheduleController').apiOnly()
  Route.resource('subjects', 'SubjectController').apiOnly()
}).middleware('auth')

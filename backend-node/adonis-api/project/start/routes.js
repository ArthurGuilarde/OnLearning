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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('instructors', 'InstructorController').apiOnly()
  Route.resource('schedules', 'ScheduleController').apiOnly()
  Route.resource('status', 'StatusController').apiOnly()
  Route.resource('subjects', 'SubjectController').apiOnly()
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('uTypes', 'UserTypeController').apiOnly()
}).middleware('auth')

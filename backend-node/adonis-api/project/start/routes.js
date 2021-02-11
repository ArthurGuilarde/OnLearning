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

Route.get('/login', 'SessionController.index')
Route.get('/products', 'ProductController.index')
Route.get('/status', 'StatusController.index')
Route.get('/uTypes', 'UserTypeController.index')
Route.post('/users', 'UserController.store')

Route.group(() => {
  Route.resource('instructors', 'InstructorController').apiOnly()
  Route.resource('users', 'UserController').apiOnly().except('store')
  Route.resource('schedules', 'ScheduleController').apiOnly()
  Route.resource('subjects', 'SubjectController').apiOnly()
}).middleware('auth')

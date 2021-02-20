'use strict'

const User = use('App/Models/User')
const UserType = use('App/Models/UserType')
const Instructor = use('App/Models/Instructor')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }


  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'email',
      'password',
      'name',
      'last_name',
      'type'
    ])

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response.status(401)
      .send({'error': 'User already exists.'})
    }

    const userType = await UserType.findBy('type', data.type)

    if (!userType) {
      return response.status(401)
      .send({'error': 'UserType not found.'})
    }

    delete data.type
    data.type_id = userType.id

    const user = await User.create(data)

    if (userType.type === 'Teacher') {
      user.is_active = false

      await user.save()

      await Instructor.create({
        user_id: user.id
      })
    }

    return response.status(200).send(user)
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController

'use strict'

const User = use('App/Models/User')
const UserDeactivatedException = use('App/Exceptions/UserDeactivatedException')

class SessionController {
  async create ({ request, response, auth }) {
    const data = request.only(['login', 'password'])

    const token = await auth.attempt(data.login, data.password)

    const user = await User.query().with('relationWithType').where('email', data.login).fetch()

    if (!user.toJSON()[0].is_active) {
      throw new UserDeactivatedException()
    }
    response.send({'auth': token, 'user': user.toJSON()[0]})
  }
}

module.exports = SessionController

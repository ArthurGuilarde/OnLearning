'use strict'

const User = use('App/Models/User')
class SessionController {
  async create ({ request, response, auth }) {
    const data = request.only(['login', 'password'])

    const token = await auth.attempt(data.login, data.password)

    const user = await User.query().with('relationWithType').where('email', data.login).fetch()

    if (!user.toJSON()[0].is_active) {
      return response.status(401)
      .send({'error': 'User is deactivated.'})
    }

    response.send({'auth': token, 'user': user})
  }
}

module.exports = SessionController

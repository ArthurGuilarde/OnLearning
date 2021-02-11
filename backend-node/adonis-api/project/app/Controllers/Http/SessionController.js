'use strict'

const User = use('App/Models/User')

class SessionController {
  async create ({ request, response, auth }) {
    const data = request.only(['login', 'password'])

    const token = await auth.attempt(data.login, data.password)

    const user = await User.query().with('relationWithType').where('email', data.login).fetch()

    response.send({'auth': token, 'user': user})
  }
}

module.exports = SessionController

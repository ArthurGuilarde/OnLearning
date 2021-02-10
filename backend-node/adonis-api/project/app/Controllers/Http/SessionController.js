'use strict'


class SessionController {
  async index ({ request, response, auth }) {
    const data = request.only(['login', 'password'])

    const token = await auth.attempt(data.login, data.password)

    response.send(token)
  }
}

module.exports = SessionController

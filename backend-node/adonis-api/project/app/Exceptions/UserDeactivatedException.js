'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class UserDeactivatedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    response
      .status(401)
      .json({'error':'User is deactivated.'})
  }
}

module.exports = UserDeactivatedException

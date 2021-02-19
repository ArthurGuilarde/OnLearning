'use strict'
const Helpers = use('Helpers')
const User = use('App/Models/User')

class AvatarUploadController {

  /**
   * Display a single instructor.
   * GET instructors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response, auth }) {
    if (auth.jwtPayload.uid !== params.id){
      return response.status(401).send({'error': 'Unauthorized access'})
    }


    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })


    await image.move(Helpers.tmpPath('uploads') , {
      name: `${Date.now()}-${image.clientName}`,
      overwrite:true
    })

    if (!image.moved()) {
      return images.errors()
    }

    const user = await User.find(params.id)

    user.avatar_url = image.fileName

    await user.save()

    return response.status(200).send(user)
  }

}

module.exports = AvatarUploadController

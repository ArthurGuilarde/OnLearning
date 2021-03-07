'use strict'

const { startOfHour, isBefore, format, getHours, isAfter, endOfHour, startOfDay, endOfDay} = use('date-fns')
const Schedule = use('App/Models/Schedule')
const User = use('App/Models/User')
const UserType = use('App/Models/UserType')
const Instructor = use('App/Models/Instructor')
const Status = use('App/Models/Status')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return response.status(200).send(await Schedule.all())
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['date', 'user_id', 'instructor_id'])
    const student = await User.find(data.user_id)
    const teacher = await Instructor.findBy('user_id', data.instructor_id)

    const temp = new Date(data.date)

    const day = temp.getDate()
    const month = temp.getMonth()
    const year = temp.getFullYear()
    const hour = temp.getHours() - 1


    const date = new Date(year, month, day, hour,0,0)


    const status = await Status.findBy('name', 'Pendente')

    if (!student || !teacher) {
      return response.status(401)
      .send({'error': 'Student or Instructor not found.'})
    }


    if (data.user_id === data.instructor_id) {
      return response.status(401)
      .send({'error': "Can't appointment with yourself."})
    }

    const sever = new Date()

    const appointmentDate = startOfHour(date)

    if (
      isBefore(appointmentDate, sever) ||
       appointmentDate.getHours() >= 18 ||
       appointmentDate.getHours() < 8
    ) {
      return response.status(401)
      .send({'error': "Invalid Date."})
    }

    const findAppointmentSameDate = await Schedule.query()
    .where({
      'date': format(appointmentDate, 'yyyy-MM-dd HH:mm:ss'),
      'instructor_id': teacher.toJSON().id
    }).fetch()


    if (findAppointmentSameDate.toJSON()[0]) {
      return response.status(401)
      .send({'error': "This appointment is aredy booked."})
    }

    const appointment = await Schedule.create({...data,
      date: appointmentDate,
      status_id: status.toJSON().id,
      instructor_id: teacher.toJSON().id
    })


    // const updateCoinsService = new UpdateCoinsService(this.usersRepository)
    // await updateCoinsService.execute({ email: student.email, coin_qtd: -1 })
    // await updateCoinsService.execute({ email: teacher.email, coin_qtd: 1 })


    return response.status(200).send(appointment)
  }

    /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async dayCheck ({ request, response }) {
    const data = request.only(['date', 'instructor_id'])
    const teacher = await Instructor.findBy('user_id', data.instructor_id)

    const temp = new Date(data.date)
    const date = startOfDay(temp)

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()


    const finalDate = new Date(year, month, day, 23,0,0)


    const teste = await Schedule.query()
    .whereBetween('date', [format(date, 'yyyy-MM-dd HH:mm:ss'), format(finalDate, 'yyyy-MM-dd HH:mm:ss')])
    .where({
      'instructor_id':teacher.toJSON().id
    })
    .fetch()

    const appointments = teste.toJSON()

    const hourStart = 8
    const numberOfHoursInDay = 10

    const eachHourArray = Array.from(
      {
        length: numberOfHoursInDay
      },
      (value, index) => index + hourStart
    )


    const availability = eachHourArray.map((hour) => {
      const appointmentsInHour = appointments.find((appointment) => {
        return getHours(new Date(appointment.date)) === hour
      })
      const currentDate = new Date()
      const compareDate = new Date(year, month, day, hour)
      return {
        hour,
        available: !appointmentsInHour && isAfter(compareDate, currentDate)
      }
    })

    return response.status(200).send(availability)
  }



  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth}) {

    if (auth.jwtPayload.uid !== params.id){
      return response.status(401).send({'error': 'Unauthorized access'})
    }

    const user = await User.find(params.id)
    const teacherType = await UserType.findBy('type', 'Teacher')

    if(user.type_id === teacherType.id){
      const instructor = await Instructor.findBy('user_id', params.id)
      const shedules = await Schedule.query()
      .with('User')
      .with('Status')
      .where('instructor_id', instructor.id)
      .fetch()
      return response.status(200).send(shedules)
    }

    const shedules = await Schedule.query()
    .with('User')
    .with('Instructor')
    .with('Status')
    .with('Subject')
    .where('user_id', params.id)
    .fetch()
    return response.status(200).send(shedules)
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const schedule_serialized = await Schedule.find(params.id)
    const schedule = schedule_serialized.toJSON()

    if (auth.jwtPayload.uid !== schedule.user_id){
      return response.status(401).send({'error': 'Unauthorized access'})
    }
    await schedule_serialized.delete()
    return response.status(200).send({'succes': 'Schedule removed'})
  }
}

module.exports = ScheduleController

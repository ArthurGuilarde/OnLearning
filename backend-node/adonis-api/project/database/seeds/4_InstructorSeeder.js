'use strict'

/*
|--------------------------------------------------------------------------
| InstructorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const UserType = use('App/Models/UserType')
const Instructor = use('App/Models/Instructor')
const IntructorSubject = use('App/Models/IntructorSubject')
const Subject = use('App/Models/Subject')

class InstructorSeeder {

  async run () {
    function randomIntFromInterval(min, max) { // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    var userType = await UserType.findBy('type', 'Teacher')
    const subjects = await Subject.all()

    const users = await User.createMany([
      {
        email:"arthur@gmail.com",
        password:"123",
        name:"Arthur",
        last_name:"Guilarde",
        type_id: userType.id
      },
      {
        email:"p1@gmail.com",
        password:"123",
        name:"Prof1",
        last_name:"prof 01",
        type_id: userType.id
      },
      {
        email:"p2@gmail.com",
        password:"123",
        name:"Prof2",
        last_name:"prof 02",
        type_id: userType.id
      },
      {
        email:"p3@gmail.com",
        password:"123",
        name:"Prof3",
        last_name:"prof 03",
        type_id: userType.id
      },
    ])
    const subjectArray = subjects.toJSON()
    users.map(async (user) => {
      const instructor = await Instructor.create({
        user_id: user.toJSON().id
      })

      await IntructorSubject.create({
        instructor_id: instructor.id,
        subject_id: subjectArray[randomIntFromInterval(0,4)].id
      })

    })

    userType = await UserType.findBy('type', 'Student')

    await User.createMany([
      {
        email:"aluno1@gmail.com",
        password:"123",
        name:"aluno1",
        last_name:"aluno 1",
        type_id: userType.id
      },
      {
        email:"aluno2@gmail.com",
        password:"123",
        name:"aluno2",
        last_name:"aluno 2",
        type_id: userType.id
      },
    ])
  }
}

module.exports = InstructorSeeder

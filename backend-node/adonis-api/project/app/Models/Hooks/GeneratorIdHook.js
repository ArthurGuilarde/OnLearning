'use strict'

const uuid = use('uuid')

const GeneratorIdHook = exports = module.exports = {}

GeneratorIdHook.generate = async (modelInstance) => {
  modelInstance.id = uuid.v4()
}

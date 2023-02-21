'use strict'
const { MongoDB } = require('../mongodb')
const uuid = require('uuid')

module.exports = {
  Mutation: {
    async login(_, args, { req }) {
      const { email, password } = args.input

      const user = await MongoDB().collection('users').findOne({ email: email })
      if (!user) {
        throw new Error('Usuário não cadastrado')
      }

      if (user.password !== password) {
        throw new Error('Senha inválida')
      }
      console.log(user)

      return user
    },

    async createUser(_, args) {
      const { email, password, userName } = args.input
      const user = await MongoDB().collection('users').findOne({ email: email })
      if (user) {
        throw new Error('Email já cadastrado')
      }

      const insertUser = await MongoDB().collection('users').insertOne({
        id: uuid.v4(),
        email: email,
        userName: userName,
        password: password,
      })

      return { id: insertUser.insertedId, email: email, userName: userName }
    },
  },
}

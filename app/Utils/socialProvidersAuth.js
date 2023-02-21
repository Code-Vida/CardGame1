//import User from '../models/user'
//import jwt from 'jsonwebtoken'
const { MongoDB } = require('../mongodb')

async function googleAuth(req, res) {
  console.log('req', req.user)
  const {
    id,
    displayName,
    emails: [{ value }],
  } = req.user

  try {
    // Find user in the database
    const user = MongoDB().collection('users').findOne({ email: emails }).toArray()
    console.log('user', user)
    // let token

    // if (!user) {
    //   // User not found --> new user --> create new user in the database
    //   const newUser = await User.create({
    //     name: displayName,
    //     email: value,
    //     password: `google_${id}`,
    //     providerId: id,
    //   })

    //   // Send cookie to frontend

    //   token = jwt.sign({ userId: newUser.id }, process.env.SECRET, {
    //     expiresIn: '7days',
    //   })
    // } else {
    //   token = jwt.sign({ userId: user.id }, process.env.SECRET, {
    //     expiresIn: '7days',
    //   })
    // }
    // res.cookie('jwt', token)
    // res.redirect('http://localhost:3000/products')
  } catch (error) {
    res.redirect('http://localhost:3000')
  }
}

module.exports = { googleAuth }

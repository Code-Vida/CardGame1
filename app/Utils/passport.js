const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

function googlePassportConfig() {
  return passport.use(
    new GoogleStrategy(
      {
        clientID: '739510798156-mov4v02hgf7fo78mbfe3kbpmucr7vlv6.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:4000/auth/google/callback',
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        try {
          if (profile) {
            req.user = profile
            done(null, profile)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )
}

module.exports = { googlePassportConfig }

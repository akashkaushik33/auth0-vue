import auth0 from 'auth0-js'
// import { Auth0LockPasswordless } from 'auth0-lock'

// creating auth0 new instance
let redirectUri = process.env.NODE_ENV === 'production' ? 'https://vue-pwa33.herokuapp.com/#/' : 'http://localhost:8080/#/'
console.log(process.env.NODE_ENV, redirectUri)
var webAuth = new auth0.WebAuth({
  domain: 'test-accreditly.eu.auth0.com',
  clientID: 'ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O',
  redirectUri: process.env.NODE_ENV === 'production' ? 'https://vue-pwa33.herokuapp.com/#/' : 'http://localhost:8080/#/',
  responseType: 'token id_token',
  scope: 'openid profile'
})

// Send a link using email
export const passwordlessLogin = function (userEmail, callback) {
  // lockPasswordless.show()
  webAuth.passwordlessStart({
    connection: 'email',
    send: 'link',
    email: userEmail
  },
  callback) // handle errors and response
}

// Verify code sent via email
export const verifyCode = function (userEmail, code, callback) {
  webAuth.passwordlessLogin({
    connection: 'email',
    email: userEmail,
    verificationCode: code
  },
  callback) // handle errors and response
}

// parse hash sent in calllback uri via auth0
export const parseHash = function (callback) {
  // parsing hash in url to get user's information
  webAuth.parseHash(function (err, authResult) {
    if (err) {
      return callback(err, authResult)
    }
    // setting up local storage items for authenticated user
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    console.log('AUTH RES', authResult)
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    webAuth.client.userInfo(authResult.accessToken, callback)
  })
}

export const isAuthenticated = function () {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

// we might need it later so please do not delete the below commented out code

// var managementAuth = new auth0.Management({
//   domain: 'vue-passwordless.auth0.com',
//   clientID: 'lD9QqKf143sWzfdQSp83_oCedlO0cZfs',
//   token: authResult.accessToken
// })
// var passwordlessOptions = {
//   allowedConnections: ['email', 'google', 'facebook'],
//   passwordlessMethod: 'code',
//   // additionalSignUpFields: [{
//   //   type: "select",
//   //   name: "location",
//   //   placeholder: "choose your location",
//   //   options: [
//   //     {value: "us", label: "United States"},
//   //     {value: "fr", label: "France"},
//   //     {value: "ar", label: "Argentina"}
//   //   ],
//   // }],
//   rememberLastLogin: false,
//   allowAutocomplete: true,
//   auth: {
//     redirect: true,
//     redirectUrl: 'http://localhost:8080/#/',
//     responseType: 'token id_token',
//     params: {
//       scope: 'openid email profile'
//     }
//   }
// }

// export const lock = new Auth0LockPasswordless(
//   'lD9QqKf143sWzfdQSp83_oCedlO0cZfs',
//   'vue-passwordless.auth0.com',
//   passwordlessOptions
// )

// function use (user, context) {
//   user.user_metadata = user.user_metadata || {}
//   // update the user_metadata that will be part of the response
//   user.user_metadata.preferences = user.user_metadata.preferences || {}
//   user.user_metadata.preferences.fontSize = 12

//   // persist the user_metadata update
//   managementAuth.users.updateUserMetadata(user.user_id, user.user_metadata)
//     .then(function (res) {
//       console.log('then ress', res)
//     })
//     .catch(function (err) {
//       console.log('err res', err)
//     })
// }

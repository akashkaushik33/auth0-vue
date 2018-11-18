
import { Auth0LockPasswordless } from 'auth0-lock'
import router from '@/router'
import axios from 'axios'

/**
 * checking whether the url contains auth code
 * if it does then making a API call to create a reresh token
 * then removing that code from url so that we don't make the repeated calls
 */
if (window.location.search) {
  console.log(router)
  let code = window.location.search.split('code=')[1]
  axios.get(`http://localhost:8081/createRefreshToken?code=${code}`).then(res => {
    console.log('res', res.data.result)
    localStorage.setItem('refresh_token', res.data.result.refresh_token)
    window.location.replace('/')
  })
}

// passwordless config for auth0 lock
let passwordlessOptions = {
  allowedConnections: ['email'],
  passwordlessMethod: 'link',
  rememberLastLogin: false,
  allowAutocomplete: true,
  auth: {
    redirect: true,
    redirectUrl: 'http://localhost:8080/#/',
    responseType: 'token id_token',
    params: {
      scope: 'openid email profile offline_access'
    }
  }
}

// initializing lock and exporting it.
export const lock = new Auth0LockPasswordless(
  'ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O',
  'test-accreditly.eu.auth0.com',
  passwordlessOptions
)

// listening the auth0 result
lock.on('authenticated', function (authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  /**
   * sending the second parameter firstAuthentication as true
   * to make sure we only send request for authorization code on first authentication only
   * and to avoid making authorization code request again and again
   * whenever user re-authenticated by silent authentication
   */
  getUserInfo(authResult, true)
})

function getUserInfo (authResult, firstAuthentication) {
  lock.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      // Handle error
      console.log('error', error)
      return
    }
    console.log('profile', profile)
    console.log('authResult', authResult)
    setSession(authResult, profile)
    // making request to get authorization code for refresh token
    if (firstAuthentication) {
      let authUrl = 'https://test-accreditly.eu.auth0.com/authorize?scope=offline_access%20contacts%20openid%20profile&audience=https://test-accreditly.eu.auth0.com/api/v2/&response_type=code&client_id=ng1cDuer1VzeaSb01NNQzNZOIcEgFK2O&redirect_uri=http://localhost:8080/#/'
      window.location.replace(authUrl)
    }
  })
}

function setSession (authResult, profile) {
  let expiresAt = JSON.stringify(
    // setting token renewal at every 30 sec for testing purposes
    30 * 1000 + new Date().getTime()
    // uncomment below line to renew token whenever it expires and comment out the above line
    // authResult.expiresIn * 1000 + new Date().getTime()
  )
  localStorage.setItem('access_token', JSON.stringify(authResult.accessToken))
  localStorage.setItem('userData', JSON.stringify(profile))
  localStorage.setItem('expires_at', JSON.stringify(expiresAt))
  localStorage.setItem('id_token', JSON.stringify(authResult.idToken))
  // scheduling token renewal
  scheduleRenewal()
  router.push({ name: 'profile', params: { id: profile.nickname } })
}

// creating timer for token renewal method
export const scheduleRenewal = function () {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  let delay = expiresAt - Date.now()
  if (delay > 0) {
    window.tokenRenewalTimeout = setTimeout(function () {
      renewToken()
    }, delay)
    console.log('HEREEEEEEEEEEEE')
    lock.hide()
  }
}

// method which get called for token renewal
function renewToken () {
  lock.checkSession({ scope: 'openid email profile offline_access' },
    function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('result renew token', result)
        getUserInfo(result)
      }
    }
  )
}

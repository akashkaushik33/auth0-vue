<template>
  <v-container fluid class="login-card">
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center"  xs12 sm8 offset-sm2 md4 offset-md4>

          <!-- snakbar for errors -->
          <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
            {{ errorMessage }}
            <v-btn color="primary" flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <!-- snackbar ends -->

          <!-- Default text -->
          <div v-if="!sent">
            <h1 class="display-1 font-weight-light text-center mr-4" color="cyan lighten-3">Log in to Vue-PWA</h1>
            <p class="mr-4">An email will be sent to your email id for verification.</p>
          </div>

          <!-- text when an authentication email is sent to user -->
          <div v-else>
            <v-icon class="ml-icon" large>thumb_up_alt</v-icon>
            <h3 class="display-1 font-weight-light">
              Please check your email.
            </h3>
            <p>We have sent a verification code to your email address.</p>
          </div>
          <!-- card for email and verification code input -->
          <v-card class="login-card">
            <v-card-title  class="headline">Sign Up or Login</v-card-title>
            <!-- <v-card-title v-if="!sent" class="headline">Sign Up or Login</v-card-title> -->
            <!-- <v-card-title v-else class="headline">Enter Verification Code</v-card-title> -->
            <v-card-text>
              <v-text-field
                ref="email"
                label="Enter your email"
                v-model="email"
                :rules="emailRules"
              >
              <!-- <v-text-field
                v-if="!sent"
                ref="email"
                label="Enter your email"
                v-model="email"
                :rules="emailRules"
              > -->
              </v-text-field>
              <!-- <v-text-field
                v-else
                ref="code"
                label="Enter your code"
                v-model="code"
              >
              </v-text-field> -->
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn v-if="!sent" :loading="loading" block color="primary" @click="sendVerificationLink">Login via Email</v-btn>
              <v-btn v-else block color="primary" :loading="loading" @click="verifyEmailCode">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { passwordlessLogin, verifyCode, isAuthenticated } from '@/services/auth'
export default {
  name: 'home',
  data: () => ({
    email: '',
    code: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    errorMessage: '',
    snackbar: false,
    sent: false,
    loading: false
  }),
  mounted () {
    // checking user authentication
    if (isAuthenticated()) {
      // console.log('authenticated')
      let userData = JSON.parse(localStorage.getItem('userData'))
      this.$router.push({ name: 'profile', params: { id: userData.nickname } })
    }
  },
  methods: {
    sendVerificationLink () {
      // auth service method for sending verification code
      passwordlessLogin(this.email, this.handleResponse)
      this.loading = true
      // this.email = ''
      // this.$refs.email.reset()
    },
    // callback function for handling response
    handleResponse (err, res) {
      console.log('HEREEEEEEEEE')
      this.loading = false
      // console.log('err', err)
      if (err) {
        this.snackbar = true
        this.errorMessage = err.description || 'Invalid email'
        return localStorage.removeItem('userData')
      }
      console.log('res', res)
      this.sent = true
      this.$router.push('success')
    },
    verifyEmailCode () {
      // auth service method for verifying verification code
      verifyCode(this.email, this.code, this.handleResponse)
      this.loading = true
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login-card {
  border-radius: 10px;
  margin-top: 10vh
}
.ml-icon {
  margin-left: 3.5ch
}
</style>

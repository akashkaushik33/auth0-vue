<template>
  <div>
    <v-container fluid>
      <v-layout row wrap align-center>
        <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
          {{ errorMessage }}
          <v-btn color="primary" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-btn class="mt-5" absolute dark top right color="primary" @click="logout">
          Logout
        </v-btn>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-img :src="userData.picture" height="300px"></v-img>
            <v-card-title class="headline">{{userData.nickname}}</v-card-title>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">person</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{userData.sub}}</v-list-tile-title>
                  <v-list-tile-sub-title>Id</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">refresh</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{refresh_token}}</v-list-tile-title>
                  <v-list-tile-sub-title>Refresh_token</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action ><v-btn @click="revokeRefreshToken" flat color="primary ml-2">Revoke</v-btn></v-list-tile-action>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">vpn_key</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{access_token}}</v-list-tile-title>
                  <v-list-tile-sub-title>Access_token</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action class="mt-5"><v-btn @click="getNewAccessToken" flat color="primary">New Access Token</v-btn></v-list-tile-action>

              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">email</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{userData.email}}</v-list-tile-title>
                  <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action></v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{userData.nickname}}</v-list-tile-title>
                  <v-list-tile-sub-title>Nickname</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile>
                <v-list-tile-action></v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{userData.updated_at}}</v-list-tile-title>
                  <v-list-tile-sub-title>Updated At</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo">done_all</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{userData.email_verified}}</v-list-tile-title>
                  <v-list-tile-sub-title>Email Verified</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { lock } from '@/services/auth'
import axios from 'axios'
export default {
  name: 'profile',
  data: () => ({
    snackbar: false,
    errorMessage: '',
    userData: {},
    access_token: JSON.parse(localStorage.getItem('access_token')) || 'none',
    refresh_token: localStorage.getItem('refresh_token') || 'none'
  }),
  computed: {
  },
  mounted () {
    lock.hide()
    // getting user data from local storage
    this.userData = JSON.parse(localStorage.getItem('userData')) || {}
  },
  methods: {
    // method for loggng user out and removing related items from local storage
    logout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('userData')
      clearTimeout(window.tokenRenewalTimeout)
      lock.logout({ returnTo: 'http://localhost:8080' })
    },

    // calling api of auth-server to get new access token using refresh token
    async getNewAccessToken () {
      let res = await axios.get(`http://localhost:8081/getNewAccessToken?refreshToken=${this.refresh_token}`)
      this.access_token = res.data.result.access_token
      lock.getUserInfo(res.data.result.access_token, (err, profile) => {
        if (err) console.log(err)
        console.log('PROFILE', profile)
      })
    },

    // revoking refresh token
    async revokeRefreshToken () {
      await axios.get(`http://localhost:8081/revokeRefreshToken?refreshToken=${this.refresh_token}`)
      this.refresh_token = ''
      localStorage.removeItem('refresh_token')
    }
  }
}
</script>

<style>

</style>

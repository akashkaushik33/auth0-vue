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
import { isAuthenticated } from '@/services/auth'
export default {
  name: 'profile',
  data: () => ({
    snackbar: false,
    errorMessage: '',
    userData: {}
  }),
  mounted () {
    // getting user data from local storage
    this.userData = JSON.parse(localStorage.getItem('userData')) || {}
    // checking for user's authentication
    if (!isAuthenticated()) {
      this.snackbar = true
      this.errorMessage = 'Authentication failed'
      setTimeout(() => {
        this.logout()
      }, 2000)
    }
  },
  methods: {
    // method for loggng user out and removing related items from local storage
    logout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('userData')
      this.$router.push({ 'name': 'home' })
    }
  }
}
</script>

<style>

</style>

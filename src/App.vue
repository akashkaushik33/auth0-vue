<template>
  <v-app class="background">
    <v-content>
      <v-snackbar v-model="snackbar" :timeout="2000" :top="true">
        {{ errorMessage }}
        <v-btn color="primary" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { parseHash, isAuthenticated } from '@/services/auth'
export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      errorMessage: ''
    }
  },
  created () {
    if (window.location.hash.includes('access_token')) {
      parseHash((err, user) => {
        if (err) {
          console.log(err)
          this.snackbar = true
          localStorage.removeItem('userData')
          this.errorMessage = `${err.error} and ${err.errorDescription}` || 'Invalid data'
          window.location = window.location.origin
        } else {
          console.log('user', user)
          localStorage.setItem('userData', JSON.stringify(user))
          this.$router.push({ 'name': 'profile', params: { id: user.nickname || 'user', data: user } })
        }
      })
    }
    if (isAuthenticated()) {
      console.log('authenticated')
      let userData = JSON.parse(localStorage.getItem('userData'))
      this.$router.push({ name: 'profile', params: { id: userData.nickname } })
    } else {
      this.$router.push({ 'name': 'home' })
    }
  }
}
</script>
<style lang="scss">
.theme--light.application {
  background: #36D1DC;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #5B86E5, #36D1DC);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #5B86E5, #36D1DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>

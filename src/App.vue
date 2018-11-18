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
import { scheduleRenewal } from '@/services/auth'
export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      errorMessage: ''
    }
  },
  created () {
    // If a user is already logged in then schedule the token renewal and take him to profilel page
    if (localStorage.getItem('id_token')) {
      // method from the auth.js service
      scheduleRenewal()
      this.$router.push({ name: 'profile', params: { id: JSON.parse(localStorage.getItem('userData')).nickname } })
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

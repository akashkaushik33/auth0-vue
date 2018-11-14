<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm8 offset-sm2 md4 offset-md4>
        <div class="text-xs-center login-card">
          <v-icon class="ml-icon" large>thumb_up_alt</v-icon>
          <h3 class="display-1 font-weight-light">
            Please check your email.
          </h3>
          <p>An verification email has been to your email address.</p>
          <p>Click <router-link to="/">here</router-link> to go back to login page.</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.ml-icon {
  margin-left: 3.5ch
}
a {
  color: #05259a
}
</style>

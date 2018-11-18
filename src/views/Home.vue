<template>
  <v-container fluid class="login-card">
    <v-slide-y-transition mode="out-in">
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// import { passwordlessLogin, verifyCode, isAuthenticated, checkSession, lock } from '@/services/auth'
import { lock } from '@/services/auth'
export default {
  name: 'home',
  data: () => ({
  }),
  mounted () {
    lock.show()
  },
  methods: {
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

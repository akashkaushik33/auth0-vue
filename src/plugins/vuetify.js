import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VCard,
  VForm,
  VTextField,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VSnackbar,
  VImg,
  VDivider,
  transitions,
  VCheckbox
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VCard,
    VForm,
    VTextField,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VSnackbar,
    VImg,
    VDivider,
    transitions,
    VCheckbox
  },
  iconfont: 'md'
})

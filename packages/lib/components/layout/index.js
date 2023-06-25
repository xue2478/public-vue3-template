import Pt3Layout from './src/index.vue'
import store from './../../store/index'

const withInstall = com => {
  return (function () {
    com.install = function (app, option) {
      app.component(com.name, com)
      app.use(store)
    }
    return com
  })()
}
export default withInstall(Pt3Layout)

import Pt3Table from './src/index.vue'

const withInstall = com => {
  return (function () {
    com.install = function (app, option) {
      app.component(com.name, com)
      if (option && option.request) {
        app.provide('request', option.request)
      }
    }
    return com
  })()
}
export default withInstall(Pt3Table)

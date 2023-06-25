import Pt3SvgIcon from './index.vue'
const withInstall = com => {
  return (function () {
    com.install = function (app, option) {
      app.component(com.name, com)
    }
    return com
  })()
}
export default withInstall(Pt3SvgIcon)

import Pt3Layout from './lib/components/layout/src/index.vue'
import Pt3Btn from './lib/components/button/src/index.vue'
import Pt3Dialog from './lib/components/dialog/src/index.vue'
import Pt3Form from './lib/components/form/src/index.vue'
import Pt3Table from './lib/components/table/src/index.vue'

import store from './lib/store/index'
const coms = { Pt3Layout, Pt3Btn, Pt3Dialog, Pt3Form, Pt3Table }
const install = function (app, opts = {}) {
  if (install.installed) return
  Object.keys(coms).forEach(name => {
    app.component(name, coms[name])
  })
  app.use(store)
}
export default {
  install
}

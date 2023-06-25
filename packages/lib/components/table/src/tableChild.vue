<script lang="jsx">
function adjustW(el, binding) {
  const elSW = el.scrollWidth || 0
  const pW = el.parentNode.offsetWidth
  const oldW = binding.value.m
  if (elSW != pW) {
    let diff = (el.offsetLeft || 5) * 2
    const _pW = elSW + diff
    if (elSW > pW) {
      binding.value.m = _pW
    }
    if (elSW < pW && oldW && elSW < oldW) {
      binding.value.m = _pW
    }
  }
}
const EliminateAttr = ['children']
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Pt3TableChild',
  props: {
    config: {
      type: Object,
      default: () => {
        // fitWidth:true 自适应宽度
        // customTip:true 自定义弹出样式 配合minWidth huozhewidth shiyo
      }
    },
    nowarp: Boolean
  },
  directives: {
    autoW: {
      mounted(el, binding, vnode) {
        if (binding.value == false) return
        setTimeout(() => {
          adjustW(el, binding)
        }, 500)
      }
    }
  },
  setup(props, { slots, expose }) {
    const state = reactive({
      width: { m: null }
    })
    const renderText = scope => {
      const value = scope.row[props.config.prop]
      return value
    }
    const renderTem = () => {
      let tmp = {}
      const _default = 'default'
      const { labelSlot: _header, children } = props.config
      const hasChild = children && Array.isArray(children) && children.length
      let autoW = state.width
      if (!props.nowarp || props.config.width || props.config['min-width']) {
        autoW = false
      }
      if (!props.config.type) {
        tmp.default = (scope = {}) => {
          return (
            <>
              {hasChild &&
                children.map(item => {
                  return <Pt3TableChild config={item} />
                })}
              <div v-autoW={autoW} class="table-item-cell">
                {slots[_default] &&
                  slots[_default]({ ...scope, item: props.config })}
                {renderText(scope)}
              </div>
            </>
          )
        }
      }
      if (_header && slots[_header]) {
        tmp['header'] = (scope = {}) => {
          return slots[_header]({
            ...scope,
            item: props.config
          })
        }
      }

      return Object.keys(tmp).length ? tmp : null
    }
    const renderContent = data => {
      const config = props.config
      if (Object.prototype.toString.call(config) !== '[object Object]')
        return ''
      if (config && JSON.stringify(config) === '{}') return ''
      let attrs = {}
      for (let key in config) {
        if (!EliminateAttr.includes(key)) {
          attrs[key] = config[key]
        }
      }
      return (
        <>
          <el-table-column
            key={config.prop}
            minWidth={state.width.m}
            {...attrs}
            v-slots={renderTem()}
          ></el-table-column>
        </>
      )
    }
    return renderContent
  },
  methods: {
    test() {
      console.log(this)
    }
  }
})
</script>
<style lang="scss" scoped>
.table-item-cell {
  display: inline-block;
}
</style>

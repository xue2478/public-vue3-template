<script lang="jsx">
import { defineComponent, reactive, watch, computed } from 'vue'
import formItem from './formItem.vue'
export default defineComponent({
  name: 'Pt3Form',
  emits: ['changeModel'],
  components: { formItem },
  props: {
    isGroup: {
      type: Boolean,
      default: false
    },
    formConfig: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: 1
    },
    cusModel: {
      //cusModel没有的值会置为初始值
      //自定义表单值
      type: Object,
      default: () => ({})
    },
    cusModelKO: {
      //没有的值会保持现状
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots, emit, attrs, expose }) {
    let defaultFrom = null
    // 初始化model
    const initDefaultModel = data => {
      const result = {}
      const valObj = {
        string: '',
        number: null,
        object: {},
        array: []
      }
      if (props.isGroup) {
        data.forEach(child => {
          const { children = [] } = child
          children.forEach(item => {
            const { defaultVal, valueType, prop } = item
            result[prop] =
              defaultVal == undefined
                ? valueType
                  ? valObj[valueType]
                  : ''
                : defaultVal
            if (item.type == 'number' && (defaultVal != 0 || !defaultVal)) {
              result[prop] = undefined
            }
          })
        })
      } else {
        data.forEach(item => {
          const { defaultVal, valueType, prop } = item
          result[prop] =
            defaultVal == undefined
              ? valueType
                ? valObj[valueType]
                : ''
              : defaultVal
          if (item.type == 'number' && (defaultVal != 0 || !defaultVal)) {
            result[prop] = undefined
          }
        })
      }
      return result
    }
    const per = col => {
      let tmp = new Number(100 / col).toFixed(4)
      tmp = tmp ? tmp + '%' : 'auto'
      return tmp
    }
    const methods = {
      // 校验表单
      validForm: () => {
        return new Promise((resolve, reject) => {
          if (!state.formEl) return reject('form 实例不存在')
          state.formEl.validate((valid, fields) => {
            if (valid) {
              resolve({
                data: Object.assign({}, state.model)
              })
            } else {
              reject('error submit!')
            }
          })
        })
      },
      // 重置
      resetForm() {
        state.model = Object.assign({}, defaultFrom)
        state.formEl && state.formEl.resetFields()
      }
    }
    const state = reactive({
      model: {},
      formEl: null
    })

    // 初始化 构建model
    const init = () => {
      defaultFrom = initDefaultModel(props.config)
      state.model = Object.assign({}, defaultFrom, props.cusModel)
    }
    init()
    watch(
      () => props.cusModel,
      val => {
        state.model = Object.assign({}, defaultFrom, val)
      }
    )
    watch(
      () => props.cusModelKO,
      val => {
        state.model = Object.assign(state.model, val)
      }
    )
    watch(
      () => props.config,
      val => {
        init()
      }
    )
    watch(
      () => state.model,
      val => {
        emit('changeModel', val)
      },
      {
        deep: true,
        immediate: true
      }
    )
    const formAttr = computed(() => {
      const tmp = { ...attrs }
      if (!props.formConfig) return tmp
      for (let key in props.formConfig) {
        tmp[key] = props.formConfig[key]
      }
      return tmp
    })
    const renderChild = (data, COL) => {
      if (!data) return ''
      return (
        <div
          class="pt3--form-item-box"
          style={{
            'grid-template-columns':
              'repeat(' + (COL || props.col) + ',' + per(COL || props.col) + ')'
          }}
        >
          {data.map(item => (
            <>
              <div
                class="pt3--form-item"
                style={[
                  item.span ? { 'grid-column': 'span ' + item.span } : ''
                ]}
              >
                <formItem
                  v-model={state.model[item.prop]}
                  item={item}
                  style={{ 'margin-bottom': item.dvSlot ? 0 : null }}
                >
                  {item.slotName &&
                    slots[item.slotName] &&
                    slots[item.slotName]({ node: item, model: state.model })}
                </formItem>
                {item.dvSlot &&
                  slots[item.dvSlot] &&
                  slots[item.dvSlot]({ node: item, model: state.model })}
              </div>
            </>
          ))}
        </div>
      )
    }
    const renderContent = () => (
      <>
        <div class="pt3--form-container">
          <el-form
            ref="formEl"
            class="pt3--form"
            model={state.model}
            {...formAttr.value}
            onSubmitNativePrevent
          >
            {props.isGroup
              ? props.config.map(child => {
                  return (
                    <>
                      <section>
                        {!child.noTitle && child.title && (
                          <h2>{child.title}</h2>
                        )}
                        {renderChild(child.children, child.col)}
                        {child.slotName &&
                          slots[child.slotName] &&
                          slots[child.slotName]({
                            node: child,
                            model: state.model
                          })}
                      </section>
                    </>
                  )
                })
              : renderChild(props.config)}
          </el-form>
        </div>
      </>
    )
    expose({ ...methods })
    return renderContent
  }
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>

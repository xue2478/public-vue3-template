<script lang="jsx">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Pt3Btn',
  emits: ['g-btn-click'],
  props: {
    btnList: {
      type: Array,
      default: () => []
    },
    tooltip: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const btnLists = computed(() => {
      if (
        !!props.btnList &&
        Array.isArray(props.btnList) &&
        props.btnList.length
      ) {
        return props.btnList.filter(item => !item.hidden)
      } else {
        return []
      }
    })

    const methods = {
      btnClickFun(method, data) {
        emit('g-btn-click', method, data)
      }
    }
    const renderContent = () => (
      <>
        <div>
          {btnLists.value.map(btn => {
            const {
              attrs = {},
              text,
              type,
              method = '',
              placement,
              tooltip,
              content = ''
            } = btn
            let disabled = !props.tooltip
            if (tooltip != undefined) {
              disabled = !tooltip
            }
            return (
              <el-tooltip
                content={content || text}
                disabled={disabled}
                placement={placement || 'top'}
              >
                <el-button
                  {...attrs}
                  type={type}
                  onClick={() => {
                    methods.btnClickFun(method, btn)
                  }}
                >
                  {btn.text}
                </el-button>
              </el-tooltip>
            )
          })}
        </div>
      </>
    )

    return renderContent
  }
})
</script>

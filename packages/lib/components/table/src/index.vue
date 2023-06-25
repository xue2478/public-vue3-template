<script lang="jsx">
// 登录接口
async function axiosHandle(request, url, method, param) {
  if (!request) return
  if (url && method) {
    const met = method.toLowerCase()
    let data = met === 'get' ? { params: param } : param
    return request[method](url, data)
  }
}

import {
  defineComponent,
  reactive,
  onMounted,
  computed,
  watch,
  inject
} from 'vue'
import { ElMessage } from 'element-plus'
import tableChild from './tableChild.vue'
// import { axiosHandle } from './fun'

export default defineComponent({
  name: 'Pt3Table',
  emits: ['loaded-data'],
  components: { tableChild },
  props: {
    nowarp: Boolean,
    // 表头配置
    columns: {
      type: Array,
      default: () => []
    },
    clearData: {
      //columns改变后 是否清除数据
      type: Boolean,
      default: false
    },
    isFixData: {
      type: Boolean,
      default: false
    },
    immediate: {
      type: Boolean,
      default: true // 立刻请求数据
    },
    fixData: {
      type: Array
    },
    // 分页配置
    pagination: {
      type: [Object, Boolean],
      default: () => ({})
    },
    requestConfig: {
      type: Object,
      default: () => {
        //immediate:true 立即请求数据
        // url:'', 请求地址
        // method:'get' 请求方法
      }
    },
    // 请求数据的方法
    requestFun: {
      type: Function
    },
    // 请求数据的参数
    requestParam: {
      type: Object,
      default: () => ({})
    },
    // 分页、当前页对应的字段名
    pageParam: {
      type: Array,
      default: () => ['pageNum', 'pageSize']
    },
    responseField: {
      // 自定义tableList 从response取值字段 如['data']
      type: Array
    },
    totalField: {
      // 自定义total 从response取值字段 如['total']
      type: Array
    },
    // 数据加载前动作
    beforeLoadFun: Function,
    // 表格高度与视图的差值  与heigth同时存在时  取height
    diffHeight: {
      type: Number,
      default: null
    },
    // 表格高度
    height: [String, Number],
    beforehandleRParamFun: Function //请求数据自定义请求数据方法
  },
  setup(props, { attrs, emit, slots, expose }) {
    const request = inject('request')
    // 请求列表数据
    const hanleParam = () => {
      // debugger
      if (!props.pagination) {
        return props.requestParam
      } else {
        const tmpParam = props.requestParam ? { ...props.requestParam } : {}
        if (state.pageKey) {
          tmpParam[state.pageKey] = state.pageNum
        }
        if (state.sizeKey) {
          tmpParam[state.sizeKey] = state.pageSize
        }
        return tmpParam
      }
    }
    const handlePageParam = sub => {
      const _pageParam = props.pageParam
      if (_pageParam && Array.isArray(_pageParam)) {
        return _pageParam[sub] || ''
      }
      return ''
    }
    const getTableData = () => {
      new Promise((resolve, reject) => {
        if (props.beforeLoadFun) {
          props.beforeLoadFun(resolve, reject, props.requestParam)
        } else {
          resolve()
        }
      }).then(() => {
        getTableList()
      })
    }
    // 请求表格数据
    const getTableList = () => {
      let _flag = null
      const rC = props.requestConfig
      if (props.requestFun) {
        _flag = 1
      }
      if (rC && rC.url && rC.method && request) {
        _flag = 2
      }
      if (!_flag) {
        ElMessage({
          message: '请先设置请求数据方法或者地址',
          type: 'error'
        })
        return
      }
      state.loading = true
      const searchModel = hanleParam()
      new Promise((resolve, reject) => {
        const fun = props.beforehandleRParamFun
        if (fun && typeof fun == 'function') {
          fun({ ...searchModel }, resolve, reject)
        } else {
          resolve(searchModel)
        }
      }).then(async param => {
        try {
          state.tableData = []
          let res = null
          if (_flag === 1) {
            res = await props.requestFun(param)
          }
          if (_flag === 2) {
            res = await axiosHandle(rC.url, rC.method, param)
          }
          if (res) {
            const { responseField, totalField } = props
            if (responseField && responseField.length) {
              let tmp = res
              for (let i = 0; i < responseField.length; i++) {
                tmp = tmp[responseField[i]]
              }
              state.tableData = tmp
            } else {
              state.tableData = res.data
            }

            if (totalField && totalField.length) {
              let tmp = res
              for (let i = 0; i < totalField.length; i++) {
                tmp = tmp[totalField[i]]
              }
              state.total = tmp
            } else {
              state.total = res.total
            }
            emit('loaded-data', res, param)
          }
        } catch {
          state.tableData = []
          state.total = 0
        } finally {
          state.loading = false
        }
      })
    }
    // 计算表格高度
    const calH = (h, dF) => {
      if (!h) {
        if (document.body && typeof dF === 'number' && (dF || dF === 0)) {
          const h = document.body.clientHeight - dF
          return h < 0 ? 100 : h
        }
      }
      return h
    }

    const tableHeight = computed({
      get() {
        return calH(props.height, props.diffHeight)
      }
    })
    const state = reactive({
      table: null,
      loading: false,
      tableData: [],
      total: 0,
      filterColumns: computed(() => {
        return props.columns.filter(item => !item.hidden)
      }),
      pageKey: computed(() => handlePageParam(0)),
      sizeKey: computed(() => handlePageParam(1)),
      pageNum: 1,
      pageSize: (!!props.pagination && props.pagination.pageSize) || 10,
      // 当前页变化
      handleCurrentChange() {
        getTableData()
      },
      // 改变每页size数量
      handleSizeChange() {
        state.pageNum = 1
        getTableData()
      },
      // 刷新表格
      refreshTable() {
        getTableData()
      },
      getTableInstance: () => {
        return state.table
      },
      // 清空数据
      emptyTableData() {
        state.tableData = []
        state.total = 0
      }
    })

    const paginationConfig = computed(() => {
      if (
        Object.prototype.toString.call(props.pagination) == '[object Object]'
      ) {
        const defaultPag = {
          show: true
        }
        return Object.assign({}, defaultPag, props.pagination)
      }
      if (!props.pagination)
        return {
          show: false
        }
      return {
        show: false
      }
    })
    onMounted(() => {})
    expose({
      refreshTable: state.refreshTable,
      getTableInstance: state.getTableInstance,
      emptyTableData: state.emptyTableData
    })
    onMounted(() => {
      // if (
      //   !props.isFixData &&
      //   (props.immediate ||
      //     (props.requestConfig && props.requestConfig.immediate))
      // ) {
      //   getTableData()
      // }
      if (!props.isFixData) {
        const rc = props.requestConfig
        if (
          (rc && rc.immediate) ||
          (props.immediate && (!rc || (rc && rc.immediate !== false)))
        ) {
          getTableData()
        }
      }
      const diffHeight = props.diffHeight
      if (
        typeof diffHeight === 'number' &&
        (diffHeight || props.diffHeight === 0)
      ) {
        const h = document.body.clientHeight
        state.tableHeight = h - props.diffHeight
      }
    })
    if (props.isFixData) {
      state.tableData = props.fixData
    }
    watch(
      () => props.fixData,
      val => {
        if (props.isFixData) {
          state.tableData = val
        }
      }
    )
    watch(
      () => props.columns,
      val => {
        if (props.clearData) {
          state.tableData = []
          state.total = 0
        }
      }
    )

    // return {
    //   ...toRefs(state),
    //   tableHeight
    // }
    const renderSlot = (tdSlot, labelSlot, item) => {
      let tmp = {}
      if (tdSlot && slots[tdSlot]) {
        tmp.default = scope => {
          return <>{slots[tdSlot](scope)}</>
        }
      }
      if (labelSlot && slots[labelSlot]) {
        tmp[labelSlot] = scope => {
          return <>{slots[labelSlot](scope)}</>
        }
      }
      return Object.keys(tmp).length ? tmp : null
    }
    return () => (
      <>
        <div>
          <el-table
            v-loading={state.loading}
            data={state.tableData}
            ref={state.table}
            style="width:100%"
            border="true"
            tooltip-effect="light"
            stripe
            height={tableHeight}
            highlight-current-row
            class={[props.nowarp ? 'nowarp-table' : '']}
            {...attrs}
          >
            {state.filterColumns.map(item => {
              const { dvSlot, tdSlot, labelSlot } = item
              return (
                <>
                  {dvSlot ? (
                    slots[dvSlot] ? (
                      slots[dvSlot] && slots[dvSlot](item)
                    ) : (
                      ''
                    )
                  ) : (
                    <tableChild
                      nowarp={props.nowarp}
                      config={item}
                      v-slots={renderSlot(tdSlot, labelSlot, item)}
                    ></tableChild>
                  )}
                </>
              )
            })}
          </el-table>
          {paginationConfig.value.show ? (
            <div style="margin-top:6px">
              <el-pagination
                background
                class="pagination"
                v-model={[state.pageNum, 'current-page']}
                page-size={state.pageSize}
                layout="total, sizes, prev, pager, next, jumper"
                total={state.total}
                {...paginationConfig}
                onSizeChange={state.handleSizeChange}
                onCurrentChange={state.handleCurrentChange}
              ></el-pagination>
            </div>
          ) : null}
        </div>
      </>
    )
  }
})
</script>
<style lang="scss">
.nowarp-table.el-table {
  .el-table__cell .cell {
    white-space: nowrap;
    text-overflow: initial;
  }
}
</style>

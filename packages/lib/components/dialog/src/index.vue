<template>
  <el-dialog
    v-model="vis"
    class="pt3-cusDialog"
    :close-on-click-modal="false"
    v-bind="dialogConfig"
    @close="closeFun"
  >
    <template #title v-if="$slots.title">
      <slot name="title"></slot>
    </template>
    <div>
      <slot></slot>
      <component
        ref="cusDialog"
        v-if="componentContent"
        :is="componentContent"
        v-bind="comAttr"
      ></component>
      <slot name="footer"></slot>
      <div style="text-align: right" v-if="showBtn">
        <el-button type="warning" plain @click="closeFun()">关闭</el-button>
        <el-button type="success" @click="submitFun">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  computed,
  defineComponent,
  // onBeforeUpdate,
  reactive,
  toRefs,
  defineAsyncComponent,
  h
} from 'vue'
export default defineComponent({
  name: 'Pt3Dialog',
  // update
  emits: ['update:modelValue', 'close', 'open', 'closed', 'opened'],
  props: {
    // 弹框显示 v-model控制
    modelValue: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    // 弹出组件的prop参数
    data: { type: Object, default: () => {} },
    // 弹框相关的属性 参考elementUIPLUS el-dialog
    dialogConfig: {
      type: Object,
      default: () => {
        //cPath: ()=>import('../test.vue'), // 组件地址
      }
    },
    simpleClose: {
      //直接关闭页面 不做其他的事情
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit, attrs }) {
    const loadTem = h(
      'div',
      {
        class: 'loadingImg'
      },
      '加载中，请稍后...'
    )
    const state = reactive({
      cusDialog: null,
      componentContent: computed(() => {
        if (props.dialogConfig && props.dialogConfig.cPath) {
          return defineAsyncComponent({
            loader: props.dialogConfig.cPath,
            loadingComponent: loadTem
          })
        } else {
          return null
        }
      }),
      vis: computed({
        get: () => props.modelValue,
        set(val) {
          emit('update:modelValue', val)
        }
      }),
      closeFun() {
        if (props.simpleClose) {
          state.vis = false
          return
        }
        state.cusDialog && state.cusDialog.closeFun()
      },
      submitFun() {
        state.cusDialog && state.cusDialog.submitFun()
      }
    })
    const comAttr = computed(() => {
      const tmp = { ...attrs }
      for (let key in props.data) {
        tmp[key] = props.data[key]
      }
      return tmp
    })

    return {
      ...toRefs(state),
      comAttr
    }
  }
})
</script>
<style lang="scss" scope>
.loadingImg {
  text-align: center;
  height: 80px;
  line-height: 80px;
}
</style>

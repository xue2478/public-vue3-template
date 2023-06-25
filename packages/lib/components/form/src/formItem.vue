<template>
  <el-form-item
    :label="item.label"
    :prop="item.prop"
    :rules="item.rules"
    v-bind="item.formAttr || {}"
  >
    <component
      :is="Tag"
      v-model="value"
      clearable
      v-bind="attrs"
      ref="formItem"
    >
      <!-- 树形下拉 可以单选父级 -->
      <template #default="{ data }" v-if="attrs && attrs.checkP">
        <span @click.stop="checkFun(data, 'value')">
          {{ data[renderST('label')] }}
        </span>
      </template>
      <template v-if="item.type == 'select'">
        <el-option
          v-for="(op, index) in selectOptions"
          :key="index"
          :label="
            item.optionConfig && item.optionConfig.label
              ? op[item.optionConfig.label]
              : op.label
          "
          :value="
            item.optionConfig && item.optionConfig.value
              ? op[item.optionConfig.value]
              : op.value
          "
        ></el-option>
      </template>
      <template v-if="item.type == 'radio'">
        <el-radio
          v-for="(op, index) in selectOptions"
          :key="index"
          :label="
            item.optionConfig && item.optionConfig.value
              ? op[item.optionConfig.value]
              : op.value
          "
        >
          {{
            item.optionConfig && item.optionConfig.label
              ? op[item.optionConfig.label]
              : op.label
          }}
        </el-radio>
      </template>
    </component>
    <slot></slot>
  </el-form-item>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'
const funList = ['tree-select', 'select', 'radio'] //可能有请求的数据
export default defineComponent({
  name: 'Pt3FormItem',
  emits: ['update:modelValue'],
  props: {
    modelValue: {},
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    if (!props.item || JSON.stringify(props.item) === '{}') return
    if (!props.item.type) return
    let _tag = props.item.type.trim().toLowerCase()
    let Tag =
      _tag === 'number'
        ? 'el-input-number'
        : _tag === 'radio'
        ? 'el-radio-group'
        : _tag === 'date'
        ? 'el-date-picker'
        : 'el-' + _tag

    const init = () => {
      const attrs = props.item.rAttrs
      // 列表数据后端请求而来
      if (attrs && funList.includes(_tag) && attrs.fun) {
        const { responseField = ['data'], params = '' } = attrs
        attrs.fun(params).then(res => {
          let data = res
          if (responseField.length) {
            for (let i = 0; i < responseField.length; i++) {
              data = data[responseField[i]]
            }
          }
          if (_tag == 'tree-select') {
            //树形选择器
            const tmp = {
              ...state.cusConfig,
              data
            }
            state.cusConfig = tmp
            return
          }
          state.data = data
        })
      }
    }
    const methods = {
      renderST(flag) {
        const tmp = state.attrs.props
        return (tmp && tmp[flag]) || flag
      },
      checkFun(data, flag) {
        const tmp = methods.renderST(flag)
        state.value = data[tmp]
        state.formItem.blur()
      }
    }
    const state = reactive({
      value: computed({
        get: () => props.modelValue,
        set(val) {
          emit('update:modelValue', val)
        }
      }),
      formItem: null,
      cusConfig: {},
      data: [],
      attrs: computed(() => {
        const _tmp = props.item.attrs || {}
        return Object.assign(_tmp, state.cusConfig)
      }),
      selectOptions: computed(() => {
        if (props.item.options) {
          return props.item.options
        }
        return state.data
      })
    })
    init()
    return {
      ...methods,
      ...toRefs(state),
      Tag
    }
  }
})
</script>

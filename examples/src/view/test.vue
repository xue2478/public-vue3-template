<template>
  <div>
    test1

    <el-tag type="primary">hhhhh</el-tag>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup(props) {
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
})
</script>

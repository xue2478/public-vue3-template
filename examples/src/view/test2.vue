<template>
  <div>test2</div>
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

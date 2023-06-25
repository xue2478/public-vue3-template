<template>
  <div>
    <Pt3Layout :menus="menus" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup(props) {
    const state = reactive({
      menus: [
        {
          url: '/',
          title: 'home'
        },
        {
          url: '/test1',
          title: 'test1'
        },
        {
          url: '/test2',
          title: 'test2'
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

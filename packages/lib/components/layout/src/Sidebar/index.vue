<template>
  <div class="pt3-layout-left" :class="{ collapse: collapse }">
    <logo></logo>
    <menus :collapse="collapse" class="menus" v-bind="$attrs" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import menus from './Menus.vue'
export default defineComponent({
  name: 'sidebar',
  components: { menus },
  setup(props) {
    const state = reactive({
      collapse: false
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

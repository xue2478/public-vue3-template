<template>
  <div class="pt3-wrapper">
    <div class="pt3-left">
      <menusVue :menus="menus" />
    </div>
    <div class="pt3-main">
      <Tagsbar />
      <Content />
    </div>
  </div>
</template>

<script>
import menusVue from './Sidebar/index.vue'
import Content from './Content/index.vue'
import Tagsbar from './Tagsbar/index.vue'
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'Pt3Layout',
  components: { menusVue, Content, Tagsbar },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive({})
    return {
      ...toRefs(state)
    }
  }
})
</script>

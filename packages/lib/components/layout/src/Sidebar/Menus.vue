<template>
  <el-scrollbar class="scroll">
    <el-menu
      class="menu"
      :mode="mode"
      :collapse="collapse"
      :uniqueOpened="true"
      :router="true"
      :default-active="activePath"
      :text-color="variables.menuTextColor"
      :active-text-color="variables.menuActiveTextColor"
      :background-color="variables.menuBg"
    >
      <submenu v-for="menu in menus" :key="menu.url" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { computed, defineComponent } from 'vue'
import Submenu from './Submenu.vue'
// import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import config from './config/menu.module.scss'

export default defineComponent({
  components: {
    Submenu
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const route = useRoute()
    return {
      // menus: computed(() => store.state.menu.menus),
      activePath: computed(() => route.path),
      variables: computed(() => config)
    }
  }
})
</script>

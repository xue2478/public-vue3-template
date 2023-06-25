<template>
  <el-menu-item
    v-if="!menu.children"
    :index="menu.url"
    :route="{ path: menu.url, query: generateQ(menu) }"
  >
    <item :icon="menu.icon" :title="menu.title" />
  </el-menu-item>
  <el-sub-menu v-else :index="menu.url" popper-class="mainSubmain">
    <template #title>
      <item :icon="menu.icon" :title="menu.title" />
    </template>
    <submenu
      v-for="submenu in menu.children"
      :key="submenu.url"
      :is-nest="true"
      :menu="submenu"
    />
  </el-sub-menu>
</template>
<script>
import { defineComponent } from 'vue'
import Item from './Item.vue'
export default defineComponent({
  name: 'Submenu',
  components: {
    Item
  },
  props: {
    menu: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateQ(data) {
      if (!data.meta) return {}
      if (!data.meta.query) return {}
      return data.meta.query
    }
  }
})
</script>

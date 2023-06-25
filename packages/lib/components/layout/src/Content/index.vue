<template>
  <transition name="fade-transform" mode="out-in">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cacheList">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </transition>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const cacheList = computed(() => store.state.pt3Tag.cacheList)
    const key = computed(() => route.fullPath)
    return {
      cacheList,
      key
    }
  }
})
</script>
<style lang="scss" scoped>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

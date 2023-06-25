<template>
  <component class="icon" v-if="isElementIcon" :is="icon" />
  <svg-icon class="icon" v-else-if="!!icon" :name="icon" />
  <div v-else class="icon-text" :style="{ background: bg }">
    {{ icon ? icon : title.slice(0, 1) }}
  </div>
  <span>{{ title }}</span>
</template>

<script>
const bgList = ['#f89898', '#79bbff', '#67c23a', '#e8c086', '#b1b3b8']
import { computed, defineComponent } from 'vue'
import SvgIcon from '../../../SvgIcon'
export default defineComponent({
  props: ['title', 'icon'],
  components: { SvgIcon },
  setup({ icon }) {
    const isElementIcon = computed(() => {
      if (!icon) return false
      if (/^[\\/u4E00-\\/u9FA5]/.test(icon)) return true
      return false
    })
    const len = Math.floor(Math.random() * 5)
    return {
      isElementIcon,
      bg: bgList[len]
    }
  }
})
</script>
<style lang="scss" scoped>
.icon {
  margin-right: 3px;
  width: 16px !important;
  height: 16px !important;
  font-size: 16px;
  text-align: center;
  color: $menuTextColor;
  font-weight: 600;
}
.icon-text {
  display: none;
  font-size: 12px;
  margin-right: 6px;
  background: skyblue;
  color: #fff;
  height: 20px;
  line-height: 20px;
  padding: 0 4px;
  border-radius: 50%;
}
</style>
<style lang="scss">
.menu > .el-menu-item > .icon-text,
.menu > .el-sub-menu > .el-sub-menu__title > .icon-text {
  display: block;
}
</style>

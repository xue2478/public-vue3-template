<template>
  <div class="header">
    <div class="navigation">
      <Tagsbar />
    </div>
    <div class="action">
      <userinfo />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Userinfo from './Userinfo.vue'
import Tagsbar from '../Tagsbar/index.vue'
export default defineComponent({
  components: {
    Userinfo,
    Tagsbar
  },
  setup() {}
})
</script>
<style lang="scss" scoped>
.header {
  $actionW: 200px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 45px;
  &.no-border {
    border: none;
  }
  .navigation {
    position: absolute;
    bottom: 0;
    right: $actionW + 10;
    left: 10px;
  }
  .action {
    position: absolute;
    bottom: 0;
    right: 0;
    width: $actionW;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 13px;
  }
}
.mobile {
  padding-right: 0;
  ::v-deep(.logo) {
    max-width: 24px;
    max-height: 24px;
  }
  ::v-deep(.title) {
    display: none;
  }
}
.show-title {
  ::v-deep(.title) {
    display: block;
    color: #333;
  }
}
</style>

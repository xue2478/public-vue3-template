<template>
  <div class="brand">
    12
    <div class="titleDV">
      <div class="title">{{ sysTitle }}</div>
    </div>
    <div class="subTitleDV">
      <div class="title">{{ sysSubTitle }}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    sysTitle: String,
    sysSubTitle: String
  }
})
</script>
<style lang="scss" scoped>
.brand {
  padding: 0 20px 0;
  .title {
    color: #fff;
    font-size: 20px;
    white-space: nowrap;
    transition: all 0.5s;
    letter-spacing: 1px;
  }
  .titleDV {
    display: flex;
    align-items: flex-end;
    background: url('@/assets/logo.jpg') center/100% no-repeat;
    height: 80px;
    margin: 0 -20px;
    padding: 0 20px;
    .logo {
      cursor: pointer;
      width: 95.6px;
      height: 25px;
    }
    .title {
      letter-spacing: 1px;
      font-size: 19px;
      margin-bottom: 8px;
    }
  }
  .subTitleDV {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .title {
      line-height: 30px;
      font-weight: 600;
    }
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    opacity: 0.3;
    background: #98aae7;
    margin-top: 18px;
  }
}
</style>

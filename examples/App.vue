<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { broadband, groupList, btnList, columns, tableDt } from './test'
export default {
  name: 'App',
  data() {
    return {
      broadband,
      groupList,
      btnList,
      columns,
      tableDt: tableDt
    }
  },
  methods: {
    test(scope) {
      return 'test'
    },
    test1() {
      this.tableDt = [
        { nickName: 'test1', userEmail: '12345.98@com.cn' },
        { nickName: 'test2', userEmail: '12345.98fff@com.cn' }
      ]
    },
    test2(method, data) {
      console.log(method, data)
    }
  }
}
</script>

<style lang="scss"></style>

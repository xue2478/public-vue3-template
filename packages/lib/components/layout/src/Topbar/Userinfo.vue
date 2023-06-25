<template>
  <el-dropdown trigger="click">
    <div class="userinfo">
      <template v-if="!userinfo">
        <i class="el-icon-user" />
      </template>
      <template v-else>
        <el-icon class="icon"><Avatar /></el-icon>
        <span>
          {{ userinfo.name }}
        </span>
        <el-icon class="icon"><CaretBottom /></el-icon>
      </template>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <lock-modal />
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useUserinfo } from '@/components/Avatar/hooks/useUserinfo'
import LockModal from './LockModal.vue'

export default defineComponent({
  components: {
    LockModal
  },
  emits: ['logout'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()

    const userinfo = useUserinfo()

    // 退出
    const logout = () => {
      // 清除token
      // store.dispatch('app/clearToken')
      // router.push('/login')
      emit('logout')
    }

    return {
      userinfo,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.userinfo {
  margin-right: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4b4c57;
  .icon {
    font-size: 16px;
  }
  span {
    margin-right: 10px;
    margin-left: 5px;
  }
  &:hover {
    color: $mainColor;
  }
  .el-icon-user {
    font-size: 20px;
    margin-right: 8px;
  }
}
</style>

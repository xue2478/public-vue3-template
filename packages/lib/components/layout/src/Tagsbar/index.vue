<template>
  <div class="tags-container" :class="{ hide: !isTagsbarShow }">
    <el-icon class="OP-icon" @click="moveFun('left')" v-show="showArrow">
      <DArrowLeft />
    </el-icon>
    <div class="tagDV" ref="scrollP" id="tagsScrollParent">
      <div ref="scrollContainer">
        <router-link
          v-for="(tag, i) in tagList"
          :key="tag.fullPath"
          :to="tag"
          :ref="el => setItemRef(i, el)"
          custom
          v-slot="{ navigate, isExactActive }"
        >
          <div
            class="tags-item"
            :class="isExactActive ? 'active' : ''"
            @click="tagClickFun($event, navigate)"
            @click.middle="closeTag(tag)"
            @contextmenu.prevent="openMenu(tag, $event)"
          >
            <span class="title">{{ renderTagTitle(tag) }}</span>
            <el-icon
              v-if="!isAffix(tag)"
              @click.prevent.stop="closeTag(tag)"
              class="closeBtn"
            >
              <Close />
            </el-icon>
          </div>
        </router-link>
      </div>
      <iframe
        class="tIframe"
        id="tIframe"
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
    <el-icon class="OP-icon" @click="moveFun('right')" v-show="showArrow">
      <DArrowRight />
    </el-icon>
  </div>
  <ul
    v-show="visible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <li @click="refreshSelectedTag(selectedTag)">刷新</li>
    <li v-if="!isAffix(selectedTag)" @click="closeTag(selectedTag)">关闭</li>
    <li @click="closeOtherTags">关闭其他</li>
    <li @click="closeLeftTags">关闭左侧</li>
    <li @click="closeRightTags">关闭右侧</li>
    <li @click="closeAllTags">关闭全部</li>
  </ul>
</template>

<script>
import { defineComponent, computed, getCurrentInstance } from 'vue'
import { useTags } from './hooks/useTags'
import { useContextMenu } from './hooks/useContextMenu'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Tagsbar',
  mounted() {
    const instance = getCurrentInstance()
    instance.appContext.config.globalProperties.$tagsbar = this
  },
  setup() {
    const store = useStore()
    // const defaultSettings = computed(() => store.state.layoutSettings)
    // const isTagsbarShow = computed(() => defaultSettings.value.tagsbar.isShow)

    const isTagsbarShow = true

    const tags = useTags()
    const contextMenu = useContextMenu(tags.tagList)

    const onScroll = e => {
      tags.moveFun()
      contextMenu.closeMenu.value()
    }
    const renderTagTitle = tag => {
      if (tag.query && tag.query.tagRouterName) return tag.query.tagRouterName
      return tag.title
    }

    return {
      isTagsbarShow,
      onScroll,
      ...tags,
      ...contextMenu,
      renderTagTitle
    }
  }
})
</script>

<style lang="scss" scoped>
$h: 40px;
.tags-container {
  width: 100%;
  background: pink;
  display: flex;
  align-items: center;
  .tagDV {
    position: relative;
    flex: 1;
    height: 40px;
    & > div {
      transition: transform 0.5s;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 22;
    }
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    .tIframe {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
  .OP-icon {
    // background: yellowgreen;
    margin: 0;
    cursor: pointer;
  }
  &.hide {
    display: none;
  }
  .scroll-container {
    white-space: nowrap;
    overflow: hidden;
    ::v-deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
  }

  .tags-item {
    border-radius: 7px 7px 0px 0px;
    display: inline-block;
    box-sizing: border-box;
    color: $tabTextColor;
    background: $tabBg;
    padding: 0 20px;
    font-size: 14px;
    margin-left: -1px;
    margin: 0 3px;
    line-height: $h;
    cursor: pointer;
    &.active {
      color: $tabsActiveTextColor;
      background: $tabActiveBg;
    }
    .title {
      display: inline-block;
      vertical-align: top;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .closeBtn {
      margin-left: 10px;
      font-size: 12px;
      vertical-align: -1px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.8);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: $tabsActiveTextColor;
        color: #fff;
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  li {
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>

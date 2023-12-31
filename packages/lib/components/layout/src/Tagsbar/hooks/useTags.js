import { useScrollbar } from './useScrollbar'
import { watch, computed, ref, nextTick, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export const isAffix = tag => {
  return !!tag.meta && !!tag.meta.affix
}

export const useTags = () => {
  const store = useStore()
  const router = useRouter()
  console.log(store.state)
  const route = router.currentRoute
  const routes = computed(() => router.getRoutes())
  const tagList = computed(() => store.state.pt3Tag.tagList)

  const tagsItem = ref([])

  const setItemRef = (i, el) => {
    tagsItem.value[i] = el
  }

  const scrollbar = useScrollbar(tagsItem)

  watch(
    () => tagList.value.length,
    () => {
      tagsItem.value = []
    }
  )

  const filterAffixTags = routes => {
    return routes.filter(route => isAffix(route))
  }

  const initTags = () => {
    const affixTags = filterAffixTags(routes.value)

    for (const tag of affixTags) {
      if (tag.name) {
        store.dispatch('pt3Tag/addTag', tag)
      }
    }

    // 不在路由中的所有标签，需要删除
    const noUseTags = tagList.value.filter(tag =>
      routes.value.every(route => route.name !== tag.name)
    )
    noUseTags.forEach(tag => {
      store.dispatch('pt3Tag/delTag', tag)
    })
  }

  const addTag = () => {
    const tag = route.value
    console.log(
      routes,
      route.value,
      !!tag.name && tag.matched[0].components.default.name === 'layout'
    )
    // if (!!tag.name && tag.matched[0].components.default.name === 'layout') {
    if (tag.name) {
      store.dispatch('pt3Tag/addTag', tag)
    }
  }

  const saveActivePosition = tag => {
    const index = tagList.value.findIndex(
      item => item.fullPath === tag.fullPath
    )
    store.dispatch('pt3Tag/saveActivePosition', Math.max(0, index))
  }

  const moveToCurrentTag = () => {
    nextTick(() => {
      for (const tag of tagsItem.value) {
        if (!!tag && tag.to.path === route.value.path) {
          scrollbar.moveToTarget(tag)

          if (tag.to.fullPath !== route.value.fullPath) {
            store.dispatch('pt3Tag/updateTagList', route.value)
          }
          break
        }
      }
    })
  }

  onBeforeMount(() => {
    initTags()
    addTag()
    moveToCurrentTag()
  })

  watch(route, (newRoute, oldRoute) => {
    saveActivePosition(oldRoute) // 保存标签的位置
    addTag()
    moveToCurrentTag()
  })

  return {
    tagList,
    setItemRef,
    isAffix,
    ...scrollbar
  }
}

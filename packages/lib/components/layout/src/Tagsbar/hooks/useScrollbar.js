import { nextTick, onMounted, onUnmounted, reactive } from 'vue'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
function debounce(fn, wait) {
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}
export const useScrollbar = tagsItem => {
  const store = useStore()
  const scrollP = ref(null) //tab父级容器
  const scrollContainer = ref(null) //tab标签容器
  const showArrow = ref(false)
  const state = reactive({
    tagList: computed(() => store.state.pt3Tag.tagList),
    moveX: 0,
    count: 1,
    width: null
  })
  const calWidth = noInit => {
    nextTick(() => {
      const pw = scrollP.value.clientWidth
      const w = scrollContainer.value.scrollWidth // tab包含超出部分的宽度
      if (pw >= w) {
        showArrow.value = false
        state.moveX = 0
        state.count = 1
        scrollContainer.value.style.transform = 'none'
        return
      }
      // 超出
      state.count = Math.ceil(w / pw)
      state.moveX = 0
      showArrow.value = true
      const activeDv = document.querySelector('.tags-item.active').offsetLeft
      if (activeDv) {
        state.moveX = Math.floor(activeDv / pw)
        const tmp = -pw * state.moveX
        scrollContainer.value.style.transform = `translateX(${tmp}px)`
      }
    })
  }
  watch(
    () => state.tagList.length,
    () => {
      calWidth(true)
    },
    {
      immediate: true
    }
  )
  const moveFun = direction => {
    const pw = scrollP.value.clientWidth
    let tmp = pw
    console.log(state.moveX, state.count)
    // 向右
    if (direction == 'right') {
      if (state.moveX == state.count - 1) return
      tmp = -pw * ++state.moveX
    }
    if (direction == 'left') {
      if (state.moveX == 0) return
      tmp = -pw * --state.moveX
    }
    scrollContainer.value.style.transform = `translateX(${tmp}px)`
  }

  const tagClickFun = (e, fun) => {
    fun()
    let target = e.target

    if (!target.className.includes('tags-item')) {
      target = target.parentElement
    }
    const pw = scrollP.value.clientWidth
    let translateX = //移动的距离
      scrollContainer.value.style.transform.replace(/[^0-9]/gi, '') || 0
    translateX = Number(translateX)
    const offsetRight = target.offsetLeft - translateX + target.clientWidth
    const diff = offsetRight - pw
    if (diff > 0) {
      //最右边tab 隐藏的距离
      if (offsetRight > pw) {
        scrollContainer.value.style.transform = `translateX(${-(
          translateX + diff
        )}px)`
      }
    }
    // 最左边
    if (offsetRight > 0 && target.offsetLeft - translateX < 0) {
      scrollContainer.value.style.transform = `translateX(${-(
        translateX -
        (target.clientWidth - offsetRight)
      )}px)`
    }
  }

  const moveToTarget = currentTag => {
    if (!scrollContainer.value.scrollbar$ || scrollContainer.value.wrap$) return
    const containerWidth = scrollContainer.value.scrollbar$.offsetWidth
    const scrollWrapper = scrollContainer.value.wrap$
    const tagList = tagsItem.value

    let firstTag = null
    let lastTag = null

    if (tagList.length > 0) {
      firstTag = tagList[0]
      lastTag = tagList[tagList.length - 1]
    }
    if (firstTag === currentTag) {
      scrollWrapper.scrollLeft = 0
    } else if (lastTag === currentTag) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth
    } else {
      const el = currentTag.$el.nextElementSibling
      scrollWrapper.scrollLeft =
        el.offsetLeft + el.offsetWidth > containerWidth
          ? el.offsetLeft - el.offsetWidth
          : 0
    }
  }
  onMounted(() => {
    nextTick(() => {
      const el = document.getElementById('tagsScrollParent')
      let iframe = el.querySelector('.tIframe')
      iframe.contentWindow.onresize = debounce(calWidth, 1000)
    })
  })
  onUnmounted(() => {
    if (state.observer) {
      state.observer.disconnect()
      state.observer.takeRecords()
      state.observer = null
    }
  })

  return {
    showArrow,
    scrollP,
    scrollContainer,
    moveToTarget,
    moveFun,
    tagClickFun
  }
}

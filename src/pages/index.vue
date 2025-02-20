<script setup lang="ts">
import { setInitialWindowState, useWindowAnimation } from '~/composables/useWindowAnimation'

defineOptions({
  name: 'IndexPage',
})

const { startAnimation, isAnimating, isAnimationComplete, animateWindow } = useWindowAnimation()

// 修改iframe地址为代理页面
const iframeUrl = ref('http://localhost:8010/BUM35sTNIQ7eUg7y')

const { message } = useIframeMessage()

watch(message, (newMessage) => {
  console.log('收到消息---:', newMessage)
  animateWindow()
}, {
  deep: true,
})

onMounted(async () => {
  // 确保初始化完成后再开始动画
  await setInitialWindowState()
  startAnimation()
})
</script>

<template>
  <div
    h-100vh w-screen select-none bg-red-500
  >
    <!-- 外层容器作为可拖动区域 -->
    <div
      data-tauri-drag-region
      h-full w-full
    >
      <!-- 图标区域容器 -->
      <div
        data-tauri-drag-region
        w-full flex items-center px-4 py-2
      >
        <div
          i-carbon-campsite
          text-5xl
          @click="animateWindow"
        />
      </div>

      <iframe
        :src="iframeUrl"
        frameborder="0"
        class="absolute h-0 w-0 opacity-0"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  </div>
</template>

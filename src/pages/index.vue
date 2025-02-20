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
  <div h-100vh w-screen flex-col select-none>
    <!-- 图标区域容器 -->
    <div
      data-tauri-drag-region
      bg-red-500
      px-3
      py-2
      text-4xl
      transition-all
      duration-100
      hover:bg-red-600
    >
      <div
        data-tauri-drag-region
        i-carbon-campsite
        inline-block
      />
    </div>

    <!-- 调试控制区域 -->
    <div mt-4 px-4>
      <button
        :disabled="isAnimating"
        class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        @click="animateWindow"
      >
        重播动画
      </button>

      <div mt-2 text-sm>
        <p>动画状态: {{ isAnimating ? '播放中' : '已停止' }}</p>
        <p>动画完成: {{ isAnimationComplete ? '是' : '否' }}</p>
      </div>

      <iframe
        :src="iframeUrl"
        frameborder="0"
        class="h-full w-full"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  </div>
</template>

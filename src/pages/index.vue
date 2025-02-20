<script setup lang="ts">
import { setInitialWindowState, useWindowAnimation } from '~/composables/useWindowAnimation'

defineOptions({
  name: 'IndexPage',
})

const { startAnimation, isAnimating, isAnimationComplete, animateWindow } = useWindowAnimation()

onMounted(async () => {
  // 确保初始化完成后再开始动画
  await setInitialWindowState()
  startAnimation()
})
</script>

<template>
  <div h-100vh w-screen flex-col>
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
    </div>
  </div>
</template>

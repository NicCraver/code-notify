<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

// 初始化设置窗口位置
setWindowPosition()

onMounted(async () => {
  useWindowAnimation()
})
</script>

<template>
  <div h-100vh w-screen flex justify-end>
    <!-- 图标区域容器 -->
    <div
      data-tauri-drag-region bg-red-500 px-3 py-2 text-4xl transition-all duration-300 hover:bg-red-600
    >
      <div
        data-tauri-drag-region
        i-carbon-campsite
        inline-block
      />
    </div>
  </div>
</template>

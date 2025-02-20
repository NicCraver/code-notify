<script setup lang="ts">
import { setInitialWindowState, useWindowAnimation } from '~/composables/useWindowAnimation'

defineOptions({
  name: 'IndexPage',
})

const { startAnimation, animateWindow } = useWindowAnimation()
const iframeUrl = ref('http://localhost:8010/BUM35sTNIQ7eUg7y')
const { message } = useIframeMessage()

watch(message, (newMessage) => {
  console.log('收到消息---:', newMessage)
  animateWindow()
}, { deep: true })

onMounted(async () => {
  await setInitialWindowState()
  startAnimation()
})
</script>

<template>
  <div
    class="glass-effect"
    h-screen w-screen flex select-none items-center justify-start gap-2 overflow-hidden rd-3 px-2
  >
    <!-- 头部消息区域 -->
    <div
      @click="animateWindow"
    >
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="48" height="48" viewBox="0 0 48 48"><defs><clipPath id="master_svg0_29_67"><rect x="0" y="0" width="48" height="48" rx="8" /></clipPath></defs><g><g clip-path="url(#master_svg0_29_67)"><g><g><rect x="6" y="6" width="36" height="36" rx="8" fill="#FFCA28" fill-opacity="1" /></g></g></g><g><path d="M13.92,38L14.84,38L14.84,34.06C15.379999999999999,33.51,15.76,33.230000000000004,16.32,33.230000000000004C17.04,33.230000000000004,17.35,33.66,17.35,34.68L17.35,38L18.259999999999998,38L18.259999999999998,34.56C18.259999999999998,33.18,17.740000000000002,32.43,16.6,32.43C15.86,32.43,15.29,32.84,14.78,33.36L14.76,33.36L14.67,32.57L13.92,32.57L13.92,38ZM22.130000000000003,38.13C23.46,38.13,24.64,37.09,24.64,35.29C24.64,33.480000000000004,23.46,32.43,22.130000000000003,32.43C20.8,32.43,19.62,33.480000000000004,19.62,35.29C19.62,37.09,20.8,38.13,22.130000000000003,38.13ZM22.130000000000003,37.37C21.189999999999998,37.37,20.56,36.54,20.56,35.29C20.56,34.04,21.189999999999998,33.2,22.130000000000003,33.2C23.07,33.2,23.71,34.04,23.71,35.29C23.71,36.54,23.07,37.37,22.130000000000003,37.37ZM27.59,38.13C27.93,38.13,28.29,38.03,28.6,37.93L28.42,37.24C28.240000000000002,37.32,28,37.39,27.8,37.39C27.17,37.39,26.96,37.01,26.96,36.35L26.96,33.31L28.439999999999998,33.31L28.439999999999998,32.57L26.96,32.57L26.96,31.04L26.2,31.04L26.1,32.57L25.240000000000002,32.62L25.240000000000002,33.31L26.05,33.31L26.05,36.32C26.05,37.41,26.439999999999998,38.13,27.59,38.13ZM29.66,38L30.58,38L30.58,32.57L29.66,32.57L29.66,38ZM30.12,31.45C30.48,31.45,30.73,31.21,30.73,30.84C30.73,30.490000000000002,30.48,30.25,30.12,30.25C29.76,30.25,29.52,30.490000000000002,29.52,30.84C29.52,31.21,29.76,31.45,30.12,31.45ZM31.82,33.31L32.56,33.31L32.56,38L33.47,38L33.47,33.31L34.620000000000005,33.31L34.620000000000005,32.57L33.47,32.57L33.47,31.71C33.47,31.009999999999998,33.72,30.64,34.239999999999995,30.64C34.43,30.64,34.65,30.69,34.85,30.79L35.05,30.08C34.8,29.98,34.480000000000004,29.91,34.14,29.91C33.06,29.91,32.56,30.6,32.56,31.7L32.56,32.57L31.82,32.62L31.82,33.31ZM35.75,40.34C36.83,40.34,37.4,39.519999999999996,37.78,38.46L39.82,32.57L38.93,32.57L37.95,35.58C37.81,36.07,37.65,36.62,37.510000000000005,37.12L37.46,37.12C37.269999999999996,36.61,37.09,36.06,36.92,35.58L35.82,32.57L34.870000000000005,32.57L37.05,38.01L36.93,38.42C36.7,39.09,36.32,39.59,35.71,39.59C35.56,39.59,35.4,39.54,35.29,39.5L35.11,40.230000000000004C35.28,40.3,35.5,40.34,35.75,40.34Z" fill="#3D3D3D" fill-opacity="1" /></g></g></svg>
    </div>

    <div text-sm text-white>
      {{ message?.notification?.message || '暂无消息' }}
    </div>

    <!-- iframe 使用绝对定位 -->
    <iframe
      :src="iframeUrl"
      frameborder="0"
      absolute left-0 top-0 h-0 w-0 opacity-0
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  </div>
</template>

<style scoped>
.glass-effect {
  background-color: #303235;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

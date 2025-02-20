export function useIframeMessage() {
  const message = ref('')
  // 只处理消息
  const handleMessage = (event: MessageEvent) => {
    console.log('收到消息:', event.data)
    message.value = event.data
  }

  onMounted(() => {
    window.addEventListener('message', handleMessage)
  })

  onUnmounted(() => {
    window.removeEventListener('message', handleMessage)
  })

  return {
    message,
  }
}

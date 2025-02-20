<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'

defineOptions({
  name: 'IndexPage',
})
onMounted(async () => {
  await getCurrentWindow().setShadow(false)
})
</script>

<template>
  <div>
    <div data-tauri-drag-region h-80px w-80px bg-red-500 text-4xl>
      <div data-tauri-drag-region i-carbon-campsite inline-block />
    </div>
  </div>
</template>

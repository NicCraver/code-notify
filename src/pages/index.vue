<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
onMounted(async () => {
  useWindowAnimation()
})
</script>

<template>
  <div h-100vh w-100vh flex justify-end border-2 border-red-500>
    <div data-tauri-drag-region bg-red-500 text-4xl>
      <div data-tauri-drag-region i-carbon-campsite inline-block />
    </div>
  </div>
</template>

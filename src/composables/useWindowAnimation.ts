import { getCurrentWindow, LogicalSize, PhysicalPosition, primaryMonitor } from '@tauri-apps/api/window'
import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

// 动画配置
const ANIMATION_DURATION = 300 // 动画持续时间（毫秒）
const FINAL_WIDTH = 340
const FINAL_HEIGHT = 60
const ANIMATION_STEPS = 30 // 动画步数
const MARGIN_RIGHT = 30 // 距离右边缘的距离

export const isAnimating = ref(false)
export const isAnimationComplete = ref(false)

// 计算窗口位置
async function calculatePositions() {
  const monitor = await primaryMonitor()
  if (!monitor)
    return null

  const screenWidth = monitor.size.width
  const finalX = screenWidth - FINAL_WIDTH * 2 - MARGIN_RIGHT // 最终位置
  const finalY = 120

  return {
    start: {
      x: screenWidth + FINAL_WIDTH - MARGIN_RIGHT, // 起始位置完全在屏幕外
      y: finalY,
    },
    final: {
      x: finalX,
      y: finalY,
    },
  }
}

// 设置窗口初始位置和大小
export async function setInitialWindowState() {
  const window = getCurrentWindow()
  const positions = await calculatePositions()
  if (!positions)
    return

  // 设置窗口到屏幕外，但保持完整宽度
  await window.setPosition(new PhysicalPosition(positions.start.x, positions.start.y))
  await window.setSize(new LogicalSize(FINAL_WIDTH, FINAL_HEIGHT))

  // 等待一小段时间确保窗口状态已更新
  await new Promise(resolve => setTimeout(resolve, 100))
}

// 执行窗口动画
export async function animateWindow() {
  if (isAnimating.value)
    return

  try {
    isAnimating.value = true
    isAnimationComplete.value = false

    const window = getCurrentWindow()
    const positions = await calculatePositions()
    if (!positions)
      return

    // 重置窗口初始状态
    await setInitialWindowState()

    // 执行动画
    for (let i = 1; i <= ANIMATION_STEPS; i++) {
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION / ANIMATION_STEPS))
      const progress = i / ANIMATION_STEPS

      // 使用缓动函数使动画更自然
      const easeProgress = 1 - (1 - progress) ** 3 // cubic ease-out

      // 计算当前位置
      const xDiff = positions.final.x - positions.start.x
      const currentX = positions.start.x + (xDiff * easeProgress)

      // 更新窗口位置，保持宽度不变
      await window.setPosition(new PhysicalPosition(Math.floor(currentX), positions.final.y))
    }
  }
  catch (error) {
    console.error('Animation error:', error)
  }
  finally {
    isAnimating.value = false
    isAnimationComplete.value = true
  }
}

// 延迟启动动画
export function useWindowAnimation(delay = 100) {
  const { start: startAnimation } = useTimeoutFn(() => {
    animateWindow()
  }, delay)

  return {
    startAnimation,
    isAnimating,
    isAnimationComplete,
    animateWindow,
  }
}

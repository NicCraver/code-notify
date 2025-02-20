import { getCurrentWindow, LogicalSize, PhysicalPosition, primaryMonitor } from '@tauri-apps/api/window'

export async function useWindowAnimation() {
  // 获取当前窗口
  const window = getCurrentWindow()

  const windowWidth = 100
  const windowHeight = 100

  // 设置窗口大小
  await window.setSize(new LogicalSize(windowWidth, windowHeight))

  // 获取主显示器信息
  const monitor = await primaryMonitor()
  if (!monitor)
    return

  const xPos = monitor.size.width - windowWidth * 2 - 50
  const yPos = 100

  // 设置窗口位置
  await window.setPosition(new PhysicalPosition(xPos, yPos))
}

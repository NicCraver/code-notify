import { getCurrentWindow, LogicalSize, PhysicalPosition, primaryMonitor } from '@tauri-apps/api/window'

// 设置窗口位置的函数
export async function setWindowPosition() {
  // 获取当前窗口
  const window = getCurrentWindow()
  const windowWidth = 300
  const windowHeight = 100

  // 设置窗口大小
  await window.setSize(new LogicalSize(windowWidth, windowHeight))
  const monitor = await primaryMonitor()
  if (!monitor)
    return

  const xPos = monitor.size.width - windowWidth * 2 - 50
  const yPos = 100

  await window.setPosition(new PhysicalPosition(xPos, yPos))
}

export async function useWindowAnimation() {
  // 获取当前窗口
  const window = getCurrentWindow()
  console.log('window', window)
}

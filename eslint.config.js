import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  ignores: [
    'src-tauri/Cargo.toml',
    'src-tauri/target/*',
    'vite-env.d.ts',
  ],
  rules: {
    'no-console': 'off', // 禁用console警告
    'unused-imports/no-unused-vars': 'off', // 禁用未使用导入警告
    'no-unused-vars': 'off', // 禁用未使用变量警告
  },
})

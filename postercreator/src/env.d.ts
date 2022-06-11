/// <reference types="vite/client" />
import { TinyEmitter } from 'tiny-emitter'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $emitter: TinyEmitter;  // 声明全局方法
  }
}
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// initGlobalAPI中实现Vue的set,delete,nextTick,observable,use,mixin,extend,component,directive,filter等全部方法
// Vue 传入参数中实现对Vue.prototype的扩展，Vue.prototype._init
// Vue类在构造方法中执行this._init(options)
// 
  // initLifecycle(vm)
  // initEvents(vm)
  // initRender(vm)
  // callHook(vm, 'beforeCreate')
  // initInjections(vm) // resolve injections before data/props
  // initState(vm) // resolve props, methods, data, computed, watch
  // initProvide(vm) // resolve provide after data/props
  // callHook(vm, 'created')
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue

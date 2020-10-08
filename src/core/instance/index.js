import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
  const vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  */
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue) ) { //  不是生产环境，也不是Vue 的实例
    warn('Vue is a constructor and should be called with the `new` keyword') // this 指向构造出来的实例，非构造函数时执行window || global
  }
  this._init(options) // initMixin中Vue原型链中扩展方法_init： Vue.prototype._init = function (options?: Object) {}
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue) // 执行installRenderHelpers方法安装渲染工具, ```Vue.prototype._c，Vue.prototype._m，Vue.prototype._v，Vue.prototype._s ```这几个函数的定义扩展

export default Vue

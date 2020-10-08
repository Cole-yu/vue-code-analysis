/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  // 消息盒子提供添加功能（面向对象程序设计思想）
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  // 消息盒子提供删除功能（面向对象程序设计思想）
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) { // Dep.target = watcher实例，是否存在watcher
      // Dep.target 会触发watcher实例的get属性（Object.defineProperty),执行pushTarget(this)，实现Dep.target = target = watcher实例
      // Dep.target.addDep(this) = watcher实例.addDep(this)
      Dep.target.addDep(this) // watcher.addDep(this) 执行效果 dep.addSub(this)，最终结果就是向this.subs中添加一个watcher实例
    }
  }

  // 发布-订阅方式
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() // 依赖收集容器里的watcher实例都会通知一遍
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

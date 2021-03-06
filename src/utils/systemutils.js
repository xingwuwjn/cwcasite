/* eslint-disable prefer-const */
import { getSysMenus } from '@/api/systemapi'
import { Message } from 'element-ui'

export const isNotNullORBlank = (...args) => {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i]
    if (argument == null || argument === '' || argument === undefined) {
      Message.warning({ message: '数据不能为空!' })
      return false
    }
  }
  return true
}
export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  getSysMenus.then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      store.commit('initMenu', fmtRoutes)
      store.dispatch('connect')
    }
  })
}
export const formatRoutes = (routes) => {
  const fmRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      meta,
      iconCls,
      children
    } = router
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    const fmRouter = {
      path: path,
      component(resolve) {
        if (component.startsWith('SysBasic')) {
          require(['@/views/system/' + component + '.vue'], resolve)
        } else if (component.startsWith('SysUser')) {
          require(['@/views/system/' + component + '.vue'], resolve)
        } else if (component.startsWith('dashboard')) {
          require(['@/views/system/' + component + '.vue'], resolve)
        }
      },
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}

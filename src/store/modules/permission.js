import { constantRouterMap } from '@/router'
import { getSysMenus } from '@/api/systemapi'

// 将菜单树中的组件转化为vue中真实的组件
const formatRoutes = (routes) => {
  const fmRoutes = []
  routes.forEach(router => {
    if (router.children && router.children instanceof Array) {
      router.children = formatRoutes(router.children)
    }
    const fmRouter = {
      path: router.path,
      component(resolve) {
        if (router.component.startsWith('Layout')) {
          require(['@/views/layout/Layout'], resolve)
        } else if (router.component.startsWith('DashBoard')) {
          require(['@/views/dashboard/index'], resolve)
        } else if (router.component.startsWith('Users')) {
          require(['@/views/system/SysUser'], resolve)
        } else if (router.component.startsWith('Role')) {
          require(['@/views/system/SysBasic'], resolve)
        } else if (router.component.startsWith('ApplyInfo')) {
          require(['@/views/examination/applyinfo'], resolve)
        } else if (router.component.startsWith('Applyinfofile')) {
          require(['@/views/examination/applyinfofile'], resolve)
        } else if (router.component.startsWith('GtApplyInfo')) {
          require(['@/views/examination/applyinfo_gt'], resolve)
        } else if (router.component.startsWith('GtApplyinfofile')) {
          require(['@/views/examination/applyinfofile_gt'], resolve)
        }
      },
      name: router.name,
      iconCls: router.iconCls,
      meta: router.meta,
      children: router.children,
      hidden: router.hidden,
      redirect: router.redirect
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    getRouters({ commit }) {
      return new Promise((resolve, reject) => {
        getSysMenus().then(response => {
          const data = response.data
          const routers = formatRoutes(data)
          commit('SET_ROUTERS', routers)
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export default permission

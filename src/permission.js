import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {  //已拉取
        next()
      } else {  //未拉取info
        try {  // 拉取info
          // note: 角色必须是对象数组! such as: ['admin'] or ,['developer','editor']
          const data  = await store.dispatch('user/getInfo')
          const roles = [];
          roles.push(data.role_id)
          // 基于角色生成可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })

          /* store.dispatch('user/getInfo').then(res => { // 拉取user_info
          let roles = [];
          roles.push(res.role_id)
          console.log(store)
          store.dispatch('permission/generateRoutes', roles).then(() => { // 根据roles权限生成可访问的路由表
          console.log(accessRoutes)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          }) */
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

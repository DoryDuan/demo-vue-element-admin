import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/sample-manage',
    meta: { 
      title: '样本管理', 
      icon: 'edit'
    },
    children: [
      {
        path: 'sample-manage',
        component: () => import('@/views/sampleManage/index'),
        name: 'sampleManage',
        meta: { title: '样本管理'}
      }
    ]
  },
  {
    path: '/library',
    component: Layout,
    redirect: '/library/index',
    meta: { 
      title: '文库管理', 
      icon: 'guide', 
      roles: ['admin','doctor'] 
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/library/index'),
        name: 'library',
        meta: { 
          title: '文库管理',
          roles: ['admin','doctor']
        }
      }
    ]
  },
  {
    path: '/data-analysis',
    component: Layout,
    redirect: '/data-analysis/batch',
    name: 'dataAnalysis',
    meta: { 
      title: '数据分析', 
      icon: 'education', 
      roles: ['admin','doctor'] 
     },
    children: [
      {
        path: 'batch',
        component: () => import('@/views/dataAnalysis/batch'),
        name: 'batchAnalysis',
        meta: { 
          title: '批次分析' ,
          roles: ['admin','doctor']
        }
      },
      {
        path: 'sample',
        component: () => import('@/views/dataAnalysis/sample'),
        name: 'sampleAnalysis',
        meta: { 
          title: '样本分析',
          roles: ['admin','doctor'] 
        }
      },
      {
        path: 'mutation',
        component: () => import('@/views/dataAnalysis/mutation'),
        name: 'mutationAnalysis',
        meta: { 
          title: '突变分析',
          roles: ['admin','doctor']
        }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/index',
    meta: { 
      title: '报告管理', 
      icon: 'pdf',
      roles: ['admin','doctor'] 
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/report/index'),
        name: 'report',
        meta: { 
          title: '报告管理',
          roles: ['admin','doctor']
        },
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    meta: { 
      title: '账号设置', 
      icon: 'people'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/account/index'),
        name: 'account',
        meta: { 
          title: '账号设置'
        },
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    name: 'Permission',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'userPermission',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'log',
        component: () => import('@/views/permission/log'),
        name: 'logPermission',
        meta: {
          title: '系统日志',
          roles: ['admin']
          // if do not set roles, means: this page does not require permission
        }
      },
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

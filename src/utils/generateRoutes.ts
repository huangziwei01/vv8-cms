import { RouteRecordRaw } from 'vue-router'
let firstRoute: any = null
export default function (userMenu: any[]) {
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles: any = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in routeFiles) {
    allRoutes.push(routeFiles[key].default)
  }
  // console.log(allRoutes)

  const _recurseGetRoute = function (menus: any[]) {
    for (const menu of menus) {
      if (menu.type == 2) {
        const route: any = allRoutes.find((moudle: any) => {
          return moudle.path === menu.url
        })
        if (route) {
          routes.push(route)
        }
        if (!firstRoute) {
          firstRoute = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenu)
  // console.log(routes)

  return routes
}

export { firstRoute }

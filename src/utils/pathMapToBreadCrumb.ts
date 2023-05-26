import { IBreadCrumb } from '@/base-ui/breadcrumb/types'

export const pathMapToBreadCrumb = (userMenu: any[], pathUrl: string) => {
  const breadCrumbs: IBreadCrumb[] = []
  for (const menu of userMenu) {
    if (menu.type == 1) {
      let findMenu: any = pathMapToBreadCrumb(menu.children, pathUrl)
      if (findMenu) {
        breadCrumbs.push({ name: menu.name })
        breadCrumbs.push({ name: findMenu.name, path: findMenu.url })
        return breadCrumbs
      }
    } else if (menu.type == 2) {
      if (menu.url == pathUrl) {
        return menu
      }
    }
  }
}

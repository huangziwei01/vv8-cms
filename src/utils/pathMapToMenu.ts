export const pathMapToMenu = (userMenu: any[], pathUrl: string) => {
  for (const menu of userMenu) {
    if (menu.type == 1) {
      let findMenu: any = pathMapToMenu(menu.children, pathUrl)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type == 2) {
      if (menu.url == pathUrl) {
        return menu
      }
    }
  }
}

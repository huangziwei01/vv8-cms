export default function getLeafKeys(menuList: any[]) {
  const res: number[] = []
  const _rescure = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _rescure(menu.children)
      } else {
        res.push(menu.id)
      }
    }
  }
  _rescure(menuList)
  return res
}

export const contentTableConfig = {
  // title: '菜单列表',
  // newBtnTitle: '新建菜单',
  propList: [
    { prop: 'name', label: 'menuName', minWidth: '100' },
    { prop: 'type', label: 'type', minWidth: '80' },
    { prop: 'url', label: 'menuUrl', minWidth: '100' },
    { prop: 'icon', label: 'icon', minWidth: '100' },
    { prop: 'sort', label: 'sort', minWidth: '80' },
    { prop: 'permission', label: 'permission', minWidth: '100' },
    {
      prop: 'createAt',
      label: 'createAt',
      minWidth: '120',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: 'updateAt',
      minWidth: '120',
      slotName: 'update'
    },
    { label: 'operate', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}

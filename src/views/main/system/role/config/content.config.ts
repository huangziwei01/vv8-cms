export const contentTableConfig = {
  // title: '角色列表',
  // newBtnTitle: '新建角色',
  propList: [
    { prop: 'name', label: 'role', minWidth: '120' },
    { prop: 'intro', label: 'intro', minWidth: '120' },
    {
      prop: 'createAt',
      label: 'createAt',
      minWidth: '220',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: 'updateAt',
      minWidth: '220',
      slotName: 'update'
    },
    { label: 'operate', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

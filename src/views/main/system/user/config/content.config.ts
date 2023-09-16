export const contentTableConfig = {
  // title: '用户列表',
  // newBtnTitle: '新建用户',
  propList: [
    { prop: 'name', label: 'username', minWidth: '100' },
    { prop: 'realname', label: 'realname', minWidth: '120' },
    { prop: 'cellphone', label: 'cellphone', minWidth: '150' },
    { prop: 'enable', label: 'enable', minWidth: '100', slotName: 'status' },
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
  showIndexColumn: true,
  showSelectColumn: true
}

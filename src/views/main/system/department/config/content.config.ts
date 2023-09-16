export const contentTableConfig = {
  // title: '部门列表',
  propList: [
    { prop: 'name', label: 'department', minWidth: '120' },
    { prop: 'leader', label: 'departmentLeader', minWidth: '120' },
    // { prop: 'parentId', label: '上级部门', minWidth: '120' },
    {
      prop: 'createAt',
      label: 'createAt',
      minWidth: '150',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: 'updateAt',
      minWidth: '150',
      slotName: 'update'
    },
    { label: 'operate', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}

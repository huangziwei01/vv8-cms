import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  // title: '新建部门',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'department',
      placeHolder: 'departmentPlaceHolder'
    },
    {
      field: 'parentId',
      type: 'select',
      label: 'parentDepartment',
      placeHolder: 'parentDepartmentPlaceHolder',
      options: []
    },
    {
      field: 'leader',
      type: 'input',
      label: 'departmentLeader',
      placeHolder: 'departmentLeaderPlaceHolder'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

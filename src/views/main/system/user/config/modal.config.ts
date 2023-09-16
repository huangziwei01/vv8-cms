import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  // title: '新建用户',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'username',
      placeHolder: 'usernamePlaceHolder'
    },
    {
      field: 'realname',
      type: 'input',
      label: 'realname',
      placeHolder: 'realnamePlaceHolder',
      rules: [{ required: true }]
    },
    {
      field: 'password',
      type: 'password',
      label: 'password',
      placeHolder: 'passwordPlaceHolder',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: 'cellphone',
      placeHolder: 'cellphonePlaceHolder'
    },
    {
      field: 'roleId',
      type: 'select',
      label: 'role',
      placeHolder: 'rolePlaceHolder',
      options: []
    },
    {
      field: 'departmentId',
      type: 'select',
      label: 'department',
      placeHolder: 'departmentPlaceHolder',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

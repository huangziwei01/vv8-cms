import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  // title: '新建角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'role',
      placeHolder: 'rolePlaceHolder'
    },
    {
      field: 'intro',
      type: 'input',
      label: 'intro',
      placeHolder: 'introPlaceHolder'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}

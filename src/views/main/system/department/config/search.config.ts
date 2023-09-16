import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'department',
      placeHolder: 'departmentPlaceHolder',
      rules: []
    },
    {
      field: 'leader',
      type: 'input',
      label: 'departmentLeader',
      placeHolder: 'departmentLeaderPlaceHolder',
      rules: []
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: 'createAt',
      rules: [],
      otherOption: {
        // startPlaceholder: '开始时间',
        // endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 }
}

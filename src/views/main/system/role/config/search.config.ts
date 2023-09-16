import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'role',
      placeHolder: 'rolePlaceHolder',
      rules: []
    },
    {
      field: 'intro',
      type: 'input',
      label: 'intro',
      placeHolder: 'introPlaceHolder',
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
  colLayout: {
    xl: 6, // ≥1920px
    lg: 8, // ≥1200px
    md: 12, // ≥992px
    sm: 24, // ≥768px
    xs: 24 // <768px
  }
}

import { IForm } from '@/base-ui/form'
// import { useI18n } from 'vue-i18n'
// const i18n = useI18n()

// const i18nUserName = i18n.t('username')

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: 'username',
      placeHolder: 'usernamePlaceHolder',
      rules: []
    },
    {
      field: 'realname',
      type: 'input',
      label: 'realname',
      placeHolder: 'realnamePlaceHolder',
      rules: []
    },
    {
      field: 'cellphone',
      type: 'input',
      label: 'cellphone',
      placeHolder: 'cellphonePlaceHolder',
      rules: []
    },
    {
      field: 'enable',
      type: 'select',
      label: 'enable',
      placeHolder: 'enablePlaceHolder',
      rules: [],
      options: [
        { label: 'enabled', value: 1 },
        { label: 'unenabled', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: 'createAt',
      rules: [],
      otherOption: {
        // startPlaceholder: 'createAt',
        // endPlaceholder: 'endAt',
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

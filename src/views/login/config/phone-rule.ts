export const phoneRule = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      // ^表示开头 $表示结尾
      pattern: /^[a-z0-9]{5,16}$/,
      message: '用户名必须是5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // ^表示开头 $表示结尾
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}

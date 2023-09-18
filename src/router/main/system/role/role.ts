const role = () => import('@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: [],
  meta: {
    title: '角色管理'
  }
}

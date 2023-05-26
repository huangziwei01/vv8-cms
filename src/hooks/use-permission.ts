import { useUserStore } from '@/store/user/user'

export function usePermission(pageName: string, handleName: string) {
  const userStore = useUserStore()
  const permissions = userStore.userPermissions
  const handlePermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item.indexOf(handlePermission) !== -1)
}

import menus, { ProfileMenus } from '../components/Profile/profiles-menus'

export function usePageInfo(id: string) {
  return menus.find((item: ProfileMenus) => item.id == id)
}

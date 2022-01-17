import menus, { ProfileMenus } from '../services/profiles-menus'

export function usePageInfo(id: string) {
  return menus.find((item: ProfileMenus) => item.id == id)
}

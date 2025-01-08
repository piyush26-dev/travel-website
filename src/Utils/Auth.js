import { getItemLocalStorage } from "./browserServices"

export const isLogin = () => {
  const token = getItemLocalStorage("admin_token")
  if (token) return true
  else return false
}
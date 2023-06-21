/* 
  持久化数据到storage中
*/
import store from "store"
const USER_KEY = 'user_key'
const storageUtils = {
  saveUser(user) {
    // window.localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },
  getUser() {
    // return JSON.parse(window.localStorage.getItem(USER_KEY) || "{}")
    return store.get(USER_KEY)
  },
  removeUser() {
    // window.localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}

export default storageUtils
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', {
  state: () => {
    return { user: null }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setUsers(user) {
      this.user = user
      console.log(this.user);
    }
  },
})
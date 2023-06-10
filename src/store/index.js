import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'mainStore',
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
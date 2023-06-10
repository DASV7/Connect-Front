import { defineStore } from 'pinia'

export const useCounterStore = defineStore('events', {
    state: () => {
        return { newNotification: [] }
    },
    actions: {
        setUsers(noti) {
            this.newNotification = noti
        }
    },
})
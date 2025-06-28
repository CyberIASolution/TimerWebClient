import { defineStore } from 'pinia'

export const useIdStore = defineStore('id', {
  state: () => {
    return { userId: "" }
  },
  actions: {
    setUserId(value) {
      this.userId = value;
    }
  }
})

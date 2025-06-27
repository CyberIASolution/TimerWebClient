import { defineStore } from 'pinia'

export const useIdStore = defineStore('id', {
  state: () => {
    return { userId: "" }
  },
})

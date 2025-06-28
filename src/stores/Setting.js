import { defineStore } from "pinia";
import { useIdStore } from "./Id.js";

const url = import.meta.env.VITE_SERVER_URL + "/setting";
const headers = { "content-type": "application/json" };
const method = "POST";


export const useSettingStore = defineStore('setting', {
  state: () => {
    return { minuteCost: 0 }
  },
  actions: {
    getMinuteCost() {
      return this.minuteCost;
    },

    setMinuteCost(value) {
      this.minuteCost = value;

      const body = createBody(value);
      fetch(url, { headers, method, body })
        .catch(console.log);
    }
  }
});


function createBody(value) {
  const id = useIdStore()
  return JSON.stringify({
    "minuteCost": value,
    "userId": id.userId
  });
}

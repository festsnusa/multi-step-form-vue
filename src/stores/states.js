import { defineStore } from 'pinia'

export default defineStore('states', {
  state: () => {
    return {
      monthly: true,
      selectedPlan: { "title": "Arcade", "monthly": "$9/mo", "yearly": "$90/yr" },
      selectedAddons: [],
    };
  },
  // persist: true,
})
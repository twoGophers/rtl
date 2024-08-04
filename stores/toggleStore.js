import { defineStore } from 'pinia';

export const useToggleStore = defineStore('toggle', {
  state: () => ({
    isChecked: false,
  }),
  actions: {
    toggle() {
      this.isChecked = !this.isChecked;
    },
  },
});
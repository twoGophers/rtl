import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
  state: () => ({
    list: [
      { name: 'John', id: 1, count: 4, img: 'path/to/image1.jpg' },
      { name: 'Joao', id: 2, count: 2, img: 'path/to/image2.jpg' },
      { name: 'Jean', id: 3, count: 5, img: 'path/to/image3.jpg' },
      ...Array.from({ length: 22 }, (_, i) => ({ name: '', id: 4 + i, count: 0, img: '' })),
    ],
  }),
  actions: {
    deleteItem(id) {
      this.list = this.list.filter(item => item.id !== id);
    },
    updateItem(updatedItem) {
      const index = this.list.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.list[index] = updatedItem;
      }
    },
  },
});

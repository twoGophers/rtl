import { defineStore } from 'pinia';

export const useListStore = defineStore('list', {
  state: () => ({
    list: [
      { title: 'John', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 1, count: 4, img: 'https://img.freepik.com/free-photo/a-dog-made-by-the-artist_1340-37216.jpg?w=1380&t=st=1722759332~exp=1722759932~hmac=22451e2d0a079090fd93300a2d90291ec22236f6fa7f65933f3b13351d36fca7' },
      { title: 'Joao', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 2, count: 2, img: 'https://img.freepik.com/free-photo/a-cartoon-dog-with-a-pink-nose-and-a-white-nose_1340-37220.jpg?w=1380&t=st=1722759385~exp=1722759985~hmac=b8e88510f36c2dd02ced310e918a438149aed579792b51640fe6236b6fff0e88' },
      { title: 'Jean', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 3, count: 5, img: 'https://img.freepik.com/free-photo/close-up-on-kitten-exploring-nature_23-2150782399.jpg?w=1480&t=st=1722759408~exp=1722760008~hmac=992887c4528525de99c958b3428d642192aaa1e92b7a94a8c0b1198825e0fa31' },
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

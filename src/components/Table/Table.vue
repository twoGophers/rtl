<template>
    <div>
      <div class="list border">
        <draggable
          class="list-group"
          :list="list"
          @end="log"
          :move="checkMove"
          item-key="id"
        >
          <div
            class="list-item list-group-item"
            v-for="(element, index) in list"
            :key="index"
            @mouseover="showDetails(element)"
            @mouseleave="hideDetails"
            @click="openEditModal(element)"
          >
            {{ element.name }}
            <span v-if="element.count > 0" class="list-count">{{ element.count }}</span>
            <div v-if="hoveredItem && hoveredItem.id === element.id" class="hover-details">
              <img :src="element.img" alt="image" />
              <p>{{ element.name }}</p>
              <button @click.stop="deleteItem(element.id)">Delete</button>
            </div>
          </div>
        </draggable>
      </div>
  
      <div v-if="editItem" class="edit-modal">
        <div class="modal-content">
          <img :src="editItem.img" alt="image" />
          <p>{{ editItem.name }}</p>
          <input type="number" v-model="editItem.count" />
          <button @click="saveItem">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useListStore } from '../../../store/listStore';
  import { VueDraggableNext } from 'vue-draggable-next';
  
  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    setup() {
      const listStore = useListStore();
      const hoveredItem = ref(null);
      const editItem = ref(null);
  
      const showDetails = (item) => {
        hoveredItem.value = item;
      };
  
      const hideDetails = () => {
        hoveredItem.value = null;
      };
  
      const openEditModal = (item) => {
        editItem.value = { ...item };
      };
  
      const saveItem = () => {
        listStore.updateItem(editItem.value);
        savePositions(); // Call savePositions after updating the item
        editItem.value = null;
      };
  
      const deleteItem = (id) => {
        listStore.deleteItem(id);
        savePositions(); // Call savePositions after deleting the item
      };
  
      const savePositions = () => {
        const savedList = JSON.stringify(listStore.list);
        localStorage.setItem('savedList', savedList);
      };
  
      return {
        list: listStore.list,
        hoveredItem,
        editItem,
        showDetails,
        hideDetails,
        openEditModal,
        saveItem,
        deleteItem,
        savePositions,
        log(event) {
          console.log(event);
        },
        checkMove() {
          return true;
        },
      };
    },
  });
  </script>
  
  <style scoped>
  .list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    overflow: hidden;
  }
  
  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 105px;
    outline: 1px solid #4D4D4D;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  
  .list-group {
    display: contents;
  }
  
  .sortable-chosen {
    border-radius: 24px;
    border: 1px solid #4D4D4D;
    cursor: grabbing;
  }
  
  .sortable-chosen .list-count {
    opacity: 0;
  }
  
  .list-count {
    position: absolute;
    bottom: 0;
    right: 0;
    border: 1px solid #4D4D4D;
    width: 16px;
    height: 16px;
    border-radius: 6px 0px 0px 0px;
    font-size: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hover-details {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hover-details img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  
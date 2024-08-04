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
          @click="openCardModal(element)"
        >
          <img v-if="element.img" class="list-item__img" :src="element.img" alt="image" />
          <span v-if="element.count > 0" class="list-count">{{ element.count }}</span>
        </div>
      </draggable>
      <div v-if="selectedItem" class="list-modal">
      <div class="list-modal__content">
        <div class="list-modal__img" :style="{ backgroundImage: `url(${selectedItem.img})` }"></div>
        <h4>{{ selectedItem.title }}</h4>
        <p>{{ selectedItem.content }}</p>
        <button 
          class="list-modal__btn-delete" 
          :style="{ filter: editMode ? 'blur(3px)' : 'none', opacity: editMode ? '0.3' : '1' }"  
          @click="startEditMode"
          >Удалить предмет</button>
        <div v-if="editMode" class="list-modal__change-count">
          <div class="list-modal__change-count-block">
            <input placeholder="Введите число" type="number" v-model="selectedItem.count" />
          </div>
          <div class="list-modal__btn-save">
            <button class="list-modal__btn-cancel" @click="cancelEdit">Отмена</button>
            <button class="list-modal__btn-confirm-save" @click="confirmSave">Подтвердить</button>
          </div>
        </div>
        <span class="list-modal__close" @click="closeModal">
          <Icon :icon="'close'" />
        </span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useListStore } from '../../../store/listStore';
import { VueDraggableNext } from 'vue-draggable-next';
import Icon from "../Icon/Icon.vue";

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    Icon
  },
  setup() {
    const listStore = useListStore();
    const selectedItem = ref(null);
    const editMode = ref(false);

    const openCardModal = (item) => {
      selectedItem.value = { ...item };
      editMode.value = false;
    };

    const startEditMode = () => {
      editMode.value = true;
    };

    const confirmSave = () => {
      listStore.updateItem(selectedItem.value);
      savePositions();
      closeModal();
    };

    const cancelEdit = () => {
      closeModal();
    };

    const closeModal = () => {
      selectedItem.value = null;
    };

    const deleteItem = () => {
      listStore.deleteItem(selectedItem.value.id);
      savePositions();
      closeModal();
    };

    const savePositions = () => {
      const savedList = JSON.stringify(listStore.list);
      localStorage.setItem('savedList', savedList);
    };

    return {
      list: listStore.list,
      selectedItem,
      editMode,
      openCardModal,
      startEditMode,
      confirmSave,
      cancelEdit,
      closeModal,
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


<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  overflow: hidden;
  position: relative;
  .list-group {
    display: contents;
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
        &__img {
          width: 80%;
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
      }
      .sortable-chosen {
        border-radius: 24px;
        border: 1px solid #4D4D4D;
        cursor: grabbing;

        .list-count {
          opacity: 0;
        }
      }
  }
  .list-modal {
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    animation: show-modal 1s ease-in-out;
      &__content {
        background: #262626 50%;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-around;
      }
      &__img {
        width: 130px;
        height: 130px;
        background-position: center;
        background-size: cover;
      }
      &__close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      &__btn-delete {
        color: #fff;
        background: #ff8888;
        height: 39px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        width: 100%;
        &:hover {
          opacity: 0.9;
          transition: 0.3s linear;
        }
      }
      &__change-count {
        position: absolute;
        bottom: 32px;
        left: 0;
        width: 100%;
        padding: 0px 15px;
        border-top: 1px solid #4d4d4d;
      }        
      &__btn-save {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
        gap: 10px;
        background: transparent;
        button {
          border-radius: 8px;
          border: none;
          height: 33px;
          width: 100%;
          cursor: pointer;
          &:hover {
            opacity: 0.9;
            transition: 0.3s linear;
          }
        }
      }
      &__btn-confirm-save {
        background: #FA7272;
        color: #fff;
      }
      &__change-count-block {
        padding-top: 15px;
        background: #262626 50%;
        input {
          height: 40px;
          border: 1px solid #4d4d4d;
          border-radius: 4px;
          font-size: 14px;
          color: #fff;
          width: 100%;
          padding-left: 12px;
          background: transparent;
        }
      }
  }
}

@keyframes show-modal {
  0% { right: -100%; }
  100% { right: 0%; }
}
 
</style>

<template>
  <div>
    <div class="list border" :class="{ 'bg-black': !isChecked }">
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
          <span v-if="element.count > 0" class="list-count" :class="{ 'text-black': isChecked, 'text-white': !isChecked }">{{ element.count }}</span>
        </div>
      </draggable>
      <transition name="modal-slide">
        <div v-if="selectedItem" class="list-modal" :class="{ 'bg-black': !isChecked, 'bg-white': isChecked }">
          <div class="list-modal__content">
            <div class="list-modal__img" :style="{ backgroundImage: `url(${selectedItem.img})` }"></div>
            <h4 :class="{ 'text-black': isChecked, 'text-white': !isChecked }">{{ selectedItem.title }}</h4>
            <p :class="{ 'text-black': isChecked, 'text-white': !isChecked }">{{ selectedItem.content }}</p>
            <button 
              class="list-modal__btn-delete" 
              :style="{ filter: editMode ? 'blur(3px)' : 'none', opacity: editMode ? '0.3' : '1' }"  
              @click="startEditMode"
            >
              Удалить предмет
            </button>
            <div v-if="editMode" class="list-modal__change-count">
              <div class="list-modal__change-count-block" :class="{ 'bg-black': !isChecked, 'bg-white': isChecked }">
                <input placeholder="Введите число" type="number" v-model="selectedItem.count" :class="{ 'text-black': isChecked, 'text-white': !isChecked }" />
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
      </transition>
    </div>
  </div>
  
</template>

<script>
import { useToggleStore } from '../../../stores/toggleStore';
import { onMounted, ref, reactive, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import Icon from "../Icon/Icon.vue";

export default {
  components: {
    draggable: VueDraggableNext,
    Icon
  },
  setup() {

    const toggleStore = useToggleStore();
    const isChecked = computed(() => toggleStore.isChecked);

    const list = reactive([
      { title: 'John', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 1, count: 4, img: 'https://img.freepik.com/free-photo/a-dog-made-by-the-artist_1340-37216.jpg?w=1380&t=st=1722759332~exp=1722759932~hmac=22451e2d0a079090fd93300a2d90291ec22236f6fa7f65933f3b13351d36fca7' },
      { title: 'Joao', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 2, count: 2, img: 'https://img.freepik.com/free-photo/a-cartoon-dog-with-a-pink-nose-and-a-white-nose_1340-37220.jpg?w=1380&t=st=1722759385~exp=1722759985~hmac=b8e88510f36c2dd02ced310e918a438149aed579792b51640fe6236b6fff0e88' },
      { title: 'Jean', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius quos sint officia id distinctio ipsa ab debitis, voluptates qui nemo! Asperiores eveniet quam sunt ipsa sapiente perspiciatis mollitia. Culpa, nobis.', id: 10, count: 5, img: 'https://img.freepik.com/free-photo/close-up-on-kitten-exploring-nature_23-2150782399.jpg?w=1480&t=st=1722759408~exp=1722760008~hmac=992887c4528525de99c958b3428d642192aaa1e92b7a94a8c0b1198825e0fa31' },
      ...Array.from({ length: 22 }, (_, i) => ({ title: '', content: '', id: 4 + i, count: 0, img: '' })),
    ]);

    const selectedItem = ref(null);
    const editMode = ref(false);

    const loadListFromLocalStorage = () => {
      const savedList = localStorage.getItem('savedList');
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        list.length = 0;
        parsedList.forEach(item => list.push(item));
      }
    };

    const savePositions = () => {
      const savedList = JSON.stringify(list);
      localStorage.setItem('savedList', savedList);
    };

    const openCardModal = (item) => {
      if (item.count > 0) {
        selectedItem.value = { ...item };
        editMode.value = false;
      }
    };

    const startEditMode = () => {
      editMode.value = true;
    };

    const confirmSave = () => {
      const index = list.findIndex(item => item.id === selectedItem.value.id);
      if (index !== -1) {
        list[index] = { ...selectedItem.value };
        savePositions();
        closeModal();
      }
    };

    const cancelEdit = () => {
      editMode.value = false;
    };

    const closeModal = () => {
      selectedItem.value = null;
    };

    const deleteItem = () => {
      const index = list.findIndex(item => item.id === selectedItem.value.id);
      if (index !== -1) {
        list.splice(index, 1);
        savePositions();
        closeModal();
      }
    };

    const log = (event) => {
      console.log(event);
      savePositions();
    };

    const checkMove = () => {
      return true;
    };

    onMounted(() => {
      loadListFromLocalStorage();
    });

    return {
      list,
      selectedItem,
      editMode,
      openCardModal,
      startEditMode,
      confirmSave,
      cancelEdit,
      closeModal,
      deleteItem,
      log,
      checkMove,
      isChecked
    };
  },
};
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
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &__content {
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        justify-content: space-around;
        border-left: 1px solid #4d4d4d;
        opacity: 0.9;
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
        input {
          height: 40px;
          border: 1px solid #4d4d4d;
          border-radius: 4px;
          font-size: 14px;
          width: 100%;
          padding-left: 12px;
          background: transparent;
        }
      }
    }
  }

  .modal-slide-enter-active {
    animation: modal-slide-in 0.5s;
  }  
  .modal-slide-leave-active {
    animation: modal-slide-from 1s;
  }

  @keyframes modal-slide-in {
    0% {
      right: -100%;
    }
    100% {
      right: 0%;
    }
  }

  @keyframes modal-slide-from {
    0% {
      right: 0%;
    }
    100% {
      right: -100%;
    }
  }

  
</style>

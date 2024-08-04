<template>
    <div :class="['toggle-switch', { 'toggle-switch--checked': isChecked }]" @click="toggle">
      <div class="toggle-switch__thumb"></div>
    </div>
  </template>
  
  <script>
  import { computed, watch, onMounted } from 'vue';
  import { useToggleStore } from '../../../stores/toggleStore';
  
  export default {
    name: 'ToggleSwitch',
    setup() {
      const toggleStore = useToggleStore();
      const isChecked = computed(() => toggleStore.isChecked);
      
      watch(isChecked, (newValue) => {
        if(newValue) {
            document.body.style.backgroundColor = '';
        } else {
            document.body.style.backgroundColor = '#1d1d1d';
        }
      });
  
      onMounted(() => {
        if(!isChecked.value) {
            document.body.style.backgroundColor = '#1d1d1d';
        }
      });
  
      return {
        isChecked,
        toggle: toggleStore.toggle,
      };
    },
  };
  </script>
  
  <style scoped>
  .toggle-switch {
    width: 50px;
    height: 25px;
    background: #ccc;
    border-radius: 25px;
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
  }
  .toggle-switch--checked {
    background: #1d1d1d;
  }
  .toggle-switch__thumb {
    width: 23px;
    height: 23px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: left 0.3s;
  }
  .toggle-switch--checked .toggle-switch__thumb {
    left: 26px;
  }
  </style>
  
<template>
    <svg v-if="icon === 'close'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z" :fill="fillColor"/>
    </svg>
  </template>
  
  <script>
  import { useToggleStore } from '../../../stores/toggleStore';
  import { computed } from 'vue';
  
  export default {
    props: {
      icon: {
        type: String,
        required: true
      }
    },
    setup() {
      const toggleStore = useToggleStore();
      const isChecked = computed(() => toggleStore.isChecked);
      const fillColor = computed(() => isChecked.value ? 'black' : 'white');
  
      return {
        isChecked,
        fillColor
      };
    }
  }
  </script>
  
<template>
  <div class="main">
    <div>
      <ToggleSwitch />
      <div>Toggle is {{ toggleStore.isChecked ? 'On' : 'Off' }}</div>
    </div>
    <div class="content">
      <Skeleton />
      <Table />
    </div>
    <Footer />
  </div>
</template>

<script>
import { useToggleStore } from '../../stores/toggleStore';
import Skeleton from './Skeleton/Skeleton.vue';
import Table from './Table/Table.vue';
import Footer from './Footer/Footer.vue';
import ToggleSwitch from './Tumbler/Tumbler.vue';

export default {
  components: {
    Skeleton,
    Table,
    Footer,
    ToggleSwitch,
  },
  setup() {
    const toggleStore = useToggleStore();

    return {
      toggleStore,
    };
  },

};
</script>

<style>
  .main {
    max-width: 785px;
    width: 785px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
</style>
<template>
    <div class="skeleton border" :class="{ 'bg-black': !isChecked }">
        <div class="skeleton-img"></div>
        <div class="skeleton-title skeleton-box line-gradients"></div>
        <div class="skeleton-content">
            <div class="skeleton-box-line line-gradients"></div>
            <div class="skeleton-box-line line-gradients"></div>
            <div class="skeleton-box-line line-gradients"></div>
            <div class="skeleton-box-line line-gradients"></div>
            <div class="skeleton-box-line line-gradients"></div>
        </div>
        <div class="skeleton-btn line-gradients"></div>
    </div>
</template>

<script>
import { useToggleStore } from '../../../stores/toggleStore';
import { computed } from 'vue';

export default {
    setup() {
        const toggleStore = useToggleStore();
        const isChecked = computed(() => toggleStore.isChecked);

        return {
            isChecked
        }
    }
}
</script>

<style scoped>
    .skeleton {
        padding: 18px 14px;
        width: 236px;
        height: 500px;
        text-align: center;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    .skeleton-img {
        width: 208px;
        height: 240px;
        background: url('../../assets/image.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(2px);
    }
    .skeleton-content {
        max-height: 130px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        align-items: center;
    }
    .skeleton-box {
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        padding: 0px 50px;
    }
    .skeleton-box-line {
        height: 10px;
        width: 100%;
        background-color: #ccc;
    }
    .skeleton-content .skeleton-box-line:nth-child(1) {
        width: 80%;
    }
    .skeleton-content .skeleton-box-line:nth-child(2) {
        width: 100%;
    }
    .skeleton-content .skeleton-box-line:nth-child(3) {
        width: 50%;
    }
    .skeleton-content .skeleton-box-line:nth-child(4) {
        width: 70%;
    }

    .skeleton-btn {
        width: 60%;
        height: 10px;
    }
</style>

<template>
    <footer class="footer border">
        <div class="footer-skeleton line-gradients"></div>
        <span class="footer-close">
            <Icon :icon="'close'" />
        </span>
    </footer>
</template>

<script>
import Icon from "../Icon/Icon.vue";

export default {
    components: {
        Icon
    }
}
</script>

<style>
    footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 18px;
        position: relative;
    }
    .footer-skeleton {
        width: 80%;
        height: 36px;
        border-radius: 12px !important;
    }
    .footer-close {
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }
</style>
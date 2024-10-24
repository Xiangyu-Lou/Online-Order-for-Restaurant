<template>
    <div>
        <h3>{{ order.username }} ({{ order.status }})</h3>
        <p>{{ order.items_list }}</p>
    </div>
</template>

<script setup>
import { defineProps,toRefs } from 'vue';

const props = defineProps({
    order: {
        type: Object,
        default: () => ({})
    }
});

const { order } = toRefs(props);
</script>
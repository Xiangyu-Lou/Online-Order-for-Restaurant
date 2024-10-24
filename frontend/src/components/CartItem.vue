<template>
    <div class="cart-item">
        <div>
            <h3>{{ item.items }}</h3>
            <p>Price:{{ item.price }}</p>
        </div>
        <el-button type="danger" size="small" @click="onDelete">Delete</el-button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

// delete
async function onDelete() {
    try {
        await axios.delete('/orders', { data: { items: props.item.items } });
        emit('delete', props.item);
    } catch (error) {
        console.error('Failed to delete item:', error);
    }
}

const emit = defineEmits(['delete']);
</script>

<style scoped>
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>
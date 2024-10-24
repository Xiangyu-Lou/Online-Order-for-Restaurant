<template>
    <div class="dish-item">
        <div class="dish-content">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
            <p>Price: {{ dish.price }}</p>
        </div>
        <el-button type="primary" size="small" @click="handleAdd(dish)">Add</el-button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

defineProps({
    dish: {
        type: Object,
        required: true,
    },
    loginUser: {
        type: String,
        required: true,
    }
});

// add dish to cart
async function handleAdd(dish) {
    const username = localStorage.getItem('loginUser');
    const order = {
        username,
        items: [dish.name],
        status: 'cart',
    };
    try {
        const response = await axios.post('/orders', order);

        if (response.status !== 201) {
            throw new Error('Order placement failed: ' + response.statusText);
        }
        ElMessage({
            message: 'Item added to cart successfully',
            type: 'success',
        });
    } catch (error) {
        console.error('Order placement error:', error);
        ElMessage({
            message: 'Failed to add item to cart',
            type: 'error',
        });
    }
}
</script>
  
<style scoped>
.dish-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.dish-content {
    display: flex;
    flex-direction: column;
}
</style>
  
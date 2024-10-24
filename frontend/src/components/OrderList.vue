<template>
    <div>
        <h3>{{ order.username }}</h3>
        <p>{{ order.items_list }}</p>
        <el-button type="success" @click="confirmOrder">Confirm</el-button>
        <el-button type="danger" @click="cancelOrder">Cancel</el-button>
    </div>
</template>
  
<script setup>
import { defineProps, toRefs } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const props = defineProps({
    order: {
        type: Object,
        default: () => ({})
    }
});

const { order } = toRefs(props);

// Update the order status to confirmed
const confirmOrder = async () => {
    try {
        const response = await axios.put(`/orders2/${order.value.username}`, { status: 'placed', newStatus: 'confirmed' });
        console.log(response.data);
        ElMessage({
            message: 'Order confirmed successfully',
            type: 'success',
        });
    } catch (error) {
        console.error(`HTTP error! status: ${error.response.status}`);
        ElMessage({
            message: 'Failed to confirm the order',
            type: 'error',
        });
    }
};

// Update the order status to canceled
const cancelOrder = async () => {
    try {
        const response = await axios.put(`/orders2/${order.value.username}`, { status: 'placed', newStatus: 'canceled' });
        console.log(response.data);
        ElMessage({
            message: 'Order canceled successfully',
            type: 'success',
        });
    } catch (error) {
        console.error(`HTTP error! status: ${error.response.status}`);
        ElMessage({
            message: 'Failed to cancel the order',
            type: 'error',
        });
    }
};
</script>
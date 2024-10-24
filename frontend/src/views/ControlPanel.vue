<template>
    <div style="height: 100vh; display: flex; flex-direction: column;">
        <el-header style="width: 100%;">
            <admin-header-bar :loginUser="loginUser"></admin-header-bar>
        </el-header>
        <h2>Pending orders:</h2>
        <order-list v-for="order in orders" :key="order.id" :order="order" />
        <h2>Processed orders:</h2>
        <processed-order-list v-for="processedOrder in processedOrders" :key="processedOrder.id" :order="processedOrder" />
        <h2>Add dish</h2>
        <add-dish />
        <h2>Manage dishes</h2>
        <div>
            <control-item v-for="dish in dishes" :key="dish.id" :dish="dish" :loginUser="loginUser" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import AdminHeaderBar from '@/components/AdminHeaderBar.vue';
import ControlItem from '@/components/ControlItem.vue';
import AddDish from '@/components/AddDish.vue';
import OrderList from '@/components/OrderList.vue';
import ProcessedOrderList from '@/components/ProcessedOrderList.vue';

const loginUser = ref('');
const items = ref([]);
const orders = ref([]);
const processedOrders = ref([]);
const dishes = computed(() => items.value.filter(item => item));

// life hook
onMounted(async () => {
    try {
        const response = await axios.get('/items');
        items.value = response.data; // assign the fetched data to items
        const orderResponse = await axios.get('/manage/orders/placed');
        orders.value = orderResponse.data; // assign the fetched data to orders
        const responseProcessedOrders = await axios.get('/processedorders', {
            params: {
                status1: 'confirmed',
                status2: 'canceled'
            }
        });
        processedOrders.value = responseProcessedOrders.data;
    } catch (error) {
        console.error('Failed to fetch items:', error);
    }
});
</script>

<style scoped>

</style>
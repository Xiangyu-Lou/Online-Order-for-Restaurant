<template>
    <div style="height: 100vh; display: flex; flex-direction: column;">
        <el-header style="width: 100%;">
            <header-bar :loginUser="loginUser"></header-bar>
        </el-header>
        <el-container style="display: flex; flex-grow: 1;">
            <el-aside>
                <sidebar-menu @menuSelect="onMenuSelect"></sidebar-menu>
            </el-aside>
            <el-main>
                <div v-if="view === 'dishes'">
                    <SearchBox @search="onSearch" />
                    <DishItem v-for="(dish, index) in dishes" :key="'dish-' + index" :dish="dish" :loginUser="loginUser" />
                </div>
                <div v-else-if="view === 'cart'">
                    <h3>Cart</h3>
                    <CartItem v-for="(item, index) in cart" :key="'cart-' + index" :item="item" :loginUser="loginUser" @delete="onDelete" />
                    <el-button type="success" @click="onSubmit">Submit</el-button>
                </div>
                <div v-else-if="view === 'orders'">
                    <OrderItem :orders="orders" :loginUser="loginUser" />
                    <el-button type="danger" @click="cancelOrder">Cancel Order</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import DishItem from '@/components/DishItem.vue';
import SearchBox from '@/components/SearchBox.vue';
import CartItem from '@/components/CartItem.vue';
import OrderItem from '@/components/OrderItem.vue';
import axios from 'axios';
import { ElMessage, ElButton } from 'element-plus';

const view = ref('dishes');
const dishes = ref([]);
const cart = ref([]);
const loginUser = ref('');
const orders = ref([]);

function onDelete(deletedItem) {
    cart.value = cart.value.filter(item => item !== deletedItem);
}

// menu
async function onMenuSelect(menuData) {
    var url;
    var username = localStorage.getItem('loginUser');
    switch (menuData.index) {
        case "0":
            view.value = 'dishes';
            url = '/items';
            break;
        case "1":
            view.value = 'dishes';
            url = `/itemsclassification/Breakfast`;
            break;
        case "2":
            view.value = 'dishes';
            url = `/itemsclassification/Lunch`;
            break;
        case "3":
            view.value = 'dishes';
            url = `/itemsclassification/Dinner`;
            break;
        case "4":
            view.value = 'dishes';
            url = `/itemsclassification/Dessert`;
            break;
        case "5":
            view.value = 'cart';
            url = `/orders/${username}?status=cart`;
            break;
        case "6":
            view.value = 'orders';
            url = `/orders2/${username}?status=cart`;
            break;
    }
    try {
        const response = await axios.get(url);
        if (view.value === 'cart') {
            cart.value = response.data;
        } else if (view.value === 'orders') {
            orders.value = response.data;
        } else {
            dishes.value = response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// life hook
onMounted(() => {
    loginUser.value = localStorage.getItem('loginUser');
    onMenuSelect({ index: "0" });
});

// search
async function onSearch(name) {
    try {
        const response = await axios.get(`/search/${name}`);
        dishes.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

// submit the order
async function onSubmit() {
    try {
        const username = localStorage.getItem('loginUser');
        const items = cart.value.map(item => item.name);
        const status = 'placed';
        await axios.put(`/orders/${username}`, { items, status });
        cart.value = [];
        
        ElMessage({
            message: 'Order submitted successfully',
            type: 'success',
        });
    } catch (error) {
        console.error('Failed to submit order:', error);
        ElMessage({
            message: 'Failed to submit order',
            type: 'error',
        });
    }
}

// cancel order
async function cancelOrder(orderId) {
    try {
        const response = await axios.post(`/order/${loginUser.value}`, { status: 'cart' });
        if (response.status === 200) {
            ElMessage({
                message: 'Order cancelled successfully',
                type: 'success',
            });
            orders.value = orders.value.filter(order => order.id !== orderId);
        }
    } catch (error) {
        ElMessage({
            message: 'Failed to cancel order',
            type: 'error',
        });
        console.error(error);
    }
}
</script>
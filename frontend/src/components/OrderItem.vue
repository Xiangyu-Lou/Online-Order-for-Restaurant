<template>
    <div>
        <p v-if="orders.length > 0">Status: {{ props.orders[0].status }}</p>
    </div>
    <div class="orders-item">
        <div v-for="(order, index) in props.orders" :key="index">
            <p>
                {{ order.items }}
                <span class="price">{{ order.price }}</span>
            </p>
        </div>
        <br>
        <p>Total: <span class="price">{{ total }}</span></p>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    orders: {
        type: Array,
        required: true,
    },
    loginUser: {
        type: String,
        required: true,
    }
});

// calculate total price
const total = computed(() => {
    return props.orders.reduce((sum, order) => sum + parseFloat(order.price), 0).toFixed(2);
});

</script>

<style scoped>
.price {
    float: right;
}
</style>
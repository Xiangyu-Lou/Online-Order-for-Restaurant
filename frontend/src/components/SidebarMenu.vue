<template>
    <el-aside width="200px" class="menu-aside">
        <el-menu default-active="1" class="menu-vertical" @select="handleSelect">
            <el-menu-item index="0">Home</el-menu-item>
            <el-menu-item index="1">Breakfast</el-menu-item>
            <el-menu-item index="2">Lunch</el-menu-item>
            <el-menu-item index="3">Dinner</el-menu-item>
            <el-menu-item index="4">Dessert</el-menu-item>
            <el-menu-item index="5">Cart</el-menu-item>
            <el-menu-item index="6">Orders</el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { ElMenu, ElMenuItem, ElAside } from 'element-plus';
import { defineEmits } from 'vue';

const emit = defineEmits(['menuSelect']);

function handleSelect(index, indexPath) {
    emit('menuSelect', { index, indexPath });
}
</script>

<style scoped>
.menu-aside {
    background-color: #0b72d9;
    min-height: 100vh;
}

.menu-vertical .el-menu-item {
    background-color: #0b72d9;
    color: #fff;
}

.menu-vertical .el-menu-item:hover {
    background-color: #304156;
}</style>
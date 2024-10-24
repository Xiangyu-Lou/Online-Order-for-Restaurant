<template>
    <div class="search-container">
        <ElInput class="search-input" type="text" v-model="name" placeholder="Search..." />
        <ElButton type="primary" @click="search">Search</ElButton>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';
    import { ElInput, ElButton } from 'element-plus';

    const name = ref('');
    const emit = defineEmits(['search']);

    function search() {
        emit('search', name.value);
    }
</script>

<style scoped>
.search-container {
    display: flex;
    align-items: center;
}
.search-input {
    flex-grow: 1;
    margin-right: 10px;
}
</style>
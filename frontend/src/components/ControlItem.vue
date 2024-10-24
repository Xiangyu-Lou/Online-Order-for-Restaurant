<template>
    <div class="dish-item">
        <h3>{{ dish.name }}</h3>
        <div v-if="isEditing" class="container">
            <input v-model="editedDish.description" placeholder="Description">
            <input v-model="editedDish.classification" placeholder="Classification">
            <input v-model="editedDish.price" placeholder="Price">
        </div>
        <div v-else class="container">
            <p>{{ dish.description }}</p>
            <p>Classification: {{ dish.classification }}</p>
            <p>Price: {{ dish.price }}</p>
        </div>
        <div class="button-container">
            <el-button type="primary" @click="handleEdit">{{ isEditing ? 'Confirm' : 'Edit' }}</el-button>
            <el-button type="danger" @click="handleDelete(dish)">Delete</el-button>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive, defineProps } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const props = defineProps({
    dish: {
        type: Object,
        required: true,
    },
});

const isEditing = ref(false);
const editedDish = reactive({ ...props.dish }); // Create a reactive copy of dish for editing

// Update the dish and save it to the database
const handleEdit = async () => {
    if (isEditing.value) {
        // If already editing, try to confirm changes
        try {
            const response = await axios.put(`/update/${editedDish.name}`, editedDish);
            if (response.status === 200) {
                Object.assign(props.dish, editedDish); // Update the original dish object with edited values
                ElMessage({
                    message: 'Item updated successfully',
                    type: 'success',
                });
            }
        } catch (error) {
            console.error('Failed to update item:', error);
            ElMessage({
                message: 'Failed to update item',
                type: 'error',
            });
        }
    } else {
        // If not editing, switch to edit mode
        Object.assign(editedDish, props.dish); // Reset editedDish to the current dish values
    }
    isEditing.value = !isEditing.value;
};

// Delete the dish from the database
const handleDelete = async (dish) => {
    try {
        await axios.delete(`/delete/${dish.name}`);
        console.log('Item deleted successfully');
        ElMessage({
            message: 'Item deleted successfully',
            type: 'success',
        });
    } catch (error) {
        console.error('Failed to delete item:', error);
        ElMessage({
            message: 'Failed to delete item',
            type: 'error',
        });
    }
};
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

.button-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.container {
    width: 60%;
    text-align: left;
}

</style>
    
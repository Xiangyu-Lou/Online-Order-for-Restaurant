<template>
    <div>
        <el-row>
            <el-col :span="5" class="input-col">
                <el-input v-model="newDish.name" placeholder="Name"></el-input>
            </el-col>
            <el-col :span="5" class="input-col">
                <el-input v-model="newDish.description" placeholder="Description"></el-input>
            </el-col>
            <el-col :span="5" class="input-col">
                <el-input v-model="newDish.price" placeholder="Price"></el-input>
            </el-col>
            <el-col :span="5" class="input-col">
                <el-input v-model="newDish.classification" placeholder="Classification"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="handleSubmit">Submit</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'

const newDish = ref({
    name: '',
    description: '',
    price: '',
    classification: '',
});

// push the new dish to the database
const handleSubmit = async () => {
    try {
        const response = await axios.post('/add', newDish.value);
        if (response.status === 200) {
            newDish.value = {
                name: '',
                description: '',
                price: '',
                classification: '',
            };
            ElMessage({
                message: 'Dish added successfully',
                type: 'success',
            });
        }
    } catch (error) {
        ElMessage({
            message: 'Failed to add the dish',
            type: 'error',
        });
    }
};
</script>

<style scoped>
.input-col {
    padding-right: 10px;
}
</style>
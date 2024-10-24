<template>
    <div>
        <h1 v-if="isLogin">Login</h1>
        <h1 v-else>Register</h1>
        <form @submit.prevent="isLogin ? submitLogin() : submitRegister()">
            <ElInput v-model="username" type="text" placeholder="Username" required />
            <ElInput v-if="!isLogin" v-model="email" type="email" placeholder="Email" required />
            <ElInput v-model="password" type="password" placeholder="Password" required />
            <ElButton type="primary" round native-type="submit">{{ isLogin ? 'Login' : 'Register' }}</ElButton>
            <br>
            <ElButton type="primary" round @click.prevent="submitAdminLogin">Admin Login</ElButton>
        </form>
        <br>
        <ElButton type="primary" round @click="toggleForm">{{ isLogin ? 'Go to Register' : 'Go to Login' }}</ElButton>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { ElMessage, ElInput, ElButton } from 'element-plus';

const isLogin = ref(true);
const username = ref('');
const email = ref('');
const password = ref('');
const emit = defineEmits(['login', 'register', 'adminLogin']);

// admin login
const submitAdminLogin = () => {
    emit('adminLogin', { username: username.value, password: password.value });
};

// user login
const submitLogin = () => {
    emit('login', { username: username.value, password: password.value });
};

// user register
const submitRegister = () => {
    emit('register', { username: username.value, email: email.value, password: password.value });
    ElMessage({
        message: 'Registration successful',
        type: 'success',
    });
};

// toggle between login and register
const toggleForm = () => {
    isLogin.value = !isLogin.value;
    username.value = '';
    email.value = '';
    password.value = '';
};
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
    width: 300px;
}
</style>
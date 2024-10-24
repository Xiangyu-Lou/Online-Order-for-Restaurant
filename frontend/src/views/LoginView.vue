<template>
    <div>
        <LoginForm @login="handleLogin" @register="handleRegister" @adminLogin="handleAdminLogin" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const router = useRouter();

// user login
const handleLogin = async (credentials) => {
    try {
        const response = await axios.post('/login', credentials);
        if (response.status !== 200) {
            throw new Error('Login failed: ' + response.statusText);
        }
        localStorage.setItem('loginUser', credentials.username);
        router.push('/');
    } catch (error) {
        ElMessage.error('username or password is incorrect');
    }
};

// user register
const handleRegister = async (credentials) => {
    try {
        const response = await axios.post('/register', credentials);
        if (response.status !== 201) {
            throw new Error('Registration failed: ' + response.statusText);
        }
    } catch (error) {
        ElMessage.error('Registration failed');
    }
};

// admin login
const handleAdminLogin = async (credentials) => {
    try {
        const response = await axios.post('/adminlogin', credentials);
        if (response.status !== 200) {
            throw new Error('Admin login failed: ' + response.statusText);
        }
        localStorage.setItem('loginUser', credentials.username);
        router.push('/controlpanel');
    } catch (error) {
        ElMessage.error('Admin username or password is incorrect');
    }
};
</script>
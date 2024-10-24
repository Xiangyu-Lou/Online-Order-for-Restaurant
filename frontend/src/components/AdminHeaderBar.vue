<template>
    <el-header class="header-bar">
        <div class="header-left">
            <h1>Control Panel</h1>
        </div>
        <div class="header-right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :src="userAvatar"></el-avatar>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template v-slot:dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
  
<script setup>
import { ElHeader, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
    loginUser: {
        type: String,
        default: ''
    }
});

const userAvatar = require('../assets/avatar.png');
const router = useRouter();

// logout function
function logout() {
    localStorage.removeItem('loginUser');
    router.push('/login');
}
</script>
    
<style scoped>
.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 0 20px;
}

.header-left h1 {
    margin: 0;
    font-size: 1.5em;
}

.header-right {
    display: flex;
    align-items: center;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
}

</style>
    
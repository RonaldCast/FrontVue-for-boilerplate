<template>
    <div>
        Login
        <button @click="router.push('/about')"> About</button>
         <el-input v-model="userName" placeholder="Please input" />
    </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router"
import {ref} from "vue"

const router = useRouter();
const userName = ref<String>("")
</script>
<template>
  <div class="bg-darkBlue">
    <div class="text-center border-b border-white py-4">
      <span class="text-xl text-white font-medium">BVPT</span>
    </div>
    <div class="mt-3">
      <el-menu
        active-text-color="#D62828"
        background-color="#003049"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <RouterLink to="/home">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>Home</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/user">
          <el-menu-item index="2">
            <el-icon><User /></el-icon>
            <span>Users</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/role">
          <el-menu-item index="3">
            <el-icon><Unlock /></el-icon>
            <span>Roles</span>
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/tenant">
          <el-menu-item index="4">
            <el-icon><Document /></el-icon>
            <span>Tenants</span>
          </el-menu-item>
        </RouterLink>
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Document, Unlock, User, HomeFilled } from "@element-plus/icons-vue";
</script>
<style scoped></style>

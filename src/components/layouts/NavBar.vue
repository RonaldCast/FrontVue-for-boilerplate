<template>
  <div class="bg-white py-4 px-3 navbar flex justify-end">
    <div>
      <span class="mr-2"> Ronald </span>
      <el-button type="primary" @click="logout">Logout </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/stores/abpStores/useAppStore";

import util from "@/lib/util";

const appStore = useAppStore();

const logout = () => {
  util.abp.auth.clearToken();
  appStore.logout();
  location.reload();
};
</script>
<style scoped>
.navbar {
  -webkit-box-shadow: 0px 2px 5px 0px rgba(145, 143, 145, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(145, 143, 145, 1);
  box-shadow: 0px 2px 5px 0px rgba(145, 143, 145, 1);
}
</style>

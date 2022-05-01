<template>
  <div class="dashboard">
    <SideBar class="dashboard__sidebar" />
    <div class="dashboard__body">
      <NavBar />
      <div class="dashboard__body--main p-6">
        <RouterView />
      </div>
      <div class="content-over"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "../components/layouts/NavBar.vue";
import SideBar from "../components/layouts/SideBar.vue";
</script>
<style scoped lang="scss">
.dashboard {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100% !important;
  position: fixed;

  &__body {
     width: 100%;
    min-height: 100%;
    position: relative;

  }
  &__sidebar {
    width: 250px;
    min-width: 250px;
    // max-width: 400px;
  }

}

.content-over {
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f0f2f5;
  z-index: -1;
}
</style>

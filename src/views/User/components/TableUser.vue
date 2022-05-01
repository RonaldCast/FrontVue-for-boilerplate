<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="userName" label="Use name"> </el-table-column>
    <el-table-column prop="name" label="Name"> </el-table-column>
    <el-table-column prop="isActive" label="Is Active"> </el-table-column>
    <el-table-column prop="creationTime" label="Creation Time">
    </el-table-column>
    <el-table-column fixed="right">
      <template #default="data" >
        <div class="flex justify-end w-full">
          <el-button type="primary" size="small">Edit</el-button>
          <el-button type="danger" size="small">Delete</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import type User from "@/stores/abpStores/models/user";
interface TableUserProps {
  list: Array<User>;
}

const { list } = defineProps<TableUserProps>();
</script>

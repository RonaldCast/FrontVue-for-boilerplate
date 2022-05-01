<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="userName" label="Use name"> </el-table-column>
    <el-table-column prop="name" label="Name"> </el-table-column>
    <el-table-column prop="isActive" label="Is Active"> </el-table-column>
    <el-table-column prop="creationTime" label="Creation Time">
    </el-table-column>
    <el-table-column fixed="right">
      <template #default="data">
        <div class="flex justify-end w-full">
          <el-button type="primary" size="small">Edit</el-button>
          <el-button type="danger" size="small" @click="onDeleteUser(data.row)"
            >Delete</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import type User from "@/stores/abpStores/models/user";
import { useUserStore } from "@/stores/abpStores/useUserStore";
import { ElMessage, ElMessageBox } from "element-plus";
interface TableUserProps {
  list: Array<User>;
}

const userStore = useUserStore();
const { list } = defineProps<TableUserProps>();

const getUser = async (): Promise<void> => {
  await userStore.getAll({
    keyword: userStore.keyword,
    isActive: userStore.isActive,
    skipCount: (userStore.currentPage - 1) * userStore.pageSize,
    maxResultCount: userStore.pageSize,
  });
};

const onDeleteUser = (data: User): void => {
  ElMessageBox.confirm(
    "Do you want delete this user?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  ).then(() => {
    userStore.delete(data.id).then(async (): Promise<void> => {
      userStore.$patch((state) => {
        state.currentPage = 1;
      });
      await getUser();
    });
  });
};
</script>

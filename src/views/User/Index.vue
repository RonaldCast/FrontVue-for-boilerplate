<template>
  <h1 class="text-2xl font-medium mb-4">Users</h1>
  <div class="bg-white border border-gray-300 p-5 rounded">
    <FilterUser @handle-search="handleSearch" />
    <div class="my-5">
      <el-button type="primary" @click="openDialogCreateUser = true"
        >Add</el-button
      >
    </div>
    <TableUser :list="userStore.list" />

    <el-dialog
      title="Create new user"
      v-model="openDialogCreateUser"
      width="40%"
    >
      <div class="px-5">
        <CreateUser
          :date-send="dateSendCreateUser"
          @handle-send-data="createUser"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openDialogCreateUser = false">Cancel</el-button>
          <el-button type="primary" @click="dateSendCreateUser = new Date()"
            >Create</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import FilterUser from "./components/FilterUser.vue";
import TableUser from "./components/TableUser.vue";
import CreateUser from "./components/CreateUser.vue";
import type PageFilterUserComp from "./models/PageFilterUserComp";
import { useUserStore } from "@/stores/abpStores/useUserStore";
import { onMounted, ref } from "vue";
import type CreateUserModel from "@/stores/abpStores/models/createUser";
import { ElMessage, ElLoading } from "element-plus";

const userStore = useUserStore();
const openDialogCreateUser = ref<boolean>(false);
const dateSendCreateUser = ref<Date>(new Date());

onMounted(async () => {
  await getUser();
});

const getUser = async (): Promise<void> => {
  await userStore.getAll({
    keyword: userStore.keyword,
    isActive: userStore.isActive,
    skipCount: (userStore.currentPage - 1) * userStore.pageSize,
    maxResultCount: userStore.pageSize,
  });
};

const handleSearch = async (value: PageFilterUserComp): Promise<void> => {
  userStore.$patch((state) => {
    state.keyword = value.keyword;
    state.isActive = value.isActive;
  });

  await getUser();
};

const createUser = (data: CreateUserModel) => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  userStore
    .create(data)
    .then(async () => {
      userStore.$patch( (state) => {
        state.currentPage = 1
      })
      await getUser()
      loading.close();
      openDialogCreateUser.value = false;
    })
    .catch((e) => {
      loading.close();
    });;
};
</script>
<style></style>

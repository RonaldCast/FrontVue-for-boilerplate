<template>
  <section class="flex justify-between w-full">
    <div class="w-full">
      <label class="text-sm font-medium">Keyword</label>
      <el-input
        @keyup.enter="search"
        v-model="dataSearch.keyword"
        placeholder="User name/Name"
      ></el-input>
    </div>

    <div class="w-full mx-4">
      <label class="text-sm font-medium">Is Active</label>
      <div>
        <el-select
          v-model="dataSearch.isActive"
          class="w-full"
          placeholder="Select"
        >
          <el-option
            v-for="item in listActive"
            :key="item.text"
            :label="item.text"
            :value="item.value "
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="flex items-end">
      <el-button type="primary" @click="search"> Search</el-button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { defineEmits, reactive, ref } from "vue";
import type PageFilterUserComp from "../models/PageFilterUserComp";

interface ActiveUser {
  text: string;
  value: boolean | null ;
}

const emits = defineEmits<{
  (e: "handleSearch", search: PageFilterUserComp): void;
}>();
const dataSearch = reactive<PageFilterUserComp>({
  keyword: "",
  isActive: null,
});

const listActive = ref<Array<ActiveUser>>([
  { text: "All", value: null },
  { text: "Active", value: true },
  { text: "Not active", value: false },
]);

const search = (): void => {
  emits("handleSearch", dataSearch);
};
</script>
<style scoped></style>

<template>
  <div class="containerLogin flex justify-center items-center">
    <div class="containerLogin--form">
      <h1 class="font-medium text-xl text-center">
        Boilerplate, vue 3, pinia and typescript
      </h1>
      <h2 class="text-lg py-2">Log in</h2>
      <p
        class="text-blue-400 hover:text-blue-500 cursor-pointer"
        @click="openDialogTenant = true"
      >
        {{
          !!sessionStore.tenant ? sessionStore.tenant.name : "Select Tenant"
        }}

   
      </p>

      <form @submit="onSubmit">
        <div class="mb-3">
          <label class="font-medium pt-2">User name</label>
          <el-input
            type="text"
            placeholder="User name"
            name="username"
            v-model="username"
          />
          <span class="text-sm text-red-400">{{ errorUsername }}</span>
        </div>
        <div class="mb-4">
          <label class="font-medium pt-2">Password</label>
          <el-input
            placeholder="User name"
            name="password"
            type="password"
            v-model="password"
          />
          <span class="text-sm text-red-400">{{ errorPassword }}</span>
        </div>
        <div>
          <el-checkbox v-model="remember"> Remember me</el-checkbox>
        </div>

        <div class="w-full mt-5">
          <button class="w-full el-button el-button--primary">Log in</button>
        </div>
      </form>
      <el-dialog title="Change tenant" v-model="openDialogTenant" width="30%">
        <div class="px-5">
          <SelectedTenant
            :date-change-tenant="dateChangeTenant"
            @handle-selected-tenant="handleSelectedTenant"
          />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="openDialogTenant = false">Cancel</el-button>
            <el-button type="primary" @click="dateChangeTenant = new Date()"
              >Change</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { object, string, boolean } from "yup";
import { ElMessage, ElLoading } from "element-plus";
import { useAppStore } from "@/stores/abpStores/useAppStore";
import { useSessionStore } from "@/stores/abpStores/useSessionStore";
import { ref } from "vue";
import SelectedTenant from "./SelectedTenant.vue";

const schema = object({
  username: string().required(),
  password: string().required(),
  remember: boolean(),
});

const router = useRouter();
const appStore = useAppStore();
const sessionStore = useSessionStore();
const openDialogTenant = ref<boolean>(false);
const dateChangeTenant = ref<Date>(new Date());

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    username: "",
    password: "",
    remember: false,
  },
});
const { value: username, errorMessage: errorUsername } =
  useField<string>("username");

const { value: password, errorMessage: errorPassword } =
  useField<string>("password");

const { value: remember } = useField<boolean>("remember");

const handleSelectedTenant = ():void => {
  sessionStore.init()
  openDialogTenant.value = false
}

const onSubmit = handleSubmit(
  (value: any): void => {
    const loading = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    appStore
      .login({
        userNameOrEmailAddress: value.username,
        password: value.password,
        rememberClient: value.remember,
      })
      .then(() => {
        loading.close();
        sessionStorage.setItem("rememberMe", value.remember ? "1" : "0");
        location.reload();
      })
      .catch((e: any) => {
        ElMessage({
          type: "error",
          message: e.response.data.error.details,
        });
        loading.close();
      });
  },
  () => {
    ElMessage({
      type: "error",
      message: "Complete required fields",
    });
  }
);
</script>
<style lang="scss">
.containerLogin {
  height: 100vh;
  width: 100%;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  background-color: #f0f2f5;

  &--form {
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>

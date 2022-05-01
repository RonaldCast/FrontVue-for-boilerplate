<template>
  <form @submit="onSubmit">
    <div>
      <label class="font-medium">User name</label>
      <el-input type="text" placeholder="User name" v-model="userName" />
      <span class="text-sm text-red-400">{{ errorUserName }}</span>
    </div>
    <div class="mt-2">
      <label class="font-medium">Name</label>
      <el-input type="text" placeholder="User name" v-model="name" />
      <span class="text-sm text-red-400">{{ errorName }}</span>
    </div>
    <div class="mt-2">
      <label class="font-medium">Surname</label>
      <el-input type="text" placeholder="User name" v-model="surname" />
      <span class="text-sm text-red-400">{{ errorSurname }} </span>
    </div>
    <div class="mt-2">
      <label class="font-medium">Email Address</label>
      <el-input type="text" placeholder="User name" v-model="emailAddress" />
      <span class="text-sm text-red-400">{{ errorEmailAddress }}</span>
    </div>
    <div class="mt-2">
      <label class="font-medium">Password</label>
      <el-input type="password" placeholder="User name" v-model="password" />
      <span class="text-sm text-red-400">{{ errorPassword }}</span>
    </div>
    <div class="mt-2">
      <label class="font-medium">Confirm password</label>
      <el-input
        type="password"
        placeholder="User name"
        name="password"
        v-model="passwordConfirmtion"
      />
      <span class="text-sm text-red-400">{{ errorPasswordConfirmtion }}</span>
    </div>
    <div class="mt-2">
      <label class="font-medium">
        <el-checkbox v-model="isActive" />
        <span class="ml-1">Is Active</span>
      </label>
    </div>
    <div class="mt-2">
      <label class="font-medium">User roles</label>
      <el-checkbox-group v-model="roleNames">
        <template v-for="role in userStore.roles">
          <el-checkbox :label="role.displayName" :value="role.name" />
        </template>
      </el-checkbox-group>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { onMounted, defineProps, defineEmits, watch } from "vue";
import * as Yup from "yup";
import { useUserStore } from "@/stores/abpStores/useUserStore";
import type Role from "@/stores/abpStores/models/role";
import CreateUser from "@/stores/abpStores/models/createUser";

interface Props {
  dateSend: Date;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "handleSendData", data: CreateUser): void;
}>();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.getRoles();
});

watch(
  () => props.dateSend,
  (newValue) => {
    onSubmit();
  }
);

const schema = Yup.object({
  userName: Yup.string().required(),
  name: Yup.string().required(),
  surname: Yup.string().required(),
  emailAddress: Yup.string().email().required(),
  isActive: Yup.boolean(),
  password: Yup.string().required(),
  passwordConfirmtion: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  roleNames: Yup.array().of(Yup.string()),
});
const { handleSubmit } = useForm({
  validationSchema: schema,
  validateOnMount: true,
  initialValues: {
    emailAddress: "",
    isActive: false,
    name: "",
    password: "",
    passwordConfirmtion: "",
    roleNames: [],
    surname: "",
    userName: "",
  },
});

const { value: userName, errorMessage: errorUserName } =
  useField<string>("userName");
const { value: name, errorMessage: errorName } = useField<string>("name");
const { value: surname, errorMessage: errorSurname } =
  useField<string>("surname");
const { value: emailAddress, errorMessage: errorEmailAddress } =
  useField<string>("emailAddress");
const { value: isActive } = useField<boolean>("isActive");
const { value: password, errorMessage: errorPassword } =
  useField<string>("password");
const { value: passwordConfirmtion, errorMessage: errorPasswordConfirmtion } =
  useField<string>("passwordConfirmtion");
const { value: roleNames, errorMessage: errorRoleNames } =
  useField<Array<string>>("roleNames");

const onSubmit = handleSubmit((value: CreateUser): void => {
  emits("handleSendData", {
    emailAddress: value.emailAddress,
    isActive: value.isActive,
    name: value.name,
    password: value.password,
    roleNames: value.roleNames,
    surname: value.surname,
    userName: value.userName,
  });
});
</script>

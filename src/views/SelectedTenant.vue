<template>
  <div>
    <label class="font-medium pt-2">Tenant name</label>
    <el-input v-model="tenancyName" />
    <span class="text-sm text-red-400">{{ errorMessage }}</span>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";
import { defineProps, watch, defineEmits } from "vue";
import { useAccountStore } from "@/stores/abpStores/useAccountStore";
import Util from "@/lib/util";
import { ElMessage, ElLoading } from "element-plus";

interface Props {
  dateChangeTenant: Date;
}

const schema = Yup.object({
  tenancyName: Yup.string(),
});

const props = defineProps<Props>();
const accountStore = useAccountStore();
const emits = defineEmits<{(e:"handleSelectedTenant"):void}>()

const { handleSubmit } = useForm({
  validationSchema: schema,
  validateOnMount: true,
  initialValues: {
    tenancyName: "",
  },
});

watch(
  () => props.dateChangeTenant,
  () => {
    onSubmit();
  }
);

const { value: tenancyName, errorMessage } = useField<string>("tenancyName");

const onSubmit = handleSubmit((data: any) => {
    if(!!data.tenancyName){
  accountStore
    .isTenantAvailable(data.tenancyName)
    .then((resp: any) => {
      console.log(resp);

      switch (resp.state) {
        case 1:
          Util.abp.multiTenancy.setTenantIdCookie(resp.tenantId);
             ElMessage({
            type: "success",
            message: "Tenant was selected",
          });
          emits("handleSelectedTenant")
          return;
        case 2:
          ElMessage({
            type: "error",
            message: "Tenant inactive",
          });
          break;
        case 3:
          ElMessage({
            type: "error",
            message: "There is not tenant defined with name",
          });
          break;
      }
    })
    .catch((e: any) => {
        console.log(e, "dsssd")
       // location.reload();
    });
     }else{
          Util.abp.multiTenancy.setTenantIdCookie(undefined);
            emits("handleSelectedTenant")
            
     }
});
</script>

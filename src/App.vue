<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref  } from "vue";
import { useSessionStore } from "./stores/abpStores/useSessionStore";
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper';
import { useAppStore } from "./stores/abpStores/useAppStore";
import { useRoute } from "vue-router";

const currentPageName = ref<string>(""); 
const useSession = useSessionStore();
const route = useRoute();
const useApp = useAppStore();
onMounted( async () => {
  currentPageName.value = route.name as string;
  await useSession.init()
     if(!!useSession.user&&useSession.application.features['SignalR']){
        if (useSession.application.features['SignalR.AspNetCore']) {
            SignalRAspNetCoreHelper.initSignalR();
        }
      }
      useApp.initCachepage();
})
</script>

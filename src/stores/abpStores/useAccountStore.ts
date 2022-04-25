import { defineStore } from "pinia";
import ajax from "@/lib/ajax";

export const useAccountStore = defineStore({
    id: "account",
    actions: {
        async isTenantAvailable(payload: any) {
            let resp = await ajax.post('/api/services/app/Account/IsTenantAvailable', payload.data);
            return resp.data.result;
        }
    }
})

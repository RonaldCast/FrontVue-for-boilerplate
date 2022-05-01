import { defineStore } from "pinia";
import ajax from "@/lib/ajax";

export const useAccountStore = defineStore({
    id: "account",
    actions: {
        async isTenantAvailable(tenancyName: string) {
            let resp = await ajax.post('/api/services/app/Account/IsTenantAvailable', {
                tenancyName
            });
            return resp.data.result;
        }
    }
})

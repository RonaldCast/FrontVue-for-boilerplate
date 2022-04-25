import { defineStore } from "pinia";
import ajax from "@/lib/ajax";
import util from '../../lib/util'

interface SessionState {
    application: any,
    user: any,
    tenant: any
}

export const useSessionStore = defineStore({
    id: "session",
    state: () => ({
        application: null,
        user: null,
        tenant: null
    } as SessionState),

    actions: {
        async init() {
            let rep = await ajax.get('/api/services/app/Session/GetCurrentLoginInformations', {
                headers: {
                    'Abp.TenantId': util.abp.multiTenancy.getTenantIdCookie()
                }
            }
            );

            this.application = rep.data.result.application;
            this.user = rep.data.result.user;
            this.tenant = rep.data.result.tenant;
        }
    }

})
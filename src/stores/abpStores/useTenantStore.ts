import { defineStore } from "pinia"
import Ajax from "@/lib/ajax";
import type ListState from "./models/list-state"
import type PageResult from "./models/page-result";
import Tenant from "./models/tenant";

interface TenantState extends ListState<Tenant> {
    editTenant: Tenant;
}

export const useTenantStore = defineStore({
    id: "tenant",
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<Tenant>(),
        loading: false,
        editTenant: new Tenant()
    } as TenantState),

    actions: {
        async getAll(payload:any){
            this.loading=true;
            let reponse=await Ajax.get('/api/services/app/Tenant/GetAll',{params:payload.data});
            this.loading=false;
            let page=reponse.data.result as PageResult<Tenant>;
            this.totalCount=page.totalCount;
            this.list=page.items;
        },
        async create(payload:any){
            await Ajax.post('/api/services/app/Tenant/Create',payload.data);
        },
        async update(payload:any){
            await Ajax.put('/api/services/app/Tenant/Update',payload.data);
        },
        async delete(payload:any){
            await Ajax.delete('/api/services/app/Tenant/Delete?Id='+payload.data.id);
        },
        async get(payload:any){
            let reponse=await Ajax.get('/api/services/app/Tenant/Get?Id='+payload.id);
            return reponse.data.result as Tenant;
        },
        setCurrentPage(page:number){
            this.currentPage=page;
        },
        setPageSize(pagesize:number){
            this.pageSize=pagesize;
        },
        edit(tenant:Tenant){
            this.editTenant=tenant;
        }
    }

})

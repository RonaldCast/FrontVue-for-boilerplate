import { defineStore } from "pinia"
import Ajax from "@/lib/ajax";
import Role from "./models/role";
import type ListState from "./models/list-state"
import type PageResult from "./models/page-result";


interface RoleState extends ListState<Role> {
    editRole: Role;
    permissions: Array<string>
}

export const useAccountStore = defineStore({
    id: "role",
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<Role>(),
        loading: false,
        editRole: new Role(),
        permissions: new Array<string>(),
    } as RoleState),
    actions: {
        async getAll(payload: any) {
            this.loading = true;
            let reponse = await Ajax.get('/api/services/app/Role/GetAll', { params: payload.data });
            this.loading = false;
            let page = reponse.data.result as PageResult<Role>;
            this.totalCount = page.totalCount;
            this.list = page.items;
        },
        async create(payload: any) {
            await Ajax.post('/api/services/app/Role/Create', payload.data);
        },
        async update(payload: any) {
            await Ajax.put('/api/services/app/Role/Update', payload.data);
        },
        async delete(payload: any) {
            await Ajax.delete('/api/services/app/Role/Delete?Id=' + payload.data.id);
        },
        async get(payload: any) {
            let reponse = await Ajax.get('/api/services/app/Role/Get?Id=' + payload.id);
            return reponse.data.result as Role;
        },
        async getAllPermissions() {
            let reponse = await Ajax.get('/api/services/app/Role/getAllPermissions');
            this.permissions = reponse.data.result.items;
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
        },
        setPageSize(pagesize: number) {
            this.pageSize = pagesize;
        },
        edit(role: Role) {
            this.editRole = role;
        }
    }
})
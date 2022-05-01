import { defineStore } from "pinia"
import Ajax from "@/lib/ajax";
import type Role from "./models/role";
import User from "./models/user";
import type ListState from "./models/list-state";
import type PageResult from "./models/page-result";
import type PageFilterUser from "./models/PageFilterUser";
import type CreateUser from "./models/createUser"
interface UserState extends ListState<User> {
    editUser: User,
    roles: Role[],
    keyword: string,
    isActive: boolean | null

}

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        keyword: "",
        isActive:null,
        list: new Array<User>(),
        loading: false,
        editUser: new User(),
        roles: new Array<Role>()
    } as UserState),

    actions: {
        async getAll(payload: PageFilterUser) {
            this.loading = true;
            let reponse = await Ajax.get('/api/services/app/User/GetAll', { params: payload });
            this.loading = false;
            let page = reponse.data.result as PageResult<User>;
            this.totalCount = page.totalCount;
            this.list = page.items;
        },
        async create(payload: CreateUser) {
            await Ajax.post('/api/services/app/User/Create', payload);
        },
        async update(payload: any) {
            await Ajax.put('/api/services/app/User/Update', payload);
        },
        async delete(payload: any) {
            await Ajax.delete('/api/services/app/User/Delete?Id=' + payload.id);
        },
        async get(payload: any) {
            let reponse = await Ajax.get('/api/services/app/User/Get?Id=' + payload.id);
            return reponse.data.result as User;
        },
        async getRoles() {
            let resp = await Ajax.get('/api/services/app/User/GetRoles');
            this.roles = resp.data.result.items as Role[];
          
        },
        async changeLanguage(payload: any) {
            await Ajax.post('/api/services/app/User/ChangeLanguage', payload);
        },

        setCurrentPage(page: number) {
            this.currentPage = page;
        },
        setPageSize(pagesize: number) {
            this.pageSize = pagesize;
        },
        edit(user: User) {
            this.editUser = user;
        }
    }

})
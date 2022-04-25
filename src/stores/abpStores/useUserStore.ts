import { defineStore } from "pinia"
import Ajax from "@/lib/ajax";
import type Role from "./models/role";
import User from "./models/user";
import type ListState from "./models/list-state";
import type PageResult from "./models/page-result";


interface UserState extends ListState<User> {
    editUser: User,
    roles: Role[]
}

export const useAccountStore = defineStore({
    id: "user",
    state: () => ({
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<User>(),
        loading: false,
        editUser: new User(),
        roles: new Array<Role>()
    } as UserState),

    actions: {
        async getAll(payload: any) {
            this.loading = true;
            let reponse = await Ajax.get('/api/services/app/User/GetAll', { params: payload.data });
            this.loading = false;
            let page = reponse.data.result as PageResult<User>;
            this.totalCount = page.totalCount;
            this.list = page.items;
        },
        async create( payload: any) {
            await Ajax.post('/api/services/app/User/Create', payload.data);
        },
        async update( payload: any) {
            await Ajax.put('/api/services/app/User/Update', payload.data);
        },
        async delete( payload: any) {
            await Ajax.delete('/api/services/app/User/Delete?Id=' + payload.data.id);
        },
        async get( payload: any) {
            let reponse = await Ajax.get('/api/services/app/User/Get?Id=' + payload.id);
            return reponse.data.result as User;
        },
        async getRoles() {
            let reponse = await Ajax.get('/api/services/app/User/GetRoles');
            this.roles = reponse.data.result.items as Role[];
        },
        async changeLanguage(payload: any) {
            await Ajax.post('/api/services/app/User/ChangeLanguage', payload.data);
        }, 

        setCurrentPage(page:number){
            this.currentPage=page;
        },
        setPageSize(pagesize:number){
            this.pageSize=pagesize;
        },
        edit(user:User){
            this.editUser=user;
        }
    }

})
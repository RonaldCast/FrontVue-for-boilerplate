import { defineStore } from "pinia"
import Ajax from "@/lib/ajax";
import appconst from '../../lib/appconst'
import Util from "@/lib/util";

import { routers } from "../../router/router"

interface AppState {
    cachePage: Array<any>;
    lang: string;
    isFullScreen: boolean;
    openedSubmenuArr: Array<any>;
    menuTheme: string;
    themeColor: string,
    pageOpenedList: Array<any>;
    currentPageName: string;
    currentPath: Array<any>;
    menuList: Array<any>;
    routers: Array<any>;
    tagsList: Array<any>;
    messageCount: number;
    dontCache: Array<any>;
    noticeList: Array<any>;
}

export const useAppStore = defineStore({
    id: "app",
    state: () => ({
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [],
        menuTheme: 'dark',
        themeColor: '',
        pageOpenedList: [{
            meta: { title: 'HomePage' },
            path: '',
            name: 'home'
        }],
        currentPageName: '',
        currentPath: [
            {
                meta: { title: 'HomePage' },
                path: '',
                name: 'home'
            }
        ],
        menuList: [],
        routers: [
            ...routers
        ],
        tagsList: [],
        messageCount: 0,
        dontCache: [],
        noticeList: [{ read: false, type: 0, title: 'First notice', description: 'One day ago' },
        { read: false, type: 1 }, { read: false, type: 0, title: 'Second notice', description: 'One month ago' }]
    } as AppState),
    actions: {
        async login(payload: any) {
            let resp = await Ajax.post("/api/TokenAuth/Authenticate", payload);
            var tokenExpireDate = payload.rememberMe ? (new Date(new Date().getTime() + 1000 * resp.data.result.expireInSeconds)) : undefined;
            Util.abp.auth.setToken(resp.data.result.accessToken, tokenExpireDate);
            Util.abp.utils.setCookieValue(appconst.authorization.encrptedAuthTokenName, resp.data.result.encryptedAccessToken, tokenExpireDate, Util.abp.appPath)
        },
        logout() {
            localStorage.clear();
            sessionStorage.clear();
        },
        setTagsList(list: Array<any>) {
            this.tagsList.push(...list);
        },

        initCachepage() {
            if (localStorage.cachePage) {
                this.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        setOpenedList() {
            this.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
        },
        setCurrentPath(pathArr: Array<any>) {
            this.currentPath = pathArr;
        },
        setCurrentPageName(name: string) {
            this.currentPageName = name;
        },

    }
}) 
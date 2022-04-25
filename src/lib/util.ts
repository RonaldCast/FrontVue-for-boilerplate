
import { useAppStore } from "@/stores/abpStores/useAppStore"
class Util {
    abp: any = window.abp;
    loadScript(url: string) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }
    title(title: string) {
        // let appname = this.abp.localization.localize('AppName', appconst.localization.defaultLocalizationSourceName);
        // let page = this.abp.localization.localize(title, appconst.localization.defaultLocalizationSourceName);
        window.document.title = title
    }
    inOf(arr: Array<any>, targetArr: any) {
        let res = true;
        arr.forEach(item => {
            if (targetArr.indexOf(item) < 0) {
                res = false;
            }
        });
        return res;
    }
    oneOf(ele: any, targetArr: Array<any>) {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    }
    showThisRoute(itAccess: any, currentAccess: any) {
        if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
            return this.oneOf(currentAccess, itAccess);
        } else {
            return itAccess === currentAccess;
        }
    }
    getRouterObjByName(routers: Array<any>, name?: string): any {
        if (!name || !routers || !routers.length) {
            return null;
        }
        // debugger;
        let routerObj = null;
        for (let item of routers) {
            if (item.name === name) {
                return item;
            }
            routerObj = this.getRouterObjByName(item.children, name);
            if (routerObj) {
                return routerObj;
            }
        }
        return null;
    }
    toDefaultPage(routers: Array<any>, name: string | undefined, route: any, next: any) {
        let len = routers.length;
        let i = 0;
        let notHandle = true;
        while (i < len) {
            if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
                route.replace({
                    name: routers[i].children[0].name
                });
                notHandle = false;
                next();
                break;
            }
            i++;
        }
        if (notHandle) {
            next();
        }
    }
    handleTitle(item: any) {
        return item.meta.title;
    }
    setCurrentPath(name?: string) {
        let title = '';
        let isOtherRouter = false;
        const useApp = useAppStore();
        useApp.routers.forEach((item: any) => {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = this.handleTitle(item);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            } else {
                item.children.forEach((child: any) => {
                    if (child.name === name) {
                        title = this.handleTitle(child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        });
        let currentPathArr = [];
        if (name === 'home') {
            currentPathArr = [
                {
                    meta: { title: this.handleTitle(this.getRouterObjByName(useApp.routers, 'home')) },
                    path: 'main/home',
                    name: 'home'
                }
            ];
        } else if (((name as string).indexOf('index') >= 0 || isOtherRouter) && name !== 'home') {
            currentPathArr = [
                {
                    meta: { title: this.handleTitle(this.getRouterObjByName(useApp.routers, 'home')) },
                    path: 'main/home',
                    name: 'home'
                },
                {
                    meta: { title: title },
                    path: '',
                    name: name
                }
            ];
        } else {
            let currentPathObj = useApp.routers.filter((item: any) => {
                if (item.children.length <= 1) {
                    return item.children[0].name === name || item.name === name;
                } else {
                    let i = 0;
                    let childArr = item.children;
                    let len = childArr.length;
                    while (i < len) {
                        if (childArr[i].name === name) {
                            return true;
                        }
                        i++;
                    }
                    return false;
                }
            })[0];
            if (currentPathObj.children && currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home'
                    }
                ];
            } else if (currentPathObj.children && currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home'
                    },
                    {
                        meta: { title: currentPathObj.meta.title },
                        path: '',
                        name: name
                    }
                ];
            } else {
                let childObj = currentPathObj.children.filter((child: any) => {
                    return child.name === name;
                })[0];
                currentPathArr = [
                    {
                        meta: { title: 'HomePage' },
                        path: 'main/home',
                        name: 'home'
                    },
                    {
                        meta: { title: currentPathObj.meta.title },
                        path: '',
                        name: ''
                    },
                    {
                        meta: { title: childObj.meta.title },
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }
        }
        useApp.setCurrentPath(currentPathArr);

        return currentPathArr;
    }

    extend(...args: any[]) {
        let options, name, src, srcType, copy, copyType, copyIsArray, clone,
            target = args[0] || {},
            i = 1,
            length = args.length,
            deep = false;
        if (typeof target === 'boolean') {
            deep = target;
            target = args[i] || {};
            i++;
        }
        if (typeof target !== 'object' && typeof target !== 'function') {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = args[i]) !== null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    srcType = Array.isArray(src) ? 'array' : typeof src;
                    if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && srcType === 'array' ? src : [];
                        } else {
                            clone = src && srcType === 'object' ? src : {};
                        }
                        target[name] = this.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
}
const util = new Util();
export default util;
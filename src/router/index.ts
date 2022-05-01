import { createRouter, createWebHistory } from "vue-router";
import { routers } from "./router"
import Util from '../lib/util';
import Cookies from 'js-cookie'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routers
});
router.beforeEach((to: any, from, next) => {

   
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') {
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {         
        if (!Util.abp.session.userId && to.meta.guest == true) {
            next();
        }
        if (!!Util.abp.session.userId && to.meta.guest == true) {
            next({
                name: 'home'
            });
        }
        else if (!Util.abp.session.userId && to.name !== 'login') {
            next({
                name: 'login'
            });
        } else if (!!Util.abp.session.userId && to.name === 'login') {
            Util.title(to.meta.title);
            next({
                name: 'home'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([routers], to.name);
            if (curRouterObj && curRouterObj.meta.permission) {
                if (window.abp.auth.hasPermission(curRouterObj.meta.permission)) {
                    next({
                        name: to.name
                    });
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else {
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
    window.scrollTo(0, 0);
});

export default router;

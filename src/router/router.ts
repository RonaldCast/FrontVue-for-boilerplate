import type { RouteRecordRaw } from 'vue-router'

declare global {
    interface RouterMeta {
        title: string;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import main from '../views/Main.vue'

export const locking: RouteRecordRaw = {
    path: '/locking',
    name: 'locking',
    component: () => import('../views/LockingView.vue')
};
export const loginRouter: RouteRecordRaw = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('../views/Login.vue')
};
export const otherRouters: RouteRecordRaw = {
    path: '/',
    name: 'main',
    meta: { title: 'ManageMenu', permission: '', },
    component: main,
    children: [
        { path: 'home', name: "home", meta: { title: 'HomePage', permission: '' }, component: () => import('../views/HomeView.vue') },
        { path: 'user', name: "user", meta: { title: 'UserPage', permission: '' }, component: () => import('../views/User/Index.vue') },
        { path: 'role', name: "role", meta: { title: 'UserPage', permission: '' }, component: () => import('../views/Role/Index.vue') },
        { path: 'tenant', name: "tenant", meta: { title: 'UserPage', permission: '' }, component: () => import('../views/Tenant/Index.vue') }
    ]
}

export const AboutRouter: RouteRecordRaw = {
    path: "/about",
    name: "about",
    meta: { title: "About", guest: true },
    component: () => import("../views/AboutView.vue")
}
export const routers: Array<RouteRecordRaw> = [
    loginRouter,
    locking,
    otherRouters,
    AboutRouter
];

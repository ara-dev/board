import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

// Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('./views/Board.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/board',
        name: 'board',
        component: () => import('./views/Board.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./views/Profile.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('./views/404.vue'),
        meta: {requiresAuth: true}
    },
    /*{
        path: '/cats',
        name: 'Cats',
        component: Cats,
        children: [
            {
                name: "CatList",
                path: "catlist/:count",
                component: CatList,
                props: true
            },
            {
                path: 'cat/:url',
                name: 'Cat',
                component: Cat
            },
        ]
    },*/
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    scrollBehavior(to, from, savedPosition) {
        // return desired position
    }
})


router.beforeEach((to, from, next) => {
    //console.log(`Navigating to: ${to.name}`);
    next();
});

router.afterEach((to, from, failure) => {

})


export default router;

// 5. Create and mount the root instance.
//const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
//app.use(router)

//app.mount('#app')
import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
// import LocalService from "@/service/LocalService";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/delivery',
                    name: 'delivery',
                    component: () => import('@/views/Delivery.vue'),
                    alias: ['/']
                },
                {
                    path: '/payment',
                    name: 'payment',
                    component: () => import('@/views/Payment.vue')
                },
                {
                    path: '/finish',
                    name: 'finish',
                    component: () => import('@/views/Finish.vue')
                }
            ]
        }
    ]
});

router.beforeEach(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

export default router;
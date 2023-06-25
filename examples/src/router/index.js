import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../view/layout.vue'),
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import('../view/test.vue'),
        meta: {
          title: 'test1'
        }
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('../view/test2.vue'),
        meta: {
          title: 'test2'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

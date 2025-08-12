import { createRouter, createWebHistory } from 'vue-router'
import MembershipForm from '@/views/MembershipForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'membership',
      component: MembershipForm
    }
  ]
})

export default router
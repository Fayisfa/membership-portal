import { createRouter, createWebHistory } from 'vue-router'
import MembershipForm from '@/views/MembershipForm.vue'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/register',
      name: 'membership',
      component: MembershipForm
    }
  ]
})

export default router
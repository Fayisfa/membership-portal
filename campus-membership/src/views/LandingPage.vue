<template>
  <div class="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
    <header class="bg-gray-900 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <img src="@/assets/ssf-logo.jpg" alt="SSF Logo" class="h-12 border-2 border-yellow-400 p-1 rounded-full">
          <h1 class="text-2xl font-extrabold tracking-wider text-yellow-400">SSF</h1>
        </div>
        <nav class="hidden md:flex space-x-8 text-lg font-semibold">
          <router-link to="/" class="hover:text-yellow-400 transition-colors">Home</router-link>
          <router-link to="/about" class="hover:text-yellow-400 transition-colors">About</router-link>
          <router-link to="/register" class="hover:text-yellow-400 transition-colors">Register</router-link>
          <router-link to="/contact" class="hover:text-yellow-400 transition-colors">Contact</router-link>
        </nav>
        <button class="md:hidden text-white hover:text-yellow-400">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>

    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="container mx-auto px-4 text-center z-10 relative">
        <h2 class="text-4xl md:text-7xl font-black mb-6 leading-tight uppercase text-white">
          Empower Your Future
          <span class="block text-yellow-400 mt-2">Join SSF Today</span>
        </h2>
        <p class="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300">
          Be a part of a dynamic community that champions education, unity, and social change.
        </p>
        <router-link 
          to="/register"
          class="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl transition-all transform hover:scale-105"
        >
          Sign Up Now
        </router-link>
      </div>
      <div class="absolute inset-0 bg-black opacity-30"></div>
    </section>

    <section class="py-24 container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-yellow-400 mb-4 uppercase tracking-wide">Our Core Values</h2>
        <div class="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
      </div>
      
      <div class="grid md:grid-cols-3 gap-12">
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl border-t-4 border-yellow-400 transform hover:scale-105 transition-transform duration-300">
          <div class="text-yellow-400 mb-6 flex justify-center">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center text-white">Mission</h3>
          <p class="text-gray-400 text-center text-sm">
            To empower students through education, foster unity among communities, and promote service to society.
          </p>
        </div>
        
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl border-t-4 border-yellow-400 transform hover:scale-105 transition-transform duration-300">
          <div class="text-yellow-400 mb-6 flex justify-center">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center text-white">Vision</h3>
          <p class="text-gray-400 text-center text-sm">
            A society where every student has access to quality education and opportunities for holistic development.
          </p>
        </div>
        
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl border-t-4 border-yellow-400 transform hover:scale-105 transition-transform duration-300">
          <div class="text-yellow-400 mb-6 flex justify-center">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-center text-white">Activities</h3>
          <p class="text-gray-400 text-center text-sm">
            Study circles, leadership programs, social service initiatives, and cultural events throughout the year.
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-yellow-400 mb-4 uppercase tracking-wide">Membership Benefits</h2>
          <div class="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-10">
          <div v-for="(benefit, index) in benefits" :key="index" class="p-8 bg-gray-900 rounded-lg shadow-md border border-gray-700 flex items-start space-x-4">
            <div class="text-red-500 flex-shrink-0 mt-1">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-xl mb-2 text-white">{{ benefit.title }}</h3>
              <p class="text-gray-400 text-sm">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-12">
          <div>
            <h3 class="text-2xl font-bold mb-4 text-yellow-400">SSF</h3>
            <p class="text-gray-400 text-sm">
              Sunni Students' Federation is a registered student organization working for the educational and social development of students.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/" class="text-gray-400 hover:text-yellow-400 transition-colors">Home</router-link></li>
              <li><router-link to="/about" class="text-gray-400 hover:text-yellow-400 transition-colors">About</router-link></li>
              <li><router-link to="/register" class="text-gray-400 hover:text-yellow-400 transition-colors">Register</router-link></li>
              <li><router-link to="/contact" class="text-gray-400 hover:text-yellow-400 transition-colors">Contact</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <address class="text-gray-400 not-italic text-sm space-y-2">
              <p>SSF Central Office</p>
              <p>Kerala, India</p>
              <p>Email: <a href="mailto:contact@ssf.org" class="hover:text-yellow-400 transition-colors">contact@ssf.org</a></p>
              <p>Phone: +91 1234567890</p>
            </address>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div class="flex space-x-5">
              <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Facebook">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Twitter">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Instagram">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2023 Sunni Students' Federation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const benefits = [
  {
    title: "Leadership & Growth",
    description: "Access exclusive leadership workshops and mentorship programs to unlock your full potential."
  },
  {
    title: "Global Network",
    description: "Connect with a diverse community of students and alumni worldwide, opening doors to new opportunities."
  },
  {
    title: "Community Impact",
    description: "Lead and participate in impactful social and educational service projects that make a real difference."
  },
  {
    title: "Skill Development",
    description: "Gain practical skills through hands-on training, study circles, and project-based learning."
  }
]
</script>
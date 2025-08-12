<template>
  <div class="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
    <header class="bg-gray-900 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <button @click="goBack" class="p-2 text-yellow-400 hover:text-white rounded-full transition-colors mr-2">
            <ChevronLeft class="w-6 h-6" />
          </button>
          <h1 class="text-2xl font-extrabold tracking-wider text-yellow-400">SSF Registration</h1>
        </div>
        <div class="hidden md:flex items-center">
           <img src="@/assets/ssf-logo.jpg" alt="SSF Logo" class="h-12 border-2 border-yellow-400 p-1 rounded-full">
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div class="bg-gray-700 h-2">
          <div class="bg-yellow-400 h-2 transition-all duration-500 ease-in-out" :style="{ width: `${progress}%` }"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 md:p-12">
          <h2 class="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wide">Membership Application</h2>
          
          <div class="mb-10">
            <div class="flex items-center gap-3 mb-6">
              <User class="w-6 h-6 text-yellow-400" />
              <h3 class="text-xl font-semibold text-white">Personal Information</h3>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="mt-2 text-sm text-red-400">{{ errors.name }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Mobile Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500">+91</span>
                  </div>
                  <input
                    v-model="form.mobile"
                    type="tel"
                    placeholder="10 digit phone number"
                    class="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                    :class="{ 'border-red-500': errors.mobile }"
                    @input="handleMobileInput"
                    maxlength="10"
                  />
                </div>
                <p v-if="errors.mobile" class="mt-2 text-sm text-red-400">{{ errors.mobile }}</p>
                <p v-if="mobileCheckMessage" class="mt-2 text-sm" :class="mobileCheckMessage.class">
                  {{ mobileCheckMessage.text }}
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="mt-2 text-sm text-red-400">{{ errors.email }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Date of Birth <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.dob"
                  type="date"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.dob }"
                  max="2005-12-31"
                />
                <p v-if="errors.dob" class="mt-2 text-sm text-red-400">{{ errors.dob }}</p>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-300 mb-2">Profile Photo (Optional)</label>
                <div class="flex items-center gap-6">
                  <div class="relative w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-600">
                    <img v-if="profilePreview" :src="profilePreview" alt="Profile" class="w-full h-full object-cover" />
                    <User v-else class="w-10 h-10 text-gray-500" />
                    <button
                      v-if="profilePreview"
                      @click.stop="removePhoto"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1 -translate-y-1 transition-all hover:scale-110"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      @click="choosePhoto"
                      class="px-5 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-white hover:bg-gray-600 transition-colors mb-2"
                    >
                      Choose Photo
                    </button>
                    <p class="text-xs text-gray-400">JPG or PNG, max 2MB</p>
                  </div>
                  <input
                    ref="photoInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handlePhotoUpload"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="mb-10">
            <div class="flex items-center gap-3 mb-6">
              <MapPin class="w-6 h-6 text-yellow-400" />
              <h3 class="text-xl font-semibold text-white">Address Information</h3>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  District <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.district" 
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors appearance-none pr-10"
                    :class="{ 'border-red-500': errors.district }"
                    @change="handleDistrictChange"
                  >
                    <option value="" disabled>Select district</option>
                    <option v-for="district in districts" :key="district" :value="district">
                      {{ district }}
                    </option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                <p v-if="errors.district" class="mt-2 text-sm text-red-400">{{ errors.district }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Division <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.division" 
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors appearance-none pr-10 disabled:opacity-50"
                    :class="{ 'border-red-500': errors.division }"
                    :disabled="!form.district"
                  >
                    <option value="" disabled>Select division</option>
                    <option v-for="division in filteredDivisions" :key="division" :value="division">
                      {{ division }}
                    </option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                <p v-if="errors.division" class="mt-2 text-sm text-red-400">{{ errors.division }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Sector <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.sector"
                  type="text"
                  placeholder="Enter your sector"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.sector }"
                />
                <p v-if="errors.sector" class="mt-2 text-sm text-red-400">{{ errors.sector }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Unit <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.unit"
                  type="text"
                  placeholder="Enter your unit"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.unit }"
                />
                <p v-if="errors.unit" class="mt-2 text-sm text-red-400">{{ errors.unit }}</p>
              </div>
            </div>
          </div>
          
          <div class="mb-10">
            <div class="flex items-center gap-3 mb-6">
              <School class="w-6 h-6 text-yellow-400" />
              <h3 class="text-xl font-semibold text-white">Educational Information</h3>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  School/College Name <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="schoolSearch"
                    type="text"
                    placeholder="Search or select school"
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors pr-10"
                    :class="{ 'border-red-500': errors.schoolName }"
                    @input="filterSchools"
                    @focus="showSchoolDropdown = true"
                  />
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  
                  <div 
                    v-if="showSchoolDropdown && filteredSchools.length > 0" 
                    class="absolute z-10 w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    <button
                      v-for="school in filteredSchools"
                      :key="school"
                      type="button"
                      @click="selectSchool(school)"
                      class="w-full px-4 py-2 text-left hover:bg-gray-600 border-b border-gray-700 last:border-b-0 text-sm transition-colors"
                    >
                      {{ school }}
                    </button>
                  </div>
                </div>
                <p v-if="errors.schoolName" class="mt-2 text-sm text-red-400">{{ errors.schoolName }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Course Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.courseName"
                  type="text"
                  placeholder="e.g., B.Sc. Computer Science"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  :class="{ 'border-red-500': errors.courseName }"
                />
                <p v-if="errors.courseName" class="mt-2 text-sm text-red-400">{{ errors.courseName }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Year of Study <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select 
                    v-model="form.yearOfStudy" 
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors appearance-none pr-10"
                    :class="{ 'border-red-500': errors.yearOfStudy }"
                  >
                    <option value="" disabled>Select year</option>
                    <option v-for="year in yearOptions" :key="year.value" :value="year.value">
                      {{ year.label }}
                    </option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
                <p v-if="errors.yearOfStudy" class="mt-2 text-sm text-red-400">{{ errors.yearOfStudy }}</p>
              </div>
            </div>
          </div>
          
          <div class="mb-10">
            <div class="flex items-start">
              <div class="flex items-center h-5 mt-1">
                <input
                  id="terms"
                  v-model="form.agreeTerms"
                  type="checkbox"
                  class="w-5 h-5 text-yellow-400 border-gray-600 rounded focus:ring-yellow-500 bg-gray-700 transition-colors"
                />
              </div>
              <div class="ml-4">
                <label for="terms" class="text-sm text-gray-400 leading-6">
                  I agree to the <a href="#" class="text-yellow-400 hover:text-white underline transition-colors">Terms and Conditions</a> and 
                  <a href="#" class="text-yellow-400 hover:text-white underline transition-colors">Privacy Policy</a> of SSF.
                  <span class="text-red-500">*</span>
                </label>
                <p v-if="errors.agreeTerms" class="mt-2 text-sm text-red-400">{{ errors.agreeTerms }}</p>
              </div>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform hover:scale-105"
            >
              <Loader v-if="loading" class="w-5 h-5 animate-spin" />
              <span>{{ loading ? 'Processing...' : 'Submit Application' }}</span>
              <ArrowRight v-if="!loading" class="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>

    <SuccessModal
      v-if="showSuccess"
      :member-id="memberId"
      :name="form.name"
      :level="form.level || 'MEMBER'"
      :course="form.courseName"
      :mobile="form.mobile"
      :blood-group="form.bloodGroup || ''"
      :address="`${form.unit}, ${form.sector}, ${form.district}, Kerala`"
      :dob="form.dob"
      :validity="validityPeriod"
      :photo-url="profilePreview"
      :qr-code-data="qrCodeData"
      @close="resetForm"
      @download="downloadIDCard"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'
import { useQRCode } from '../composables/useQRCode'

// Components
import SuccessModal from '../components/SuccessModal.vue'
import MembershipCard from '@/components/MembershipCard.vue'
import QRCodeGenerator from '@/components/QRCodeGenerator.vue'

// Icons
import { 
  ChevronLeft, 
  ChevronDown, 
  User, 
  School, 
  MapPin,
  ArrowRight, 
  Loader 
} from 'lucide-vue-next'

// Data
import { districts, divisionsByDistrict, schools } from '../data/locations'

// Composable
import { useFormValidation } from '../composables/useFormValidation'

const router = useRouter()
const { generateQRCode } = useQRCode()

// State
const loading = ref(false)
const showSuccess = ref(false)
const showSchoolDropdown = ref(false)
const schoolSearch = ref('')
const profilePreview = ref('')
const photoInput = ref(null)
const memberId = ref('')
const qrCodeData = ref('')
const mobileCheckMessage = ref(null)

// Form
const form = reactive({
  name: '',
  mobile: '',
  email: '',
  dob: '',
  district: '',
  division: '',
  sector: '',
  unit: '',
  schoolName: '',
  courseName: '',
  yearOfStudy: '',
  profilePhoto: null,
  agreeTerms: false
})

// Form validation
const { errors, validateForm, validateMobile } = useFormValidation()

// Year options
const yearOptions = [
  { label: 'First Year', value: '1' },
  { label: 'Second Year', value: '2' },
  { label: 'Third Year', value: '3' },
  { label: 'Fourth Year', value: '4' },
  { label: 'Fifth Year', value: '5' },
]

// Computed properties
const filteredDivisions = computed(() => {
  return form.district ? (divisionsByDistrict[form.district] || []) : []
})

const filteredSchools = computed(() => {
  if (!schoolSearch.value) return schools.slice(0, 5)
  return schools.filter(school => 
    school.toLowerCase().includes(schoolSearch.value.toLowerCase())
  ).slice(0, 10)
})

const progress = computed(() => {
  const totalFields = 10 
  let filledFields = 0
  
  if (form.name) filledFields++
  if (form.mobile && !errors.mobile) filledFields++
  if (form.email && !errors.email) filledFields++
  if (form.dob) filledFields++
  if (form.district) filledFields++
  if (form.division) filledFields++
  if (form.sector) filledFields++
  if (form.unit) filledFields++
  if (form.schoolName) filledFields++
  if (form.courseName) filledFields++
  if (form.yearOfStudy) filledFields++
  
  return Math.round((filledFields / totalFields) * 100)
})

const validityPeriod = computed(() => {
  const year = new Date().getFullYear() + 1;
  return `Valid until ${year}-12-31`;
});

// Methods
const goBack = () => {
  router.push('/')
}

const handleDistrictChange = () => {
  form.division = ''
}

const handleMobileInput = () => {
  form.mobile = form.mobile.replace(/\D/g, '')
  validateMobile(form.mobile)
  
  if (form.mobile.length === 10) {
    mobileCheckMessage.value = {
      text: 'Checking number availability...',
      class: 'text-gray-500'
    }
    // Simulate API call
    setTimeout(() => {
      const isDuplicate = Math.random() < 0.2
      if (isDuplicate) {
        mobileCheckMessage.value = {
          text: 'This mobile number is already registered',
          class: 'text-red-400'
        }
      } else {
        mobileCheckMessage.value = {
          text: 'Mobile number is available',
          class: 'text-green-500'
        }
      }
    }, 800)
  } else {
    mobileCheckMessage.value = null
  }
}

const choosePhoto = () => {
  photoInput.value?.click()
}

const removePhoto = () => {
  form.profilePhoto = null
  profilePreview.value = ''
  if (photoInput.value) {
    photoInput.value.value = ''
  }
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    form.profilePhoto = file
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const filterSchools = () => {
  showSchoolDropdown.value = true
}

const selectSchool = (school) => {
  form.schoolName = school
  schoolSearch.value = school
  showSchoolDropdown.value = false
}

const handleSubmit = async () => {
  if (!validateForm(form)) {
    const firstErrorElement = document.querySelector('.border-red-500')
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstErrorElement.focus()
    }
    return
  }
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const now = new Date()
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    memberId.value = `SSF-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${randomNum}`
    
    qrCodeData.value = await generateQRCode(`${memberId.value}|${form.name}`)
    
    showSuccess.value = true
    
    localStorage.setItem('lastSubmission', JSON.stringify({
      ...form,
      memberId: memberId.value,
      submittedAt: new Date().toISOString(),
      profilePhoto: form.profilePhoto ? 'File was uploaded' : null
    }))
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit application. Please try again.')
  } finally {
    loading.value = false
  }
}

const downloadIDCard = async () => {
  try {
    const tempDiv = document.createElement('div')
    document.body.appendChild(tempDiv)
    
    const { createApp } = await import('vue')
    const app = createApp(MembershipCard, {
      memberId: memberId.value,
      name: form.name,
      photoUrl: profilePreview.value,
      schoolName: form.schoolName,
      courseName: form.courseName,
      yearOfStudy: form.yearOfStudy,
      qrCodeData: qrCodeData.value
    })
    
    app.mount(tempDiv)
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const canvas = await html2canvas(tempDiv.firstChild)
    
    app.unmount()
    document.body.removeChild(tempDiv)
    
    const link = document.createElement('a')
    link.download = `SSF-MemberCard-${memberId.value}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    
  } catch (error) {
    console.error('Error generating ID card:', error)
    alert('Failed to generate ID card. Please try again.')
  }
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (key === 'profilePhoto') {
      form[key] = null
    } else if (key === 'agreeTerms') {
      form[key] = false
    } else {
      form[key] = ''
    }
  })
  
  Object.keys(errors).forEach(key => errors[key] = '')
  profilePreview.value = ''
  schoolSearch.value = ''
  showSuccess.value = false
  memberId.value = ''
  qrCodeData.value = ''
  mobileCheckMessage.value = null
  
  if (photoInput.value) {
    photoInput.value.value = ''
  }
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showSchoolDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const savedData = localStorage.getItem('membershipFormDraft')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      Object.assign(form, parsed)
      schoolSearch.value = form.schoolName
    } catch (error) {
      console.error('Failed to load saved form data:', error)
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  
  const hasData = Object.values(form).some(value => 
    value && value !== '' && value !== null && value !== false
  )
  
  if (hasData) {
    const draftData = { ...form }
    delete draftData.profilePhoto
    localStorage.setItem('membershipFormDraft', JSON.stringify(draftData))
  }
})
</script>
<template>
  <div class="min-h-screen bg-black text-white font-sans antialiased">
    <div class="w-full max-w-md mx-auto bg-blue-600 min-h-screen relative">
      <!-- Header -->
      <div class="bg-blue-600 p-4 text-white relative">
        <div class="flex items-center">
          <button @click="goBack" class="p-2 hover:bg-blue-500 rounded-full transition-colors mr-4">
            <ChevronLeft class="w-6 h-6" />
          </button>
          <h1 class="text-xl font-semibold">Apply for Membership</h1>
        </div>
      </div>

      <!-- Form Container -->
      <div class="bg-white text-gray-900 min-h-screen p-6 rounded-t-3xl -mt-4 relative z-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
              <User class="w-5 h-5 text-gray-600" />
              <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Phone Number
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.mobile"
                type="tel"
                placeholder="10 digit phone number"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                :class="{ 'border-red-300': errors.mobile }"
                @input="handleMobileInput"
              />
              <p v-if="errors.mobile" class="text-sm text-red-600">{{ errors.mobile }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Full Name
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter your full name"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                :class="{ 'border-red-300': errors.name }"
              />
              <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Profile Photo (Optional)</label>
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                  <img v-if="profilePreview" :src="profilePreview" alt="Profile" class="w-full h-full object-cover" />
                  <ImageIcon v-else class="w-6 h-6 text-gray-400" />
                </div>
                <button
                  type="button"
                  @click="choosePhoto"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Choose Photo
                </button>
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

          <!-- School Information Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
              <School class="w-5 h-5 text-gray-600" />
              <h2 class="text-lg font-medium text-gray-900">School Information</h2>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                District
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="form.district" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 appearance-none pr-10"
                  :class="{ 'border-red-300': errors.district }"
                  @change="handleDistrictChange"
                >
                  <option value="">Select district</option>
                  <option v-for="district in districts" :key="district" :value="district">
                    {{ district }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p v-if="errors.district" class="text-sm text-red-600">{{ errors.district }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Division
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="form.division" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 appearance-none pr-10"
                  :class="{ 'border-red-300': errors.division }"
                  :disabled="!form.district"
                >
                  <option value="">Select division</option>
                  <option v-for="division in filteredDivisions" :key="division" :value="division">
                    {{ division }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p v-if="errors.division" class="text-sm text-red-600">{{ errors.division }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                School Name
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="schoolSearch"
                  type="text"
                  placeholder="Search or select school"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 pr-10"
                  :class="{ 'border-red-300': errors.schoolName }"
                  @input="filterSchools"
                  @focus="showSchoolDropdown = true"
                />
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                
                <!-- School Dropdown -->
                <div 
                  v-if="showSchoolDropdown && filteredSchools.length > 0" 
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                >
                  <button
                    v-for="school in filteredSchools"
                    :key="school"
                    type="button"
                    @click="selectSchool(school)"
                    class="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                  >
                    {{ school }}
                  </button>
                </div>
              </div>
              <p v-if="errors.schoolName" class="text-sm text-red-600">{{ errors.schoolName }}</p>
            </div>
          </div>

          <!-- Course Information Section -->
          <div class="space-y-4">
            <div class="flex items-center gap-3 mb-4">
              <GraduationCap class="w-5 h-5 text-gray-600" />
              <h2 class="text-lg font-medium text-gray-900">Course Information</h2>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Course Name
                <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.courseName"
                type="text"
                placeholder="e.g., B.Sc. Computer Science"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                :class="{ 'border-red-300': errors.courseName }"
              />
              <p v-if="errors.courseName" class="text-sm text-red-600">{{ errors.courseName }}</p>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Year of Study
                <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select 
                  v-model="form.yearOfStudy" 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 appearance-none pr-10"
                  :class="{ 'border-red-300': errors.yearOfStudy }"
                >
                  <option value="">Select year</option>
                  <option v-for="year in yearOptions" :key="year.value" :value="year.value">
                    {{ year.label }}
                  </option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p v-if="errors.yearOfStudy" class="text-sm text-red-600">{{ errors.yearOfStudy }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-6 pb-8">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Loader v-if="loading" class="w-5 h-5 animate-spin" />
              <span>{{ loading ? 'Applying...' : 'Apply Membership Now' }}</span>
              <ArrowRight v-if="!loading" class="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p class="text-gray-600 mb-6">Your membership application has been submitted successfully. You will receive a confirmation shortly.</p>
        <button
          @click="resetForm"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply for Another Member
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// Icon imports
import { 
  ChevronLeft, 
  ChevronDown, 
  User, 
  School, 
  GraduationCap, 
  Image as ImageIcon, 
  ArrowRight, 
  Loader 
} from 'lucide-vue-next'

// Data imports
import { districts, divisionsByDistrict, schools } from '../data/locations.js'

// Composable imports
import { useFormValidation } from '../composables/useFormValidation.js'

// State
const loading = ref(false)
const showSuccess = ref(false)
const showSchoolDropdown = ref(false)
const schoolSearch = ref('')
const profilePreview = ref('')
const photoInput = ref(null)

// Form reactive object
const form = reactive({
  mobile: '',
  name: '',
  district: '',
  division: '',
  schoolName: '',
  courseName: '',
  yearOfStudy: '',
  profilePhoto: null
})

// Use form validation composable
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

// Methods
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    // Fallback if no history
    console.log('No history to go back to')
  }
}

const handleDistrictChange = () => {
  // Reset division when district changes
  form.division = ''
}

const handleMobileInput = () => {
  // Remove non-numeric characters
  form.mobile = form.mobile.replace(/\D/g, '')
  // Validate mobile number
  validateMobile(form.mobile)
}

const choosePhoto = () => {
  photoInput.value?.click()
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    // Check file type
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
    // Scroll to first error
    const firstErrorElement = document.querySelector('.border-red-300')
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      firstErrorElement.focus()
    }
    return
  }
  
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create FormData for file upload
    const formData = new FormData()
    Object.keys(form).forEach(key => {
      if (key === 'profilePhoto' && form[key]) {
        formData.append(key, form[key])
      } else if (key !== 'profilePhoto') {
        formData.append(key, form[key])
      }
    })
    
    console.log('Form submitted successfully:', {
      ...form,
      profilePhoto: form.profilePhoto ? 'File uploaded' : 'No photo'
    })
    
    // Show success modal
    showSuccess.value = true
    
    // Save to localStorage for backup
    localStorage.setItem('lastSubmission', JSON.stringify({
      ...form,
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

const resetForm = () => {
  // Reset form data
  Object.keys(form).forEach(key => {
    if (key === 'profilePhoto') {
      form[key] = null
    } else {
      form[key] = ''
    }
  })
  
  // Reset other state
  Object.keys(errors).forEach(key => errors[key] = '')
  profilePreview.value = ''
  schoolSearch.value = ''
  showSuccess.value = false
  
  // Reset file input
  if (photoInput.value) {
    photoInput.value.value = ''
  }
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showSchoolDropdown.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Load saved form data if exists
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
  
  // Save form data as draft
  const hasData = Object.values(form).some(value => 
    value && value !== '' && value !== null
  )
  
  if (hasData) {
    const draftData = { ...form }
    delete draftData.profilePhoto // Don't save file object
    localStorage.setItem('membershipFormDraft', JSON.stringify(draftData))
  }
})
</script>

<style scoped>
/* Remove custom form-input class and use inline styles */
/* select:disabled {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
} */

/* Custom scrollbar for dropdown */
.max-h-48::-webkit-scrollbar {
  width: 6px;
}

.max-h-48::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.max-h-48::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hide default select arrow */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
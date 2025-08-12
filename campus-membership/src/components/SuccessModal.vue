<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[1000] px-4">
    <div class="bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl p-8 transform transition-all scale-100 ease-out duration-300">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
          <svg class="w-9 h-9 text-gray-900" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-white mb-2">Application Submitted!</h2>
        <p class="text-gray-400">Your SSF membership has been successfully registered.</p>
      </div>

      <div class="membership-info text-center my-6">
        <p class="bg-gray-900 text-white font-mono font-semibold text-lg py-3 px-4 rounded-xl mb-4 shadow-inner">
          <strong>Membership ID:</strong> {{ memberId }}
        </p>
        
        <div class="flex items-center justify-center p-2 rounded-xl bg-gray-900 shadow-inner">
          <div class="transform-gpu scale-75 md:scale-90 animate-fade-in origin-center">
            <MembershipCard
              :name="name"
              :level="level"
              :course="course"
              :member-id="memberId"
              :mobile="mobile"
              :blood-group="bloodGroup"
              :address="address"
              :dob="dob"
              :validity="validity"
              :photo-url="photoUrl"
              :qr-code-data="qrCodeData"
            />
          </div>
        </div>

        <p class="text-gray-400 text-sm mt-6">
          Show this QR code at SSF events for verification. You can download your digital membership card below.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-4 mt-6">
        <button @click="downloadIDCard" class="w-full md:w-auto flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
          </svg>
          Download ID Card
        </button>
        <button @click="$emit('close')" class="w-full md:w-auto flex-1 bg-gray-700 text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MembershipCard from './MembershipCard.vue'

defineProps({
  memberId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'MEMBER'
  },
  course: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  validity: {
    type: String,
    default: 'DEC 2025'
  },
  photoUrl: {
    type: String,
    default: ''
  },
  qrCodeData: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'download'])

const downloadIDCard = () => {
  emit('download')
}
</script>

<style scoped>
@keyframes scale-in {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
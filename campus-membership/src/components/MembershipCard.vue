<!-- <template>
  <div class="membership-card bg-white rounded-xl shadow-lg p-6 w-80 text-center">
    <div class="mb-4">
      <h3 class="text-xl font-bold text-blue-600">SSF Membership ID</h3>
    </div>
    <div class="mb-4">
      <img :src="photoUrl" alt="Member Photo" class="w-24 h-24 rounded-full mx-auto object-cover border-2 border-blue-200">
    </div>
    <div class="mb-2">
      <p class="font-semibold">{{ name }}</p>
      <p class="text-sm text-gray-600">{{ memberId }}</p>
    </div>
    <div class="mb-4">
      <p class="text-sm">{{ schoolName }}</p>
      <p class="text-sm text-gray-600">{{ courseName }}, Year {{ yearOfStudy }}</p>
    </div>
    <div class="flex justify-center">
      <img :src="qrCodeData" alt="QR Code" class="w-24 h-24">
    </div>
    <div class="mt-4 text-xs text-gray-500">
      <p>Valid until {{ expirationDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  memberId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    default: 'https://via.placeholder.com/100'
  },
  schoolName: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  qrCodeData: {
    type: String,
    required: true
  }
})

const expirationDate = computed(() => {
  const currentYear = new Date().getFullYear()
  return `${currentYear + 1}-12-31`
})
</script>

<style scoped>
.membership-card {
  background: linear-gradient(to bottom, #ffffff, #f0f7ff);
  border: 1px solid #e0e0e0;
}
</style> -->
<template>
  <div class="w-[85mm] h-[54mm] bg-gray-100 rounded-lg shadow-xl overflow-hidden font-sans text-gray-800 flex flex-col p-2">
    <div class="flex-shrink-0 flex items-center justify-between bg-gray-900 text-yellow-400 py-2 px-3 rounded-t-md">
      <div class="flex items-center space-x-2">
        <img src="@/assets/ssf-logo.jpg" alt="SSF Logo" class="h-8 rounded-full border border-yellow-400">
        <h2 class="font-extrabold text-sm uppercase tracking-wide">SSF</h2>
      </div>
      <p class="text-xxs font-semibold text-white">MEMBERSHIP ID CARD</p>
    </div>

    <div class="flex-grow flex p-3 space-x-3">
      <div class="flex-shrink-0 flex flex-col items-center justify-between w-1/3">
        <div class="w-full h-24 bg-gray-300 rounded-md overflow-hidden border border-gray-400 shadow-sm">
          <img :src="photoUrl || placeholderImage" alt="Member Photo" class="w-full h-full object-cover">
        </div>
        <div class="w-full mt-2">
          <img :src="qrCodeData" alt="QR Code" class="w-full h-auto">
        </div>
      </div>

      <div class="flex-grow flex flex-col justify-center text-xs space-y-1 w-2/3">
        <div class="info-row">
          <span class="label">Name:</span>
          <span class="value font-semibold">{{ name }}</span>
        </div>
        <div class="info-row">
          <span class="label">Level:</span>
          <span class="value">{{ level }}</span>
        </div>
        <div class="info-row">
          <span class="label">Course:</span>
          <span class="value">{{ course }}</span>
        </div>
        <div class="info-row">
          <span class="label">Member ID:</span>
          <span class="value font-mono font-bold text-yellow-500">{{ memberId }}</span>
        </div>
        <div class="info-row">
          <span class="label">Mobile:</span>
          <span class="value">{{ mobile }}</span>
        </div>
        <div class="info-row">
          <span class="label">Address:</span>
          <span class="value">{{ address }}</span>
        </div>
        <div class="info-row">
          <span class="label">DOB:</span>
          <span class="value">{{ dob }}</span>
        </div>
        <div class="info-row">
          <span class="label">Valid Until:</span>
          <span class="value">{{ validity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import placeholderImage from '@/assets/default-profile.png'

const props = defineProps({
  name: { type: String, required: true },
  level: { type: String, default: 'MEMBER' },
  course: { type: String, required: true },
  memberId: { type: String, required: true },
  mobile: { type: String, required: true },
  bloodGroup: { type: String, default: '' },
  address: { type: String, required: true },
  dob: { type: String, required: true },
  validity: { type: String, default: 'DEC 2025' },
  photoUrl: { type: String, default: '' },
  qrCodeData: { type: String, required: true }
})
</script>

<style scoped>
.info-row {
  display: flex;
  font-size: 0.65rem;
  line-height: 1;
}

.label {
  font-weight: bold;
  width: 40%;
  color: #333;
}

.value {
  width: 60%;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-xxs {
  font-size: 0.6rem;
}
</style>
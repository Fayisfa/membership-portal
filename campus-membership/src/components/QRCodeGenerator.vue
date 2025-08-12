<template>
  <div class="qrcode-container">
    <img :src="qrCodeData" :alt="altText" class="qrcode-image">
    <p v-if="caption" class="qrcode-caption">{{ caption }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 200
  },
  altText: {
    type: String,
    default: 'QR Code'
  },
  caption: {
    type: String,
    default: ''
  }
})

const qrCodeData = ref('')

const generateQR = async () => {
  try {
    qrCodeData.value = await QRCode.toDataURL(props.text, {
      width: props.size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
  } catch (err) {
    console.error('QR generation failed:', err)
    qrCodeData.value = ''
  }
}

onMounted(generateQR)
watch(() => props.text, generateQR)
watch(() => props.size, generateQR)
</script>

<style scoped>
.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qrcode-image {
  width: 100%;
  height: auto;
  max-width: v-bind('props.size + "px"');
}

.qrcode-caption {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #666;
}
</style>
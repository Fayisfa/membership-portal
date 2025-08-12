import QRCode from 'qrcode'

export function useQRCode() {
  const generateQRCode = async (text) => {
    try {
      return await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
    } catch (err) {
      console.error('QR Code generation failed:', err)
      return ''
    }
  }

  return {
    generateQRCode
  }
}
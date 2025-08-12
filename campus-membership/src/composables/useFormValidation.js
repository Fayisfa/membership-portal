import { reactive } from 'vue'

export function useFormValidation() {
  const errors = reactive({
    mobile: '',
    name: '',
    district: '',
    division: '',
    schoolName: '',
    courseName: '',
    yearOfStudy: ''
  })

  const validateMobile = (mobile) => {
    if (!mobile) {
      errors.mobile = 'Phone number is required'
      return false
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      errors.mobile = 'Please enter a valid 10-digit phone number'
      return false
    } else {
      errors.mobile = ''
      return true
    }
  }

  const validateRequired = (value, field, fieldName) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      errors[field] = `${fieldName} is required`
      return false
    } else {
      errors[field] = ''
      return true
    }
  }

  const validateForm = (form) => {
    let isValid = true

    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')

    // Validate fields
    if (!validateMobile(form.mobile)) isValid = false
    if (!validateRequired(form.name, 'name', 'Full name')) isValid = false
    if (!validateRequired(form.district, 'district', 'District')) isValid = false
    if (!validateRequired(form.division, 'division', 'Division')) isValid = false
    if (!validateRequired(form.schoolName, 'schoolName', 'School name')) isValid = false
    if (!validateRequired(form.courseName, 'courseName', 'Course name')) isValid = false
    if (!validateRequired(form.yearOfStudy, 'yearOfStudy', 'Year of study')) isValid = false

    return isValid
  }

  return {
    errors,
    validateForm,
    validateMobile
  }
}
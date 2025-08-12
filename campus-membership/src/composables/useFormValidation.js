import { reactive } from 'vue'

export function useFormValidation() {
  const errors = reactive({
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
    agreeTerms: ''
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

  const validateEmail = (email) => {
    if (!email) {
      errors.email = 'Email is required'
      return false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
      return false
    } else {
      errors.email = ''
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

  const validateDate = (date, field, fieldName) => {
    if (!date) {
      errors[field] = `${fieldName} is required`
      return false
    } else {
      const dobDate = new Date(date)
      const today = new Date()
      if (dobDate > today) {
        errors[field] = 'Date cannot be in the future'
        return false
      } else {
        errors[field] = ''
        return true
      }
    }
  }

  const validateForm = (form) => {
    let isValid = true

    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')

    // Validate fields
    if (!validateRequired(form.name, 'name', 'Full name')) isValid = false
    if (!validateMobile(form.mobile)) isValid = false
    if (!validateEmail(form.email)) isValid = false
    if (!validateDate(form.dob, 'dob', 'Date of birth')) isValid = false
    if (!validateRequired(form.district, 'district', 'District')) isValid = false
    if (!validateRequired(form.division, 'division', 'Division')) isValid = false
    if (!validateRequired(form.sector, 'sector', 'Sector')) isValid = false
    if (!validateRequired(form.unit, 'unit', 'Unit')) isValid = false
    if (!validateRequired(form.schoolName, 'schoolName', 'School name')) isValid = false
    if (!validateRequired(form.courseName, 'courseName', 'Course name')) isValid = false
    if (!validateRequired(form.yearOfStudy, 'yearOfStudy', 'Year of study')) isValid = false
    if (!form.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions'
      isValid = false
    }

    return isValid
  }

  return {
    errors,
    validateForm,
    validateMobile,
    validateEmail
  }
}
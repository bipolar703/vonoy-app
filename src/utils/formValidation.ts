/**
 * Form validation utilities
 * Modern validation helpers for form inputs
 */

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Modern email regex that handles most valid email formats
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};

/**
 * Validates a name (first name, last name)
 * @param name - Name to validate
 * @returns Boolean indicating if name is valid
 */
export const isValidName = (name: string): boolean => {
  // Allow letters, spaces, hyphens, and apostrophes
  // Minimum 2 characters, maximum 50
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
  return nameRegex.test(name);
};

/**
 * Validates if a field has a value
 * @param value - Value to check
 * @returns Boolean indicating if field has a value
 */
export const hasValue = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validates a form field based on its type
 * @param type - Type of field to validate
 * @param value - Value to validate
 * @returns Object with isValid flag and error message
 */
export const validateField = (
  type: 'email' | 'name' | 'phone' | 'required',
  value: string
): { isValid: boolean; errorMessage: string } => {
  switch (type) {
    case 'email':
      return {
        isValid: isValidEmail(value),
        errorMessage: 'Please enter a valid email address',
      };
    case 'name':
      return {
        isValid: isValidName(value),
        errorMessage: 'Please enter a valid name (2-50 characters)',
      };
    case 'phone':
      // Phone validation is handled by the PhoneInput component
      return {
        isValid: true,
        errorMessage: 'Please enter a valid phone number',
      };
    case 'required':
      return {
        isValid: hasValue(value),
        errorMessage: 'This field is required',
      };
    default:
      return { isValid: true, errorMessage: '' };
  }
};

/**
 * Validates a form object with multiple fields
 * @param formData - Form data object
 * @param validationRules - Validation rules for each field
 * @returns Object with overall validity and field-specific errors
 */
export const validateForm = (
  formData: Record<string, string>,
  validationRules: Record<string, 'email' | 'name' | 'phone' | 'required'>
): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  let isValid = true;

  // Validate each field based on its rule
  Object.entries(validationRules).forEach(([field, rule]) => {
    const value = formData[field] || '';
    const validation = validateField(rule, value);

    if (!validation.isValid) {
      errors[field] = validation.errorMessage;
      isValid = false;
    }
  });

  return { isValid, errors };
};

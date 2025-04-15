import React, { useEffect, useRef, useState } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean, countryCode: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  defaultCountry?: string;
  preferredCountries?: string[];
  onlyCountries?: string[];
  excludeCountries?: string[];
}

/**
 * Modern international phone input component with country flags
 * Based on intl-tel-input library
 * 
 * @param {PhoneInputProps} props - Component props
 * @returns {JSX.Element} Phone input component with country selector
 */
const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  id = 'phone',
  name = 'phone',
  placeholder = 'Enter your phone number',
  required = false,
  className = '',
  errorMessage,
  defaultCountry = 'ae',
  preferredCountries = ['ae', 'us', 'gb', 'sa'],
  onlyCountries = [],
  excludeCountries = [],
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [itiInstance, setItiInstance] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize intl-tel-input
  useEffect(() => {
    let iti: any = null;
    
    // Dynamic import of intl-tel-input
    const initializePhoneInput = async () => {
      try {
        // Import the library dynamically
        const intlTelInput = (await import('intl-tel-input')).default;
        
        if (inputRef.current) {
          // Initialize the plugin
          iti = intlTelInput(inputRef.current, {
            initialCountry: defaultCountry,
            preferredCountries: preferredCountries,
            onlyCountries: onlyCountries.length > 0 ? onlyCountries : undefined,
            excludeCountries: excludeCountries.length > 0 ? excludeCountries : undefined,
            separateDialCode: true,
            utilsScript: () => import('intl-tel-input/utils'),
            formatAsYouType: true,
            autoPlaceholder: 'aggressive',
            showFlags: true,
            countrySearch: true,
          });
          
          setItiInstance(iti);
          setIsLoaded(true);
          
          // Set initial value if provided
          if (value) {
            iti.setNumber(value);
            validateNumber(iti);
          }
        }
      } catch (error) {
        console.error('Error initializing phone input:', error);
      }
    };
    
    initializePhoneInput();
    
    // Cleanup on unmount
    return () => {
      if (iti) {
        iti.destroy();
      }
    };
  }, [defaultCountry, preferredCountries, onlyCountries, excludeCountries]);

  // Validate phone number
  const validateNumber = (iti: any) => {
    if (!iti) return false;
    
    const isValidNumber = iti.isValidNumber();
    setIsValid(isValidNumber);
    return isValidNumber;
  };

  // Handle input changes
  const handleInputChange = () => {
    if (!itiInstance) return;
    
    const number = itiInstance.getNumber();
    const countryData = itiInstance.getSelectedCountryData();
    const isValidNumber = validateNumber(itiInstance);
    
    onChange(number, isValidNumber, countryData.iso2);
  };

  // Handle focus events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (itiInstance) {
      validateNumber(itiInstance);
    }
  };

  // Custom input classes based on state
  const inputClasses = `
    w-full bg-white/10 border rounded-md px-3 py-2 text-white 
    placeholder:text-white/50 focus:outline-none focus:ring-2 
    transition-all duration-300
    ${!isValid && !isFocused ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20 focus:ring-[#2A9D8F]/50'}
    ${className}
  `;

  return (
    <div className="phone-input-container">
      <input
        ref={inputRef}
        type="tel"
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={!isValid}
        aria-describedby={!isValid ? `${id}-error` : undefined}
      />
      
      {!isValid && errorMessage && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {errorMessage}
        </p>
      )}
      
      {/* Loading indicator while initializing */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-md">
          <div className="w-5 h-5 border-2 border-[#2A9D8F] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;

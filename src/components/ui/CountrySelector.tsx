import React, { useState, useRef, useEffect } from 'react';

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface CountrySelectorProps {
  selectedCountry: string;
  onChange: (country: Country) => void;
  className?: string;
}

/**
 * CountrySelector Component
 *
 * A premium country selector with flags and dial codes
 * for international phone numbers.
 */
const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // List of countries with flags and dial codes
  const countries: Country[] = [
    { code: 'ae', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'us', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'sa', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'eg', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { code: 'ca', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'fr', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'in', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'jp', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'cn', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'ru', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
    { code: 'br', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'mx', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'sg', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'za', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'kr', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'tr', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
    { code: 'it', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  ];

  // Find the selected country
  const selected = countries.find((c) => c.code === selectedCountry) || countries[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-md px-4 py-3 text-white cursor-pointer hover:bg-white/15 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">{selected.flag}</span>
        <span>{selected.dialCode}</span>
        <svg
          className={`w-4 h-4 ml-1 text-white/50 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 max-h-60 overflow-y-auto bg-[#0A1520] border border-white/20 rounded-md shadow-xl backdrop-blur-md left-0 sm:left-auto">
          <div className="p-2">
            {countries.map((country) => (
              <div
                key={country.code}
                className="flex items-center gap-3 p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
              >
                <span className="text-xl">{country.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm text-white">{country.name}</span>
                  <span className="text-xs text-white/70">{country.dialCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;

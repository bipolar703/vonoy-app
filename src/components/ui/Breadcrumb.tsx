import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Component
 * 
 * Displays a navigation breadcrumb trail showing the current page location
 * within the site hierarchy.
 * 
 * @param {BreadcrumbProps} props - Component props
 * @returns {JSX.Element} Rendered breadcrumb component
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-container ${className}`}>
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {!isLast ? (
                <>
                  <Link 
                    to={item.path}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                  <svg
                    className="w-4 h-4 mx-2 text-white/50 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <span className="text-[#58a49d] text-sm font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

import React from 'react';
import { changeLanguage } from '@/utils';
// You can either use flag images or react-icons for flags
import { FaFlagUsa, FaFlag } from 'react-icons/fa'; // Example from react-icons, replace with appropriate flag icons

const LanguageSwitcher: React.FC = () => {
    const handleLanguageChange = (lng: string) => {
        changeLanguage(lng);
    };

    return (
        <div className='flex items-center space-x-4'>
            <FaFlag onClick={() => handleLanguageChange('vi')} className='focus:outline-none cursor-pointer'>
            </FaFlag>
            <FaFlagUsa onClick={() => handleLanguageChange('en')} className='focus:outline-none cursor-pointer'>
            </FaFlagUsa>
        </div>
    );
};

export default LanguageSwitcher;

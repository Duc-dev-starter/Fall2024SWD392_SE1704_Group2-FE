import { changeLanguage } from '../../utils';
const LanguageSwitcher: React.FC = () => {
    const handleLanguageChange = (lng: string) => {
        changeLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => handleLanguageChange('vi')}>Tiếng Việt</button>
            <button onClick={() => handleLanguageChange('en')}>English</button>
        </div>
    );
};

export default LanguageSwitcher;

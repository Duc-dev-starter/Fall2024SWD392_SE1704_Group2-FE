import i18n from 'i18next';

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };
  
export const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : "";
    return user
}


export const timeIsoToLocale = (iso: string, locale = 'vi-VN') => {
    return new Date(iso).toLocaleString(locale);
};

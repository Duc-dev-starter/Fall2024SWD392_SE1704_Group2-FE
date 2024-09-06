export const scrollToTop = (position = 0, behavior: ScrollBehavior = 'smooth') => {
    document.body.scrollTo({
        top: position,
        behavior,
    })
}

export const timeIsoToLocale = (iso: string, locale = 'vi-VN') => {
    return new Date(iso).toLocaleString(locale)
}

export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const clearCache = async () => {
    if (window.caches) {
        const keys = await caches.keys()
        await Promise.all(
            keys.map(key => {
                return caches.delete(key)
            })
        )
    }
}

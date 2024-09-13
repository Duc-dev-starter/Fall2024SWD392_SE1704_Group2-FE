export const scrollToTop = (position = 0, behavior: ScrollBehavior = 'smooth') => {
    document.body.scrollTo({
        top: position,
        behavior,
    });
};
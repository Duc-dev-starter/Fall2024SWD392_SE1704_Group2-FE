export const PATHS = {
    HOME: '/',
    ABOUT: '/about',
    BLOG: '/blog',
    CONTACT: "/contact",
    BLOG_DETAIL: '/blog/:id',
    INTERNAL_SERVER_ERROR: '/500',
    NOTFOUND: '/400',
    FORGOT_PASSWORD: '/forgot-password',
    LOGIN: '/login',
    CHANGE_PASSWORD: '/change-password',
    TERMS: '/terms',
    REGISTER_KOI: '/register-koi',

    // member paths
    USER_PROFILE: '/profile',
    USER_HISTORY: '/history',

    // manager paths
    MANAGER: '/manager/*',
    MANAGER_LOGIN: '/manager/login',
    MANAGER_DASHBOARD: 'dashboard',
    MANAGER_USERS: 'manage-users',
    MANAGER_BLOGS: 'manage-categories',

    // referee paths
    REFEREE: '/referee/*',
    REFEREE_LOGIN: '/referee/login',
    REFEREE_DASHBOARD: 'dashboard',
    REFEREE_COMPETITION: 'competition',
    REFEREE_SCORE: 'score',

    // staff paths
    STAFF: '/staff/*',
    STAFF_LOGIN: '/staff/login',
    STAFF_DASHBOARD: 'dashboard',
    STAFF_REGISTRATION: 'contest-registration',
    STAFF_COMPETITION: 'competition',
    STAFF_REPORT: 'report',
}

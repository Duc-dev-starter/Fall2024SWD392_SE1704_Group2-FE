export const PATHS = {
    HOME: '/',
    ABOUT: '/about',
    BLOG: '/blog',
    CONTACT: "/contact",
    BLOG_DETAIL: '/blog/:id',

    // manager paths
    MANAGER: '/manager/*',
    MANAGER_LOGIN: '/manager/login',
    MANAGER_DASHBOARD: 'dashboard',
    MANAGER_USERS: 'manage-users',
    MANAGER_BLOGS: 'manage-categories',

    // referee paths
    REFEREE: '/referee/*',
    REFEREE_LOGIN: '/referee/login',
    REFEREE_COMPETITION: 'competition',
    REFEREE_SCORE: 'score',

    // staff paths
    STAFF: '/staff/*',
    STAFF_LOGIN: '/staff/login',
    STAFF_REGISTRATION: 'contest-registration',
    STAFF_COMPETITION: 'competition',
    STAFF_REPORT: 'report',
}

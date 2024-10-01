
export { default as HomePage } from './home/HomePage'
export { default as AboutPage } from './about/AboutPage'
export { default as BlogPage } from './blog/BlogPage'
export { default as ContactPage } from './contact/ContactPage'
export { default as BlogDetailPage } from './blog/BlogDetailPage'
export { default as NotAuthorized } from './403'
export { default as Notfound } from './404'
export { default as InternalServerError } from './500'

// manager page exports
export { default as DashboardLayout } from '../layouts/dashboard/Dashboard'
export { default as ManagerDashboard } from './manager/dashboard/Dashboard'
export { default as ManagerUsers } from './manager/manage-users'
export { default as ManagerCategory } from './manager/manage-categories'

// referees page exports
export { default as RefereeCompetition } from './referee/competition'
export { default as RefereeScored } from './referee/scored-koi'

// staff page exports
export { default as Managecompetition } from './staff/competition'
export { default as ContestRegistration } from './staff/contestRegistration'
export { default as ContestReport } from './staff/contestReport'

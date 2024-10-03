import React from 'react';
import { Route, Routes } from "react-router-dom";
import {
    HomePage, AboutPage, BlogPage, ContactPage,
    BlogDetailPage, Notfound, ForgotPassword, ChangePassword, DashboardLayout,
    ManagerDashboard, ManagerUsers, ManagerCategory,
    Managecompetition, ContestRegistration, ContestReport,
    RefereeCompetition, RefereeScored
} from "@/pages";
import { PATHS, ROLES } from "@/consts";
import { useRoleRedirect } from '../hooks'

const AppRouter: React.FC = () => {
    const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG} element={<BlogPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.BLOG_DETAIL} element={<BlogDetailPage />} />
            <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePassword />} />


            <Route path='/staff/*' element={canAccess([ROLES.STAFF]) && <Dashboard />}>
                <Route path='dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/referee/*' element={canAccess([ROLES.REFEREE]) && <Dashboard />}>
                <Route path='dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/manager/*' element={canAccess([ROLES.MANAGER]) && <Dashboard />}>
                <Route path='dashboard' element={<Dashboard />} />

                {/* MANAGER ROUTE */}
                <Route path={PATHS.MANAGER_LOGIN} element={'manager login page'} />  {/* MANAGER login page */}
                <Route path={PATHS.MANAGER} element={<DashboardLayout />}> {/* Layout */}
                    <Route path={PATHS.MANAGER_DASHBOARD} element={<ManagerDashboard />} /> {/** MANAGER dashboard layout */}
                    <Route path={PATHS.MANAGER_USERS} element={<ManagerUsers />} /> {/** MANAGER manage user */}
                    <Route path={PATHS.MANAGER_BLOGS} element={<ManagerCategory />} /> {/** MANAGER manage blog */}
                </Route>

                {/* STAFF ROUTE */}
                <Route path={PATHS.STAFF} element={<DashboardLayout />}> {/* Layout */}
                    <Route path={PATHS.STAFF_REGISTRATION} element={<ContestRegistration />} /> {/* contest registration */}
                    <Route path={PATHS.STAFF_COMPETITION} element={<Managecompetition />} /> {/* manage competition */}
                    <Route path={PATHS.STAFF_REPORT} element={<ContestReport />} /> {/* export report */}
                </Route>

                {/* REFEREE ROUTE */}
                {/* login */}
                <Route path={PATHS.REFEREE} element={<DashboardLayout />}> {/* Layout */}
                    <Route path={PATHS.REFEREE_COMPETITION} element={<RefereeCompetition />} /> {/* Assigned Competition */}
                    <Route path={PATHS.REFEREE_SCORE} element={<RefereeScored />} /> {/* Score Koifish */}
                </Route>

                <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default AppRouter;

import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS, ROLES } from "@/consts";
import { useRoleRedirect } from '../hooks'
import {
    HomePage, AboutPage, BlogPage, ContactPage,
    BlogDetailPage, Notfound, DashboardLayout,
    ManagerDashboard, ManagerUsers, ManagerCategory,
    Managecompetition, ContestRegistration, ContestReport, ManageBlogs,
    RefereeCompetition, RefereeScored, ForgotPassword, ChangePassword, Profile, Terms, ServerLogin, RegisterKoi, ManageContest, ManageCriteria
} from "@/pages";

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
            <Route path={PATHS.TERMS} element={<Terms />} />
            <Route path={PATHS.REGISTER_KOI} element={<RegisterKoi />} />



            {/* MEMBER ROUTE */}
            <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePassword />} />
            <Route path={PATHS.USER_PROFILE} element={<Profile />} />

            {/* MANAGER ROUTE */}
            <Route path={PATHS.MANAGER_LOGIN} element={<ServerLogin />} />  {/* MANAGER login page */}
            <Route path={PATHS.MANAGER} element={canAccess([ROLES.MANAGER]) ? <DashboardLayout /> : <Navigate to={PATHS.MANAGER_HOME} />}> {/* Layout */}
                <Route path={PATHS.MANAGER_DASHBOARD} element={<ManagerDashboard />} /> {/** MANAGER dashboard layout */}
                <Route path={PATHS.MANAGER_USERS} element={<ManagerUsers />} /> {/** MANAGER manage user */}
                <Route path={PATHS.MANAGER_CATEGORY} element={<ManagerCategory />} /> {/** MANAGER manage category */}
                <Route path={PATHS.MANAGER_CONTEST} element={<ManageContest />} /> {/** MANAGER manage contest */}
                <Route path={PATHS.MANAGER_CRITERIA} element={<ManageCriteria />} /> {/** MANAGER manage criteria */}
                <Route path={PATHS.MANAGER_BLOGS} element={<ManageBlogs />} /> {/** MANAGER manage blogs */}
            </Route>

            {/* STAFF ROUTE */}
            <Route path={PATHS.STAFF_LOGIN} element={<ServerLogin />} />
            <Route path={PATHS.STAFF} element={canAccess([ROLES.STAFF]) ? <DashboardLayout /> : <Navigate to={PATHS.STAFF_HOME} />}> {/* Layout */}
                <Route path={PATHS.STAFF_REGISTRATION} element={<ContestRegistration />} /> {/* contest registration */}
                <Route path={PATHS.STAFF_COMPETITION} element={<Managecompetition />} /> {/* manage competition */}
            </Route>

            {/* REFEREE ROUTE */}
            {/* login */}
            <Route path={PATHS.REFEREE_LOGIN} element={<ServerLogin />} />
            <Route path={PATHS.REFEREE} element={canAccess([ROLES.REFEREE]) ? <DashboardLayout /> : <Navigate to={PATHS.REFEREE} />}> {/* Layout */}
                <Route path={PATHS.REFEREE_COMPETITION} element={<RefereeCompetition />} /> {/* Assigned Competition */}
                <Route path={PATHS.REFEREE_SCORE} element={<RefereeScored />} /> {/* Score Koifish */}
            </Route>

            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default AppRouter;

import React from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage, AboutPage, BlogPage, ContactPage, BlogDetailPage, Notfound, ForgotPassword, ChangePassword } from "@/pages";
import { PATHS, ROLES } from "@/consts";
import { Dashboard } from '@/layouts';
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
            </Route>

            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default AppRouter;
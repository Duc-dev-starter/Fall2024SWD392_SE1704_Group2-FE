import React from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage, AboutPage, BlogPage, ContactPage, BlogDetailPage, Notfound } from "@/pages";
import { PATHS } from "@/consts";
import { Dashboard } from '@/layouts';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG} element={<BlogPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.BLOG_DETAIL} element={<BlogDetailPage />} />

            <Route path='/manager/*'>
                <Route path='dashboard' element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default AppRouter;
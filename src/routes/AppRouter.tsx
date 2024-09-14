import React from 'react';
import { Route, Routes } from "react-router-dom";
import { HomePage, AboutPage, BlogPage } from "@/pages";
import { PATHS } from "@/consts";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG} element={<BlogPage />} />
        </Routes>
    )
}

export default AppRouter;
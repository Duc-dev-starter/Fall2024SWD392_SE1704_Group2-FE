import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages";
import { PATHS } from "../consts";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={<HomePage />} />
        </Routes>
    )
}

export default AppRouter;
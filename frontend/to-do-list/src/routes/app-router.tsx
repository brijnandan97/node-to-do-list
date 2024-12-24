import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"

export const AppRouter = () => {
    return <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to="/login"/>}/>
    </Routes>
}
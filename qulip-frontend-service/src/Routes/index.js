import { Route, Routes } from "react-router-dom"
import SharedLayout from "./SharedLayout"
import { Homepage } from "../shared"
import { authRoutes } from "./publicRoutes"
import RequiresAuth from "./RequiresAuth"
import { userRoutes } from "./privateRoutes"

const Index = () => {
    return (
        <Routes>
            <Route element={<SharedLayout />}>
                <Route path="/" element={<Homepage />} index />
                {authRoutes.map((route, idx) => (
                    <Route key={idx} path={route.path} element={route.element} />
                ))}
                <Route />
                <Route element={<RequiresAuth />}>
                    {userRoutes.map((route, idx) => (
                        <Route key={idx} path={route.path} element={route.element} />
                    ))}
                </Route>
            </Route>
        </Routes>
    )
}

export { Index }
import { Login, Register } from "../shared";

const authRoutes = [
    {path : '/login', element : <Login />},
    {path : '/register', element : <Register />}
];

export {
    authRoutes
}
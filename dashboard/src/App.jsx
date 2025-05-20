import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/about/About";
import RegisterPageWithProvider from "./pages/register";
import LoginPageWithProvider from "./pages/login";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersListPage from "./pages/admin/users/UsersListPage";
import EditUserPage from "./pages/admin/users/edit/EditUserPage";
import AdminPanelLayout from "./components/layouts/AdminPanelLayout";
import RoleListPage from "./pages/admin/roles/RoleListPage";
import {useSelector} from "react-redux";
import usersJson from "./pages/admin/users/users.json";
import rolesJson from "./pages/admin/roles/roles.json";
import useAction from "./hooks/useAction";
import "./App.css";
import {ThemeProvider} from "@mui/material";
import {lightTheme, darkTheme} from "./theming/themes";
import ManufacturesPage from "./pages/manufactures/ManufacturesPage";
import CarsPage from "./pages/cars/CarsPage";
import {getToken, refreshTokens} from "./store/reducers/authReducer/actions";

const App = () => {
    const {user, isAuth} = useSelector((state) => state.auth);
    const {theme} = useSelector((state) => state.theme);
    const {jwtLogin, setTheme, refreshTokens} = useAction();

    // load users and roles
    useEffect(() => {
        const localUsers = localStorage.getItem("users");
        if (!localUsers) {
            localStorage.setItem("users", JSON.stringify(usersJson));
        }

        const localRoles = localStorage.getItem("roles");
        if (!localRoles) {
            localStorage.setItem("roles", JSON.stringify(rolesJson));
        }
    }, []);

    // login user
    useEffect(() => {
        const token = getToken("at");
        if (token.length > 0) {
            jwtLogin(token);
        } else {
            refreshTokens();
        }

        const localTheme = localStorage.getItem("theme");
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<MainPage/>}/>
                    {!isAuth && (
                        <>
                            <Route path="register" element={<RegisterPageWithProvider/>}/>
                            <Route
                                path="login"
                                element={<LoginPageWithProvider/>}
                            />
                        </>
                    )}
                    <Route path="manufactures" element={<ManufacturesPage/>}/>
                    <Route path="cars" element={<CarsPage/>}/>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
                {isAuth && user.role.includes("admin") && (
                    <Route path="admin" element={<AdminPanelLayout/>}>
                        <Route path="users">
                            <Route index element={<UsersListPage/>}/>
                            <Route
                                path="create"
                                element={<EditUserPage isUpdate={false}/>}
                            />
                            <Route
                                path="update/:id"
                                element={<EditUserPage isUpdate={true}/>}
                            />
                        </Route>
                        <Route path="roles" element={<RoleListPage/>}/>
                    </Route>
                )}
            </Routes>
        </ThemeProvider>
    );
};

export default App;

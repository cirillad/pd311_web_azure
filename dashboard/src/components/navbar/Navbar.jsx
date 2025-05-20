import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from '@mui/icons-material/Language';
import {Button, Avatar, Box, AppBar, useTheme} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {defaultAvatarUrl} from "../../settings/urls";
import {useSelector} from "react-redux";
import useAction from "../../hooks/useAction";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

const pages = [
    {name: "mainPage", url: "/"},
    {name: "aboutPage", url: "/about"},
    {name: "adminPanel", url: "/admin", role: "admin"},
    {name: "Manufactures", url: "/manufactures"},
    {name: "Cars", url: "/cars"},
    {name: "Engines", url: "/cars"},
];

const Navbar = () => {
    const {user, isAuth} = useSelector((state) => state.auth);
    const {theme} = useSelector((state) => state.theme);
    const {logout, setTheme} = useAction();
    const muiTheme = useTheme();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const changeLanguageHandler = () => {
        const lng = i18next.language === "en" ? "uk" : "en";
        i18next.changeLanguage(lng);
    }

    const logoutHandler = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar
            color="primary"
            position="static"
            sx={{
                minHeight: "50px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 20px",
            }}
        >
            <Box
                sx={{
                    flexGrow: 5,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                {pages.map((page) =>
                    !page.role ? (
                        <Link
                            to={page.url}
                            key={page.name}
                            style={{color: muiTheme.palette.text.main}}
                        >
                            {t(page.name)}
                        </Link>
                    ) : (
                        isAuth &&
                        user.role.includes(page.role) && (
                            <Link
                                to={page.url}
                                key={page.name}
                                style={{color: muiTheme.palette.text.main}}
                            >
                                {t(page.name)}
                            </Link>
                        )
                    )
                )}
            </Box>
            <Box sx={{display: "flex", flexGrow: 1, justifyContent: "right"}}>
                {theme === "dark" ? (
                    <Button onClick={() => setTheme("light")}>
                        <LightModeIcon
                            sx={{color: muiTheme.palette.text.main}}
                        />
                    </Button>
                ) : (
                    <Button onClick={() => setTheme("dark")}>
                        <DarkModeIcon
                            sx={{color: muiTheme.palette.text.main}}
                        />
                    </Button>
                )}
                <Button onClick={changeLanguageHandler}>
                    <LanguageIcon
                        sx={{color: muiTheme.palette.text.main}}
                    />
                </Button>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {!isAuth ? (
                    <Box sx={{display: "flex", justifyContent: "right"}}>
                        <Link style={{margin: "0px 5px"}} to="login">
                            <Button variant="contained" color="secondary">
                                {t('login')}
                            </Button>
                        </Link>
                        <Link style={{margin: "0px 5px"}} to="register">
                            <Button variant="contained" color="secondary">
                                {t('register')}
                            </Button>
                        </Link>
                    </Box>
                ) : (
                    <Box
                        sx={{display: "flex", justifyContent: "right"}}>
                        <Avatar
                            alt="Remy Sharp"
                            src={user.image ? process.env.REACT_APP_IMAGES_URL + user.image : defaultAvatarUrl}
                        />
                        <Button
                            onClick={logoutHandler}
                            sx={{m: "0px 5px   "}}
                            variant="contained"
                            color="secondary">
                            {t("logout")}
                        </Button>
                    </Box>
                )}
            </Box>
        </AppBar>
    );
};

export default Navbar;

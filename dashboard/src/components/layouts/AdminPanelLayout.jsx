import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Grid from "@mui/material/Grid2";
import AdminPanelMenu from "../menu/admin/AdminPanelMenu";
import {useSelector} from "react-redux";
import {Box, CircularProgress} from "@mui/material";

const AdminPanelLayout = () => {
    const {isLoading} = useSelector(state => state.common);

    return (
        <>
            <Navbar/>
            <Grid container sx={{minHeight: "100vh", my: "10px"}} spacing={2}>
                <Grid size={2}>
                    <AdminPanelMenu/>
                </Grid>
                <Grid size={8}>
                    {
                        isLoading ? (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress/>
                            </Box>) : (
                            <Outlet/>
                        )}
                </Grid>
                <Grid size={2}>
                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default AdminPanelLayout;
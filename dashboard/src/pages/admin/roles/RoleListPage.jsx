import RoleCard from "../../../components/cards/RoleCard";
import {useEffect, useState} from "react";
import useAction from "../../../hooks/useAction";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid2";
import AddIcon from '@mui/icons-material/Add';
import {Fab} from "@mui/material";
import CreateRoleModal from "../../../components/modal/CreateRoleModal";

const gridCellStyle = {
    p: "10px"
}

const RoleListPage = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const {loadRoles} = useAction();
    const {roles, isLoaded} = useSelector(state => state.role);

    useEffect(() => {
        if (!isLoaded) {
            loadRoles();
        }
    }, []);
    return (
        <>
            <Grid container>
                {
                    roles.map((role) => (
                        <Grid key={role.id} size={{xs: 12, sm: 6, lg: 3}} sx={gridCellStyle}><RoleCard
                            role={role}/></Grid>
                    ))
                }
                <Grid size={3} sx={{...gridCellStyle, display: 'flex', alignItems: "end"}}>
                    <Fab color="secondary" aria-label="add" onClick={() => setCreateModalOpen(true)}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>
            <CreateRoleModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)}/>
        </>
    )
};

export default RoleListPage;
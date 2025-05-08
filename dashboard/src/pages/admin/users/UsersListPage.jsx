import React, {useEffect, useState} from "react";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box, Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {defaultAvatarUrl} from "../../../settings/urls";
import {useSelector} from "react-redux";
import useAction from "../../../hooks/useAction";
import ModalDeleteConfirm from "../../../components/modal/ModalDeleteConfirm";

const UsersListPage = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userId, setUserId] = useState(0);

    const {users, isLoaded} = useSelector((state) => state.user);
    const {loadUsers, deleteUser} = useAction();

    useEffect(() => {
        if (!isLoaded) {
            loadUsers();
        }
    }, []);

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">First name</TableCell>
                            <TableCell align="center">Last name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {user.id}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <Avatar sx={{m: "auto"}} alt={user.email}
                                                src={user.image ? user.image : defaultAvatarUrl}/>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    {user.firstName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.lastName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">
                                    {user.roles.map(r => r.name).join(", ")}
                                </TableCell>
                                <TableCell align="center">
                                    {user.password}
                                </TableCell>
                                <TableCell align="center">
                                    <Link to={`update/${user.id}`}>
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => {
                                        setUserId(user.id);
                                        setDeleteModalOpen(true);}}>
                                        <DeleteIcon color="error"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Link to="create">
                    <Button color="secondary" variant="contained">Create user</Button>
                </Link>
            </Box>
            <ModalDeleteConfirm
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                title="User delete"
                text="Are you sure you want to delete this user?"
                action={() => deleteUser(userId)}/>
        </Box>
    );
};

export default UsersListPage;

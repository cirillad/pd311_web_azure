import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import ModalDeleteConfirm from "../modal/ModalDeleteConfirm";
import {useState} from "react";
import useAction from "../../hooks/useAction";
import EditRoleModal from "../modal/EditRoleModal";

const RoleCard = ({role}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const {deleteRole} = useAction();

    return (
        <>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image="https://www.qsoftware.com/wp-content/uploads/2020/11/bigstock-Word-Role-Wooden-Small-Cubes-387015916.jpg"
                        alt={role.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {role.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" size="medium" color="secondary" onClick={() => setEditModalOpen(true)}>
                        Edit
                    </Button>
                    <Button variant="contained" size="medium" color="error" onClick={() => setDeleteModalOpen(true)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
            <ModalDeleteConfirm open={deleteModalOpen}
                                handleClose={() => setDeleteModalOpen(false)}
                                title="Role delete"
                                text="Are you sure you want to delete this role?"
                                action={() => deleteRole(role.id)}/>
            <EditRoleModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} role={role}/>
        </>
    );
}

export default RoleCard;
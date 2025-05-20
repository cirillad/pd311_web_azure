import Modal from "@mui/material/Modal";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import * as React from "react";
import useAction from "../../hooks/useAction";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const CreateRoleModal = ({open, handleClose}) => {
    const {createRole} = useAction();

    const createSubmitHandler = (event) => {
        event.preventDefault();
        createRole(event.target["name"].value);
        handleClose();
    }

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}>
            <Box onSubmit={createSubmitHandler} component="form" sx={style}>
                <Typography sx={{textAlign: "center"}} variant="h4">Create role</Typography>
                <Box sx={{m: "10px 0px"}}>
                    <FormControl fullWidth>
                        <FormLabel sx={{fontSize: "1.2em", mt: "10px"}} htmlFor="name">Name</FormLabel>
                        <TextField
                            fullWidth
                            name="name"
                            id="name"
                        />
                    </FormControl>
                </Box>
                <Box sx={{m: "10px 0px", width: "100%"}}>
                    <Button type="submit" color="secondary" variant="contained" fullWidth>
                        Create
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreateRoleModal;
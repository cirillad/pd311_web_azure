import useAction from "../../hooks/useAction";
import Modal from "@mui/material/Modal";
import {Box, Button, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useFormik} from "formik";

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

const EditRoleModal = ({open, handleClose, role}) => {
    const {updateRole} = useAction();

    const createSubmitHandler = (values) => {
        updateRole(values);
        handleClose();
    }

    const formik = useFormik({
       initialValues: {...role},
       onSubmit: createSubmitHandler,
    });

    return (
        <Modal
            keepMounted
            open={open}
            onClose={() => {
                handleClose();
                formik.setValues({...role});
            }}>
            <Box onSubmit={formik.handleSubmit} component="form" sx={style}>
                <Typography sx={{textAlign: "center"}} variant="h4">Edit role</Typography>
                <Box sx={{m: "10px 0px"}}>
                    <FormControl fullWidth>
                        <FormLabel sx={{fontSize: "1.2em", mt: "10px"}} htmlFor="name">Name</FormLabel>
                        <TextField
                            fullWidth
                            name="name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                </Box>
                <Box sx={{m: "10px 0px", width: "100%"}}>
                    <Button type="submit" color="secondary" variant="contained" fullWidth>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditRoleModal;
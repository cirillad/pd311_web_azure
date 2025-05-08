import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const ModalDeleteConfirm = ({open, handleClose, title, text, action}) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <h2 id="parent-modal-title">{title}</h2>
                    <p id="parent-modal-description">
                        {text}
                    </p>
                    <Button onClick={() => {
                        action();
                        handleClose();
                    }} variant="contained" color="error" sx={{my: 1, mr: 1}}>Yes</Button>
                    <Button onClick={handleClose} variant="contained" color="success" sx={{my: 1}}>No</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalDeleteConfirm;
import {useState} from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {Link} from "react-router-dom";
import {useTheme} from "@mui/material";

const AdminPanelMenu = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Nested List Items
                </ListSubheader>
            }
        >
            <Link to="users">
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{display: {xs: 'none', md: 'inline'}}} primary="Users"/>
                </ListItemButton>
            </Link>
            <Link to="roles">
                <ListItemButton>
                    <ListItemIcon>
                        <ManageAccountsIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{display: {xs: 'none', md: 'inline'}}} primary="Roles"/>
                </ListItemButton>
            </Link>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText sx={{display: {xs: 'none', md: 'inline'}}} primary="Inbox"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}

export default AdminPanelMenu;
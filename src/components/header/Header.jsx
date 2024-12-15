import { useState } from 'react'

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Container,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as TEXT from '../../constants/text';
import * as ROUTES from '../../constants/routes';

import ImageLogo from '../../assets/logo.png';
import './header.css';
import { NavLink } from 'react-router';

const Header = () => {
    const [openNav, setOpenNav] = useState(false)

    const handleNavMenu = (data) => {
        setOpenNav(data);
    };


    return (
        <AppBar position="fixed" className='menu'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ display: { xs: 'none', md: 'flex', flexGrow: 1 } }}>
                        <NavLink to={ROUTES.PEOPLES_HOME} className='menu-links' >
                            <img
                                src={ImageLogo}
                                alt="logo"
                                loading="lazy"
                                className='image-logo'
                            />

                        </NavLink>

                    </Box>

                    {/* Mobile */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <NavLink to={ROUTES.PEOPLES_HOME} className='menu-links' >
                            <img
                                src={ImageLogo}
                                alt="logo"
                                loading="lazy"
                                className='image-logo'
                            />
                        </NavLink>
                    </Box>

                    <Box role="presentation" sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-haspopup="true"
                            onClick={() => handleNavMenu(true)}
                            className='menu-icon'
                            edge="end"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    {/* Mobile */}

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to={ROUTES.PEOPLES_HOME} className='menu-links' >
                            <Button
                                onClick={() => handleNavMenu(false)}
                                sx={{ my: 2, display: 'block' }}
                                className='menu-links'
                            >
                                {TEXT.MENU_HOME}
                            </Button>
                        </NavLink>
                    </Box>

                </Toolbar>
            </Container>
            <Drawer open={openNav} onClose={() => handleNavMenu(false)} >
                <Box sx={{ width: 250 }} role="presentation" onClick={() => handleNavMenu(false)}>
                    <List>
                        <ListItem disablePadding>
                            <NavLink to={ROUTES.PEOPLES_HOME} className='menu-links'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <i className="fa-solid fa-house" />
                                    </ListItemIcon>
                                    <ListItemText primary={TEXT.MENU_HOME} />
                                </ListItemButton>
                            </NavLink>

                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </AppBar >
    )
}

export default Header
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../utils/routingPath";
import {logoutTC} from "../../redux/reducers/loginReducer";

const pages = [{name: 'Pack list', path: PATH.PACK_LIST}, {name: 'Profile', path: PATH.PROFILE_PAGE}];
const settings = ['Edit profile', 'Logout'];
const Header = ({isAuth}: { isAuth: boolean }) => {
    const avatar = useAppSelector(state => state.auth.avatar)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path: string) => {
        setAnchorElNav(null);
        navigate(path)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseUserMenuEditProfile = () => {
        setAnchorElUser(null);
        navigate(PATH.EDIT_PROFILE_PAGE)
    };
    const handleCloseUserMenuLogout = () => {
        setAnchorElUser(null);
        dispatch(logoutTC())
    };
    const handleLogoutButton = () => {
        navigate(PATH.LOGIN_PAGE)
    }

    return (
        <AppBar style={{background: '#EBE0E9', color: 'black'}} position="relative">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        IT - DreamTeam
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        IT - DreamTeam
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleCloseNavMenu(page.path)}
                                sx={{my: 2, color: 'black', display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {!isAuth ? <Button onClick={handleLogoutButton} color="inherit">Login</Button> :
                        <Box sx={{flexGrow: 0}}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={avatar}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem key={settings[0]} onClick={handleCloseUserMenuEditProfile}>
                                    <Typography textAlign="center">{settings[0]}</Typography>
                                </MenuItem><MenuItem key={settings[1]} onClick={handleCloseUserMenuLogout}>
                                <Typography textAlign="center">{settings[1]}</Typography>
                            </MenuItem>

                            </Menu>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;

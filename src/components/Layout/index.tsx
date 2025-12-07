import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useAppDispatch, useAppSelector} from 'hooks';
import {logout} from 'store/authSlice';
import {toggleTheme} from 'store/themeSlice';
import {PaletteModeEnum} from "@/constants/enum.ts";
import path from "constants/path.ts";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user} = useAppSelector((state) => state.auth);
    const {mode} = useAppSelector((state) => state.theme);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate(path.login);
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <AppBar position="static">
                <Toolbar>
                    {/* Заголовок */}
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        The Last of Guss
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        {/* Переключатель темы */}
                        <Tooltip title={mode === PaletteModeEnum.Dark ? 'Светлая тема' : 'Темная тема'}>
                            <IconButton
                                onClick={handleThemeToggle}
                                color="inherit"
                                sx={{ml: 1}}
                            >
                                {mode === PaletteModeEnum.Dark ? (
                                    <Brightness7Icon/>
                                ) : (
                                    <Brightness4Icon/>
                                )}
                            </IconButton>
                        </Tooltip>

                        {/* Информация о пользователе и кнопка выхода */}
                        {user && (
                            <>
                                <Typography variant="body1" sx={{display: {xs: 'none', sm: 'block'}}}>
                                    {user.username}
                                </Typography>
                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        '&:hover': {
                                            borderColor: 'rgba(255,255,255,0.5)',
                                        }
                                    }}
                                >
                                    Выйти
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{flex: 1, py: 4}}>
                {children}
            </Container>
        </Box>
    );
};

export default Layout;

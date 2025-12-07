import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider, useDispatch} from 'react-redux';
import {store, AppDispatch} from './store';
import {initializeAuth} from 'store/authSlice';
import {useAppSelector} from 'hooks';

import CircularProgress from '@mui/material/CircularProgress';
import createTheme from "constants/theme";
import Router from "root/Router.tsx";


const AppInitializer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Используем типизированный dispatch
    const {initialized} = useAppSelector((state) => state.auth);
    const {mode} = useAppSelector((state) => state.theme);

    const theme = createTheme(mode)


    useEffect(() => {
        if (!initialized) {
            dispatch(initializeAuth());
        }
    }, [dispatch, initialized]);

    if (!initialized) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                    <CircularProgress/>
                </div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router/>
        </ThemeProvider>)
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppInitializer/>
        </Provider>
    );
};

export default App;

import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {CircularProgress, Box} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getMe} from 'store/authSlice';
import path from "constants/path.ts";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {user, token, loading} = useAppSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const tokenFromStorage = localStorage.getItem('token');

            if (tokenFromStorage && !user) {
                // Если есть токен в localStorage, но нет пользователя в store
                try {
                    await dispatch(getMe()).unwrap();
                } catch (error) {
                    console.log('Auth check failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsChecking(false);
        };

        void checkAuth();
    }, [dispatch, user]);

    if (isChecking || loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{
                    backgroundColor: theme => theme.palette.background.default,
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (!token || !user) {
        return <Navigate to={path.login} state={{from: location}} replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

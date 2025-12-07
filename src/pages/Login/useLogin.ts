import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    useTheme,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks';
import {login, clearError} from 'store/authSlice';
import path from "constants/path.ts";

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {loading, error, user} = useAppSelector((state) => state.auth);
    const {mode} = useAppSelector((state) => state.theme);
    const theme = useTheme();

    useEffect(() => {
        if (user) {
            navigate(path.root);
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username.length < 3 || password.length < 3) {
            return;
        }

        await dispatch(login({username, password}));
    };

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    return {
        mode,
        theme,
        handleSubmit,
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
    }
}

export default useLogin

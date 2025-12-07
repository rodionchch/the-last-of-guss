import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {authAPI} from 'api/endpoints';
import {LoginRequest, LoginResponse, LoginRole} from 'api/model';
import {ApiError} from "constants/types";

interface AuthState {
    user: {
        username: string;
        role: LoginRole
    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    initialized: boolean; // Добавляем флаг инициализации
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    initialized: false, // По умолчанию не инициализировано
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, {rejectWithValue}) => {
        try {
            const response = await authAPI.login(credentials);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;

            return rejectWithValue(apiError.response?.data?.message || 'Ошибка входа');
        }
    }
);

export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, {rejectWithValue}) => {
        try {
            const response = await authAPI.getMe();
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            localStorage.removeItem('token');
            return rejectWithValue(apiError.response?.data?.message || 'Ошибка загрузки пользователя');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authAPI.logout();
        localStorage.removeItem('token');
    }
);

// Новый thunk для быстрой инициализации
export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, {dispatch}) => {
        const token = localStorage.getItem('token');
        if (token) {
            await dispatch(getMe());
        }
        return true;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setInitialized: (state) => {
            state.initialized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.user = {username: action.payload.username, role: action.payload.role};
                state.token = action.payload.token;
                state.initialized = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.initialized = true;
            })
            // GetMe
            .addCase(getMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.initialized = true;
            })
            .addCase(getMe.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.initialized = true;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.initialized = true;
            })
            // InitializeAuth
            .addCase(initializeAuth.fulfilled, (state) => {
                state.initialized = true;
            });
    },
});

export const {clearError, setInitialized} = authSlice.actions;
export default authSlice.reducer;

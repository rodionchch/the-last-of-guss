import apiClient from './client';
import {LoginRequest, LoginResponse, Round, RoundDetails, RoundsResponse, TapResponse} from "api/model.ts";
import {Status} from "constants/enum.ts";


export const authAPI = {
    login: (data: LoginRequest) =>
        apiClient.post<LoginResponse>('/api/v1/auth/login', data),

    getMe: () =>
        apiClient.get<Omit<LoginResponse, 'token'>>('/api/v1/auth/me'),

    logout: () =>
        apiClient.post('/api/v1/auth/logout'),
};

export const roundsAPI = {
    createRound: () =>
        apiClient.post<Round>('/api/v1/rounds'),

    getRounds: (params?: {
        cursor?: string;
        limit?: number;
        status?: Status;
    }) => apiClient.get<RoundsResponse>('/api/v1/rounds', {params}),

    getRound: (id: string) =>
        apiClient.get<RoundDetails>(`/api/v1/rounds/${id}`),

    tapRound: (id: string) =>
        apiClient.post<TapResponse>(`/api/v1/rounds/${id}/tap`),
};

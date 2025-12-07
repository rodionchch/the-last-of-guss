export interface LoginRequest {
    username: string;
    password: string;
}

export enum LoginRole {
    SURVIVOR = 'SURVIVOR',
    NIKITA = 'NIKITA',
    ADMIN = 'ADMIN'
}

export interface LoginResponse {
    username: string;
    role: LoginRole
    token: string;
}

export interface Round {
    id: string;
    startTime: string;
    endTime: string;
    totalScore: number;
    createdAt: string;
}

export interface RoundsResponse {
    data: Round[];
    pagination: {
        limit: number;
        nextCursor: string | null;
        hasMore: boolean;
    };
}

export interface RoundTopStats {
    taps: number;
    score: number;
    user: {
        username: string;
    };
}

export interface RoundDetails {
    round: Round;
    topStats: Array<RoundTopStats>;
    myStats: {
        taps: number;
        score: number;
    };
}

export interface TapResponse {
    taps: number;
    score: number;
}

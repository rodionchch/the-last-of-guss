import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import {roundsAPI} from 'api/endpoints';
import {type Round, type RoundsResponse, type RoundDetails, type TapResponse} from 'api/model';
import {Status} from "constants/enum.ts";
import {ApiError} from "constants/types.ts";

interface RoundsState {
    rounds: Round[];
    currentRound: RoundDetails | null;
    pagination: {
        limit: number;
        nextCursor: string | null;
        hasMore: boolean;
    };
    loading: boolean;
    error: string | null;
    creating: boolean;
}

const initialState: RoundsState = {
    rounds: [],
    currentRound: null,
    pagination: {
        limit: 10,
        nextCursor: null,
        hasMore: false,
    },
    loading: false,
    error: null,
    creating: false,
};

export const fetchRounds = createAsyncThunk(
    'rounds/fetchRounds',
    async (params?: { cursor?: string; status?: Status }) => {
        const response = await roundsAPI.getRounds({
            ...params,
            limit: 10,
        });
        return response.data;
    }
);

export const fetchRound = createAsyncThunk(
    'rounds/fetchRound',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await roundsAPI.getRound(id);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Ошибка загрузки раунда');
        }
    }
);

export const createRound = createAsyncThunk(
    'rounds/createRound',
    async (_, {rejectWithValue}) => {
        try {
            const response = await roundsAPI.createRound();
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Ошибка создания раунда');
        }
    }
);

export const tapRound = createAsyncThunk(
    'rounds/tapRound',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await roundsAPI.tapRound(id);
            return response.data;
        } catch (error) {
            const apiError = error as ApiError;
            return rejectWithValue(apiError.response?.data?.message || 'Ошибка тапа');
        }
    }
);

const roundsSlice = createSlice({
    name: 'rounds',
    initialState,
    reducers: {
        clearCurrentRound: (state) => {
            state.currentRound = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRounds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRounds.fulfilled, (state, action: PayloadAction<RoundsResponse>) => {
                state.loading = false;
                state.rounds = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchRounds.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchRound.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRound.fulfilled, (state, action: PayloadAction<RoundDetails>) => {
                state.loading = false;
                state.currentRound = action.payload;
            })
            .addCase(fetchRound.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createRound.pending, (state) => {
                state.creating = true;
            })
            .addCase(createRound.fulfilled, (state, action: PayloadAction<Round>) => {
                state.creating = false;
                state.rounds.unshift(action.payload);
            })
            .addCase(createRound.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            })
            .addCase(tapRound.fulfilled, (state, action: PayloadAction<TapResponse>) => {
                if (state.currentRound) {
                    state.currentRound.myStats = action.payload;
                }
            });
    },
});

export const {clearCurrentRound, clearError} = roundsSlice.actions;
export default roundsSlice.reducer;

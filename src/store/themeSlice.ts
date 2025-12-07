import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PaletteMode} from '@mui/material';
import {PaletteModeEnum} from "@/constants/enum.ts";

interface ThemeState {
    mode: PaletteMode;
}

const getInitialTheme = (): PaletteMode => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === PaletteModeEnum.Light || savedTheme === PaletteModeEnum.Dark) {
        return savedTheme;
    }

    // Проверяем системные настройки
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return PaletteModeEnum.Dark;
    }

    return PaletteModeEnum.Light;
};

const initialState: ThemeState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === PaletteModeEnum.Light ? PaletteModeEnum.Dark : PaletteModeEnum.Light;
            localStorage.setItem('theme', state.mode);
        },
        setTheme: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});

export const {toggleTheme, setTheme} = themeSlice.actions;
export default themeSlice.reducer;

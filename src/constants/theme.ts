import {createTheme, PaletteMode} from "@mui/material";
import {PaletteModeEnum} from "constants/enum";

const theme = (mode?: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: mode === PaletteModeEnum.Dark ? '#90caf9' : '#1976d2',
            },
            secondary: {
                main: mode === PaletteModeEnum.Dark ? '#f48fb1' : '#dc004e',
            },
            background: {
                default: mode === PaletteModeEnum.Dark ? '#121212' : '#f5f5f5',
                paper: mode === PaletteModeEnum.Dark ? '#1e1e1e' : '#ffffff',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 600,
            },
            h6: {
                fontWeight: 600,
            },
        },
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: mode === PaletteModeEnum.Dark
                            ? '0 4px 20px rgba(0,0,0,0.3)'
                            : '0 4px 20px rgba(0,0,0,0.08)',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                    contained: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: mode === PaletteModeEnum.Dark
                                ? '0 6px 20px rgba(144, 202, 249, 0.2)'
                                : '0 6px 20px rgba(25, 118, 210, 0.15)',
                        },
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        boxShadow: mode === PaletteModeEnum.Dark
                            ? '0 4px 20px rgba(0,0,0,0.5)'
                            : '0 4px 20px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
    });
}

export default theme;

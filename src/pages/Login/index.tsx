import React from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import {PaletteModeEnum} from "@/constants/enum.ts";
import useLogin from "pages/Login/useLogin.ts";

const Login: React.FC = () => {
    const {
        mode,
        theme,
        handleSubmit,
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
    } = useLogin()

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    paddingTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Анимированный гусь */}
                <Box
                    sx={{
                        fontSize: '4rem',
                        mb: 2,
                        animation: 'bounce 2s infinite',
                        '@keyframes bounce': {
                            '0%, 100%': {
                                transform: 'translateY(0)',
                            },
                            '50%': {
                                transform: 'translateY(-20px)',
                            },
                        },
                        filter: mode === PaletteModeEnum.Dark
                            ? 'drop-shadow(0 0 20px rgba(144, 202, 249, 0.5))'
                            : 'drop-shadow(0 0 20px rgba(25, 118, 210, 0.3))',
                        userSelect: 'none',
                    }}
                >
                    🦆
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 3,
                        backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                            ? 'rgba(30, 30, 30, 0.9)'
                            : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${theme.palette.mode === PaletteModeEnum.Dark
                            ? 'rgba(144, 202, 249, 0.1)'
                            : 'rgba(25, 118, 210, 0.1)'}`,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        gutterBottom
                        color="primary"
                        fontWeight={700}
                        textTransform="uppercase"
                    >
                        The Last of Guss
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        align="center"
                        sx={{mb: 4}}
                    >
                        Соревнуйтесь в тапах по мутировавшим гусям!
                    </Typography>

                    <Typography
                        component="h2"
                        variant="h6"
                        align="center"
                    >
                        Войти
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={username.length > 0 && username.length < 3}
                            helperText={username.length > 0 && username.length < 3 ? 'Минимум 3 символа' : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={password.length > 0 && password.length < 3}
                            helperText={password.length > 0 && password.length < 3 ? 'Минимум 3 символа' : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        {error && (
                            <Alert
                                severity="error"
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: '1.1rem',
                            }}
                            disabled={loading || username.length < 3 || password.length < 3}
                        >
                            {loading ? 'Загрузка...' : 'Войти / Зарегистрироваться'}
                        </Button>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            align="center"
                            display="block"
                        >
                            При первом входе автоматически создается учетная запись
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;

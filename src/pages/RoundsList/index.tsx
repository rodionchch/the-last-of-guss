import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Box,
    Chip,
    CircularProgress,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {PaletteModeEnum} from "@/constants/enum.ts";
import useRoundsList from "pages/RoundsList/useRoundsList.ts";
import {LoginRole} from "api/model.ts";

const RoundsList: React.FC = () => {
    const {
        mode,
        user,
        error,
        theme,
        rounds,
        loading,
        creating,
        getStatusColor,
        getRoundStatus,
        handleCreateRound,
    } = useRoundsList()

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Активен':
                return <PlayArrowIcon fontSize="small"/>;
            case 'Запланирован':
                return <AccessTimeIcon fontSize="small"/>;
            case 'Завершен':
                return <CheckCircleIcon fontSize="small"/>;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                        Список раундов
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Соревнуйтесь в тапах по мутировавшим гусям
                    </Typography>
                </Box>
                {user?.role === LoginRole.ADMIN && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={handleCreateRound}
                        disabled={creating}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                        }}
                    >
                        {creating ? 'Создание...' : 'Создать раунд'}
                    </Button>
                )}
            </Box>

            {error && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                    }}
                >
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {rounds.length === 0 ? (
                    <Grid size={12}>
                        <Box
                            textAlign="center"
                            py={6}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                    ? 'rgba(255,255,255,0.05)'
                                    : 'rgba(0,0,0,0.02)',
                                border: `2px dashed ${theme.palette.divider}`,
                            }}
                        >
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                🦆
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Нет активных раундов
                            </Typography>
                            {user?.role === LoginRole.ADMIN && (
                                <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                                    Создайте новый раунд, чтобы начать игру
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                ) : (
                    rounds.map((round) => {
                        const status = getRoundStatus(round);
                        return (
                            <Grid size={{xs: 12, sm: 6, md: 4}} key={round.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: mode === PaletteModeEnum.Dark
                                                ? '0 12px 40px rgba(0,0,0,0.4)'
                                                : '0 12px 40px rgba(0,0,0,0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start"
                                             mb={2}>
                                            <Typography variant="h6" component="div" fontWeight={600}>
                                                Раунд #{round.id.slice(0, 8)}
                                            </Typography>
                                            <Chip
                                                icon={getStatusIcon(status)}
                                                label={status}
                                                color={getStatusColor(status)}
                                                size="small"
                                                sx={{
                                                    fontWeight: 500,
                                                    borderRadius: 1,
                                                }}
                                            />
                                        </Box>

                                        <Box mb={2}>
                                            <Typography variant="body2" color="text.secondary" display="flex"
                                                        alignItems="center" gap={0.5}>
                                                <AccessTimeIcon fontSize="small"/>
                                                Начало: {new Date(round.startTime).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" display="flex"
                                                        alignItems="center" gap={0.5} sx={{mt: 0.5}}>
                                                <AccessTimeIcon fontSize="small"/>
                                                Конец: {new Date(round.endTime).toLocaleString()}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                                    ? 'rgba(144, 202, 249, 0.1)'
                                                    : 'rgba(25, 118, 210, 0.05)',
                                                borderRadius: 2,
                                                p: 1.5,
                                                mb: 2,
                                            }}
                                        >
                                            <Typography variant="body2" color="text.secondary">
                                                Всего очков
                                            </Typography>
                                            <Typography variant="h5" color="primary" fontWeight={600}>
                                                {round.totalScore.toLocaleString()}
                                            </Typography>
                                        </Box>

                                        <Box mt={2}>
                                            <Button
                                                component={RouterLink}
                                                to={`/round/${round.id}`}
                                                variant={status === 'Активен' ? 'contained' : 'outlined'}
                                                size="medium"
                                                fullWidth
                                                sx={{
                                                    borderRadius: 2,
                                                    py: 1,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {status === 'Активен' ? 'Присоединиться' : 'Просмотреть'}
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Box>
    );
};

export default RoundsList;

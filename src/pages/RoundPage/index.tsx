import React from 'react';
import {nanoid} from '@reduxjs/toolkit';

import {
    Typography,
    Paper,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Button,
    Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Goose from 'components/Goose';
import {PaletteModeEnum, Status} from "@/constants/enum.ts";
import {RoundTopStats} from "api/model.ts";
import useRoundPage from "pages/RoundPage/useRoundPage.ts";

const RoundPage: React.FC = () => {
    const {
        user,
        theme,
        error,
        loading,
        timeLeft,
        handleTap,
        handleBack,
        roundStatus,
        currentRound,
        getStatusTitle,
        getStatusMessage,
    } = useRoundPage()


    if (loading && !currentRound) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress/>
            </Box>
        );
    }

    if (error || !currentRound) {
        return (
            <Box>
                <Button
                    startIcon={<ArrowBackIcon/>}
                    onClick={handleBack}
                    sx={{mb: 2}}
                    variant="outlined"
                >
                    Назад к списку
                </Button>
                <Alert
                    severity="error"
                    sx={{
                        borderRadius: 2,
                    }}
                >
                    {error || 'Раунд не найден'}
                </Alert>
            </Box>
        );
    }

    const round = currentRound.round;

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon/>}
                onClick={handleBack}
                sx={{mb: 3}}
                variant="outlined"
            >
                Назад к списку
            </Button>

            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 8}}>
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 2,
                            minHeight: 500,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                ? 'rgba(40, 40, 40, 0.9)'
                                : 'rgba(255, 255, 255, 0.95)',
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        {/* Компонент гуся */}
                        <Box mb={4}>
                            <Goose
                                onTap={handleTap}
                                isActive={roundStatus === Status.Active}
                            />
                        </Box>

                        {/* Статус раунда */}
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            color={
                                roundStatus === Status.Active ? 'success.main' :
                                    roundStatus === Status.Cooldown ? 'warning.main' :
                                        'text.secondary'
                            }
                            sx={{mb: 2}}
                        >
                            {getStatusTitle()}
                        </Typography>

                        {/* Счетчик времени */}
                        {(roundStatus === Status.Cooldown || roundStatus === Status.Active) && (
                            <Box sx={{mb: 3}}>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {getStatusMessage()}
                                </Typography>
                                <Typography
                                    variant="h3"
                                    fontWeight={700}
                                    color={
                                        roundStatus === Status.Active ? 'success.main' :
                                            roundStatus === Status.Cooldown ? 'warning.main' :
                                                'text.primary'
                                    }
                                    sx={{fontFamily: 'monospace'}}
                                >
                                    {timeLeft}
                                </Typography>
                            </Box>
                        )}

                        {/* Мои очки (показываем всегда) */}
                        <Box sx={{width: '100%', maxWidth: 300}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    p: 2,
                                    borderRadius: 1,
                                    backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                        ? 'rgba(144, 202, 249, 0.1)'
                                        : 'rgba(25, 118, 210, 0.05)',
                                    border: `1px solid ${theme.palette.mode === PaletteModeEnum.Dark
                                        ? 'rgba(144, 202, 249, 0.2)'
                                        : 'rgba(25, 118, 210, 0.1)'}`,
                                }}
                            >
                                Мои очки - {currentRound.myStats.score.toLocaleString()}
                            </Typography>
                        </Box>

                        {/* Статистика завершенного раунда */}
                        {roundStatus === Status.Finished && (
                            <Box sx={{width: '100%', maxWidth: 400, mt: 3}}>
                                <Divider sx={{my: 2}}/>

                                <Box sx={{textAlign: 'left'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                        <Typography variant="body1">Всего</Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {round.totalScore.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    {currentRound.topStats.length > 0 && (
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                            <Typography variant="body1">
                                                Победитель - {currentRound.topStats[0].user.username}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={600}>
                                                {currentRound.topStats[0].score.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Typography variant="body1">Мои очки</Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            {currentRound.myStats.score.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid size={{xs: 12, md: 4}}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            height: '100%',
                            backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                ? 'rgba(40, 40, 40, 0.9)'
                                : 'rgba(255, 255, 255, 0.95)',
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Топ игроков
                        </Typography>

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Игрок</TableCell>
                                        <TableCell align="right">Очки</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentRound.topStats.slice(0, 10).map((stat: RoundTopStats, index: number) => {
                                        const isCurrentUser = stat.user.username === user?.username;
                                        return (
                                            <TableRow
                                                key={nanoid()}
                                                sx={{
                                                    backgroundColor: isCurrentUser
                                                        ? theme.palette.mode === PaletteModeEnum.Dark
                                                            ? 'rgba(144, 202, 249, 0.2)'
                                                            : 'rgba(25, 118, 210, 0.1)'
                                                        : 'transparent',
                                                }}
                                            >
                                                <TableCell>
                                                    <Box
                                                        sx={{
                                                            width: 24,
                                                            height: 24,
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: index === 0 ? theme.palette.warning.main :
                                                                index === 1 ? theme.palette.grey[400] :
                                                                    index === 2 ? theme.palette.secondary.main :
                                                                        isCurrentUser ? theme.palette.primary.main :
                                                                            theme.palette.mode === PaletteModeEnum.Dark
                                                                                ? 'rgba(255,255,255,0.05)'
                                                                                : 'rgba(0,0,0,0.02)',
                                                            color: index < 3 || isCurrentUser ? 'white' : 'inherit',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Box>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontWeight: isCurrentUser ? 700 : (index < 3 ? 600 : 400),
                                                        color: isCurrentUser ? 'primary.main' : 'inherit',
                                                    }}
                                                >
                                                    {stat.user.username}
                                                    {isCurrentUser && ' (Вы)'}
                                                </TableCell>
                                                <TableCell align="right">{stat.score.toLocaleString()}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box
                            mt={3}
                            p={2}
                            sx={{
                                borderRadius: 1,
                                backgroundColor: theme.palette.mode === PaletteModeEnum.Dark
                                    ? 'rgba(255,255,255,0.05)'
                                    : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Всего очков в раунде:
                                <Typography component="span" variant="body1" fontWeight={600} sx={{ml: 1}}>
                                    {round.totalScore.toLocaleString()}
                                </Typography>
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" sx={{mt: 1}}>
                                Начало: {new Date(round.startTime).toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                                Конец: {new Date(round.endTime).toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RoundPage;

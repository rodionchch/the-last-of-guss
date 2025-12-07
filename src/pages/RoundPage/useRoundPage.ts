import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchRound, tapRound, clearCurrentRound} from 'store/roundsSlice';

import {
    useTheme,
} from '@mui/material';
import {Status} from "constants/enum.ts";
import path from "constants/path.ts";

const useRoundPage = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {currentRound, loading, error} = useAppSelector((state) => state.rounds);
    const {user} = useAppSelector((state) => state.auth);
    const [roundStatus, setRoundStatus] = useState<'active' | 'cooldown' | 'finished'>('cooldown');
    const [timeLeft, setTimeLeft] = useState<string>('');
    const theme = useTheme();

    useEffect(() => {
        if (id) {
            dispatch(fetchRound(id));

            // Устанавливаем интервал для обновления данных раунда
            const intervalId = setInterval(() => {
                dispatch(fetchRound(id));
            }, 3000); // Обновляем каждые 3 секунды

            return () => {
                clearInterval(intervalId);
                dispatch(clearCurrentRound());
            };
        }
    }, [dispatch, id]);

    useEffect(() => {
        const updateRoundStatus = () => {
            if (!currentRound) return;

            const now = new Date();
            const start = new Date(currentRound.round.startTime);
            const end = new Date(currentRound.round.endTime);

            // Рассчитываем секунды до начала или до конца
            if (now < start) {
                // Раунд еще не начался - Cooldown
                setRoundStatus(Status.Cooldown);
                const secondsToStart = Math.max(0, Math.floor((start.getTime() - now.getTime()) / 1000));

                // Форматируем время MM:SS
                const minutes = Math.floor(secondsToStart / 60);
                const secs = secondsToStart % 60;
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            } else if (now >= start && now <= end) {
                // Раунд активен
                setRoundStatus(Status.Active);
                const secondsToEnd = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));

                // Форматируем время MM:SS
                const minutes = Math.floor(secondsToEnd / 60);
                const secs = secondsToEnd % 60;
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            } else {
                // Раунд завершен
                setRoundStatus(Status.Finished);
                setTimeLeft('00:00');
            }
        };

        updateRoundStatus();
        const interval = setInterval(updateRoundStatus, 1000);
        return () => clearInterval(interval);
    }, [currentRound]);

    const handleTap = async () => {
        if (id && roundStatus === Status.Active) {
            await dispatch(tapRound(id));
        }
    };

    const handleBack = () => {
        navigate(path.root);
    };

    const getStatusTitle = () => {
        switch (roundStatus) {
            case Status.Cooldown:
                return 'Cooldown';
            case Status.Active:
                return 'Раунд активен!';
            case Status.Finished:
                return 'Раунд завершен';
            default:
                return 'Загрузка...';
        }
    };

    const getStatusMessage = () => {
        switch (roundStatus) {
            case Status.Cooldown:
                return 'до начала раунда';
            case Status.Active:
                return 'До конца осталось:';
            case Status.Finished:
                return '';
            default:
                return '';
        }
    };


    return {
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
    }
}

export default useRoundPage

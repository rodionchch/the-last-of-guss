import {useAppDispatch, useAppSelector} from "hooks";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material";
import {useEffect} from "react";
import {clearError, createRound, fetchRounds} from "store/roundsSlice.ts";
import {LoginRole, Round} from "api/model.ts";
import path from "constants/path.ts";
import {Status} from "constants/enum.ts";

const useRoundsList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {rounds, loading, error, creating} = useAppSelector((state) => state.rounds);
    const {user} = useAppSelector((state) => state.auth);
    const {mode} = useAppSelector((state) => state.theme);
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchRounds({status: Status.Active}));
    }, [dispatch]);

    const handleCreateRound = async () => {
        if (user?.role === LoginRole.ADMIN) {
            const result = await dispatch(createRound());
            if (createRound.fulfilled.match(result)) {
                navigate(path.roundId(result.payload.id));
            }
        }
    };

    const getRoundStatus = (round: Round) => {
        const now = new Date();
        const start = new Date(round.startTime);
        const end = new Date(round.endTime);

        if (now < start) return 'Запланирован';
        if (now > end) return 'Завершен';
        return 'Активен';
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Активен':
                return 'success';
            case 'Запланирован':
                return 'warning';
            case 'Завершен':
                return 'default';
            default:
                return 'default';
        }
    };

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    return {
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
    }
}

export default useRoundsList;

import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useAppSelector} from 'hooks';
import {PaletteModeEnum} from "@/constants/enum.ts";
import {GooseContainer} from "./styles.ts";

interface GooseProps {
    onTap: () => void;
    isActive: boolean;
}

const Goose: React.FC<GooseProps> = ({onTap, isActive}) => {
    const [tapCount, setTapCount] = useState(0);
    const {mode} = useAppSelector((state) => state.theme);

    const handleTap = () => {
        if (isActive) {
            onTap();
            setTapCount(prev => prev + 1);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <GooseContainer
                isActive={isActive}
                onClick={handleTap}
                sx={{
                    filter: mode === PaletteModeEnum.Dark
                        ? 'drop-shadow(0 0 10px rgba(144, 202, 249, 0.3))'
                        : 'drop-shadow(0 0 10px rgba(25, 118, 210, 0.2))',
                }}
            >
                🦆
            </GooseContainer>

            <Typography
                variant="h5"
                color={isActive ? 'primary' : 'text.secondary'}
                sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                }}
            >
                {isActive && 'Тапайте по гусю!'}
                {isActive && (
                    <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{display: 'block', mt: 1}}
                    >
                        Тапы: {tapCount}
                    </Typography>
                )}
            </Typography>

            {isActive && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        textAlign: 'center',
                        maxWidth: 400,
                        lineHeight: 1.6,
                    }}
                >
                    Мутация G-42 делает этого гуся особо уязвимым к тапам!
                    Каждый тап приносит очки. Чем быстрее вы тапаете, тем больше очков зарабатываете!
                </Typography>
            )}
        </Box>
    );
};

export default Goose;

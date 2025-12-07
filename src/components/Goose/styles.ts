import {Box, keyframes, styled} from "@mui/material";


const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const tapEffect = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);
    }
`;

export const GooseContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({isActive}) => ({
    cursor: isActive ? 'pointer' : 'default',
    animation: isActive ? `${bounce} 1s infinite` : 'none',
    transition: 'all 0.2s ease',
    position: 'relative',
    fontSize: '8rem',
    userSelect: 'none',
    '&:active': {
        animation: isActive ? `${tapEffect} 0.1s ease` : 'none',
    },
    '&:hover': {
        transform: isActive ? 'rotate(5deg)' : 'none',
    },
}));

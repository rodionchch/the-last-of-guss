const path = {
    all: '*',
    root: '/',
    login: '/login',
    round: '/round',
    roundId: (id: number | string) => `/round/${id}`
} as const;

export default path

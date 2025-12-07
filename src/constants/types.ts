// Тип для ошибки API
export type ApiError = {
    response?: {
        data?: {
            message?: string;
        };
    };
}

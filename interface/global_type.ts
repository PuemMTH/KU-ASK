export type LoginData = {
    message: string,
    data?: {
        token: string,
        user: {
            name: string,
            email: string,
            role: string
        }
    }
}
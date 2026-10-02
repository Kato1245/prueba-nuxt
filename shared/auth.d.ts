declare module "#auth-utils" {
    interface User {
        name: string;
        email: string;
        role: string;
    }

    interface UserSession {
        user: User;
    }
}
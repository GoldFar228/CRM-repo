import '@umijs/max/typings';


export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export type AuthResponse = {
    token?: string;
    errorMessage?: string
}

export type Role = {
    role: string
}

export type User = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

export type Client = {
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    createdBy: User;
}
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
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    createdBy: User;
}

export type Deal = {
    createdAt: Date;
    createdBy: User;
    status: 1 | 2 | 3;
    budget: number;
    priority: 1 | 2 | 3;
    assignedTo: Client;
}

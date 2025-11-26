export type UserInfo = {
    Id: string;
    Email: string;
}

export type LoginResponse = {
    Id: string
    Token: string;
    Email: string;
    Role: string;
}
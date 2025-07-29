export interface UserDto {
    id: string;
    name: string;
    email: string;
    password: string;
    active: boolean;
    role: string;
    address?: string;
    phone?: string;
}
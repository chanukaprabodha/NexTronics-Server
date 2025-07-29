export interface OrderDTO {
    name: string;
    email: string;
    phone: string;
    amount: number;
    address: string;
    items: { name: string; quantity: number; price: number }[];
}
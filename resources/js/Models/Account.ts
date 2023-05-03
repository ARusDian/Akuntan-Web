export interface BaseAccount {
    id?: string;
    name: string;
}

export interface Account extends BaseAccount{
    id: string;
}

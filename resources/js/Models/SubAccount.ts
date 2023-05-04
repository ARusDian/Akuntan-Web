import { Account } from './Account';
export interface BaseSubAccount {
    id?: string;
    account_id: string;
    account?: Account
    name: string;
}

export interface SubAccount extends BaseSubAccount {
    id: string;
    account: Account
}

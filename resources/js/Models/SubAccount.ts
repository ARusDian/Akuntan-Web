import { Account } from './Account';
export interface BaseSubAccount {
    id?: string;
    account_id: string;
    account?: Account
    name: string;
    category: SubAccountCategory;
}

export interface SubAccount extends BaseSubAccount {
    id: string;
    account: Account
}

export enum SubAccountCategory {
    'CURRENT ASSET',
    'FIXED ASSET',
    'LIABILITY',
    'LIABILITY OTHER',
    'EQUITY'
}

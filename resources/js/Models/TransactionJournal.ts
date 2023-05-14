import { Period } from '@/Models/Period';
import { SubAccount } from "./SubAccount";

export interface BaseTransactionJournal {
    id?: number;
    description: string;
    date: string;
    period_id: number;
    period?: Period;
    transaction_journal_details: BaseTransactionJournalDetail[];
}

export interface TransactionJournal extends BaseTransactionJournal {
    id: number;
}

export interface BaseTransactionJournalDetail{
    id?: number;
    type: 'debit' | 'credit';
    amount: number;
    category: TransactionJournalDetailCategory;
    transaction_journal_id: number;
    transactionJournal?: TransactionJournal;
    sub_account_id: string;
    sub_account?: SubAccount;
}

export interface TransactionJournalDetail extends BaseTransactionJournalDetail {
    id: number;
}

export function createDefaultTransactionJournalDetail() : BaseTransactionJournalDetail {
    return {
        type: 'debit',
        amount: 0,
        category: TransactionJournalDetailCategory['CURRENT ASSET'],
        transaction_journal_id: 0,
        sub_account_id: ''
    }
}

export enum TransactionJournalDetailCategory { 
    'CURRENT ASSET',
    'FIXED ASSET',
    'LIABILITY',
    'LIABILITY OTHER',
    'EQUITY'
}

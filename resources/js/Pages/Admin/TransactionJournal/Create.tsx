import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { SubAccount } from '@/Models/SubAccount';
import { Period } from '@/Models/Period';
import { BaseTransactionJournal, createDefaultTransactionJournalDetail } from '@/Models/TransactionJournal';
import Form from './Form/Form';

interface Props {
    subAccounts: SubAccount[];
    periods: Period[];
}

export default function Create(props: Props) {
    let form = useForm<BaseTransactionJournal>(
        {
            description: '',
            date: '',
            period_id: 0,
            transaction_journal_details: [{
                type: 'debit',
                amount: 0,
                transaction_journal_id: 0,
                sub_account_id: ''
            }],
        },
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.errors);
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('transaction-journal.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={'Tambah Akun'}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-3">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Jurnal Transaksi
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('transaction-journal.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <Form
                            form={form}
                            subAccounts={props.subAccounts}
                            periods={props.periods}
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
                                disabled={form.processing}
                                onClick={onSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { SubAccount } from '@/Models/SubAccount';
import Form from './Form/Form';
import { Period } from '@/Models/Period';
import { BaseTransactionJournal, TransactionJournal } from '@/Models/TransactionJournal';

interface Props {
    subAccounts: SubAccount[];
    periods: Period[];
    transactionJournal: TransactionJournal;
}

export default function Edit(props: Props) {
    let form = useForm<BaseTransactionJournal>(
        props.transactionJournal
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        // php does'nt support PUT so...
        // @ts-ignore
        form.data._method = 'PUT';
        form.post(route('transaction-journal.update', props.transactionJournal.id), {
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
                            Edit Jurnal Transaksi
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
                                className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
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

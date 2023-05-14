import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import InputLabel from '@mui/material/InputLabel';
import { BaseSubAccount, SubAccountCategory } from '@/Models/SubAccount';
import { Account } from '@/Models/Account';

interface Props {
    accounts: Account[];
}

export default function Create(props : Props) {
    let form = useForm<BaseSubAccount>(
        {
            id: '',
            name: '',
            account_id: '',
            category: 'LIABILITY' as unknown as SubAccountCategory,
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('subaccount.store'), {
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
                            Tambah Akun
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('subaccount.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="account_id">Id Akun Induk</InputLabel>
                            <select
                                id="account_id"
                                className="mt-1 block w-full"
                                value={form.data.account_id}
                                onChange={e => form.setData('account_id', e.currentTarget.value)}
                                required
                                autoFocus
                                autoComplete="token"
                            >
                                <option value="">Pilih Akun Induk</option>
                                {props.accounts.map((account) => (
                                    <option key={account.id} value={account.id}>{account.id} - {account.name}</option>
                                ))}

                            </select>
                            <InputError className="mt-2" message={form.errors.account_id} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="id">Id Sub Akun</InputLabel>
                            <TextInput
                                id="id"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.id}
                                onChange={e => form.setData('id', e.currentTarget.value)}
                                required
                                autoFocus
                                autoComplete="token"
                            />
                            <InputError className="mt-2" message={form.errors.id} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="name">Nama Sub Akun</InputLabel>
                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.name}
                                onChange={e => form.setData('name', e.currentTarget.value)}
                                required
                                autoFocus
                                autoComplete="token"
                            />
                            <InputError className="mt-2" message={form.errors.name} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="type">Kategori Transaksi</InputLabel>
                            <select
                                className="mt-1 block w-full"
                                value={form.data.category}
                                onChange={e => {
                                    form.setData('category', e.currentTarget.value as unknown as SubAccountCategory)
                                }}
                                aria-label="Platform"
                            >
                                <option value="CURRENT ASSET">CURRENT ASSET</option>
                                <option value="FIXED ASSET">FIXED ASSET</option>
                                <option value="LIABILITY">LIABILITY</option>
                                <option value="LIABILITY OTHER">LIABILITY OTHER</option>
                                <option value="EQUITY">EQUITY</option>
                            </select>
                        </div>
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

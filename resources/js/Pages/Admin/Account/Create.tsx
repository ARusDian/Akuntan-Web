import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { BaseAccount } from '@/Models/Account';
import InputLabel from '@mui/material/InputLabel';

interface Props {
}

export default function Create() {
    let form = useForm<BaseAccount>(
        {
            id: '',
            name: '',
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('account.store'), {
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
                            <InertiaLink href={route('account.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="id">Id Akun</InputLabel>
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
                            <InputLabel htmlFor="name">Nama Akun</InputLabel>
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

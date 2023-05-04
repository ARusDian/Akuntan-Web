import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/Jetstream/InputError';
import InputLabel from '@mui/material/InputLabel';
import { BasePeriod } from '@/Models/Period';
import Input from '@/Components/Jetstream/Input';
import { Switch } from '@mui/material';

export default function Create() {
    let form = useForm<BasePeriod>(
        {
            start: '',
            end: '',
            is_active: false,
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('period.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={'Tambah Periode'}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-3">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Periode
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('period.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="start">Mulai Periode</InputLabel>
                            <Input
                                id="start"
                                className="mt-1 block w-full"
                                value={form.data.start}
                                type="date"
                                onChange={e => {
                                    form.setData('start',e.currentTarget.value);
                                }}
                                autoComplete="survey-date"
                            />
                            <InputError className="mt-2" message={form.errors.start} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="end">Akhir Periode</InputLabel>
                            <Input
                                id="end"
                                className="mt-1 block w-full"
                                value={form.data.end}
                                type="date"
                                onChange={e => {
                                    form.setData('end', e.currentTarget.value);
                                }}
                                autoComplete="survey-date"
                            />
                            <InputError className="mt-2" message={form.errors.end} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="end">Aktif Periode</InputLabel>
                            <Switch
                                checked={form.data.is_active}
                                onChange={e => {
                                    form.setData('is_active', e.currentTarget.checked);
                                }} />
                            <InputError className="mt-2" message={form.errors.end} />
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

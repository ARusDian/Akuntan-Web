import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Account } from '@/Models/Account';

interface Props {
    accounts: Array<Account>,
}

export default function Index(props: Props) {
    const accounts = props.accounts;

    const dataColumns = [
        {
            accessorKey: 'id',
            header: 'Kode Akun',
        },
        {
            accessorKey: 'name',
            header: 'Nama Akun',
        },
    ] as MRT_ColumnDef<typeof accounts[0]>[];
    return (
        <AppLayout title="Account">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Akun
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('account.create')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Tambah Akun
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={accounts}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    renderRowActions={({ row }) => (
                                        <div className="flex items-center justify-center gap-2">
                                            <InertiaLink href={route('account.edit', row.original.id)}
                                                className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                Edit
                                            </InertiaLink>
                                            <button
                                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold"
                                                onClick={
                                                    () => {
                                                        Inertia.post(route('account.destroy', row.original.id), {
                                                            _method: 'DELETE',
                                                        });
                                                    }
                                                }
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    )}  
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Period } from '@/Models/Period';

interface Props {
    periods: Array<Period>,
}

export default function Index(props: Props) {
    const periods = props.periods;

    const dataColumns = [
        {
            accessorKey: 'start',
            header: 'Mulai',
        },
        {
            accessorKey: 'end',
            header: 'Berakhir',
        },
        {
            accessorFn: (row) => {
                return row.is_active ? 'Aktif' : 'Tidak Aktif';
            },
            header: 'Status',
        }
    ] as MRT_ColumnDef<Period>[];

    console.log(periods);   
    return (
        <AppLayout title="Period">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Periode
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('period.create')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Tambah Periode
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={periods}
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
                                            <InertiaLink href={route('period.edit', row.original.id)}
                                                className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                Edit
                                            </InertiaLink>
                                            <button
                                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold"
                                                onClick={
                                                    () => {
                                                        Inertia.post(route('period.destroy', row.original.id), {
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

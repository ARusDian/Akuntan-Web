import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { useForm } from '@inertiajs/inertia-react';
import * as XLSX from 'xlsx';
import InputLabel from '@/Components/Jetstream/InputLabel';
import InputError from '@/Components/Jetstream/InputError';
import Input from '@/Components/Jetstream/Input';
import axios from 'axios';
import { TransactionJournalDetailCategory } from '@/Models/TransactionJournal';

interface SubaccountGroupByCategory {
    [categoryKey: string]: 
        {
            [subAccountKey: string]: {
                id: number;
                subaccount: string;
                category: string;
                debit: number;
                credit: number;
            }
        }
    
}


export default function Index() {
    const subaccountTable = React.useRef(null);

    const [SubaccountGroupByCategory, setSubaccountGroupByCategory] = React.useState<SubaccountGroupByCategory>({});
    const form = useForm(
        {
            start: '',
            end: '',
        }
    );


    function handleExportAll() {
        const table = subaccountTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `NERACA KEUANGAN-${new Date().getTime()}.xlsx`);
    }

    function onSubmitHandler(e: React.FormEvent) {
        e.preventDefault();
        axios.post(route('date-subaccount-category-api'), {
            start: form.data.start,
            end: form.data.end,
        }).then((response) => {
            setSubaccountGroupByCategory((response.data.data));
            
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <AppLayout title="Account">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <form className="flex justify-between gap-2 my-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="start">Mulai tanggal</InputLabel>
                                    <Input
                                        id="start"
                                        className="mt-1 block w-full"
                                        value={form.data.start}
                                        type="date"
                                        onChange={e => {
                                            form.setData('start', e.currentTarget.value);
                                        }}
                                        autoComplete="date"
                                    />
                                    <InputError className="mt-2" message={form.errors.start} />
                                </div>
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="end">Akhir tanggal</InputLabel>
                                    <Input
                                        id="end"
                                        className="mt-1 block w-full"
                                        value={form.data.end}
                                        type="date"
                                        onChange={e => {
                                            form.setData('end', e.currentTarget.value);
                                        }}
                                        autoComplete="date"
                                    />
                                    <InputError className="mt-2" message={form.errors.end} />
                                </div>
                                <button
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
                                    disabled={form.processing}
                                    onClick={onSubmitHandler}
                                >
                                    Cari
                                </button>
                            </form>
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Subakun berdasarkan Kategori (NERACA KEUANGAN)
                                </div>
                                <div className="">
                                    <button
                                        onClick={handleExportAll}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Export Transaksi
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <table className="table-auto w-full" ref={subaccountTable}>
                                    {
                                        Array.from(Object.entries(SubaccountGroupByCategory)).map(([categoryKey, subaccountGroup]) => (
                                            <React.Fragment key={categoryKey}>
                                                <tr>
                                                    <th className="px-4 py-2 border-x" colSpan={4}>{categoryKey}</th>
                                                </tr>
                                                <tr>
                                                    <th className="px-4 py-2 border-x">Kode</th>
                                                    <th className="px-4 py-2 border-x">Akun</th>
                                                    <th className="px-4 py-2 border-x">Debit</th>
                                                    <th className="px-4 py-2 border-x">Kredit</th>
                                                </tr>
                                                {subaccountGroup && Array.from(Object.entries(subaccountGroup)).map(([subaccountKey, subaccount]) => (
                                                    <tr key={subaccountKey}>
                                                        <td className="border px-4 py-2 text-center">{subaccount.id}</td>
                                                        <td className="border px-4 py-2 text-center">{subaccount.subaccount}</td>
                                                        <td className="border px-4 py-2 text-center">{subaccount.debit}</td>
                                                        <td className="border px-4 py-2 text-center">{subaccount.credit}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <th className="px-4 py-2 border-x" colSpan={2}>Total</th>
                                                    <th className="px-4 py-2 border-x">{subaccountGroup &&
                                                        Object.values(subaccountGroup).reduce((acc, subaccount) => acc + subaccount.debit, 0)}
                                                    </th>
                                                    <th className="px-4 py-2 border-x">{subaccountGroup &&
                                                        Object.values(subaccountGroup).reduce((acc, subaccount) => acc + subaccount.credit, 0)}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th className="px-4 py-2 border-x" colSpan={2}>Seluruh {categoryKey}</th>
                                                    <th className="px-4 py-2 border-x" colSpan={2}>{subaccountGroup &&
                                                        Object.values(subaccountGroup).reduce((acc, subaccount) =>
                                                            acc + subaccount.debit, 0) -
                                                        Object.values(subaccountGroup).reduce((acc, subaccount) =>
                                                            acc + subaccount.credit, 0)}
                                                    </th>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

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

interface subAccountsWithTransactions {
    id: string,
    name: string,
    transactions: Array<{
        description: string,
        date: string,
        amount: number,
        type: 'credit' | 'debit',
    }>,
}


export default function Index() {
    const subaccountTable = React.useRef(null);

    const [subAccountsWithTransactions, setSubAccountsWithTransactions] = React.useState<subAccountsWithTransactions[]>([]);
    const form = useForm(
        {
            start: '',
            end: '',
        }
    );

    function handleExportAll() {
        const table = subaccountTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `BUKU BESAR~UKM-${new Date().getTime()}.xlsx`);
    }

    function onSubmitHandler(e: React.FormEvent) {
        e.preventDefault();
        axios.post(route('date-subaccount-transactions-api'), {
            start: form.data.start,
            end: form.data.end,
        }).then((response) => {
            setSubAccountsWithTransactions(Object.values(response.data.data));
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
                                    Transaksi Subakun berdasarkan tanggal (BUKU BESAR UKM)
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
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={5}>- Revenue (Pendapatan)</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={5}>Akun</td>
                                    </tr>
                                    {subAccountsWithTransactions.map((subaccount) => (
                                        <>
                                            <tr key={subaccount.id}>
                                                <td className="border px-4 py-2  bg-sky-100" colSpan={5}>[{subaccount.id}]{subaccount.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2">Tanggal</td>
                                                <td className="border px-4 py-2">Deskripsi</td>
                                                <td className="border px-4 py-2">Debit</td>
                                                <td className="border px-4 py-2">Kredit</td>
                                                <td className="border px-4 py-2">Saldo</td>
                                            </tr>
                                            {subaccount.transactions.map((transaction) => (
                                                <tr key={transaction.date}>
                                                    <td className="border px-4 py-2">{transaction.date}</td>
                                                    <td className="border px-4 py-2">{transaction.description}</td>
                                                    <td className="border px-4 py-2">{transaction.type === 'debit' ? transaction.amount : ''}</td>
                                                    <td className="border px-4 py-2">{transaction.type === 'credit' ? transaction.amount : ''}</td>
                                                    <td className="border px-4 py-2">{transaction.type === 'debit' ? '-' : ''} { transaction.amount}</td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

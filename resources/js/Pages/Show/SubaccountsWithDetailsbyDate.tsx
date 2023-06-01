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
import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';

interface SubaccountbyDate {
    id: string,
    name: string,
    debit: number,
    credit: number,
}


export default function Index() {
    const subaccountTable = React.useRef(null);

    const [feeZakatState, setFeeZakatState] = React.useState<boolean>(false);

    const [subaccountbyDate, setSubaccountbyDate] = React.useState<SubaccountbyDate[]>([]);
    const form = useForm(
        {
            start: '',
            end: '',
        }
    );

    function handleExportAll() {
        const table = subaccountTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `LAPORAN LABA RUGI-${new Date().getTime()}.xlsx`);
    }

    function onSubmitHandler(e: React.FormEvent) {
        e.preventDefault();
        axios.post(route('date-subaccount-details-api'), {
            start: form.data.start,
            end: form.data.end,
        }).then((response) => {
            setSubaccountbyDate(Object.values(response.data.data));
        }).catch((error) => {
            console.log(error);
        });
    };

    const brutoRevenue = subaccountbyDate.reduce((a, b) => a + b.debit, 0);
    const pph = (brutoRevenue * 0.05);
    const brutoRevenueWithPph = brutoRevenue - pph;
    const zakat = (brutoRevenueWithPph * 0.025);
    const netProfit = brutoRevenueWithPph - zakat;

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
                                    Detail Subakun berdasarkan tanggal (LAPORAN LABA RUGI)
                                </div>
                                <div className="">
                                    <button
                                        onClick={handleExportAll}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Export Transaksi
                                    </button>
                                </div>
                            </div>
                            <div className='my-3'>
                                <InputLabel htmlFor="type">Dengan atau tanpa Pajak dan Zakat</InputLabel>
                                <Switch {...{
                                    inputProps: { 'aria-label': 'Dengan atau tanpa Pajak dan Zakat' },
                                }}
                                    onChange={() => {
                                        setFeeZakatState(!feeZakatState);
                                    }}
                                    
                                />
                            </div>
                            <div className="mt-6 text-gray-500">
                                <table className="table-auto w-full" ref={subaccountTable}>
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={2}>+ Revenue (Pendapatan/Omzet)</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={2}>Akun</td>
                                    </tr>
                                    {subaccountbyDate.map((subaccount) => (
                                        <tr key={subaccount.id}>
                                            <td className="border px-4 py-2 text-center">[{subaccount.id}]{subaccount.name}</td>
                                            <td className="border px-4 py-2 text-center">{subaccount.debit}</td>
                                        </tr>

                                    ))}
                                    <tr className='font-bold'>
                                        <td className="border px-4 py-2 text-center">Total</td>
                                        <td className="border px-4 py-2 text-center">{brutoRevenue}</td>
                                    </tr>
                                    {feeZakatState && (
                                        <>
                                            <tr className='font-bold'>
                                                <td className="border px-4 py-2 text-center">Total Setelah pajak - {pph }</td>
                                                <td className="border px-4 py-2 text-center">{brutoRevenueWithPph}</td>
                                            </tr>
                                            <tr className='font-bold'>
                                                <td className="border px-4 py-2 text-center">Total Setelah Zakat - {zakat }</td>
                                                <td className="border px-4 py-2 text-center">{netProfit}</td>
                                            </tr>
                                        </>
                                    )}
                                    <tr>
                                        <td colSpan={2}>
                                            <br />
                                        </td>
                                    </tr>
                                    <tr className='border-t-2 border-black'>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={2}>- Expense (Pengeluaran)</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={2}>Akun</td>
                                    </tr>

                                    {subaccountbyDate.map((subaccount) => (
                                        <tr key={subaccount.id}>
                                            <td className="border px-4 py-2 text-center">[{subaccount.id}]{subaccount.name}</td>
                                            <td className="border px-4 py-2 text-center">{subaccount.credit}</td>
                                        </tr>
                                    ))}
                                    <tr className='font-bold'>
                                        <td className="border px-4 py-2 text-center">Total</td>
                                        <td className="border px-4 py-2 text-center">{subaccountbyDate.reduce((a, b) => a + b.credit, 0)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <br />
                                        </td>
                                    </tr>
                                    <tr className='font-bold bg-green-300'>
                                        <td className="border px-4 py-2 text-center">Total Net</td>
                                        <td className="border px-4 py-2 text-center">
                                            {
                                                subaccountbyDate.reduce((a, b) => a + b.credit, 0) -
                                                subaccountbyDate.reduce((a, b) => a + b.debit, 0)
                                            }
                                        </td>
                                    </tr>
                                    <br></br>
                                    {feeZakatState && (
                                        <tr className='font-bold bg-green-300'>
                                            <td className="border px-4 py-2 text-center">Total Net With Fee</td>
                                            <td className="border px-4 py-2 text-center">
                                                {
                                                    netProfit -
                                                    subaccountbyDate.reduce((a, b) => a + b.credit, 0) 
                                                    
                                                }
                                            </td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

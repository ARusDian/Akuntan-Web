import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import AppLayout from '@/Layouts/DashboardAdminLayout';

import { TransactionJournal } from '@/Models/TransactionJournal';
import { Period } from '@/Models/Period';
import axios from 'axios';
import route from 'ziggy-js';
import * as XLSX from 'xlsx';

interface Props {
    periods: Array<Period>,
}

interface TransactionJournalDetail {
    id_subaccount: string,
    subaccount: string,
    amount: number,
    type: 'credit' | 'debit',

}

interface TransactionJournalbyPeriods {
    transaction_journal: TransactionJournal,
    debit_details: Array<TransactionJournalDetail>,
    credit_details: Array<TransactionJournalDetail>,
}

export default function IndexByPeriod(props: Props) {
    const periods = props.periods;
    
    const marketTable = React.useRef(null);

    const [selectedPeriodState, setSelectedPeriodState] = useState<Period | null>(null);

    const [transactionJournals, setTransactionJournals] = useState<TransactionJournalbyPeriods[]>([]);

    useEffect(() => {
        if (selectedPeriodState) {
            axios.get(route('period-transaction-journals-api', selectedPeriodState), {
            }).then((response) => {
                setTransactionJournals(response.data.data);
            }).catch((error) => {
                console.log(error);

            });
        } else {
            setTransactionJournals([]);
        }
    }, [selectedPeriodState]);

    function handleExportAll() {
        const table = marketTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `Transaksi-${new Date().getTime()}.xlsx`);
    }

    return (
        <AppLayout title="Account">
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Jurnal Transaksi Periode {selectedPeriodState ? selectedPeriodState.start + ' - ' + selectedPeriodState.end : ''}
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <select
                                        className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                        onChange={(e) => setSelectedPeriodState(periods.find((period) => period.id == parseInt(e.target.value)) || null)}
                                    >
                                        <option value="">Pilih Periode</option>
                                        {periods.map((period) => (
                                            <option key={period.id} value={period.id}>{period.start} Hingga {period.end}</option>
                                        ))}
                                    </select>
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
                                {/* <MaterialReactTable
                                    columns={dataColumns}
                                    data={transactionJournals}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    // enableRowActions
                                    // enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    muiTableProps={{
                                        ref: marketTable,
                                    }}
                                // renderRowActions={({ row }) => (
                                //     <div className="flex items-center justify-center gap-2">

                                //     </div>
                                // )}
                                /> */}
                                <table className='w-full' ref={marketTable}>
                                    <thead>
                                        <tr className='border-b py-3 border-black'>
                                            <th className='' rowSpan={2}>Tanggal</th>
                                            <th className='border-r border-black' rowSpan={2}>Keterangan</th>
                                            <th className='border-r border-black' colSpan={3}>Debit</th>
                                            <th className='' colSpan={3}>Kredit</th>
                                        </tr>
                                        <tr className='border-b py-3 border-black'>
                                            <th className=''>Kode Sub Akun</th>
                                            <th className=''>Sub Akun</th>
                                            <th className='border-r border-black'>Jumlah</th>
                                            <th className=''>Kode Sub Akun</th>
                                            <th className=''>Sub Akun</th>
                                            <th className=''>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionJournals.map(function (transactionJournal) {
                                            const maxLength = Math.max(transactionJournal.debit_details.length, transactionJournal.credit_details.length)
                                            return (
                                                <>
                                                    <tr className='border-b py-3 border-black' key={transactionJournal.transaction_journal.id}>
                                                        <td className='' rowSpan={maxLength}>{transactionJournal.transaction_journal.date}</td>
                                                        <td className='border-r border-black' rowSpan={maxLength}>{transactionJournal.transaction_journal.description}</td>
                                                        <td className='text-center'>{transactionJournal.debit_details[0].id_subaccount}</td>
                                                        <td className='text-center'>{transactionJournal.debit_details[0].subaccount}</td>
                                                        <td className='text-center border-r border-black'>{transactionJournal.debit_details[0].amount}</td>
                                                        <td className='text-center'>{transactionJournal.credit_details[0].id_subaccount}</td>
                                                        <td className='text-center'>{transactionJournal.credit_details[0].subaccount}</td>
                                                        <td className='text-center'>{transactionJournal.credit_details[0].amount}</td>
                                                    </tr>
                                                    {[...Array(maxLength - 1)].map((_, index) => (
                                                        <tr className='border-b py-3 border-black' key={index}>
                                                            <td className='text-center'>{transactionJournal.debit_details[index + 1]?.id_subaccount}</td>
                                                            <td className='text-center'>{transactionJournal.debit_details[index + 1]?.subaccount}</td>
                                                            <td className='text-center border-r border-black'>{transactionJournal.debit_details[index + 1]?.amount}</td>
                                                            <td className='text-center'>{transactionJournal.credit_details[index + 1]?.id_subaccount}</td>
                                                            <td className='text-center'>{transactionJournal.credit_details[index + 1]?.subaccount}</td>
                                                            <td className='text-center'>{transactionJournal.credit_details[index + 1]?.amount}</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

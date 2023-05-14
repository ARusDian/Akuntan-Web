import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';
import { TransactionJournal } from '@/Models/TransactionJournal';

interface Props {
	transactionJournal: TransactionJournal;
	id?: number;
	description: string;
	date: string;
	period_id: number;
}

export default function Show(props: Props) {
	const transactionJournal = props.transactionJournal;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<DashboardAdminLayout title={`Jurnal Transaksi ${transactionJournal.date}`}>
			<div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
				<div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
					<div className=" bg-white border-b border-gray-200">
						<div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-5">
							<div className='flex justify-between'>
								<div className="text-lg md:text-3xl">
									Data Jurnal Transaksi
								</div>
								<div className="flex flex-col md:flex-row gap-3">
									<button>
										<InertiaLink
											className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
											href={route('transaction-journal.index')}
										>
											Kembali
										</InertiaLink>
									</button>
									<button>
										<InertiaLink
											className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
											href={route('transaction-journal.edit', transactionJournal.id)}
										>
											Edit
										</InertiaLink>
									</button>
									<div className="flex flex-col justify-center" >
										<button
											className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
											onClick={handleClickOpen}
										>
											<label htmlFor="my-modal">Delete</label>
										</button>
									</div>
								</div>
							</div>
							<table className='w-full'>
								<thead>
									<tr className='border-b py-3 border-black'>
										<th className=''>Properti</th>
										<th className=''>Keterangan</th>
									</tr>
								</thead>
								<tbody>
									<tr className='border-b py-3 border-black'>
										<td className='py-3 text-center'>Deskripsi</td>
										<td className='py-3 text-center'>{transactionJournal.description}</td>
									</tr>
									<tr className='border-b py-3 border-black'>
										<td className='py-3 text-center'>Tanggal</td>
										<td className='py-3 text-center'>{transactionJournal.date}</td>
									</tr>
									<tr className='border-b py-3 border-black'>
										<td className='py-3 text-center'>periode</td>
										<td className='py-3 text-center'>{transactionJournal.period?.start} - {transactionJournal.period?.end}</td>
									</tr>
								</tbody>
							</table>
							<div className="my-5">
								<div className="text-lg">
									Detail Transaksi
								</div>
								<table className='w-full'>
									<thead>
										<tr className='border-b py-3 border-black'>
											<th className=''>Tipe</th>
											<th className=''>Kategori</th>
											<th className=''>Jumlah</th>
											<th className=''>Akun</th>
										</tr>
									</thead>
									<tbody>
										{transactionJournal.transaction_journal_details?.map((detail, index) => (
											<tr className='border-b py-3 border-black' key={index}>
												<td className={`py-3 text-center font-semibold	 ${detail.type=='debit' ? 'text-red-500' : 'text-blue-500'}` }>{detail.type}</td>
												<td className='py-3 text-center'>{detail.category}</td>
												<td className='py-3 text-center'>{detail.amount}</td>
												<td className='py-3 text-center'>{detail.sub_account?.name}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose}
			>
				<DialogContent className="w-full">
					<div>
						<h3 className="font-bold text-lg">Confirm to Delete</h3>
						<p className="py-4">Are you sure to do this.</p>
						<div className="flex justify-end">
							<button
								className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
								onClick={
									() => {
										Inertia.post(route('transaction-journal.destroy', transactionJournal.id), {
											_method: 'DELETE',
										});
									}
								}
							>Yes</button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</DashboardAdminLayout>
	)
}

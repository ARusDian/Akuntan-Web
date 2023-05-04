import React from 'react';

import AddNewHeader from '@/Components/AddNewHeader';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { BaseTransactionJournal, BaseTransactionJournalDetail, createDefaultTransactionJournalDetail } from '@/Models/TransactionJournal';
import { SubAccount } from '@/Models/SubAccount';
import TextInput from '@/Components/Jetstream/TextInput';
import { InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';

interface Props {
    form: InertiaFormProps<BaseTransactionJournal>,
    className?: string,
    subAccounts: Array<SubAccount>,
    transactionJournalDetails: Array<BaseTransactionJournalDetail>,
    onChange: (value: Array<BaseTransactionJournalDetail>) => void
}

export default function DetailForm(props: Props) {

    const { form, subAccounts, transactionJournalDetails } = props;

    function handleChange<T>(callback: (args0: T) => void) {
        return (e: T) => {
            callback(e);
            props.onChange(transactionJournalDetails);
            // props.form.setData('transaction_journal_details', transactionJournalDetails);
        };
    }


    return (
        <div className={`flex-col gap-5 my-8 ${props.className}`}>  
              <div className="flex-col gap-2">
                <AddNewHeader
                    title="Detail Transaksi"
                    id="add-new-contributor"
                    onClick={handleChange(
                        () => transactionJournalDetails.push(createDefaultTransactionJournalDetail())
                    )}
                />
                {
                    transactionJournalDetails.length > 0 && (
                        transactionJournalDetails.map((contributor, index) => (
                            <>
                                <div className='grid grid-cols-2 gap-4 border-b-stone-800 border-b-2 py-3' key={index}>
                                    <div className="form-control w-full mt-4">
                                        <InputLabel htmlFor="sub_account_id">Id Sub Akun</InputLabel>
                                        <select
                                            id="sub_account_id"
                                            className="mt-1 block w-full"
                                            value={form.data.transaction_journal_details[index].sub_account_id}
                                            onChange={handleChange((e) => {
                                                transactionJournalDetails[index].sub_account_id = e.currentTarget.value;
                                            })}
                                            required
                                            autoFocus
                                            autoComplete="token"
                                        >
                                            <option value="">Pilih Sub Akun</option>
                                            {subAccounts.map((account) => (
                                                <option key={account.id} value={account.id}>{account.id} - {account.name}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="form-control w-full mt-4">
                                        <InputLabel htmlFor="amount">Amount</InputLabel>
                                        <TextInput
                                            id="amount"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={form.data.transaction_journal_details[index].amount}
                                            onChange={handleChange((e) => {
                                                transactionJournalDetails[index].amount = parseInt(e.currentTarget.value);
                                            })}
                                            required
                                            autoFocus
                                            autoComplete="token"
                                        />
                                    </div>
                                    <div className="form-control w-full mt-4">
                                        <InputLabel htmlFor="type">Tipe Transaksi</InputLabel>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={form.data.transaction_journal_details[index].type}
                                            exclusive
                                            onChange={handleChange((e) => {
                                                console.log(e);
                                                transactionJournalDetails[index].type = e.currentTarget.attributes[3].nodeValue as 'debit' | 'credit';
                                            })}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value="debit">Debit</ToggleButton>
                                            <ToggleButton value="credit">Kredit</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            className="bg-red-500 text-white hover:bg-red-600 my-3 px-5 rounded-lg text-md font-semibold"
                                            type="button"
                                            onClick={handleChange(_ => {
                                                transactionJournalDetails.splice(index, 1);
                                            })}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                               
                            </>
                        ))
                    )
                }
            </div>
        </div>
    );
}

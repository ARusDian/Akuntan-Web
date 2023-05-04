import Input from "@/Components/Jetstream/Input";
import InputError from "@/Components/Jetstream/InputError";
import TextInput from "@/Components/Jetstream/TextInput";
import { Period } from "@/Models/Period";
import { SubAccount } from "@/Models/SubAccount";
import { BaseTransactionJournal } from "@/Models/TransactionJournal";
import { InertiaFormProps } from "@inertiajs/inertia-react";
import { InputLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import DetailForm from "./DetailForm";

interface Props {
    form: InertiaFormProps<BaseTransactionJournal>,
    className?: string,
    subAccounts: Array<SubAccount>
    periods: Array<Period>
}

export default function Form(props: Props) {
    const { form, subAccounts, periods } = props;
    
    function handleDataChange<K extends keyof BaseTransactionJournal, V>(
        name: K,
        callback?: (arg: BaseTransactionJournal[K], value: V) => void,
    ) {
        return (value: V) => {
            if (callback != null) {
                callback(form.data[name], value);
            }

            form.setData(name, form.data[name]);
        };
    }
    return (
        <div className={props.className}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="description">Deskripsi</InputLabel>
                <TextInput
                    id="description"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.description}
                    onChange={e => form.setData('description', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="token"
                />
                <InputError className="mt-2" message={form.errors.description} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="end">Tanggal Transaksi</InputLabel>
                <Input
                    id="end"
                    className="mt-1 block w-full"
                    value={form.data.date}
                    type="date"
                    onChange={e => {
                        form.setData('date', e.currentTarget.value);
                    }}
                    autoComplete="transaction-date"
                />
                <InputError className="mt-2" message={form.errors.date} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="period">Periode</InputLabel>
                <select
                    id="period"
                    className="mt-1 block w-full"
                    value={form.data.period_id}
                    onChange={e => form.setData('period_id', parseInt(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="token"
                >
                    <option value="">Pilih Periode</option>
                    {periods.map((period) => (
                        <option key={period.id} value={period.id}>{period.start} {"=>"} {period.end}</option>
                    ))}

                </select>
                <InputError className="mt-2" message={form.errors.period_id} />
            </div>
            <DetailForm
                form={form}
                transactionJournalDetails={form.data.transaction_journal_details}
                subAccounts={subAccounts}
                onChange={handleDataChange('transaction_journal_details')}
            />
        </div>
    )
}

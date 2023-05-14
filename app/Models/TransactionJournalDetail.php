<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionJournalDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_journal_id',
        'sub_account_id',
        'type',
        'amount',
    ];

    public function transactionJournal()
    {
        return $this->belongsTo(TransactionJournal::class);
    }

    public function subAccount()
    {
        return $this->belongsTo(SubAccount::class);
    }
}

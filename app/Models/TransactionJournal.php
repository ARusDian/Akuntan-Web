<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionJournal extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'description',
        'sub_account_id',
        'period_id',
    ];

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function transactionJournalDetails()
    {
        return $this->hasMany(TransactionJournalDetail::class);
    }

    public function subAccount()
    {
        return $this->belongsToMany(SubAccount::class, TransactionJournalDetail::class);
    }

    
}

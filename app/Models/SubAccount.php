<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubAccount extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'category',
        'account_id',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function transactionJournalDetails()
    {
        return $this->hasMany(TransactionJournalDetail::class);
    }

    public function transactionJournals()
    {
        return $this->belongsToMany(TransactionJournal::class, TransactionJournalDetail::class);
    }
}

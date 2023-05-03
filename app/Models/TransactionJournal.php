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
        'amount',
        'sub_account_id',
        'period_id',
    ];

    public function subAccount()
    {
        return $this->belongsTo(SubAccount::class);
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }
    
    public function account()
    {
        return $this->belongsToThrough(Account::class, SubAccount::class);
    }
}

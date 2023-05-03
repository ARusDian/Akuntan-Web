<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'id',
        'name',
    ];

    public function subAccounts()
    {
        return $this->hasMany(SubAccount::class);
    }

    public function transactionJournals()
    {
        return $this->hasManyThrough(TransactionJournal::class, SubAccount::class);
    }
}

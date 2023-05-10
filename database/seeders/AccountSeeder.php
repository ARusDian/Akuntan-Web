<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $accounts = [
            [
                'id' => '1',
                'name' => 'Kas'
            ],[
                'id' => '2',
                'name' => 'Hutang'
            ],[
                'id' => '3',
                'name' => 'Aset'
            ],[
                'id' => '4',
                'name' => 'Penjualan'
            ],[
                'id' => '5',
                'name' => 'Pembelian'
            ],[
                'id' => '6',
                'name' => 'Pengeluaran' 
            ],[
                'id' => '7',
                'name' => 'Pendapatan'
            ]
        ];

        foreach ($accounts as $account) {
            Account::updateOrCreate(['id' => $account['id']], $account);
        }
    }
}

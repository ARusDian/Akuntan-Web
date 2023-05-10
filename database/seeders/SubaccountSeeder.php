<?php

namespace Database\Seeders;

use App\Models\Subaccount;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubaccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $subaccounts =[
            [
                'id' => '1110',
                'name' => 'Kas',
                'account_id' => '1'
            ],[
                'id'=>'1120',
                'name'=>'Bank BNI',
                'account_id'=>'1'
            ],[
                'id'=>'1130',
                'name'=>'Piutang Dagang',
                'account_id'=>'1'
            ],[
                'id'=>'1140',
                'name'=>'Persediaan Barang Dagang',
                'account_id'=>'1'
            ],[
                'id'=>'1150',
                'name'=>'Persediaan Bahan Baku',
                'account_id'=>'1'
            ],[
                'id'=>'1160',
                'name'=>'Asuransi Dibayar Di Muka',
                'account_id'=>'1'
            ],[
                'id'=>'1210',
                'name'=>'Gedung',
                'account_id'=>'1'
            ],[
                'id'=>'1211',
                'name'=>'Akumulasi Penyewaan Gedung',
                'account_id'=>'1'
            ],[
                'id'=>'1220',
                'name'=>'Kendaraan',
                'account_id'=>'1'
            ],[
                'id'=>'1221',
                'name'=>'Akumulasi Penyewaan Kendaraan',
                'account_id'=>'1'
            ],[
                'id'=>'1230',
                'name'=>'Peralatan Produksi',
                'account_id'=>'1'
            ],[
                'id'=>'1231',
                'name'=>'Akumulasi Penyewaan Peralatan',
                'account_id'=>'1'
            ],[
                'id'=>'2110',
                'name'=>'Hutang Dagang',
                'account_id'=>'2'
            ],[
                'id'=>'2120',
                'name'=>'PPn Keluaran',
                'account_id'=>'2'
            ],[
                'id'=>'2130',
                'name'=>'PPn Masukan',
                'account_id'=>'2'
            ],[
                'id'=>'2210',
                'name'=>'Hutang Bank',
                'account_id'=>'2'
            ],[
                'id'=>'3100',
                'name'=>'Modal usaha',
                'account_id'=>'3'
            ],[
                'id'=>'3110',
                'name'=>'Prive',
                'account_id'=>'3'
            ],[
                'id'=>'3200',
                'name'=>'Laba Sampai Dengan Tahun Lalu',
                'account_id'=>'3'
            ],[
                'id'=>'3210',
                'name'=>'Laba Tahun Berjalan',
                'account_id'=>'3'
            ],[
                'id'=>'4100',
                'name'=>'Penjualan',
                'account_id'=>'4'
            ],[
                'id'=>'4110',
                'name'=>'Retur Penjualan',
                'account_id'=>'4'
            ],[
                'id'=>'4120',
                'name'=>'Potongan penjualan',
                'account_id'=>'4'
            ],[
                'id'=>'4200',
                'name'=>'Pendapatan jasa service',
                'account_id'=>'4'
            ],[
                'id'=>'4300',
                'name'=>'Ikhtisar Laba/Rugi',
                'account_id'=>'4'
            ],[
                'id'=>'5100',
                'name'=>'Pembelian',
                'account_id'=>'5'
            ],[
                'id'=>'5110',
                'name'=>'Retur pembelian',
                'account_id'=>'5'
            ],[
                'id'=>'5120',
                'name'=>'Potongan pembelian',
                'account_id'=>'5'
            ],[
                'id'=>'6100',
                'name'=>'Harga pokok penjualan (HPP)',
                'account_id'=>'6'
            ],[
                'id'=>'6110',
                'name'=>'Gaji Karyawan Bagian Penjualan',
                'account_id'=>'6'
            ],[
                'id'=>'6111',
                'name'=>'Gaji Karyawan Bagian Produksi',
                'account_id'=>'6'
            ],[
                'id'=>'6112',
                'name'=>'Beban Listrik, Air dan Telepon',
                'account_id'=>'6'
            ],[
                'id'=>'6113',
                'name'=>'Beban Asuransi',
                'account_id'=>'6'
            ],[
                'id'=>'6114',
                'name'=>'Beban Perlengkapan Toko',
                'account_id'=>'6'
            ],[
                'id'=>'6115',
                'name'=>'Beban Penyewaan gedung',
                'account_id'=>'6'
            ],[
                'id'=>'6116',
                'name'=>'Beban Penyewaan Kendaraan',
                'account_id'=>'6'
            ],[
                'id'=>'6117',
                'name'=>'Beban Penyewaan Peralatan',
                'account_id'=>'6'
            ],[
                'id'=>'6118',
                'name'=>'Beban BBM dan Transport',
                'account_id'=>'6'
            ],[
                'id'=>'6119',
                'name'=>'Beban Service dan Perawatan',
                'account_id'=>'6'
            ],[
                'id'=>'6120',
                'name'=>'Beban Lain-lain',
                'account_id'=>'6'
            ],[
                'id'=>'6125',
                'name'=>'Beban Admin Bank',
                'account_id'=>'6'
            ],[
                'id'=>'6130',
                'name'=>'Beban Bagi Hasil',
                'account_id'=>'6'
            ],[
                'id'=>'6135',
                'name'=>'PPh Final ',
                'account_id'=>'6'
            ],[
                'id'=>'6140',
                'name'=>'Beban Zakat',
                'account_id'=>'6'
            ],[
                'id'=>'7100',
                'name'=>'Pendapatan Bunga Bank',
                'account_id'=>'7'
            ],
        ];
        foreach($subaccounts as $subaccount){
            Subaccount::updateOrCreate([
                'id' => $subaccount['id']
            ], $subaccount);
        }

    }
}

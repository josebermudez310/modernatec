<?php

namespace Database\Seeders;

use App\Models\tipo_contrato;
use Illuminate\Database\Seeder;

class TipoContratoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $nombre = new tipo_contrato();
        $nombre->nombre_contrato = "definido";
        $nombre->save();

        $nombre = new tipo_contrato();
        $nombre->nombre_contrato = "indefinido";
        $nombre->save();

    }
}

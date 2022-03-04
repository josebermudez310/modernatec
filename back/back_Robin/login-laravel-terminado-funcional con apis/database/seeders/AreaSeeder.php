<?php

namespace Database\Seeders;

use App\Models\area;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $area = new area();
        $area->nombre = "registros";
        $area->save();

        $area = new area();
        $area->nombre = "administracion";
        $area->save();


        $area = new area();
        $area->nombre = "seguridad";
        $area->save();
    }
}

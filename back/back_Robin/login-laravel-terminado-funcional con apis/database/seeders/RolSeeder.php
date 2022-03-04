<?php

namespace Database\Seeders;

use App\Models\rol;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rol = new rol();
        $rol ->rol = "registros";
        $rol ->save();

        $rol = new rol();
        $rol ->rol = "administrador";
        $rol ->save();

        $rol = new rol();
        $rol ->rol = "seguridad";
        $rol ->save();
    }
}

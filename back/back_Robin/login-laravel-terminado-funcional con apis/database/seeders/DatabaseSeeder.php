<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(AreaSeeder::class);
        $this->call(TipoContratoSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(RolSeeder::class);
        $this->call(TipoCodigoSeeder::class);
        $this->call(CitasSeeder::class);
        $this->call(RegistroSeeder::class);
        $this->call(UserSeeder::class);
    }
}

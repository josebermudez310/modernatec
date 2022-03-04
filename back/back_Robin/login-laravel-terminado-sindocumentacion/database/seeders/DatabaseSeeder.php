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
        $this->call(UserSeeder::class);
        $this->call(AreaSeeder::class);
        $this->call(CitasSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(RegistroSeeder::class);
        $this->call(TipoCodigoSeeder::class);
        $this->call(TipoContratoSeeder::class);
    }
}

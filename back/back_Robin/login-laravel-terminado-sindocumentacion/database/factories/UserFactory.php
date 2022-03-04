<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        /*
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' =>  Hash::make("123456789"),      //'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
        */

        return [
            'numero_identificacion'=> $this->faker->numerify("10"),
            'name' => $this->faker->name(),
            'apellidos' => $this->faker->name(),
            'telefono'=> $this->faker->Number(digits: 10),
            'estado'=>$this->faker->randomElement(['true','false']),
            'id_area'=>$this->faker->numberBetween(['1','2','3']),
            'id_contrato'=>$this->faker->numberBetween(['1','2','3']),
            'rol'=>$this->faker->numberBetween(['1','2','3']),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' =>  Hash::make("123456789"),      //'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTipoCodigoToCodigosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('codigos', function (Blueprint $table) {
            $table->unsignedBigInteger('tipo_codigo')->nullable();
            $table->foreign('tipo_codigo')->references('id')->on('tipo_codigos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('codigos', function (Blueprint $table) {
            //
        });
    }
}

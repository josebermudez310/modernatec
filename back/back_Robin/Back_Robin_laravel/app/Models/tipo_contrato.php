<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\contrato;
class tipo_contrato extends Model
{
    use HasFactory;

    public function tipo_contratos(){
        return $this->hasMany('App\Models\contrato');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\tipo_contrato;

class contrato extends Model
{
    use HasFactory;

    public function user(){
      return $this->belongsTo('App\Models\User');
    }
    public function  tipo_contrato(){
        return $this->hasOne('App\Models\tipo_contrato');
     }


}



<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class area extends Model
{
    use HasFactory;
    public function  area(){
       return $this->belongsTo('App\Models\User');
    }
}

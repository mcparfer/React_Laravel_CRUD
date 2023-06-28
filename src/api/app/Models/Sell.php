<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sell extends Model
{
    protected $table = 'sellings';
    
    use HasFactory;

    /* Specifies which fields are allowed to be populated by a create or update operation. */
    protected $fillable = ['id_event', 'email', 'phone', 'qty'];
}

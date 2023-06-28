<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitEvent extends Model
{
    use HasFactory;
    protected $primaryKey = ['id_event', 'id_unit'];
    public $incrementing = false;
    protected $fillable = ['id_event', 'id_unit', "number_of_songs"];
}

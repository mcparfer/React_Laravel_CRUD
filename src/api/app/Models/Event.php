<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /* Specifies which fields are allowed to be populated by a create or update operation. */
    protected $fillable = ['name', 'date', 'description', 'total_tickets', 'left_tickets', 'price', 'image'];
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    protected $fillable = ["table_id", "name", "type", "order", "hidden"];

}

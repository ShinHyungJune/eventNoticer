<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = ["table_id", "column_id", "row_id", "content"];
}

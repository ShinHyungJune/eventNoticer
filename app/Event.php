<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ["title"];

    public function gifts()
    {
        return $this->hasMany(Gift::class);
    }

    public function table()
    {
        return $this->hasOne(Table::class);
    }
}

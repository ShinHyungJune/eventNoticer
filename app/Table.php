<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    protected $fillable = ["title", "body"];

    public function columns()
    {
        return $this->hasMany(Column::class);
    }

    public function rows()
    {
        return $this->hasMany(Row::class);
    }

    public function contents()
    {
        return $this->hasMany(Content::class);
    }
}

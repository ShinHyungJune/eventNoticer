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

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function winnings()
    {
        return $this->hasMany(Participant::class)->whereNotNull("gift_id");
    }
}

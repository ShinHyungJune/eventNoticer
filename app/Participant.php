<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = ["phone", "name", "nickname", "platform", "url", "thumbnail" ,"event_id", "gift_id"];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}

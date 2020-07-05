<?php

namespace App\Http\Resources;

use App\Participant;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "gifts" => $this->gifts,
            "winnings" => new ParticipantCollection($this->winnings),
            "participantsLength" => $this->participants()->count(),
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}

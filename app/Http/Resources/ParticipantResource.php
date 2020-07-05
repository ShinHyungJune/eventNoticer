<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantResource extends JsonResource
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
            "event_id" => $this->event_id,
            "gift_id" => $this->gift_id,
            "nickname" => $this->nickname,
            "phone" => $this->phone,
            "name" => $this->name,
            "platform" => $this->platform,
            "thumbnail" => $this->thumbnail,
            "url" => $this->url,
        ];
    }
}

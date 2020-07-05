<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WinningResource extends JsonResource
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
            "gift_id" => $this->gift_id,
            "event_id" => $this->event_id,
            "name" => $this->name,
            "platform" => $this->platform,
            "nickname" => $this->nickname,
            "phone" => $this->phone ? substr($this->phone, -4) : null,
            "thumbnail" => $this->thumbnail ? $this->thumbnail : "/img/circle_user.png",
        ];
    }
}

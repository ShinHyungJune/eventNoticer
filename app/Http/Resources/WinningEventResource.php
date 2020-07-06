<?php

namespace App\Http\Resources;

use App\Enums\PlatformType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class WinningEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $index = 0;

        $gifts = [];

        foreach($this->gifts as $gift){
            $gifts[] = $gift;

            $platforms = [];

            foreach(PlatformType::getValues() as $platform){
                $platforms[$platform] = new WinningCollection($this->winnings()->where("gift_id", $gift->id)->where("platform", $platform)->get());
            }

            $gifts[$index]["platforms"] = $platforms;

            ++$index;
        }

        return [
            "id" => $this->id,
            "title" => $this->title,
            "gifts" => $gifts,
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}

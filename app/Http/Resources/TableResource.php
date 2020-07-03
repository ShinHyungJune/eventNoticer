<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $contents = [];

        foreach($this->contents as $content){
            $contents[$content["row_id"]][$content["column_id"]] = [
                "content" => $content["content"],
                "cell" => "(".$content["column_id"].",".$content["row_id"].")",
                "column_id" => $content["column_id"],
                "row_id" => $content["row_id"],
            ];
        }

        return [
            "id" => $this->id,
            "contents" => $contents,
            "columns" => $this->columns
        ];
    }
}

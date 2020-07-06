<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Event extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ["title"];

    protected $appends = ["img"];

    public function registerMediaCollections(Media $media = null)
    {
        // 단일 이미지 파일이어야만 할 경우에는 끝에 singleFile() 추가
        $this->addMediaCollection("img")->useDisk("s3")->singleFile();
    }

    public function getImgAttribute()
    {
        if($this->hasMedia('img')) {
            $media = $this->getMedia('img')[0];

            return [
                "name" => $media->file_name,
                "url" => $media->getFullUrl()
            ];
        }

        return null;
    }

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

    public function giftsSync($gifts)
    {
        $this->gifts()->whereNotIn("title", $gifts)->delete();

        foreach($gifts as $gift){

            if(!$this->gifts()->where("title", $gift)->exists()){
                $this->gifts()->create([
                    "title" => $gift
                ]);
            }
        }
    }
}

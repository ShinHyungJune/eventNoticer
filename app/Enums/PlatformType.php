<?php
/**
 * Created by PhpStorm.
 * User: master
 * Date: 2020-07-05
 * Time: 오후 12:13
 */

namespace App\Enums;


final class PlatformType
{
    const FACEBOOK = "FACEBOOK";
    const NAVER = "NAVER";
    const INSTAGRAM = "INSTAGRAM";
    const YOUTUBE = "YOUTUBE";
    const UNKNOWN = "UNKNOWN";

    public static function getValues()
    {
        return [self::FACEBOOK, self::YOUTUBE, self::NAVER, self::INSTAGRAM, self::UNKNOWN];
    }
}
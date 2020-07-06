<?php

namespace App\Exports;

use App\Participant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class WinningsExport implements FromCollection, WithMapping, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Participant::all();
    }

    public function map($model) : array
    {
        return [
            $model->name,
            $model->phone,
            $model->nickname,
            $model->platform,
            $model->url,
            $model->gift["title"],
        ];
    }

    public function headings(): array
    {
        return [
            "이름",
            "전화번호",
            "닉네임",
            "플랫폼",
            "링크",
            "당첨품목"
        ];
    }
}

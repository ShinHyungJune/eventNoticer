<?php

namespace App\Http\Controllers\Api;

use App\Event;
use App\Exports\WinningsExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\WinningCollection;
use App\Http\Resources\WinningEventResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class WinningController extends ApiController
{
    public function index(Request $request)
    {
        $request->validate([
            "event_id" => "required|integer"
        ]);

        $event = Event::find($request->event_id);

        if(!$event)
            return $this->respondNotFound();

        return WinningEventResource::make($event);
    }
    public function export($event_id)
    {
        $event = Event::find($event_id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        return Excel::download(new WinningsExport($event), "당첨자".Carbon::now()->format("Y-m-dH:i:s").".xlsx");
    }
}

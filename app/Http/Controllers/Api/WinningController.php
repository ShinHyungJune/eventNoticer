<?php

namespace App\Http\Controllers\Api;

use App\Event;
use App\Http\Controllers\Controller;
use App\Http\Resources\WinningCollection;
use App\Http\Resources\WinningEventResource;
use Illuminate\Http\Request;

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
}

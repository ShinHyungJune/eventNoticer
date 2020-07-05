<?php

namespace App\Http\Controllers\Api;

use App\Event;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Http\Resources\TableResource;
use App\Imports\TableImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class EventController extends ApiController
{
    public function index()
    {
        $take = 40;

        $events = auth()->user()->events()->latest()->paginate($take);

        return new EventCollection($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:1000",
            "gifts" => "required|max:5000"
        ]);

        $event = auth()->user()->events()->create($request->all());

        $gifts = explode(",", $request->gifts);

        foreach($gifts as $gift){
            $event->gifts()->create([
                "title" => $gift
            ]);
        }

        return $this->respondCreated($event);
    }

    public function show(Request $request, $id)
    {
        $event = Event::find($id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        return EventResource::make($event);
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            "title" => "required|string|max:1000",
        ]);

        $event = Event::find($id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();


        $event->update(["title" => $request->title]);

        $gifts = explode(",", $request->gifts);

        $event->gifts()->delete();

        foreach($gifts as $gift){
            $event->gifts()->create([
                "title" => $gift
            ]);
        }

        return $this->respondUpdated($event);
    }

    public function destroy(Request $request, $id)
    {
        $event = Event::find($id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        $event->delete();

        return $this->respondDeleted();
    }
}

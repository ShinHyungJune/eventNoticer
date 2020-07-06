<?php

namespace App\Http\Controllers\Api;

use App\Event;
use App\Exports\EventsExport;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Http\Resources\TableResource;
use App\Imports\TableImport;
use Carbon\Carbon;
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
            "gifts" => "required|max:5000",
            "img" => "nullable|image",
        ]);

        $event = auth()->user()->events()->create($request->all());

        $event->addMedia($request->img)->toMediaCollection("img", "s3");

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
            "img" => "nullable|image"
        ]);

        $event = Event::find($id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();


        $event->update(["title" => $request->title]);

        if($request->img)
            $event->addMedia($request->img)->toMediaCollection("img", "s3");

        $gifts = explode(",", $request->gifts);

        $event->giftsSync($gifts);

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

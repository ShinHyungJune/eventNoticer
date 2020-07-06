<?php

namespace App\Http\Controllers\Api;

use App\Event;
use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Http\Resources\ParticipantCollection;
use App\Participant;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ParticipantController extends ApiController
{
    public function index(Request $request)
    {
        $request->validate([
            "event_id" => "required|integer"
        ]);

        $word = $request->word ?? null;

        $platform = $request->platform ?? null;

        $event = Event::find($request->event_id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        $participants = $event->participants();

        if($platform)
            $participants = $participants->where("platform", $platform);

        if($word)
            $participants = $participants->where(function($query) use($word){
                $query->where("nickname", "LIKE", "%${word}%")
                    ->orWhere("name", "LIKE", "%${word}%")
                    ->orWhere("phone", "LIKE", "$${word}%");
            });

        $participants = $participants
            ->orderBy("nickname","asc")
            ->orderBy("name", "asc")
            ->paginate(200);

        return new ParticipantCollection($participants);
    }

    public function store(Request $request)
    {
        $request->validate([
            "event_id" => "required|integer",
            "participants" => "required|array"
        ]);

        $event = Event::find($request->event_id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        $event->participants()->delete();

        foreach(array_chunk($request->participants, 1000) as $participants){
            Participant::insert($participants);
        }

        return $this->respondCreated(EventResource::make($event));
    }

    // 당첨자 뽑기
    public function announce(Request $request)
    {
        $request->validate([
            "winnings" => "required|array|min:1",
            "event_id" => "required|integer"
        ]);

        $event = Event::find($request->event_id);

        if(!$event)
            return $this->respondNotFound();

        if(auth()->id() != $event->user_id)
            return $this->respondForbidden();

        $event->participants()->update(["gift_id" => null]);

        foreach($request->winnings as $winning){
            $participant = Participant::find($winning["id"]);

            if($participant->event->user_id === auth()->id())
                $participant->update($winning);
        }

        return $this->respondUpdated(EventResource::make($event), "당첨자를 성공적으로 선별하였습니다.");
    }
}

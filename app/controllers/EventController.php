<?php

use App\Event;

class EventController extends BaseController {

    public function store() {
        return Input::get('id');

        Event::create([
            'event_id' => Input::get('id')
        ]);
    }

    public function update() {
        Event::create([
            'event_id' => Input::get('id'),
            'user_id'  => Auth::user()->id
        ]);
    }

    public function destroy() {
        $event = Event::find(Input::get('id'));
        $event->delete();
    }

} 
<?php

use App\Event;

class EventController extends BaseController {

    public function index() {
        return Event::all();
    }

    public function show($id) {
        return Event::find($id);
    }

    public function store() {
        return Input::get('event_id');

        Event::create([
            'event_id' => Input::get('event_id')
        ]);
    }

    public function update() {
        if (Auth::guest()) {
            return ['result' => 'guest'];
        }

        $validator = Validator::make(Input::all(), Event::$rules);

        if ($validator->passes()) {
            Event::create([
                'event_id' => Input::get('event_id'),
                'user_id'  => Auth::user()->id
            ]);

            return ['result' => 'success'];
        } else {
            return ['result' => 'fail'];
        }
    }

    public function destroy() {
        $event = Event::find(Input::get('event_id'));
        $event->delete();

        return ['result' => 'success'];
    }

} 
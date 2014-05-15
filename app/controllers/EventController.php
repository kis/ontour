<?php

class EventController extends BaseController {

    public function create() {//getSaveEvent() {
        return Input::get('id');

        Event::create([
            'event_id' => Input::get('id')
        ]);
    }

    public function postRemoveEvent() {
        $event = Event::find(Input::get('id'));
        $event->delete();
    }

} 
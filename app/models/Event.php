<?php

class Event extends Eloquent {

    protected $table = 'events';

    public function saveEvent() {
        Event::create(array(
            'events_id' => Input::get('event_id')
        ));
    }

} 
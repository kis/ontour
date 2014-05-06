<?php

class EventController extends BaseController {

    protected $event;

    public function __construct(Event $event) {
        $this->event = $event;
    }

    public function saveEvent() {
        $this->event->saveEvent();
    }

} 
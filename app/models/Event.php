<?php

class Event extends Eloquent {

    protected $table = 'events';

    protected $primaryKey = 'event_id';

    protected $fillable = array('event_id');

    public function users() {
        return $this->hasManyThrough('User', 'UserEvent');
    }

} 
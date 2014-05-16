<?php

namespace App;

use Eloquent;

class Event extends Eloquent {

    protected $table = 'events';

    protected $primaryKey = 'event_id';

    public $timestamps = false;

    protected $fillable = array('event_id');

    public function users() {
        return $this->hasManyThrough('User', 'UserEvent');
    }

} 
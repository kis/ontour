<?php

namespace App;

use Eloquent;

class Event extends Eloquent {

    protected $table = 'events';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = array('event_id', 'user_id');

    public function users()
    {
        return $this->hasMany('User');
    }

} 
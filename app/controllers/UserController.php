<?php

class UserController extends BaseController {

    protected $user;

    public function __construct(UserModel $user) {
        $this->user = $user;
    }

    public function registration() {
        $this->user->register();
    }

} 
<?php

class UserController extends BaseController {

    public function register() {
        $userModel = new UserModel;
        $userModel->register();

        return Redirect::to('/');
    }

} 
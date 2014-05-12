<?php

class UserController extends BaseController {

    public function postRegister() {
        $userModel = new User;
        $userModel->register();

        return Redirect::to('/');
    }

    public function postLogout() {
        Auth::logout();
    }

} 
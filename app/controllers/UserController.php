<?php

use Illuminate\Support\Facades\Validator;

class UserController extends BaseController {

    public function postRegister() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            User::create(array(
                'password' => Hash::make(Input::get('password')),
                'email'    => Input::get('email')
            ));

            return Redirect::intended('/');
        } else {
            return Redirect::to('/registration')->withErrors($validator);
        }
    }

    public function postLogin() {
        if (Auth::attempt(array(
                'email'    => Input::get('email'),
                'password' => Input::get('password')
            ))) {
            return Redirect::intended('/');
        } else {
            return Redirect::to('/registration');
        }
    }

    public function postLogout() {
        Auth::logout();
    }

} 
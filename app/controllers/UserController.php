<?php

use Illuminate\Support\Facades\Validator;

class UserController extends BaseController {

    public function postRegister() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            User::create([
                'email'    => Input::get('email'),
                'password' => Hash::make(Input::get('password'))
            ]);

            return Redirect::intended('/');
        } else {
            return Redirect::to('registration')->withErrors($validator);
        }
    }

    public function postLogin() {
        $userData = [
            'email'    => Input::get('email'),
            'password' => Input::get('password')
        ];

        if (Auth::attempt($userData)) {
            return Redirect::intended('/');
        } else {
            return Redirect::to('login');
        }
    }

    public function postLogout() {
        Auth::logout();
    }

} 
<?php

use Illuminate\Support\Facades\Validator;

class UserController extends BaseController {

    public function getRegistrationPage() {
        return View::make('registration');
    }

    public function getRegSuccess() {
        return View::make('regsuccess');
    }

    public function getLoginPage() {
        return View::make('login');
    }

    public function postForgot() {
        return View::make('forgot');
    }

    public function postRegister() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            User::create([
                'email'    => Input::get('email'),
                'password' => Hash::make(Input::get('password'))
            ]);

            return Redirect::to('users/reg-success');
        } else {
            return Redirect::to('users/registration-page')->withErrors($validator);
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
            return Redirect::to('users/login-page');
        }
    }

    public function postLogout() {
        Auth::logout();
    }

} 
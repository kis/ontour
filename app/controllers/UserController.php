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

    public function getProfile() {
        return View::make('profile');
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

    public function getLogout() {
        Auth::logout();
        return Redirect::to('users/login-page');
    }

    public function postEdit() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            $userData = [
                'login'      => Input::get('login'),
                'password'   => Hash::make(Input::get('password')),
                'email'      => Input::get('email'),
                'first_name' => Input::get('first_name'),
                'last_name'  => Input::get('last_name'),
                'sex'        => Input::get('sex'),
                'location'   => Input::get('location'),
                'phone'      => Input::get('phone'),
                'photo'      => Input::get('photo')
            ];
        }

        return Redirect::to('users/profile');
    }

} 
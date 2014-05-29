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
        return View::make('profile', array('user' => User::find(Auth::user()->id)));
    }

    public function getConfirmRegistration() {
        $user = User::where('confirmation', Input::get('confirmation'))->get();

        if ($user) {
            return View::make('confirm')->with(['result' => 'User confirmed! Sign in!']);
        } else {
            return View::make('confirm')->with(['result' => 'Wrong confirmation link!']);
        }
    }

    public function postRegister() {
        $validator = Validator::make(Input::all(), User::$rules);

        $confirm_link = str_random(16);

        if ($validator->passes()) {
            User::create([
                'email'        => Input::get('email'),
                'password'     => Hash::make(Input::get('password')),
                'confirmation' => $confirm_link,
                'confirmed'    => false
            ]);

            Mail::send('emails.auth.confirmation', ['link' => $confirm_link], function($message)
            {
                $message->to(Input::get('email'), 'Guest')->subject('Welcome to ontour!');
            });

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
            return Redirect::to('users/login-page')->withErrors(['result' => 'Wrong email or password!']);
        }
    }

    public function getLogout() {
        Auth::logout();
        return Redirect::to('users/login-page');
    }

    public function postEdit() {
        $validator = Validator::make(Input::all(), User::$editRules);

        if ($validator->passes()) {
            User::find(Auth::user()->id)->update([
                'login'      => Input::get('login'),
                'password'   => Hash::make(Input::get('password')),
                'email'      => Input::get('email'),
                'first_name' => Input::get('first_name'),
                'last_name'  => Input::get('last_name'),
                'sex'        => Input::get('sex'),
                'location'   => Input::get('location'),
                'phone'      => Input::get('phone'),
                'photo'      => Input::get('photo')
            ]);

            return Redirect::to('users/profile')->with('result', 'success');
        }

        return Redirect::to('users/profile')->with('result', 'fail');
    }

} 
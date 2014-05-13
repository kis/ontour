<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::controller('users', 'UserController');

Route::get('/registration', function()
{
	return View::make('registration');
});

Route::get('/login', function()
{
    return View::make('login');
});

Route::group(array('before' => 'auth'), function(){
    Route::get('/', function()
    {
        return View::make('main');
    });
});
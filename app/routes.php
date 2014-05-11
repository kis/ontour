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

Route::post('register', array(
	'uses' => 'UserController@register',
	'as' => 'users.register'
));

// Route::controller('users', 'UserController');

Route::get('/registration', function()
{
	return View::make('registration');
});

Route::get('/', function()
{
	return View::make('main');
});
<?php

//use Jenssegers\Mongodb\Model as Eloquent;
// use Illuminate\Auth\UserInterface;

class UserModel extends Eloquent {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	protected $fillable = array('password', 'email');

	public $timestamps = false;

    /**
     * Register user
     */
    public function register() {
        UserModel::create(array(
            // 'login'      => Input::get('login'),
            'password'   => Input::get('password'),
            'email'      => Input::get('email')
            // 'first_name' => Input::get('first_name'),
            // 'last_name'  => Input::get('last_name'),
            // 'sex'        => Input::get('sex'),
            // 'location'   => Input::get('location'),
            // 'phone'      => Input::get('phone'),
            // 'photo'      => Input::get('photo')
        ));

        return true;
    }

}
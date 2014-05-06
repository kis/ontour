<?php

//use Jenssegers\Mongodb\Model as Eloquent;
use Illuminate\Auth\UserInterface;

class UserModel extends Eloquent implements UserInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}

    /**
     * Register user
     */
    public function register() {
        UserModel::create(array(
            'login'      => Input::get('login'),
            'password'   => Input::get('password'),
            'email'      => Input::get('email'),
            'first_name' => Input::get('first_name'),
            'last_name'  => Input::get('last_name'),
            'sex'        => Input::get('sex'),
            'location'   => Input::get('location'),
            'phone'      => Input::get('phone'),
            'photo'      => Input::get('photo')
        ));
    }

}
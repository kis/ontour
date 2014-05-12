<?php

//use Jenssegers\Mongodb\Model as Eloquent;
use Illuminate\Auth\UserInterface;
use Illuminate\Support\Facades\Validator;

class User extends Eloquent implements UserInterface {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	protected $fillable = array('password', 'email');

	public $timestamps = false;

    public static $rules = array(
        'firstname' => 'required | alpha | min:2',
        'lastname'  => 'required | alpha | min:2',
        'email'     => 'required | email | unique:users',
        'password'  => 'required | alpha_num | between:6,12'
    );

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        // TODO: Implement getAuthIdentifier() method.
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        // TODO: Implement getAuthPassword() method.
    }

    /**
     * Get the token value for the "remember me" session.
     *
     * @return string
     */
    public function getRememberToken()
    {
        // TODO: Implement getRememberToken() method.
    }

    /**
     * Set the token value for the "remember me" session.
     *
     * @param  string $value
     * @return void
     */
    public function setRememberToken($value)
    {
        // TODO: Implement setRememberToken() method.
    }

    /**
     * Get the column name for the "remember me" token.
     *
     * @return string
     */
    public function getRememberTokenName()
    {
        // TODO: Implement getRememberTokenName() method.
    }

    /**
     * Register user
     */
    public function register() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            User::create(array(
                'password'   => Hash::make(Input::get('password')),
                'email'      => Input::get('email')
            ));
        }

        if (Auth::attempt(array(
                'email'    => Input::get('email'),
                'password' => Input::get('password'))
        )) {
            return Redirect::intended('/');
        } else {
            return Redirect::intended('/');
        }
    }

    /**
     * Edit user's profile
     */
    public function editProfile() {
        $validator = Validator::make(Input::all(), User::$rules);

        if ($validator->passes()) {
            User::create(array(
                'login'      => Input::get('login'),
                'password'   => Hash::make(Input::get('password')),
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
}
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('users', function($table)
        {
            $table->increments('id');
            $table->string('login');
            $table->string('password');
            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->boolean('sex');
            $table->string('location');
            $table->string('phone');
            $table->string('photo');
            $table->text('remember_token');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('users');
	}

}

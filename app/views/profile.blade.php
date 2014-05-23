<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8"/>
    <title>Ontour.im</title>
    {{ HTML::style('css/styles.css'); }}
</head>

<body>
    <section id="area">
        <header id="homepage">
            <a href="/" id="main">Main</a>
            <a href="logout" id="signup">Logout</a>
        </header>

        <main id="profile-area">

            <?php
                echo Form::label('form', 'Profile');
                echo Form::model($user, array('action' => 'UserController@postEdit'));
            ?>

            <section id="profile-stuff">

                <?php
                    echo Form::label('login', 'Login');
                    echo Form::text('login');

                    echo Form::label('email', 'Email');
                    echo Form::email('email');

                    echo Form::label('password', 'Password');
                    echo Form::password('password');

                    echo Form::label('password_confirmation', 'Confirm password');
                    echo Form::password('password_confirmation');
                ?>

            </section>

            <section id="profile-stuff">

                <?php
                    echo Form::label('first_name', 'First name');
                    echo Form::text('first_name');

                    echo Form::label('last_name', 'Last name');
                    echo Form::text('last_name');

                    echo Form::label('sex', 'Sex');
                    echo Form::radio('sex');
                    echo Form::radio('sex');

                    echo Form::label('location', 'Location');
                    echo Form::text('location');

                    echo Form::label('phone', 'Phone');
                    echo Form::text('phone');
                ?>

            </section>

            <?php
                echo Form::submit('Save', array('id' => 'submit'));
            ?>

        </main>

        <footer>

        </footer>
    </section>
</body>
</html>
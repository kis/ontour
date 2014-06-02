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
                echo Form::model($user, array('action' => 'UserController@postEdit', 'files' => true, 'method' => 'post'));
            ?>

            <div class="error">{{ $errors->first('userfile') }}</div>

            <section id="profile-stuff">
                <?php
                    echo HTML::image('nopic.png', 'Profile image');

                    echo Form::file('userfile');

                    echo Form::label('login', 'Login');
                ?>
                    <div class="error">{{ $errors->first('login') }}</div>
                <?php
                    echo Form::text('login');

                    echo Form::label('email', 'Email');
                ?>
                    <div class="error">{{ $errors->first('email') }}</div>
                <?php
                    echo Form::email('email');
                ?>
                    <a href="change-password" id="reset">Reset password</a><br/>
                <?php
                    echo Form::submit('Save', array('id' => 'submit'));
                ?>
            </section>

            <section id="profile-stuff">
                <?php
                    echo Form::label('first_name', 'First name');
                    echo Form::text('first_name');

                    echo Form::label('last_name', 'Last name');
                    echo Form::text('last_name');

                    echo Form::label('sex', 'Sex');
                    echo '<br/>';

                    echo Form::label('sex', 'Male');
                    echo Form::radio('sex', '1');
                    echo Form::label('sex', 'Female');
                    echo Form::radio('sex', '0');

                    echo Form::label('location', 'Location');
                    echo Form::text('location');

                    echo Form::label('phone', 'Phone');
                    echo Form::text('phone');
                    echo Form::close();
                ?>
            </section>

        </main>

        <footer>

        </footer>
    </section>
</body>
</html>
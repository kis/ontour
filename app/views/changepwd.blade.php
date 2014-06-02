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
        <a href="/" id="signup">Main</a>
    </header>

    <main id="login-area">

        <?php
            echo Form::label('form', 'Change password');
            echo Form::open(array('action' => 'UserController@postChangePassword'));
            echo Form::password('password', array('placeholder' => 'Enter new password..'));
        ?>
            <div class="error">{{ $errors->first('password') }}</div>
        <?php
            echo Form::password('password_confirmation', array('placeholder' => 'Confirm password..'));
        ?>
            <div class="error">{{ $errors->first('password_confirmation') }}</div>
        <?php
            echo Form::submit('Save', array('id' => 'submit'));
            echo Form::close();
        ?>

    </main>

    <footer>

    </footer>
</section>
</body>
</html>
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
        <a href="../registration-page" id="signup">Sign up</a>
        <a href="../login-page" id="signin">Sign in</a>
    </header>

    <main id="reset-area">

        <?php
            echo Form::label('form', 'Change password');
        ?>
            <div class="error">{{ $errors->first('result') }}</div>
        <?php
            echo Form::open(array('action' => 'UserController@postReset'));
            echo Form::hidden('token', $token);
            echo Form::email('email', '', array('placeholder' => 'Enter email..'));
            echo Form::password('password', array('placeholder' => 'Enter new password..'));
            echo Form::password('password_confirmation', array('placeholder' => 'Confirm password..'));
            echo Form::submit('Save', array('id' => 'submit'));
            echo Form::close();
        ?>

    </main>

    <footer>

    </footer>
</section>
</body>
</html>
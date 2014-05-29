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
                <a href="registration-page" id="signup" class="active">Sign up</a>
                <a href="login-page" id="signin">Sign in</a>
            </header>

            <main id="registration-area">

                <?php
                    echo Form::label('form', 'Sign Up');
                    echo Form::open(array('action' => 'UserController@postRegister'));
                    echo Form::email('email', '', array('placeholder' => 'Enter email..'));
                ?>

                    <div class="error">{{ $errors->first('email') }}</div>

                <?php
                    echo Form::password('password', array('placeholder' => 'Enter password..'));
                    echo Form::password('password_confirmation', array('placeholder' => 'Confirm password..'));
                ?>

                    <div class="error">{{ $errors->first('password_confirmation') }}</div>

                <?php
                    echo Form::submit('Sign up', array('id' => 'submit'));
                    echo Form::close();
                ?>

            </main>

            <footer>

            </footer>
        </section>
    </body>
</html>